// Paged and exact-lookup model queries; avoids loading the whole model list into the store.
import { getClient, isNotFoundError } from './compliance-paged';

const api = (store) => getClient(store).ZigbeeallianceDistributedcomplianceledgerModel.query;

export async function fetchModelPage(store, { first = 0, rows = 10 } = {}) {
    const { data } = await api(store).queryModelAll({
        'pagination.offset': String(first),
        'pagination.limit': String(rows),
        'pagination.count_total': true
    });
    return { items: data.model ?? [], total: Number(data.pagination?.total ?? 0) };
}

export async function fetchModelTotal(store) {
    const { data } = await api(store).queryModelAll({ 'pagination.limit': '1', 'pagination.count_total': true });
    return Number(data.pagination?.total ?? 0);
}

// pid omitted: all models of the vendor.
export async function searchModels(store, vid, pid) {
    const q = api(store);
    // 404 means the model does not exist
    const getModel = (p) => q.queryModel(vid, p).then(({ data }) => data.model).catch((error) => {
        if (isNotFoundError(error)) return null;
        throw error;
    });
    if (pid !== null) {
        const model = await getModel(pid);
        return model ? [model] : [];
    }
    let products = [];
    try {
        const { data } = await q.queryVendorProducts(vid);
        products = data.vendorProducts?.products ?? [];
    } catch (error) {
        if (isNotFoundError(error)) return [];
        throw error;
    }
    const models = await Promise.all(products.map((p) => getModel(p.pid)));
    return models.filter(Boolean);
}
