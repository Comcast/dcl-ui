<script>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import VendorInfo from './VendorInfo.vue';
import { FilterMatchMode } from 'primevue/api';

export default {
    name: 'Vendors',

    data() {
        return {
            showVendorInfo: false,
            selectedVendorInfo: null,
            viewOnly: false,
            filters: {
                global: { value: null, matchMode: FilterMatchMode.CONTAINS }
            }
        };
    },

    methods: {
        dismissVendorInfoDialog() {
            this.showVendorInfo = false;
        },
        showVendorInfoDialog(vendorInfo, viewOnly) {
            this.showVendorInfo = true;
            if (vendorInfo) {
                this.selectedVendorInfo = vendorInfo;
            } else {
                this.selectedVendorInfo = null;
            }
            this.viewOnly = viewOnly;
        }
    },
    components: {
        DataTable,
        Column,
        Button,
        Dialog,
        VendorInfo
    },

    computed: {
        allVendors() {
            const vendorInfoArray = this.$store.getters['zigbeealliance.distributedcomplianceledger.vendorinfo/getVendorInfoAll']();
            // Add the vendorID as Hex String to all the vendorInfo
            vendorInfoArray?.vendorInfo?.forEach((vendorInfo) => {
                vendorInfo.vendorIDHex = `${vendorInfo.vendorID} (0x${vendorInfo.vendorID.toString(16)})`;
            });
            return vendorInfoArray?.vendorInfo;
        },

        isSignedIn() {
            return this.$store.getters['loggedIn'];
        }
    },

    created: function () {
        // Get all the accounts
        this.$store.dispatch('zigbeealliance.distributedcomplianceledger.vendorinfo/QueryVendorInfoAll', {
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
        <div class="mb-5 ml-2">
            <Button @click="showVendorInfoDialog(nil, false)" icon="pi pi-check" v-bind:class="{ 'p-disabled': !isSignedIn }" label="New Vendor">New Vendor</Button>
        </div>
        <DataTable :value="allVendors" :auto-layout="true" :paginator="true" :rows="10" :rowsPerPageOptions="[10, 20, 50, 100]" v-model:filters="filters" filterDisplay="row" showGridlines stripedRows>
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

            <Column field="vendorIDHex" header="Vendor ID"> </Column>
            <Column field="vendorName" header="Vendor Name"></Column>
            <Column field="companyLegalName" header="Company Legal Name"></Column>
            <Column field="vendorID" header="Action" headerStyle="text-align: center" bodyStyle="text-align: center; overflow: visible">
                <template #body="{ data }">
                    <span style="margin-right: 1rem">
                        <Button label="" @click="showVendorInfoDialog(data, true)" class="p-button-rounded p-button-primary p-button-text" iconPos="left" icon="pi pi-info-circle" v-tooltip="'Show Vendor info'" />
                    </span>
                    <span>
                        <Button
                            label=""
                            @click="showVendorInfoDialog(data, false)"
                            class="p-button-rounded p-button-secondary p-button-text"
                            iconPos="left"
                            icon="pi pi-pencil"
                            v-bind:class="{ 'p-disabled': !isSignedIn }"
                            v-tooltip="'Update Vendor info'"
                        />
                    </span>
                </template>
            </Column>
        </DataTable>

        <Dialog :visible="showVendorInfo" @update:visible="dismissVendorInfoDialog" :style="{ width: '40vw' }" header="Vendor Info Transaction" :modal="true">
            <VendorInfo :viewOnly="viewOnly" :vendorInfo="selectedVendorInfo" @close-dialog="dismissVendorInfoDialog"></VendorInfo>
        </Dialog>
    </div>
</template>
