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

// Fetches and caches ComplianceInfo for each row, then merges it in.
export async function enrichRows(store, rows) {
    const api = complianceApi(store);
    await Promise.all(
        rows.map(async (row) => {
            const key = `${row.vid}/${row.pid}/${row.softwareVersion}/${row.certificationType}`;
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
            if (info) {
                Object.assign(row, info);
                row.certificationDate = info.date;
            }
        })
    );
    return rows;
}
