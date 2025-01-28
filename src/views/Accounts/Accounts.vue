<script>
import { onMounted } from 'vue';
import { ref } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import Tooltip from 'primevue/tooltip';
import { email, required } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
import { FilterMatchMode } from 'primevue/api';

import ProposeNewAccount from './ProposeNewAccount.vue';
import GrantActionAccount from './GrantActionAccount.vue';

export default {
    name: 'Accounts',

    data() {
        return {
            showProposeNewAccount: false,
            showGrantActionAccount: false,
            selectedAccount: null,
            grantAction: null,
            filters: {
                global: { value: null, matchMode: FilterMatchMode.CONTAINS }
            }
        };
    },

    methods: {
        showProposeNewAccountDialog() {
            this.showProposeNewAccount = true;
        },
        dismissProposeNewAccountDialog() {
            this.showProposeNewAccount = false;
        },
        showGrantActionAccountDialog(account, action) {
            this.showGrantActionAccount = true;
            this.selectedAccount = account;
            this.grantAction = action;
        },
        dismissGrantActionAccountDialog() {
            this.showGrantActionAccount = false;
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
        },

        addHexValueToVendorID(vendorID) {
            if (vendorID) return `${vendorID} (0x${vendorID.toString(16)})`;
            else return 'Not Set';
        }
    },
    components: {
        DataTable,
        Column,
        TabView,
        TabPanel,
        Button,
        Dialog,
        Tooltip,
        ProposeNewAccount,
        GrantActionAccount
    },

    computed: {
        allProposedAccounts() {
            const pendingAccountsArray = this.$store.getters['zigbeealliance.distributedcomplianceledger.dclauth/getPendingAccountAll']();
            // Add the hex value to the vendor ID to the accounts
            pendingAccountsArray?.pendingAccount?.forEach((pendingAccount) => {
                pendingAccount.account.vendorIDHex = this.addHexValueToVendorID(pendingAccount.account.vendorID);
            });
            return pendingAccountsArray?.pendingAccount;
        },

        allActiveRevocations() {
            const pendingAccountRevocationArray = this.$store.getters['zigbeealliance.distributedcomplianceledger.dclauth/getPendingAccountRevocationAll']();
            return pendingAccountRevocationArray?.pendingAccountRevocation;
        },

        allActiveAccounts() {
            const allAccountsArray = this.$store.getters['zigbeealliance.distributedcomplianceledger.dclauth/getAccountAll']();
            // Add the hex value to the vendor ID to the accounts
            allAccountsArray?.account?.forEach((account) => {
                account.vendorIDHex = this.addHexValueToVendorID(account.vendorID);
            });
            return allAccountsArray?.account;
        },

        isSignedIn() {
            const loggedIn = this.$store.getters['loggedIn'] || this.$store.getters['common/wallet/loggedIn'];
            return loggedIn;
        },

        grantActionHeader() {
            switch (this.grantAction) {
                case 'ApproveAddAccount':
                    return 'Approve Add Account';
                case 'RejectAddAccount':
                    return 'Reject Add Account';
                case 'ProposeRevokeAccount':
                    return 'Propose Revoke Account';
                case 'ApproveRevokeAccount':
                    return 'Approve Revoke Account';
                default:
                    return 'Grant Action Failed';
            }
        }
    },

    created: function () {
        // Get the accounts
        this.$store.dispatch('zigbeealliance.distributedcomplianceledger.dclauth/QueryAccountAll', {
            options: {
                subscribe: true,
                all: true
            }
        });
        // Get the pending accounts
        this.$store.dispatch('zigbeealliance.distributedcomplianceledger.dclauth/QueryPendingAccountAll', {
            options: {
                subscribe: true,
                all: true
            }
        });
        // Get the revoked accounts
        this.$store.dispatch('zigbeealliance.distributedcomplianceledger.dclauth/QueryPendingAccountRevocationAll', {
            options: {
                subscribe: true,
                all: true
            }
        });
    }
};
</script>

<template>
    <div class="prime-vue-container">
        <TabView>
            <TabPanel header="Active Accounts">
                <Button @click="showProposeNewAccountDialog" icon="pi pi-check" v-bind:class="{ 'p-disabled': !isSignedIn }" label="Propose-Account">Propose Account</Button>
                <div class="mb-4"></div>
                <DataTable :value="allActiveAccounts" :auto-layout="true" :paginator="true" :rows="10" :rowsPerPageOptions="[5, 10, 20, 50]" v-model:filters="filters" filterDisplay="row" showGridlines stripedRows>
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

                    <Column field="base_account.account_number" header="Account Number" :sortable="true">
                        <template #body="{ data }">
                            <button @click="copyToClipboard(JSON.stringify(data.base_account.pub_key))" class="ml-1 p-button p-component p-button-icon-only p-button-rounded p-button-text" type="button">
                                <span class="mt-3 pi pi-copy p-button-copy" v-tooltip.bottom="'copy public key'"></span>
                            </button>
                            {{ data.base_account.account_number }}
                        </template>
                    </Column>
                    <Column field="roles" header="Roles" :sortable="true">
                        <template #body="row">
                            <ul>
                                <li v-for="(role, index) in row.data.roles" :key="index">
                                    {{ role }}
                                </li>
                            </ul>
                        </template>
                    </Column>
                    <Column field="base_account.address" header="Address"></Column>
                    <!-- <Column field="base_account" header="Public Key">
					<template #body="{ data }">
						<span> {{ trimAddress(data.base_account.pub_key.key) }}
						<button @click="copyToClipboard(data.base_account.pub_key.key)" class="ml-1 p-button p-component p-button-icon-only p-button-rounded p-button-text" type="button">
						<span class="mt-3  pi pi-copy p-button-copy"></span></button> </span>
          </template>
					</Column> -->
                    <Column field="vendorIDHex" header="Vendor ID" :sortable="true"></Column>
                    <Column field="productIDs" header="Product IDs">
                        <template #body="{ data }">
                            <span style="white-space: pre-line">
                                {{ data.productIDs?.map(range => `${range.min}-${range.max}`).join('\n') }}
                            </span>
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
                    <Column field="account" headerStyle="width: 4rem; text-align: center" bodyStyle="text-align: center; overflow: visible">
                        <template #body="{ data }">
                            <Button label="Revoke" @click="showGrantActionAccountDialog(data, 'ProposeRevokeAccount')" iconPos="left" icon="pi pi-ban" class="p-button-danger" v-bind:class="{ 'p-disabled': !isSignedIn }" />
                        </template>
                    </Column>
                </DataTable>
            </TabPanel>

            <TabPanel header="Proposed Accounts">
                <DataTable :value="allProposedAccounts" :auto-layout="true" :paginator="true" :rows="10" :rowsPerPageOptions="[5, 10, 20, 50]" v-model:filters="filters" filterDisplay="row" showGridlines stripedRows>
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

                    <Column field="account.roles" header="Roles">
                        <template #body="row">
                            <ul>
                                <li v-for="(role, index) in row.data.account.roles" :key="index">
                                    {{ role }}
                                </li>
                            </ul>
                        </template>
                    </Column>
                    <Column field="account.base_account.address" header="Address"></Column>
                    <Column field="account.vendorIDHex" header="Vendor ID"></Column>
                    <Column field="productIDs" header="Product IDs">
                        <template #body="{ data }">
                            <span style="white-space: pre-line">
                                {{ data.account.productIDs?.map(range => `${range.min}-${range.max}`).join('\n') }}
                            </span>
                        </template>
                    </Column>                    
                    <Column field="account.approvals" header="Approvals">
                        <template #body="row">
                            <ol>
                                <li class="mb-2" v-for="(approval, index) in row.data.account.approvals" :key="index">
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
                                <li class="mb-2" v-for="(reject, index) in row.data.account.rejects" :key="index">
                                    Address : {{ trimAddress(reject.address) }} <br />
                                    Time : {{ new Date(reject.time * 1000).toString() }} <br />
                                    Info : {{ reject.info }}
                                </li>
                            </ol>
                        </template>
                    </Column>
                    <Column field="account" headerStyle="width: 4rem; text-align: left" bodyStyle="text-align: left; overflow: visible">
                        <template #body="{ data }">
                            <Button label="Approve" @click="showGrantActionAccountDialog(data.account, 'ApproveAddAccount')" iconPos="left" icon="pi pi-check" v-bind:class="{ 'p-disabled': !isSignedIn }" />
                            <Button label="Reject" @click="showGrantActionAccountDialog(data.account, 'RejectAddAccount')" iconPos="left" icon="pi pi-ban" class="mt-3 p-button-danger" v-bind:class="{ 'p-disabled': !isSignedIn }" />
                        </template>
                    </Column>
                </DataTable>
            </TabPanel>
            <TabPanel header="Active Accounts - Pending Revocation">
                <DataTable :value="allActiveRevocations" :auto-layout="true" :paginator="true" :rows="10" :rowsPerPageOptions="[5, 10, 20, 50]" v-model:filters="filters" filterDisplay="row" showGridlines stripedRows>
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

                    <Column field="address" header="Address"></Column>
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
                    <Column field="account" headerStyle="width: 4rem; text-align: center" bodyStyle="text-align: center; overflow: visible">
                        <template #body="{ data }">
                            <Button label="Revoke" @click="showGrantActionAccountDialog(data, 'ApproveRevokeAccount')" iconPos="left" icon="pi pi-ban" class="p-button-danger" v-bind:class="{ 'p-disabled': !isSignedIn }" />
                        </template>
                    </Column>
                </DataTable>
            </TabPanel>
        </TabView>

        <Dialog :header="grantActionHeader" @update:visible="dismissGrantActionAccountDialog" :visible="showGrantActionAccount" :style="{ width: '50vw' }" :modal="true">
            <GrantActionAccount :account="selectedAccount" :action="grantAction" @close-dialog="dismissGrantActionAccountDialog"></GrantActionAccount>
        </Dialog>

        <Dialog header="Propose a new account" @update:visible="dismissProposeNewAccountDialog" :visible="showProposeNewAccount" :style="{ width: '50vw' }" class="p-fluid" :modal="true">
            <ProposeNewAccount @close-dialog="dismissProposeNewAccountDialog"></ProposeNewAccount>
        </Dialog>
    </div>
</template>


