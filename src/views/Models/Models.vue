<script>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import ModelInfo from './ModelInfo.vue';
import ModelVersions from './ModelVersions.vue';
import Message from 'primevue/message';
import { useStore } from 'vuex';
import LazyTableHeader from '@/components/LazyTableHeader.vue';
import { parseId } from '@/store/compliance-paged';
import { useLazyTable } from '@/store/lazy-table';
import { fetchModelPage, searchModels } from '@/store/models-paged';

const hex = (value) => (value ? `${value} (0x${value.toString(16).toUpperCase()})` : value);

export default {
    name: 'Models',
    components: {
        DataTable,
        Column,
        Button,
        Dialog,
        ModelInfo,
        ModelVersions,
        Message,
        LazyTableHeader
    },

    setup() {
        const store = useStore();
        const table = useLazyTable({
            cacheKey: 'models',
            fetchPage: (opts) => fetchModelPage(store, opts),
            search: (vidText, pidText) => {
                const vid = parseId(vidText);
                const pid = parseId(pidText);
                if (vid === null || (pidText.trim() && pid === null)) {
                    throw new Error('Enter a Vendor ID (and optionally a Product ID), decimal or 0x hex.');
                }
                return searchModels(store, vid, pid);
            },
            decorate: (model) => {
                model.vidHex = hex(model.vid);
                model.pidHex = hex(model.pid);
                model.deviceTypeIdHex = hex(model.deviceTypeId);
            },
            filterFields: ['vidHex', 'pidHex', 'deviceTypeIdHex', 'productName', 'productLabel']
        });
        return { table };
    },

    data() {
        return {
            showModelInfo: false,
            selectedModelInfo: null,
            viewOnly: false,
            error: null,
            modelVersions: [],
            expandedRows: []
        };
    },

    created() {
        this.table.loadPage();
    },

    methods: {
        reload() {
            this.table.reset();
            this.table.refresh();
        },
        dismissModelInfoDialog() {
            this.showModelInfo = false;
            this.reload();
        },
        showModelInfoDialog(modelInfo, viewOnly) {
            this.showModelInfo = true;
            this.selectedModelInfo = modelInfo;
            this.viewOnly = viewOnly;
        },
        showNewModelInfoDialog() {
            this.showModelInfo = true;
            this.selectedModelInfo = null;
            this.viewOnly = false;
        },
        confirmDeleteModel(model) {
            this.$confirm.require({
                message: 'Are you sure you want to delete the device model?',
                header: 'Delete Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.deleteModel(model);
                },
                reject: () => {
                    //callback to execute when user rejects the action
                }
            });
        },
        deleteModel(model) {
            const account = this.$store.state.selectedKeplrAccount;
            const creatorAddress = account.address;
            let loader = this.$loading.show();
            this.$store
                .dispatch(`zigbeealliance.distributedcomplianceledger.model/sendMsgDeleteModel`, {
                    value: {
                        creator: creatorAddress,
                        vid: model.vid,
                        pid: model.pid
                    }
                })
                .then(
                    (response) => {
                        loader.hide();
                        if (response.code == 0) {
                            this.error = null;
                            this.reload();
                            this.$toast.add({
                                severity: 'success',
                                summary: 'Successful Tx',
                                detail: 'Delete Model Tx sent successfully',
                                life: 3000
                            });
                        } else {
                            this.error = response;
                            this.$toast.add({
                                severity: 'error',
                                summary: 'Error while processing Tx',
                                detail: 'Delete Model Tx failed',
                                life: 3000
                            });
                        }
                    },
                    (error) => {
                        loader.hide();
                        this.$toast.add({
                            severity: 'error',
                            summary: 'Error while processing Tx',
                            detail: 'Delete Model Tx failed',
                            life: 3000
                        });
                        this.error = error.message;
                    }
                );
        },

        onRowExpand(event) {
            //this.$toast.add({ severity: 'info', summary: 'Model Expanded', detail: event.data.vid, life: 3000 })
        },
        onRowCollapse(event) {
            //this.$toast.add({ severity: 'success', summary: 'Model Collapsed', detail: event.data.vid, life: 3000 })
        },

        errorMessage() {
            if (this.error && this.error.rawLog) {
                return this.error.rawLog;
            } else if (this.error) {
                return this.error;
            } else {
                return null;
            }
        },

        getHexValue(value) {
            if (value) return `${value} (0x${value.toString(16).toUpperCase()})`;
            else return value;
        }
    },

    computed: {
        isSignedIn() {
            return this.$store.getters['loggedIn'];
        }
    }
};
</script>

<template>
    <div class="prime-vue-container card">
        <ConfirmDialog></ConfirmDialog>
        <Message :closable="false" v-if="error" severity="error">{{ errorMessage() }}</Message>

        <div class="mb-5 ml-2">
            <Button @click="showNewModelInfoDialog" icon="pi pi-check" v-bind:class="{ 'p-disabled': !isSignedIn }" label="New Model">New Model</Button>
        </div>

        <DataTable
            :value="table.mode === 'all' ? table.allRows : table.rows"
            :lazy="table.mode === 'paged'"
            :class="{ 'lazy-paged': table.mode === 'paged' }"
            :loading="table.loading"
            :totalRecords="table.total"
            :first="table.first"
            v-model:filters="table.filters"
            :globalFilterFields="table.filterFields"
            @page="table.onPage($event)"
            @value-change="table.onValueChange($event)"
            @rowExpand="onRowExpand"
            @rowCollapse="onRowCollapse"
            :auto-layout="true"
            :paginator="true"
            :rows="table.perPage"
            :rowsPerPageOptions="[10, 20, 50, 100]"
            v-model:expandedRows="expandedRows"
            showGridlines
            stripedRows
        >
            <template #header>
                <LazyTableHeader :table="table" vidOnlyAllowed />
            </template>

            <Column :expander="true" headerStyle="width: 3rem" />
            <Column field="vidHex" header="Vendor ID" :sortable="true"></Column>
            <Column field="pidHex" header="Product ID" :sortable="true"></Column>
            <Column field="deviceTypeIdHex" header="Device Type ID" :sortable="true"></Column>
            <Column field="productName" header="Product Name" :sortable="true"></Column>
            <Column field="productLabel" header="Product Label" :sortable="true"></Column>

            <Column field="vid" header="Action" headerStyle="text-align: center" bodyStyle="text-align: center; overflow: visible">
                <template #body="{ data }">
                    <span style="margin-right: 0.1rem">
                        <Button label="" @click="showModelInfoDialog(data, true)" iconPos="left" icon="pi pi-info-circle" class="p-button-rounded p-button-primary p-button-text p-button-info" v-tooltip="'Show Model'" />
                    </span>
                    <span style="margin-right: 0.1rem">
                        <Button label="" @click="showModelInfoDialog(data, false)" iconPos="left" icon="pi pi-pencil" class="p-button-rounded p-button-secondary p-button-text" v-bind:class="{ 'p-disabled': !isSignedIn }" v-tooltip="'Update Model'" />
                    </span>
                    <span style="margin-right: 0.1rem">
                        <Button label="" @click="confirmDeleteModel(data)" iconPos="left" icon="pi pi-trash" class="p-button-rounded p-button-danger p-button-text" v-bind:class="{ 'p-disabled': !isSignedIn }" v-tooltip="'Delete Model'" />
                    </span>
                </template>
            </Column>

            <template #expansion="model">
                <div>
                    <ModelVersions :vid="model.data.vid" :pid="model.data.pid"></ModelVersions>
                </div>
            </template>
        </DataTable>

        <Dialog :visible="showModelInfo" @update:visible="dismissModelInfoDialog" :style="{ width: '40vw' }" :header="viewOnly ? 'Device Model' : 'Device Model Add/Update'" :modal="true">
            <ModelInfo :viewOnly="viewOnly" :selectedModel="selectedModelInfo" @close-dialog="dismissModelInfoDialog"></ModelInfo>
        </Dialog>
    </div>
</template>



