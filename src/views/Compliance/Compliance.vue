<script>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import InputText from 'primevue/inputtext';
import Tag from 'primevue/tag';
import CertifyModel from './CertifyModel.vue';
import RevokeModel from './RevokeModel.vue';
import ProvisionModel from './ProvisionModel.vue';
import { useStore } from 'vuex';
import LazyTableHeader from '@/components/LazyTableHeader.vue';
import { fetchPage, searchByVidPid, enrichRows, enrichAllRows, clearComplianceInfoCache, parseId } from '@/store/compliance-paged';
import { useLazyTable } from '@/store/lazy-table';

const KINDS = ['certified', 'revoked', 'provisional'];
const hex = (value) => (value ? `${value} (0x${value.toString(16).toUpperCase()})` : value);

export default {
    name: 'Compliance',
    setup() {
        const store = useStore();
        const tabs = {};
        for (const kind of KINDS) {
            tabs[kind] = useLazyTable({
                cacheKey: `compliance-${kind}`,
                fetchPage: (opts) => fetchPage(store, kind, opts),
                search: (query) => {
                    const parts = query.trim().split(/[\s,/]+/).filter(Boolean);
                    const vid = parseId(parts[0]);
                    const pid = parts.length === 2 ? parseId(parts[1]) : null;
                    if (parts.length !== 2 || vid === null || pid === null) {
                        throw new Error('Enter Vendor ID and Product ID together in the search box (decimal or 0x hex).');
                    }
                    return searchByVidPid(store, kind, vid, pid);
                },
                decorate: (m) => {
                    m.vidHex = hex(m.vid);
                    m.pidHex = hex(m.pid);
                },
                enrich: (rows) => enrichRows(store, rows),
                enrichAll: (rows) => enrichAllRows(store, rows),
                filterFields: ['certificationType', 'vidHex', 'pidHex', 'softwareVersion', 'softwareVersionString', 'cDCertificateId']
            });
        }
        return { tabs };
    },
    data() {
        return {
            selectedCertifiedModel: null,
            selectedRevokedModel: null,
            showCertifyModel: false,
            showRevokeModel: false,
            showProvisionalModel: false,
            showCertifyModelViewOnly: false
        };
    },

    components: {
        DataTable,
        Column,
        TabView,
        TabPanel,
        Button,
        Dialog,
        IconField,
        InputIcon,
        InputText,
        Tag,
        LazyTableHeader,
        CertifyModel,
        RevokeModel,
        ProvisionModel
    },

    computed: {
        isSignedIn() {
            return this.$store.getters['loggedIn']
        },
        isCertificationCenter() {
            const address = this.$store.state.selectedKeplrAccount?.address;
            if (!this.isSignedIn || !address) return false;
            const accounts = this.$store.getters['zigbeealliance.distributedcomplianceledger.dclauth/getAccountAll']()?.account || [];
            return !!accounts.find((a) => a.base_account.address === address)?.roles?.includes('CertificationCenter');
        }
    },

    created() {
        this.tabs.certified.loadPage();
    },

    methods: {
        onTabChange(event) {
            const table = this.tabs[KINDS[event.index]];
            if (table.rows.length === 0 && !table.loading) table.loadPage();
        },
        showCertifyModelDialog(model, viewOnly = false) {
            this.selectedRevokedModel = model;
            this.showCertifyModel = true;
            this.showCertifyModelViewOnly = viewOnly;
        },
        dismissCertifyModelDialog() {
            this.showCertifyModel = false;
            clearComplianceInfoCache();
            Object.values(this.tabs).forEach((table) => {
                table.reset();
                if (table.mode === 'all' || table.rows.length) table.refresh();
            });
        },
        showRevokeModelDialog(model) {
            this.selectedCertifiedModel = model;
            this.showRevokeModel = true;
        },
        dismissRevokeModelDialog() {
            this.showRevokeModel = false;
        },
        showProvisionalModelDialog(model) {
            this.selectedProvisionalModel = model;
            this.showProvisionalModel = true;
        },
        dismissProvisionalModelDialog() {
            this.showProvisionalModel = false;
        },
        hexValue(value) {
            if (value) return `${value} (0x${value.toString(16).toUpperCase()})`;
            else return value;
        },
    }
};
</script>

<template>
    <div class="prime-vue-container">
        <TabView @tab-change="onTabChange">
            <TabPanel>
                <template #header>
                    <i class="pi pi-verified text-green-500 mr-2"></i>
                    <span class="font-semibold">Certified Models</span>
                </template>
                <DataTable :value="tabs.certified.mode === 'all' ? tabs.certified.allRows : tabs.certified.rows" :lazy="tabs.certified.mode === 'paged'" :class="{ 'lazy-paged': tabs.certified.mode === 'paged' }" :loading="tabs.certified.loading" :totalRecords="tabs.certified.total" :first="tabs.certified.first" v-model:filters="tabs.certified.filters" :globalFilterFields="tabs.certified.filterFields" @page="tabs.certified.onPage($event)" @value-change="tabs.certified.onValueChange($event)" :auto-layout="true" :paginator="true" :rows="tabs.certified.perPage" :rowsPerPageOptions="[10, 20, 50, 100]" showGridlines stripedRows>
                    <template #header>
                        <LazyTableHeader :table="tabs.certified" searchPlaceholder="Search VID PID, or load all to search certificate ID" />
                    </template>

                    <Column field="certificationType" header="Certification Type" :sortable="true"></Column>
                    <Column field="vidHex" header="Vendor ID" :sortable="true"></Column>
                    <Column field="pidHex" header="Product ID" :sortable="true"></Column>
                    <Column field="softwareVersion" header="Software Version" :sortable="true"></Column>
                    <Column field="softwareVersionString" header="Software Version String" :sortable="true"></Column>
                    <Column field="cDCertificateId" header="CD Certificate ID" :sortable="true"></Column>
                    <Column header="Action" bodyStyle="text-align: center; overflow: visible">
                        <template #body="{ data }">
                            <span style="margin-right: 0.1rem">
                                <Button label="" @click="showCertifyModelDialog(data, true)" iconPos="left" icon="pi pi-info-circle" class="p-button-rounded p-button-primary p-button-text p-button-info" v-tooltip="'Show Compliance Info'" />
                            </span>
                            <span v-if="isCertificationCenter" style="margin-right: 0.1rem">
                                <Button
                                    label=""
                                    @click="showCertifyModelDialog(data)"
                                    iconPos="left"
                                    icon="pi pi-pencil"
                                    class="p-button-rounded p-button-secondary p-button-text"
                                    v-bind:class="{ 'p-disabled': !isSignedIn }"
                                    v-tooltip="'Update Compliance Info'"
                                />
                            </span>
                        </template>
                    </Column>
                </DataTable>
            </TabPanel>

            <TabPanel>
                <template #header>
                    <i class="pi pi-ban text-red-500 mr-2"></i>
                    <span class="font-semibold">Revoked Models</span>
                </template>
                <!-- Disabled per request from CSA
                <Button @click="showRevokeModelDialog" class="p-button-primary mb-4" v-bind:class="{ 'p-disabled': !isSignedIn }" label="Revoke Model" /> 
                -->

                <DataTable :value="tabs.revoked.mode === 'all' ? tabs.revoked.allRows : tabs.revoked.rows" :lazy="tabs.revoked.mode === 'paged'" :class="{ 'lazy-paged': tabs.revoked.mode === 'paged' }" :loading="tabs.revoked.loading" :totalRecords="tabs.revoked.total" :first="tabs.revoked.first" v-model:filters="tabs.revoked.filters" :globalFilterFields="tabs.revoked.filterFields" @page="tabs.revoked.onPage($event)" @value-change="tabs.revoked.onValueChange($event)" :auto-layout="true" :paginator="true" :rows="tabs.revoked.perPage" :rowsPerPageOptions="[10, 20, 50, 100]" showGridlines stripedRows>
                    <template #header>
                        <LazyTableHeader :table="tabs.revoked" searchPlaceholder="Search VID PID, or load all to search certificate ID" />
                    </template>
                    <Column field="certificationType" header="Certification Type" :sortable="true"></Column>
                    <Column field="vidHex" header="Vendor ID" :sortable="true"></Column>
                    <Column field="pidHex" header="Product ID" :sortable="true"></Column>
                    <Column field="softwareVersion" header="Software Version" :sortable="true"></Column>
                    <Column field="softwareVersionString" header="Software Version String" :sortable="true"></Column>
                    <Column field="cDCertificateId" header="CD Certificate ID" :sortable="true"></Column>
                    <Column headerStyle="width: 4rem; text-align: center" bodyStyle="text-align: center; overflow: visible">
                        <template #body="{ data }">
                            <Button label="Certify" class="p-button-primary" @click="showCertifyModelDialog(data)" iconPos="left" icon="pi pi-check" v-bind:class="{ 'p-disabled': !isSignedIn }" />
                        </template>
                    </Column>
                </DataTable>
            </TabPanel>
            <TabPanel>
                <template #header>
                    <i class="pi pi-clock text-orange-500 mr-2"></i>
                    <span class="font-semibold">Provisional Models</span>
                </template>
                
                <!-- Disabled per request from CSA
                <Button @click="showProvisionalModelDialog" class="p-button-primary mb-4" v-bind:class="{ 'p-disabled': !isSignedIn }" label="Provision Model" />
                 -->
                <DataTable :value="tabs.provisional.mode === 'all' ? tabs.provisional.allRows : tabs.provisional.rows" :lazy="tabs.provisional.mode === 'paged'" :class="{ 'lazy-paged': tabs.provisional.mode === 'paged' }" :loading="tabs.provisional.loading" :totalRecords="tabs.provisional.total" :first="tabs.provisional.first" v-model:filters="tabs.provisional.filters" :globalFilterFields="tabs.provisional.filterFields" @page="tabs.provisional.onPage($event)" @value-change="tabs.provisional.onValueChange($event)" :auto-layout="true" :paginator="true" :rows="tabs.provisional.perPage" :rowsPerPageOptions="[10, 20, 50, 100]" showGridlines stripedRows>
                    <template #header>
                        <LazyTableHeader :table="tabs.provisional" searchPlaceholder="Search VID PID, or load all to search certificate ID" />
                    </template>
                    <Column field="certificationType" header="Certification Type" :sortable="true"></Column>
                    <Column field="vidHex" header="Vendor ID" :sortable="true"></Column>
                    <Column field="pidHex" header="Product ID" :sortable="true"></Column>
                    <Column field="softwareVersion" header="Software Version" :sortable="true"></Column>
                    <Column field="softwareVersionString" header="Software Version String" :sortable="true"></Column>
                    <Column field="cDCertificateId" header="CD Certificate ID" :sortable="true"></Column>
                    <Column headerStyle="width: 4rem; text-align: center" bodyStyle="text-align: center; overflow: visible">
                        <template #body="{ data }">
                            <Button label="Certify" class="p-button-primary" @click="showCertifyModelDialog(data)" iconPos="left" icon="pi pi-check" v-bind:class="{ 'p-disabled': !isSignedIn }" />
                        </template>
                    </Column>
                </DataTable>
            </TabPanel>
        </TabView>

        <Dialog header="Device Model Certification" @update:visible="dismissCertifyModelDialog" :visible="showCertifyModel" :style="{ width: '50vw' }" class="p-fluid" :modal="true">
            <CertifyModel :model="selectedRevokedModel" :viewOnly="showCertifyModelViewOnly" @close-dialog="dismissCertifyModelDialog"></CertifyModel>
        </Dialog>

        <Dialog header="Revoke a Device Model" @update:visible="dismissRevokeModelDialog" :visible="showRevokeModel" :style="{ width: '50vw' }" class="p-fluid" :modal="true">
            <RevokeModel :certifiedModel="selectedCertifiedModel" @close-dialog="dismissRevokeModelDialog"></RevokeModel>
        </Dialog>

        <Dialog header="Provision a Device Model" @update:visible="dismissProvisionalModelDialog" :visible="showProvisionalModel" :style="{ width: '50vw' }" class="p-fluid" :modal="true">
            <ProvisionModel @close-dialog="dismissProvisionalModelDialog"></ProvisionModel>
        </Dialog>
    </div>
</template>
