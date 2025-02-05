<script>
import { ref, onMounted } from 'vue'
import InputText from 'primevue/inputtext';
import MultiSelect from 'primevue/multiselect';
import Button from 'primevue/button';
import { required } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
import { encodePubkey } from '@cosmjs/proto-signing';
import { scrollToTopMixin } from './../../mixins/scrollToTopMixin';
import Message from 'primevue/message';

export default {
    name: 'ProposeNewAccount',
    components: {
        InputText,
        MultiSelect,
        Button,
        Message
    },
    mixins: [scrollToTopMixin],
    setup() {
        const multiSelectRef = ref(null);
        const v$ = useVuelidate();
        
        onMounted(() => {
            // Ensure the MultiSelect is properly initialized after mount
            if (multiSelectRef.value) {
                multiSelectRef.value.$el.setAttribute('id', 'roles-multiselect');
            }
        });
        
        return { v$, multiSelectRef };
    },
    data() {
        return {
            txProcessing: false,
            submitted: false,
            error: null,
            selectedRoles: [],
            address: '',
            pubKey: '',
            info: '',
            vendorID: '',
            productIDs: '',
            roles: ['Vendor', 'NodeAdmin', 'VendorAdmin', 'Trustee', 'CertificationCenter']
        };
    },
    validations() {
        return {
            address: {
                required
            },
            pubKey: {
                required
            },
            selectedRoles: {
                required
            },
            productIDs: {
                pidRangeValidator: this.pidRangeValidator
            }
        };
    },
    methods: {
        pidRangeValidator(value) {
            if (!value) return true; // Allow empty values if not required
            return value.split(',').every((range) => {
                const parts = range.trim().split('-');
                if (parts.length !== 2) return false;
                const [start, end] = parts.map(Number);
                return Number.isInteger(start) && Number.isInteger(end) && start <= end;
            });
        },
        handleSubmit(isFormValid) {
            this.submitted = true;
            this.error = null;
            if (!isFormValid) {
                return;
            }

            let encodedBasePubkey;
            try {
                encodedBasePubkey = encodePubkey({ type: 'tendermint/PubKeySecp256k1', value: this.pubKey });
            } catch (e) {
                this.error = e.message;
            }
            let account;

            if (this.$store.state.selectedKeplrAccount) {
                account = this.$store.state.selectedKeplrAccount;
            } else {
                const wallet = this.$store.getters['common/wallet/wallet'];
                account = wallet && wallet.accounts && wallet.accounts.length > 0 ? wallet.accounts[0] : null;
            }
            const creatorAddress = account.address;

            this.txProcessing = true;
            let loader = this.$loading.show();
            let returnValue = this.$store
                .dispatch('zigbeealliance.distributedcomplianceledger.dclauth/sendMsgProposeAddAccount', {
                    value: {
                        signer: creatorAddress,
                        vendorID: this.vendorID,
                        productIDs: this.productIDs ? this.productIDs.split(',').map(range => {
                            const [min, max] = range.trim().split('-').map(Number);
                            return { min, max };
                        }) : [],
                        address: this.address,
                        pubKey: encodedBasePubkey,
                        roles: this.selectedRoles,
                        info: this.info,
                        time: parseInt(new Date().getTime() / 1000)
                    }
                })
                .then(
                    (response) => {
                        this.txProcessing = false;
                        loader.hide();
                        if (response.code == 0) {
                            this.error = null;
                            this.$toast.add({ severity: 'success', summary: 'Successful Tx', detail: 'Account proposal sent successfully', life: 3000 });
                            this.$emit('close-dialog');
                        } else {
                            this.$toast.add({ severity: 'error', summary: 'Error while processing Tx', detail: 'Tx failed', life: 3000 });
                            this.error = response;
                        }
                    },
                    (error) => {
                        this.$toast.add({ severity: 'error', summary: 'Error while processing Tx', detail: 'Tx failed', life: 3000 });
                        this.txProcessing = false;
                        loader.hide();
                        this.error = error.message;
                        this.scrollToTop();
                    }
                );
        },

        onClose(e) {
            e.preventDefault();
            this.$emit('close-dialog');
        },

        errorMessage() {
            if (this.error && this.error.rawLog) {
                return this.error.rawLog;
            } else if (this.error) {
                return this.error;
            } else {
                return null;
            }
        }
    }
};
</script>

<template>
    <div class="grid">
        <div class="col-12">
            <Message :closable="false" v-if="error" severity="error">{{ errorMessage() }}</Message>

            <form @submit.prevent="handleSubmit(!v$.$invalid)" class="">
                <div class="p-fluid">
                    <div class="p-grid mb-4">
                        <div class="field">
                            <label for="address">
                                <IconField v-tooltip.top="'Account address; Bech32 encoded'">
                                    Account Address <span class="required">*</span>
                                    <i class="pi pi-info-circle ml-2"></i>
                                </IconField>
                            </label>
                            <InputText id="address" type="text" v-model="address" :class="{ 'p-invalid': v$.address.$invalid && submitted }" />
                            <div v-if="v$.address.$invalid && submitted" class="p-error">Address is required</div>
                        </div>
                        <div class="field">
                            <label for="pubKey">
                                <IconField v-tooltip.top="'Account\'s Protobuf JSON encoded public key'">
                                    Public Key <span class="required">*</span>
                                    <i class="pi pi-info-circle ml-2"></i>
                                </IconField>
                            </label>
                            <InputText id="pubKey" type="text" v-model="pubKey" :class="{ 'p-invalid': v$.pubKey.$invalid && submitted }" />
                            <div v-if="v$.pubKey.$invalid && submitted" class="p-error">Public Key is required</div>
                        </div>
                    </div>
                    <div class="field">
                        <label for="info">
                            <IconField v-tooltip.top="'The list of roles assigning to the account'">
                                Roles <span class="required">*</span>
                                <i class="pi pi-info-circle ml-2"></i>
                            </IconField>
                        </label>
                        <MultiSelect
                            ref="multiSelectRef"
                            id="roles-multiselect"
                            v-model="selectedRoles"
                            :options="roles"
                            :showToggleAll="false"
                            optionLabel=""
                            display="chip"
                            :class="{ 'p-invalid': v$.selectedRoles.$invalid && submitted }"
                            placeholder="Select Roles"
                        />

                        <div v-if="v$.selectedRoles.$invalid && submitted" class="p-error">At least one role is required</div>
                    </div>

                    <div class="field">
                        <label for="vendorID">
                            <IconField v-tooltip.top="'Vendor ID (only needed for vendor role)'">
                                Vendor ID
                                <i class="pi pi-info-circle ml-2"></i>
                            </IconField>
                        </label>
                        <InputText id="vendorID" type="text" v-model="vendorID" />
                    </div>

                    <div class="field">
                        <label for="productIDs">
                            <IconField v-tooltip.top="'The list of product-id ranges (range item separated with \' - \'), comma-separated, in increasing order, associated with this account: 1-100,201-300...'">
                                Product IDs
                                <i class="pi pi-info-circle ml-2"></i>
                            </IconField>
                        </label>
                        <InputText id="productIDs" type="text" v-model="productIDs" :class="{ 'p-invalid': v$.productIDs.$invalid && submitted }" />
                        <div v-if="v$.productIDs.$invalid && submitted" class="p-error">
                            Invalid PID range format. Product IDs is the list of product-id ranges (range item separated with "-"), comma-separated, in increasing order, associated with this account: 1-100,201-300...
                        </div>
                    </div>

                    <div class="field">
                        <label for="info">
                            <IconField v-tooltip.top="'Information/notes for the proposal'">
                                Optional Information
                                <i class="pi pi-info-circle ml-2"></i>
                            </IconField>
                        </label>
                        <InputText id="info" type="text" v-model="info" />
                    </div>

                    <div class="field">
                        <div class="grid">
                            <div class="col-12">
                                <Button v-if="!txProcessing" type="submit" v-tooltip="'This will open keplr wallet window. Please finish the transaction there.'" label="Propose Add Account" icon="pi pi-user" iconPos="left" />
                                <Button v-if="txProcessing" label="Submitted Tx.." icon="pi pi-spin pi-spinner" class="p-button" disabled="disabled" iconPos="left" />
                                <Button label="Cancel" @click="onClose" class="p-button-secondary" icon="pi pi-times" iconPos="left" />
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>
