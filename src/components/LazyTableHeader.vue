<script>
import Button from 'primevue/button';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import InputText from 'primevue/inputtext';
import ProgressBar from 'primevue/progressbar';

export default {
    name: 'LazyTableHeader',
    components: { Button, IconField, InputIcon, InputText, ProgressBar },
    props: {
        table: { type: Object, required: true },
        searchPlaceholder: { type: String, default: 'Search VID, PID, or certificate ID' }
    },
    computed: {
        percent() {
            const p = this.table.progress;
            return p && p.total ? Math.round((p.loaded / p.total) * 100) : 0;
        },
        requestCount() {
            return Math.ceil(this.table.catalogTotal / 100);
        }
    }
};
</script>

<template>
    <div class="flex flex-column gap-2">
        <div v-if="table.progress" class="flex align-items-center gap-3">
            <ProgressBar :value="percent" class="flex-grow-1" />
            <span>Loaded {{ table.progress.loaded }} / {{ table.progress.total }}</span>
            <Button label="Cancel" class="p-button-text" @click="table.cancelLoadAll()" />
        </div>

        <div v-if="table.mode === 'all'" class="flex justify-content-between align-items-center flex-wrap gap-3">
            <span class="font-semibold"><i class="pi pi-check-circle text-green-500 mr-2" />All {{ table.total }} records loaded</span>
            <IconField>
                <InputIcon>
                    <i class="pi pi-search" />
                </InputIcon>
                <InputText v-model="table.filters.global.value" placeholder="Search loaded records" />
            </IconField>
        </div>

        <div v-else class="flex justify-content-end gap-2 align-items-center flex-wrap">
            <small v-if="table.error" class="p-error">{{ table.error }}</small>
            <InputText v-model="table.searchText" :placeholder="searchPlaceholder" @keyup.enter="table.search()" />
            <Button label="Search" icon="pi pi-search" @click="table.search()" />
            <Button label="Clear" class="p-button-text" @click="table.clearSearch()" />
            <Button
                :label="`Enable search & sort (loads all ${table.catalogTotal} records, ~${requestCount} requests)`"
                icon="pi pi-download"
                class="p-button-outlined"
                :disabled="!table.catalogTotal || table.loading"
                @click="table.loadAll()"
            />
        </div>
    </div>
</template>

<style>
/* Server-paged tables cannot sort across pages */
.lazy-paged .p-sortable-column {
    pointer-events: none;
}
.lazy-paged .p-sortable-column-icon {
    display: none;
}
</style>
