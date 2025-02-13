<script>
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import { required } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
//import {encoding_1} from "@cosmjs/encoding";
//const encoding_1 = require('@cosmjs/encoding')
import { DirectSecp256k1HdWallet, Registry } from '@cosmjs/proto-signing';
import { assertIsBroadcastTxSuccess, SigningStargateClient, StargateClient } from '@cosmjs/stargate';
import { fromBase64 } from '@cosmjs/encoding';
import { Any } from 'cosmjs-types/google/protobuf/any';
import { decodePubkey, encodePubkey } from '@cosmjs/proto-signing';
import Message from 'primevue/message';
export default {
    name: 'VendorInfo',
    components: {
        InputText,
        Button,
        Message
    },
    setup: () => ({ v$: useVuelidate() }),
    props: ['vendorInfo', 'viewOnly'],
    data() {
        return {
            txProcessing: false,
            update: false,
            submitted: false,
            error: null,
            vendorID: null,
            vendorName: null,
            companyLegalName: null,
            companyPreferredName: null,
            vendorLandingPageURL: null,
            schemaVersion: 0
        };
    },
    validations() {
        return {
            vendorID: {
                required,
                $autoDirty: true
            },
            vendorName: {
                required
            },

            companyLegalName: {
                required
            },
            companyPreferredName: {},

            vendorLandingPageURL: {},
            schemaVersion: {}
        };
    },
    methods: {
        handleSubmit(isFormValid) {
            this.submitted = true;
            this.error = null;
            if (!isFormValid) {
                return;
            }
            const account = this.$store.state.selectedKeplrAccount;
            const creatorAddress = account.address;

            this.txProcessing = true;
            let loader = this.$loading.show();
            let methodName = 'sendMsgCreateVendorInfo';
            if (this.update) {
                methodName = 'sendMsgUpdateVendorInfo';
            }
            this.$store
                .dispatch(`zigbeealliance.distributedcomplianceledger.vendorinfo/${methodName}`, {
                    value: {
                        creator: creatorAddress,
                        vendorID: this.vendorID,
                        vendorName: this.vendorName,
                        companyLegalName: this.companyLegalName,
                        companyPreferredName: this.companyPreferredName,
                        vendorLandingPageURL: this.vendorLandingPageURL,
                        schemaVersion: this.schemaVersion
                    }
                })
                .then(
                    (response) => {
                        this.txProcessing = false;
                        loader.hide();
                        if (response.code == 0) {
                            this.error = null;
                            this.$toast.add({ severity: 'success', summary: 'Successful Tx', detail: 'VendorInfo Tx sent successfully', life: 3000 });
                            this.$emit('close-dialog');
                        } else {
                            this.$toast.add({ severity: 'error', summary: 'Error while processing Tx', detail: 'VendorInfo Tx failed', life: 3000 });
                            this.error = response;
                        }
                    },
                    (error) => {
                        this.$toast.add({ severity: 'error', summary: 'Error while processing Tx', detail: 'VendorInfo Tx failed', life: 3000 });
                        this.txProcessing = false;
                        loader.hide();
                        this.error = error.message;
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
    },
    created() {
        if (this.vendorInfo) {
            this.vendorID = this.vendorInfo.vendorID;
            this.vendorName = this.vendorInfo.vendorName;
            this.companyLegalName = this.vendorInfo.companyLegalName;
            this.companyPreferredName = this.vendorInfo.companyPreferredName;
            this.vendorLandingPageURL = this.vendorInfo.vendorLandingPageURL;
            this.update = true;
        } else {
            this.update = false;
        }
    }
};
</script>




	<template>
    <div class="grid">
        <div class="col-12" v-if="viewOnly === true">
            <table>
                <tr>
                    <td class="p-text">Vendor ID</td>
                    <td>{{ vendorInfo.vendorIDHex }}</td>
                </tr>
                <tr>
                    <td>Vendor Name</td>
                    <td>{{ vendorInfo.vendorName }}</td>
                </tr>
                <tr>
                    <td>Company Legal Name</td>
                    <td>{{ vendorInfo.companyLegalName }}</td>
                </tr>
                <tr>
                    <td>Company Preferred Name</td>
                    <td>{{ vendorInfo.companyPreferredName }}</td>
                </tr>
                <tr>
                    <td>Vendor Landing Page URL</td>
                    <td>{{ vendorInfo.vendorLandingPageURL }}</td>
                </tr>
                <tr>
                    <td>Schema Version</td>
                    <td>{{ vendorInfo.schemaVersion }}</td>
                </tr>
            </table>
        </div>
        <div v-else class="col-12">
            <Message :closable="false" v-if="error" severity="error">{{ errorMessage() }}</Message>
            <div class="p-fluid">
                <form @submit.prevent="handleSubmit(!v$.$invalid)" class="">
                    <!-- Field for vendorID -->
                    <div class="field">
                        <label for="vendorID">
                            <IconField v-tooltip.top="'Vendor ID (positive non-zero)'">
                                Vendor ID <span class="required">*</span>
                                <i class="pi pi-info-circle ml-2"></i>
                            </IconField>
                        </label>
                        <InputText id="vendorID" type="text" v-model="v$.vendorID.$model" :class="{ 'p-invalid': v$.vendorID.$invalid && submitted }" />
                        <div v-if="v$.vendorID.$invalid && submitted" class="p-error">Vendor ID is required and must be a positive non-zero number</div>
                    </div>

                    <!-- Field for vendorName -->
                    <div class="field">
                        <label for="vendorName">
                            <IconField v-tooltip.top="'Vendor name'">
                                Vendor Name <span class="required">*</span>
                                <i class="pi pi-info-circle ml-2"></i>
                            </IconField>
                        </label>
                        <InputText id="vendorName" type="text" v-model="v$.vendorName.$model" :class="{ 'p-invalid': v$.vendorName.$invalid && submitted }" />
                        <div v-if="v$.vendorName.$invalid && submitted" class="p-error">Vendor Name is required</div>
                    </div>

                    <!-- Field for companyLegalName -->
                    <div class="field">
                        <label for="companyLegalName">
                            <IconField v-tooltip.top="'Legal name of the vendor company'">
                                Company Legal Name <span class="required">*</span>
                                <i class="pi pi-info-circle ml-2"></i>
                            </IconField>
                        </label>
                        <InputText id="companyLegalName" type="text" v-model="v$.companyLegalName.$model" :class="{ 'p-invalid': v$.companyLegalName.$invalid && submitted }" />
                        <div v-if="v$.companyLegalName.$invalid && submitted" class="p-error">Company Legal Name is required</div>
                    </div>

                    <!-- Field for companyPreferredName -->
                    <div class="field">
                        <label for="companyPreferredName">
                            <IconField v-tooltip.top="'Preferred name of the vendor company (optional)'">
                                Company Preferred Name
                                <i class="pi pi-info-circle ml-2"></i>
                            </IconField>
                        </label>
                        <InputText id="companyPreferredName" type="text" v-model="v$.companyPreferredName.$model" :class="{ 'p-invalid': v$.companyPreferredName.$invalid && submitted }" />
                        <div v-if="v$.companyPreferredName.$invalid && submitted" class="p-error">Preferred Name is invalid</div>
                    </div>

                    <!-- Field for vendorLandingPageURL -->
                    <div class="field">
                        <label for="vendorLandingPageURL">
                            <IconField v-tooltip.top="'URL of the vendor\'s landing page (optional)'">
                                Vendor Landing Page URL
                                <i class="pi pi-info-circle ml-2"></i>
                            </IconField>
                        </label>
                        <InputText id="vendorLandingPageURL" type="text" v-model="v$.vendorLandingPageURL.$model" :class="{ 'p-invalid': v$.vendorLandingPageURL.$invalid && submitted }" />
                        <div v-if="v$.vendorLandingPageURL.$invalid && submitted" class="p-error">Invalid URL format</div>
                    </div>

                    <!-- Field for schemaVersion -->
                    <div class="field">
                        <label for="schemaVersion">
                            <IconField v-tooltip.top="'Schema version to support backward / forward compatibility (default 0)'">
                                Schema Version
                                <i class="pi pi-info-circle ml-2"></i>
                            </IconField>
                        </label>
                        <InputText id="schemaVersion" type="text" v-model="v$.schemaVersion.$model" :class="{ 'p-invalid': v$.schemaVersion.$invalid && submitted }" />
                        <div v-if="v$.schemaVersion.$invalid && submitted" class="p-error">Invalid schema version format</div>
                    </div>

                    <div class="field">
                        <Button v-if="!txProcessing" type="submit" label="Save" v-tooltip="'This will open keplr wallet window. Please finish the transaction there.'" icon="pi pi-check" iconPos="left" />
                        <Button v-if="txProcessing" label="Submitted Tx.." disabled="disabled" icon="pi pi-spin pi-spinner" iconPos="left" />
                        <Button label="Cancel" @click="onClose" class="p-button-secondary" icon="pi pi-times" iconPos="left" />
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<style scoped>
table {
    border-spacing: 0 1em;
}
td:first-child {
    font-weight: bold;
    text-align: left;
    padding-right: 2em;
}
</style>
