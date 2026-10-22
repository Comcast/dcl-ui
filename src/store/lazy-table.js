// Table state: one request per page by default, with an opt-in "load everything" mode for client-side search and sort.
import { reactive } from 'vue';

const PAGE_SIZE = 100;
const BATCH = 5;
const CACHE_TTL_MS = 5 * 60 * 1000;
const allCache = new Map();

export function useLazyTable({ cacheKey, fetchPage, search, decorate = () => {}, enrich = async () => {}, filterFields = [] }) {
    let cancelled = false;
    let processed = null;

    const t = reactive({
        mode: 'paged',
        rows: [],
        allRows: [],
        total: 0,
        catalogTotal: 0,
        first: 0,
        perPage: 10,
        loading: false,
        progress: null,
        error: null,
        vidText: '',
        pidText: '',
        filters: { global: { value: null, matchMode: 'contains' } },
        filterFields,

        async loadPage() {
            t.loading = true;
            t.error = null;
            try {
                const { items, total } = await fetchPage({ first: t.first, rows: t.perPage });
                items.forEach(decorate);
                await enrich(items);
                t.rows = items;
                t.total = total;
                t.catalogTotal = total;
            } catch (e) {
                t.error = `Failed to load: ${e.message}`;
            } finally {
                t.loading = false;
            }
        },

        onPage(event) {
            t.first = event.first;
            t.perPage = event.rows;
            if (t.mode === 'paged') t.loadPage();
            else enrichVisible();
        },

        // Fires when sort/filter changes the rows the table shows.
        onValueChange(rows) {
            processed = rows;
            if (t.mode === 'all') enrichVisible();
        },

        async search() {
            t.loading = true;
            t.error = null;
            try {
                const items = await search(t.vidText, t.pidText);
                items.forEach(decorate);
                await enrich(items);
                t.rows = items;
                t.total = items.length;
                t.first = 0;
                if (items.length === 0) t.error = 'No records found.';
            } catch (e) {
                t.error = e.message;
            } finally {
                t.loading = false;
            }
        },

        clearSearch() {
            t.vidText = '';
            t.pidText = '';
            t.first = 0;
            t.loadPage();
        },

        async loadAll(force = false) {
            const cached = allCache.get(cacheKey);
            if (!force && cached && Date.now() - cached.at < CACHE_TTL_MS) {
                enterAllMode(cached.rows);
                return;
            }
            cancelled = false;
            t.loading = true;
            t.error = null;
            try {
                const firstPage = await fetchPage({ first: 0, rows: PAGE_SIZE });
                const pages = [firstPage.items];
                t.progress = { loaded: firstPage.items.length, total: firstPage.total };
                const offsets = [];
                for (let o = PAGE_SIZE; o < firstPage.total; o += PAGE_SIZE) offsets.push(o);
                for (let i = 0; i < offsets.length && !cancelled; i += BATCH) {
                    const results = await Promise.all(offsets.slice(i, i + BATCH).map((first) => fetchPage({ first, rows: PAGE_SIZE })));
                    results.forEach((r) => {
                        pages.push(r.items);
                        t.progress.loaded += r.items.length;
                    });
                }
                if (cancelled) return;
                const rows = pages.flat();
                rows.forEach(decorate);
                allCache.set(cacheKey, { at: Date.now(), rows });
                enterAllMode(rows);
            } catch (e) {
                t.error = `Failed to load: ${e.message}`;
            } finally {
                t.loading = false;
                t.progress = null;
            }
        },

        cancelLoadAll() {
            cancelled = true;
        },

        backToPaged() {
            t.mode = 'paged';
            t.allRows = [];
            t.filters.global.value = null;
            t.first = 0;
            t.loadPage();
        },

        refresh() {
            if (t.mode === 'all') t.loadAll(true);
            else t.loadPage();
        },

        reset() {
            allCache.delete(cacheKey);
        }
    });

    function enterAllMode(rows) {
        t.allRows = rows;
        t.total = rows.length;
        t.mode = 'all';
        t.first = 0;
        processed = t.allRows;
        enrichVisible();
    }

    async function enrichVisible() {
        const slice = (processed ?? t.allRows).slice(t.first, t.first + t.perPage);
        await enrich(slice);
    }

    return t;
}
