// Paged and exact-lookup compliance queries; avoids loading whole lists into the store.
import { Client } from 'zigbee-alliance-distributed-compliance-ledger-client-ts';

const CERTIFICATION_TYPES = ['zigbee', 'matter', 'aliro'];

const LIST_QUERIES = {
    certified: { method: 'queryCertifiedModelAll', field: 'certifiedModel', lookup: 'queryCertifiedModel' },
    revoked: { method: 'queryRevokedModelAll', field: 'revokedModel', lookup: 'queryRevokedModel' },
    provisional: { method: 'queryProvisionalModelAll', field: 'provisionalModel', lookup: 'queryProvisionalModel' }
};

const complianceInfoCache = new Map();

export function getClient(store) {
    const getters = store.getters;
    return new Client(
        {
            apiURL: getters['common/env/apiCosmos'],
            rpcURL: getters['common/env/apiTendermint'],
            prefix: getters['common/env/addrPrefix']
        },
        getters['keplrSigner']
    );
}

const complianceApi = (store) => getClient(store).ZigbeeallianceDistributedcomplianceledgerCompliance.query;
const modelApi = (store) => getClient(store).ZigbeeallianceDistributedcomplianceledgerModel.query;

export const clearComplianceInfoCache = () => complianceInfoCache.clear();

export const isNotFoundError = (error) => error?.response?.status === 404;

// Accepts decimal ("4874") or hex ("0x130A").
export function parseId(text) {
    const value = String(text ?? '').trim();
    if (!value) return null;
    const n = /^0x/i.test(value) ? parseInt(value, 16) : /^\d+$/.test(value) ? parseInt(value, 10) : NaN;
    return Number.isFinite(n) ? n : null;
}

export async function fetchPage(store, kind, { first = 0, rows = 10 } = {}) {
    const { method, field } = LIST_QUERIES[kind];
    const { data } = await complianceApi(store)[method]({
        'pagination.offset': String(first),
        'pagination.limit': String(rows),
        'pagination.count_total': true
    });
    return { items: data[field] ?? [], total: Number(data.pagination?.total ?? 0) };
}

export async function fetchTotal(store, kind) {
    const { method } = LIST_QUERIES[kind];
    const { data } = await complianceApi(store)[method]({ 'pagination.limit': '1', 'pagination.count_total': true });
    return Number(data.pagination?.total ?? 0);
}

// Exact lookup by vid+pid: list the model's software versions, then probe each version/type key.
export async function searchByVidPid(store, kind, vid, pid) {
    const { lookup, field } = LIST_QUERIES[kind];
    let versions = [];
    try {
        const { data } = await modelApi(store).queryModelVersions(vid, pid);
        versions = data.modelVersions?.softwareVersions ?? [];
    } catch (error) {
        if (isNotFoundError(error)) return [];
        throw error;
    }
    const api = complianceApi(store);
    const probes = [];
    for (const sv of versions) {
        for (const type of CERTIFICATION_TYPES) {
            probes.push(
                api[lookup](vid, pid, sv, type)
                    .then(({ data }) => data[field])
                    // 404 means no record for this key
                    .catch((error) => {
                        if (isNotFoundError(error)) return null;
                        throw error;
                    })
            );
        }
    }
    const results = await Promise.all(probes);
    return results.filter((r) => r && (kind !== 'certified' || r.value !== false));
}

const infoKey = (r) => `${r.vid}/${r.pid}/${r.softwareVersion}/${r.certificationType}`;

function mergeInfo(row, info) {
    Object.assign(row, info);
    row.certificationDate = info.date;
}

// Pages through the full ComplianceInfo list (~total/100 requests) and merges it into rows, so every row is searchable.
export async function enrichAllRows(store, rows, { pageSize = 100, batch = 5 } = {}) {
    const api = complianceApi(store);
    const fetchInfoPage = (offset) =>
        api.queryComplianceInfoAll({
            'pagination.offset': String(offset),
            'pagination.limit': String(pageSize),
            'pagination.count_total': offset === 0
        });
    const { data: first } = await fetchInfoPage(0);
    const infos = [...(first.complianceInfo ?? [])];
    const total = Number(first.pagination?.total ?? infos.length);
    const offsets = [];
    for (let o = pageSize; o < total; o += pageSize) offsets.push(o);
    for (let i = 0; i < offsets.length; i += batch) {
        const pages = await Promise.all(offsets.slice(i, i + batch).map(fetchInfoPage));
        pages.forEach(({ data }) => infos.push(...(data.complianceInfo ?? [])));
    }
    const byKey = new Map(infos.map((info) => [infoKey(info), info]));
    byKey.forEach((info, key) => complianceInfoCache.set(key, Promise.resolve(info)));
    rows.forEach((row) => {
        const info = byKey.get(infoKey(row));
        if (info) mergeInfo(row, info);
    });
    return rows;
}

// Fetches and caches ComplianceInfo for each row, then merges it in.
export async function enrichRows(store, rows) {
    const api = complianceApi(store);
    await Promise.all(
        rows.map(async (row) => {
            const key = infoKey(row);
            if (!complianceInfoCache.has(key)) {
                complianceInfoCache.set(
                    key,
                    api
                        .queryComplianceInfo(row.vid, row.pid, row.softwareVersion, row.certificationType)
                        .then(({ data }) => data.complianceInfo ?? null)
                        .catch(() => {
                            complianceInfoCache.delete(key);
                            return null;
                        })
                );
            }
            const info = await complianceInfoCache.get(key);
            if (info) mergeInfo(row, info);
        })
    );
    return rows;
}
