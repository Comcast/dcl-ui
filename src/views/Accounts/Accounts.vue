<script>
import { onMounted } from 'vue';
import { ref } from 'vue';
import { nextTick } from 'vue';

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import Tooltip from 'primevue/tooltip';
import Card from 'primevue/card';
import Timeline from 'primevue/timeline';
import Tag from 'primevue/tag';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import InputText from 'primevue/inputtext';
import { email, required } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
import { FilterMatchMode } from 'primevue/api';

import ProposeNewAccount from './ProposeNewAccount.vue';
import GrantActionAccount from './GrantActionAccount.vue';
import ApprovalDisplay from './ApprovalDisplay.vue';

export default {
    name: 'Accounts',

    data() {
        return {
            showProposeNewAccount: false,
            showGrantActionAccount: false,
            selectedAccount: null,
            grantAction: null,
            dialogKey: 0, // This is to force the dialog to re-render
            filters: {
                global: { value: null, matchMode: FilterMatchMode.CONTAINS }
            },
            activeTabIndex: 0
        };
    },

    methods: {
        showProposeNewAccountDialog() {
            this.dialogKey++;
            nextTick(() => {
                this.showProposeNewAccount = true;
            });
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
            navigator.clipboard.writeText(value);
        },

        addHexValueToVendorID(vendorID) {
            if (vendorID) return `${vendorID} (0x${vendorID.toString(16)})`;
            else return 'Not Set';
        },
        formatDate(timestamp) {
            const date = new Date(timestamp * 1000);
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
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
        Card,
        Timeline,
        Tag,
        IconField,
        InputIcon,
        InputText,
        ProposeNewAccount,
        GrantActionAccount,
        ApprovalDisplay
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
            const loggedIn = this.$store.getters['loggedIn'];
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
        // Get the revoked accounts
        this.$store.dispatch('zigbeealliance.distributedcomplianceledger.dclauth/QueryPendingAccountRevocationAll', {
            options: {
                subscribe: true,
                all: true
            }
        });

        // Check if tab query parameter is present
        if (this.$route.query.tab) {
            this.activeTabIndex = parseInt(this.$route.query.tab);
        }
    },

    watch: {
        '$route.query.tab': function(newTab) {
            if (newTab !== undefined) {
                this.activeTabIndex = parseInt(newTab);
            }
        }
    }
};
</script>

<template>
    <div class="prime-vue-container">
        <Card class="shadow-2 border-round-lg">
            <template #content>
                <TabView v-model:activeIndex="activeTabIndex">
                    <TabPanel>
                        <template #header>
                            <i class="pi pi-check-circle text-green-500 mr-2"></i>
                            <span class="font-semibold">Active Accounts</span>
                        </template>
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
                    
                    <template #empty>
                        <div class="text-center py-6">
                            <i class="pi pi-users text-4xl text-gray-400 mb-3 block"></i>
                            <h3 class="text-xl text-gray-600 mb-2">No Active Accounts</h3>
                            <p class="text-gray-500 mb-4">There are currently no active accounts in the system.</p>
                            <Button 
                                @click="showProposeNewAccountDialog" 
                                icon="pi pi-plus" 
                                label="Propose New Account"
                                class="p-button-outlined"
                                v-bind:class="{ 'p-disabled': !isSignedIn }"
                            />
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
                    <Column field="base_account.address" header="Address">
                        <template #body="{ data }">
                            <div class="flex align-items-center">
                                <span class="font-mono">{{ trimAddress(data.base_account.address) }}</span>
                                <button
                                    @click="copyToClipboard(data.base_account.address)"
                                    class="ml-2 p-button p-component p-button-icon-only p-button-text p-button-xs"
                                    type="button"
                                    v-tooltip.top="'Copy address'"
                                >
                                    <span class="p-button-icon pi pi-copy"></span>
                                </button>
                            </div>
                        </template>
                    </Column>
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
                            <ApprovalDisplay
                                :approvals="row.data.approvals || []"
                            />
                        </template>
                    </Column>
                    <Column field="account" headerStyle="width: 4rem; text-align: center" bodyStyle="text-align: center; overflow: visible">
                        <template #body="{ data }">
                            <Button label="Revoke" @click="showGrantActionAccountDialog(data, 'ProposeRevokeAccount')" iconPos="left" icon="pi pi-ban" class="p-button-danger" v-bind:class="{ 'p-disabled': !isSignedIn }" />
                        </template>
                    </Column>
                </DataTable>
            </TabPanel>

            <TabPanel>
                <template #header>
                    <i class="pi pi-clock text-orange-500 mr-2"></i>
                    <span class="font-semibold">Proposed Accounts</span>
                </template>
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
                    
                    <template #empty>
                        <div class="text-center py-6">
                            <i class="pi pi-clock text-4xl text-orange-400 mb-3 block"></i>
                            <h3 class="text-xl text-gray-600 mb-2">No Proposed Accounts</h3>
                            <p class="text-gray-500 mb-4">There are currently no account proposals pending approval.</p>
                            <Button 
                                @click="showProposeNewAccountDialog" 
                                icon="pi pi-plus" 
                                label="Propose New Account"
                                class="p-button-outlined"
                                v-bind:class="{ 'p-disabled': !isSignedIn }"
                            />
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
                    <Column field="account.base_account.address" header="Address">
                        <template #body="{ data }">
                            <div class="flex align-items-center">
                                <span class="font-mono">{{ trimAddress(data.account.base_account.address) }}</span>
                                <button
                                    @click="copyToClipboard(data.account.base_account.address)"
                                    class="ml-2 p-button p-component p-button-icon-only p-button-text p-button-xs"
                                    type="button"
                                    v-tooltip.top="'Copy address'"
                                >
                                    <span class="p-button-icon pi pi-copy"></span>
                                </button>
                            </div>
                        </template>
                    </Column>
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
                            <ApprovalDisplay
                                :approvals="row.data.account.approvals || []"
                                :rejects="row.data.account.rejects || []"
                            />
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
            <TabPanel>
                <template #header>
                    <i class="pi pi-ban text-red-500 mr-2"></i>
                    <span class="font-semibold">Pending Revocations</span>
                </template>                
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
                    
                    <template #empty>
                        <div class="text-center py-6">
                            <i class="pi pi-check-circle text-4xl text-green-400 mb-3 block"></i>
                            <h3 class="text-xl text-gray-600 mb-2">No Pending Revocations</h3>
                            <p class="text-gray-500">There are currently no account revocations pending approval.</p>
                        </div>
                    </template>

                    <Column field="address" header="Address">
                        <template #body="{ data }">
                            <div class="flex align-items-center">
                                <span class="font-mono">{{ trimAddress(data.address) }}</span>
                                <button
                                    @click="copyToClipboard(data.address)"
                                    class="ml-2 p-button p-component p-button-icon-only p-button-text p-button-xs"
                                    type="button"
                                    v-tooltip.top="'Copy address'"
                                >
                                    <span class="p-button-icon pi pi-copy"></span>
                                </button>
                            </div>
                        </template>
                    </Column>
                    <Column field="approvals" header="Approvals">
                        <template #body="row">
                            <ApprovalDisplay
                                :approvals="row.data.approvals || []"
                            />
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
            </template>
        </Card>

        <Dialog 
            :header="grantActionHeader" 
            @update:visible="dismissGrantActionAccountDialog" 
            v-model:visible="showGrantActionAccount" 
            :style="{ width: '50vw' }" 
            :modal="true"
        >
            <GrantActionAccount 
                :account="selectedAccount" 
                :action="grantAction" 
                @close-dialog="dismissGrantActionAccountDialog">
            </GrantActionAccount>
        </Dialog>

        <Dialog 
            header="Propose a new account" 
            v-model:visible="showProposeNewAccount"
            :style="{ width: '50vw' }" 
            :modal="true"
            :closable="true"
            :closeOnEscape="true"
            @hide="dismissProposeNewAccountDialog"
        >
            <ProposeNewAccount 
                v-if="showProposeNewAccount"
                :key="dialogKey"
                @close-dialog="dismissProposeNewAccountDialog"
            />
        </Dialog>
    </div>
</template>

<style scoped>
/* Fix for tab header alignment and underline */
.p-tabview .p-tabview-nav li .p-tabview-nav-link {
    white-space: nowrap;
    display: inline-block;
}

.p-tabview .p-tabview-nav li .p-tabview-nav-link > * {
    vertical-align: middle;
}

/* Utility classes */
.flex {
    display: flex;
}

.align-items-center {
    align-items: center;
}

.font-mono {
    font-family: monospace;
}

.ml-2 {
    margin-left: 0.5rem;
}

/* Button styles */
.p-button-xs {
    padding: 0 !important;
    width: 1.25rem;
    height: 1.25rem;
}

.p-button-xs .p-button-icon {
    font-size: 0.75rem;
}

/* Empty state styling */
.text-center {
    text-align: center;
}

.py-6 {
    padding-top: 3rem;
    padding-bottom: 3rem;
}

.text-4xl {
    font-size: 2.25rem;
}

.text-xl {
    font-size: 1.25rem;
}

.text-gray-400 {
    color: #9ca3af;
}

.text-gray-500 {
    color: #6b7280;
}

.text-gray-600 {
    color: #4b5563;
}

.text-orange-400 {
    color: #fb923c;
}

.text-green-400 {
    color: #4ade80;
}

.mb-2 {
    margin-bottom: 0.5rem;
}

.mb-3 {
    margin-bottom: 0.75rem;
}

.mb-4 {
    margin-bottom: 1rem;
}

.block {
    display: block;
}
</style>
