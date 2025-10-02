<script>
import { onMounted } from 'vue';
import { ref } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import InputText from 'primevue/inputtext';
import { email, required } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
import { FilterMatchMode } from 'primevue/api';
import GrantActionUpgrade from './GrantActionUpgrade.vue';
import ProposeUpgrade from './ProposeUpgrade.vue';

export default {
    name: 'Upgrades',

    data() {
        return {
            showProposeUpgrade: false,
            showGrantActionUpgrade: false,
            selectedAccount: null,
            grantAction: null,
            filters: {
                global: { value: null, matchMode: FilterMatchMode.CONTAINS }
            }
        };
    },

    methods: {
        showProposeUpgradeDialog() {
            this.showProposeUpgrade = true;
        },
        dismissProposeUpgradeDialog() {
            this.showProposeUpgrade = false;
        },
        showGrantActionUpgradeDialog(upgradePlanName, action) {
            this.showGrantActionUpgrade = true;
            this.upgradePlanName = upgradePlanName;
            this.grantAction = action;
        },
        dismissGrantActionUpgradeDialog() {
            this.showGrantActionUpgrade = false;
        },
        trimAddress(address) {
            // Return first 6 and last 4 characters
            if (address && address.length > 16) {
                return address.substring(0, 10) + '...' + address.substring(address.length - 4);
            } else {
                return address;
            }
        },
        copyToClipboard(value) {
            const el = document.createElement('textarea');
            el.value = value;
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);
        }
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
        GrantActionUpgrade,
        ProposeUpgrade
    },

    computed: {
        allProposedUpgrades() {
            const proposedUpgradeArray = this.$store.getters['zigbeealliance.distributedcomplianceledger.dclupgrade/getProposedUpgradeAll']();
            return proposedUpgradeArray?.proposedUpgrade;
        },

        allRejectedUpgrades() {
            const rejectedUpgradeArray = this.$store.getters['zigbeealliance.distributedcomplianceledger.dclupgrade/getRejectedUpgradeAll']();
            return rejectedUpgradeArray?.rejectedUpgrade;
        },

        allApprovedUpgrades() {
            const approvedUpgradesArray = this.$store.getters['zigbeealliance.distributedcomplianceledger.dclupgrade/getApprovedUpgradeAll']();
            return approvedUpgradesArray?.approvedUpgrade;
        },

        isSignedIn() {
            return this.$store.getters['loggedIn'];
        },

        grantActionHeader() {
            switch (this.grantAction) {
                case 'ApproveUpgrade':
                    return 'Approve Upgrade';
                case 'RejectUpgrade':
                    return 'Reject Upgrade';
                default:
                    return 'Grant Action Failed';
            }
        }
    },

    created: function () {
    }
};
</script>

<template>
    <div class="prime-vue-container">
        <TabView>
            <TabPanel>
                <template #header>
                    <i class="pi pi-check-circle text-green-500 mr-2"></i>
                    <span class="font-semibold">Approved Upgrades</span>
                </template>
                <Button @click="showProposeUpgradeDialog" icon="pi pi-check" v-bind:class="{ 'p-disabled': !isSignedIn }" label="Propose-Upgrade">Propose Upgrade</Button>

                <div class="mb-4"></div>
                <DataTable :value="allApprovedUpgrades" :auto-layout="true" :paginator="true" :rows="10" :rowsPerPageOptions="[10, 20, 50, 100]" v-model:filters="filters" filterDisplay="row" showGridlines stripedRows>
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

                    <Column field="creator" header="Creator Address"></Column>
                    <Column field="plan" header="Plan">
                        <template #body="{ data }">
                            Name : {{ data.plan.name }} <br />
                            <!-- Time : {{ data.plan.time}}	<br /> -->
                            Height : {{ data.plan.height }} <br />
                            <!-- checksum: <pre id="json">{{JSON.parse(data.plan.info)}}</pre> 	<br /> -->
                        </template>
                    </Column>
                    <Column field="approvals" header="Approvals">
                        <template #body="row">
                            <ol>
                                <li class="mb-2" v-for="(approval, index) in row.data.approvals" :key="index">
                                    Address : {{ trimAddress(approval.address) }} <br />
                                    Time : {{ new Date(approval.time * 1000).toString() }} <br />
                                    Info : {{ approval.info }}
                                </li>
                            </ol>
                        </template>
                    </Column>
                    <Column field="rejects" header="Rejects">
                        <template #body="row">
                            <ol>
                                <li class="mb-2" v-for="(rejects, index) in row.data.rejects" :key="index">
                                    Address : {{ trimAddress(rejects.address) }} <br />
                                    Time : {{ new Date(rejects.time * 1000).toString() }} <br />
                                    Info : {{ rejects.info }}
                                </li>
                            </ol>
                        </template>
                    </Column>
                </DataTable>
            </TabPanel>

            <TabPanel>
                <template #header>
                    <i class="pi pi-clock text-orange-500 mr-2"></i>
                    <span class="font-semibold">Proposed Upgrades</span>
                </template>
                <DataTable :value="allProposedUpgrades" :auto-layout="true" :paginator="true" :rows="10" :rowsPerPageOptions="[10, 20, 50, 100]" v-model:filters="filters" filterDisplay="row" showGridlines stripedRows>
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

                    <Column field="creator" header="Creator Address"></Column>
                    <Column field="plan" header="Plan">
                        <template #body="{ data }">
                            Name : {{ data.plan.name }} <br />
                            <!-- Time : {{ data.plan.time}}	<br /> -->
                            Height : {{ data.plan.height }} <br />
                            <!-- checksum: <pre id="json">{{JSON.parse(data.plan.info)}}</pre> 	<br /> -->
                        </template>
                    </Column>
                    <Column field="approvals" header="Approvals">
                        <template #body="row">
                            <ol>
                                <li class="mb-2" v-for="(approval, index) in row.data.approvals" :key="index">
                                    Address : {{ trimAddress(approval.address) }} <br />
                                    Time : {{ new Date(approval.time * 1000).toString() }} <br />
                                    Info : {{ approval.info }}
                                </li>
                            </ol>
                        </template>
                    </Column>
                    <Column field="rejects" header="Rejects">
                        <template #body="row">
                            <ol>
                                <li class="mb-2" v-for="(rejects, index) in row.data.rejects" :key="index">
                                    Address : {{ trimAddress(rejects.address) }} <br />
                                    Time : {{ new Date(rejects.time * 1000).toString() }} <br />
                                    Info : {{ rejects.info }}
                                </li>
                            </ol>
                        </template>
                    </Column>
                    <Column field="account" headerStyle="width: 4rem; text-align: left" bodyStyle="text-align: left; overflow: visible">
                        <template #body="{ data }">
                            <Button label="Approve" @click="showGrantActionUpgradeDialog(data.plan.name, 'ApproveUpgrade')" iconPos="left" icon="pi pi-check" v-bind:class="{ 'p-disabled': !isSignedIn }" />
                            <Button label="Reject" @click="showGrantActionUpgradeDialog(data.plan.name, 'RejectUpgrade')" iconPos="left" icon="pi pi-ban" class="mt-3 p-button-danger" v-bind:class="{ 'p-disabled': !isSignedIn }" />
                        </template>
                    </Column>
                </DataTable>
            </TabPanel>
            <TabPanel>
                <template #header>
                    <i class="pi pi-times-circle text-red-500 mr-2"></i>
                    <span class="font-semibold">Rejected Upgrades</span>
                </template>
                <DataTable :value="allRejectedUpgrades" :auto-layout="true" :paginator="true" :rows="10" :rowsPerPageOptions="[10, 20, 50, 100]" v-model:filters="filters" filterDisplay="row" showGridlines stripedRows>
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

                    <Column field="creator" header="Creator Address"></Column>
                    <Column field="plan" header="Plan">
                        <template #body="{ data }">
                            Name : {{ data.plan.name }} <br />
                            <!-- Time : {{ data.plan.time}}	<br /> -->
                            Height : {{ data.plan.height }} <br />
                            <!-- checksum: <pre id="json">{{JSON.parse(data.plan.info)}}</pre> 	<br /> -->
                        </template>
                    </Column>
                    <Column field="approvals" header="Approvals">
                        <template #body="row">
                            <ol>
                                <li class="mb-2" v-for="(approval, index) in row.data.approvals" :key="index">
                                    Address : {{ trimAddress(approval.address) }} <br />
                                    Time : {{ new Date(approval.time * 1000).toString() }} <br />
                                    Info : {{ approval.info }}
                                </li>
                            </ol>
                        </template>
                    </Column>
                    <Column field="rejects" header="Rejects">
                        <template #body="row">
                            <ol>
                                <li class="mb-2" v-for="(rejects, index) in row.data.rejects" :key="index">
                                    Address : {{ trimAddress(rejects.address) }} <br />
                                    Time : {{ new Date(rejects.time * 1000).toString() }} <br />
                                    Info : {{ rejects.info }}
                                </li>
                            </ol>
                        </template>
                    </Column>
                </DataTable>
            </TabPanel>
        </TabView>

        <Dialog :header="grantActionHeader" @update:visible="dismissGrantActionUpgradeDialog" :visible="showGrantActionUpgrade" :style="{ width: '50vw' }" :modal="true">
            <GrantActionUpgrade :upgradePlanName="upgradePlanName" :action="grantAction" @close-dialog="dismissGrantActionUpgradeDialog"></GrantActionUpgrade>
        </Dialog>

        <Dialog header="Propose Upgrade" @update:visible="dismissProposeUpgradeDialog" :visible="showProposeUpgrade" :style="{ width: '50vw' }" class="p-fluid" :modal="true">
            <ProposeUpgrade @close-dialog="dismissProposeUpgradeDialog"></ProposeUpgrade>
        </Dialog>
    </div>
</template>


