<script>
import DataTable from 'primevue/datatable';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import Column from 'primevue/column';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import ValidatorInfo from './ValidatorInfo.vue';
import { FilterMatchMode } from 'primevue/api';
import GrantActionValidator from './GrantActionValidator.vue';

export default {
    name: 'Validators',

    data() {
        return {
            showValidatorInfo: false,
            showGrantActionValidator: false,
            selectedValidatorInfo: null,
            grantAction: null,
            consensusState: null,
            lastBlock: null,
            consensusValidatorInfos: [],
            viewOnly: false,
            filters: {
                global: { value: null, matchMode: FilterMatchMode.CONTAINS }
            }
        };
    },

    methods: {
        dismissValidatorInfoDialog() {
            this.showValidatorInfo = false;
        },
        showValidatorInfoDialog(validatorInfo, viewOnly) {
            this.showValidatorInfo = true;
            this.selectedValidatorInfo = validatorInfo;
            this.viewOnly = viewOnly;
        },
        showGrantActionValidatorDialog(validatorInfo, action) {
            this.showGrantActionValidator = true;
            this.selectedValidatorInfo = validatorInfo;
            this.grantAction = action;
        },
        dismissGrantActionValidatorDialog() {
            this.showGrantActionValidator = false;
        },
        jailedValidators(validators) {
            if (validators && validators.length > 0) {
                return validators.filter((validator) => validator.jailed);
            }
            return [];
        },
        nonJailedValidators(validators) {
            if (validators && validators.length > 0) {
                return validators.filter((validator) => !validator.jailed);
            }
            return [];
        }
    },
    components: {
        DataTable,
        Column,
        Button,
        Dialog,
        ValidatorInfo,
        TabView,
        TabPanel,
        GrantActionValidator
    },

    computed: {
        allValidators() {
            const ValidatorInfoArray = this.$store.getters['zigbeealliance.distributedcomplianceledger.validator/getValidatorAll']();
            let validatorArray = ValidatorInfoArray?.validator;
            if (this.consensusValidatorInfos && this.consensusValidatorInfos.length > 0 && validatorArray?.length > 0) {
                // Get address for each validator and add it to the validator
                for (let i = 0; i < validatorArray?.length; i++) {
                    let validator = validatorArray[i];
                    let address = this.consensusValidatorInfos.find((validatorInfo) => validatorInfo.pub_key.value === validator.pubKey.key);
                    if (address) {
                        validator.address = address.address;
                    } else {
                        validator.address = validator.jailed ? 'N/A' : '';
                    }
                }
            }

            // if we have lastBlock, add it to the validator
            if (this.lastBlock) {
                for (let i = 0; i < validatorArray?.length; i++) {
                    let validator = validatorArray[i];
                    let signature = this.lastBlock.result.block.last_commit.signatures.find((signature) => signature.validator_address === validator.address);
                    if (signature) validator.active = true;
                    else validator.active = false;
                }
            }
            return validatorArray;
        },

        allProposedDisableValidators() {
            const ProposeDisableValidatorArray = this.$store.getters['zigbeealliance.distributedcomplianceledger.validator/getProposedDisableValidatorAll']();
            return ProposeDisableValidatorArray?.proposedDisableValidator;
        },

        isSignedIn() {
            return this.$store.getters['loggedIn'];
        },
        validatorDialogHeader() {
            return this.viewOnly ? 'Validator Info' : 'Add a new Validator';
        },
        grantActionHeader() {
            switch (this.grantAction) {
                case 'ApproveDisableValidator':
                    return 'Approve Disable Validator';
                case 'ProposeDisableValidator':
                    return 'Propose Disable Validator';
                case 'RejectDisableValidator':
                    return 'Reject Disable Validator';
                default:
                    return 'Grant Action Failed';
            }
        }
    },

    created: function () {
        // Get the consensus state to get the status for each validator
        fetch(import.meta.env.VITE_APP_DCL_RPC_NODE + '/dump_consensus_state')
            .then((response) => response.json())
            .then((data) => {
                this.consensusState = data;
                this.consensusValidatorInfos = data.result.round_state.validators.validators;
            });
        fetch(import.meta.env.VITE_APP_DCL_RPC_NODE + '/block')
            .then((response) => response.json())
            .then((data) => {
                this.lastBlock = data;
            });

        // Get all the accounts
        this.$store.dispatch('zigbeealliance.distributedcomplianceledger.validator/QueryValidatorAll', {
            options: {
                subscribe: true,
                all: true
            }
        });

        this.$store.dispatch('zigbeealliance.distributedcomplianceledger.validator/QueryProposedDisableValidatorAll', {
            options: {
                subscribe: true,
                all: true
            }
        });
    }
};
</script>

<template>
    <div class="prime-vue-container ml-5">
        <TabView>
            <TabPanel header="Current Validators">
                <!-- <div class="mb-5 ml-2">
					<Button
						@click="showValidatorInfoDialog"
						v-bind:class="{ 'p-disabled': !isSignedIn }"
						label="Add Validator"
						>Add Validator</Button
					>
				</div> -->
                <DataTable :value="nonJailedValidators(allValidators)" :auto-layout="true" :paginator="true" :rows="20" v-model:filters="filters" filterDisplay="row" showGridlines stripedRows>
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

                    <Column field="description.moniker" header="Moniker" :sortable="true">
                        <template #body="{ data }">
                            <Button :label="data.description.moniker" text @click.prevent="showValidatorInfoDialog(data, true)" />
                        </template>
                    </Column>
                    <Column field="owner" header="Owner"></Column>
                    <Column field="address" header="Address"></Column>
                    <Column header="Consensus Participation">
                        <template #body="{ data }">
                            <Badge :value="data.active ? 'Active' : 'Inactive'" :severity="data.active ? 'success' : 'danger'" class="ml-2"></Badge>
                        </template>
                    </Column>

                    <Column field="ValidatorID" header="Action" headerStyle="text-align: center" bodyStyle="text-align: center; overflow: visible">
                        <template #body="{ data }">
                            <span style="margin-right: 1rem">
                                <Button label="Disable" @click="showGrantActionValidatorDialog(data, 'ProposeDisableValidator')" iconPos="left" icon="pi pi-ban" class="p-button-danger" v-bind:class="{ 'p-disabled': !isSignedIn }" />
                            </span>
                        </template>
                    </Column>
                </DataTable>
            </TabPanel>
            <TabPanel header="Jailed Validators">
                <DataTable :value="jailedValidators(allValidators)" :auto-layout="true" :paginator="true" :rows="10" :rowsPerPageOptions="[10, 20, 50, 100]" v-model:filters="filters" filterDisplay="row" showGridlines stripedRows>
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

                    <Column field="description.moniker" header="Moniker" :sortable="true"></Column>
                    <Column field="owner" header="Owner"></Column>
                    <Column field="address" header="Address"></Column>
                    <Column field="jailed" header="Jailed"></Column>
                    <Column field="ValidatorID" header="Action" headerStyle="text-align: center" bodyStyle="text-align: center; overflow: visible">
                        <template #body="{ data }">
                            <span style="margin-right: 1rem">
                                <Button label="" @click="showValidatorInfoDialog(data, true)" class="p-button-rounded p-button-primary p-button-text" iconPos="left" icon="pi pi-info-circle" v-tooltip="'Show Validator info'" />
                            </span>
                        </template>
                    </Column>
                </DataTable>
            </TabPanel>
            <TabPanel header="Proposed Disable Validators">
                <DataTable :value="allProposedDisableValidators" :auto-layout="true" :paginator="true" :rows="10" :rowsPerPageOptions="[10, 20, 50, 100]" v-model:filters="filters" filterDisplay="row" showGridlines stripedRows>
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
                                    Address : {{ approval.address }} <br />
                                    Time : {{ new Date(approval.time * 1000).toString() }} <br />
                                    Info : {{ approval.info }}
                                </li>
                            </ol>
                        </template>
                    </Column>
                    <Column field="action" header="Action">
                        <template #body="{ data }">
                            <Button label="Disable" @click="showGrantActionValidatorDialog(data, 'ApproveDisableValidator')" iconPos="left" icon="pi pi-ban" class="p-button-danger" v-bind:class="{ 'p-disabled': !isSignedIn }" />
                        </template>
                    </Column>
                </DataTable>
            </TabPanel>
        </TabView>
        <Dialog :visible="showValidatorInfo" @update:visible="dismissValidatorInfoDialog" :style="{ width: '40vw' }" :header="validatorDialogHeader" :modal="true">
            <ValidatorInfo :viewOnly="viewOnly" :ValidatorInfo="selectedValidatorInfo" @close-dialog="dismissValidatorInfoDialog"></ValidatorInfo>
        </Dialog>

        <Dialog :header="grantActionHeader" @update:visible="dismissGrantActionValidatorDialog" :visible="showGrantActionValidator" :style="{ width: '50vw' }" :modal="true">
            <GrantActionValidator :validator="selectedValidatorInfo" :action="grantAction" @close-dialog="dismissGrantActionValidatorDialog"></GrantActionValidator>
        </Dialog>
    </div>
</template>
