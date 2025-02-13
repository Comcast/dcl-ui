<script>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import ModelInfo from './ModelInfo.vue';
import ModelVersions from './ModelVersions.vue';
import Message from 'primevue/message';
import { FilterMatchMode } from 'primevue/api';

export default {
    name: 'Models',
    components: {
        DataTable,
        Column,
        Button,
        Dialog,
        ModelInfo,
        ModelVersions,
        Message
    },

    data() {
        return {
            showModelInfo: false,
            selectedModelInfo: null,
            viewOnly: false,
            error: null,
            modelVersions: [],
            expandedRows: [],
            filters: {
                global: { value: null, matchMode: FilterMatchMode.CONTAINS }
            }
        };
    },

    methods: {
        dismissModelInfoDialog() {
            this.showModelInfo = false;
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
            if (value) return `${value} (0x${value.toString(16)})`;
            else return value;
        }
    },

    computed: {
        allModels() {
            const ModelInfoArray = this.$store.getters['zigbeealliance.distributedcomplianceledger.model/getModelAll']();
            // Add hex values for vid and pid
            if (ModelInfoArray && ModelInfoArray.model) {
                ModelInfoArray.model.forEach((model) => {
                    model.vidHex = this.getHexValue(model.vid);
                    model.pidHex = this.getHexValue(model.pid);
                    model.deviceTypeIdHex = this.getHexValue(model.deviceTypeId);
                });
            }
            return ModelInfoArray?.model;
        },

        isSignedIn() {
            return this.$store.getters['loggedIn'];
        }
    },

    created: function () {
        // Get all the accounts
        this.$store.dispatch('zigbeealliance.distributedcomplianceledger.model/QueryModelAll', {
            options: {
                subscribe: true,
                all: true
            }
        });
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

        <DataTable :value="allModels" @rowExpand="onRowExpand" @rowCollapse="onRowCollapse" :auto-layout="true" :paginator="true" :rows="10" :rowsPerPageOptions="[10, 20, 50, 100]" v-model:filters="filters" v-model:expandedRows="expandedRows" filterDisplay="row" showGridlines stripedRows>
            <template #header>
                <div class="flex justify-content-end">
                    <IconField>
                        <InputIcon>
                            <i class="pi pi-search" />
                        </InputIcon>
                        <InputText v-model="filters['global'].value" placeholder="Search" />
                    </IconField>
                </div>
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



