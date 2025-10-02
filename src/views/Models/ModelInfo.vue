<script>
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import { required, minValue } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
//import {encoding_1} from "@cosmjs/encoding";
//const encoding_1 = require('@cosmjs/encoding')
import { DirectSecp256k1HdWallet, Registry } from '@cosmjs/proto-signing';
import { assertIsBroadcastTxSuccess, SigningStargateClient, StargateClient } from '@cosmjs/stargate';
import { fromBase64 } from '@cosmjs/encoding';
import { Any } from 'cosmjs-types/google/protobuf/any';
import { decodePubkey, encodePubkey } from '@cosmjs/proto-signing';
import { Model } from 'zigbee-alliance-distributed-compliance-ledger-client-ts/zigbeealliance.distributedcomplianceledger.model/types';
import Message from 'primevue/message';
import { scrollToTopMixin } from '../../mixins/scrollToTopMixin';
export default {
    name: 'ModelInfo',
    components: {
        InputText,
        Button,
        Message
    },
    mixins: [scrollToTopMixin],
    setup: () => ({ v$: useVuelidate() }),
    props: ['selectedModel', 'viewOnly'],
    data() {
        return {
            txProcessing: false,
            update: false,
            submitted: false,
            error: null,
            model: Model.fromPartial({})
        };
    },
    validations() {
        return {
            model: {
                vid: {
                    required,
                    minValue: minValue(1)
                },
                pid: {
                    required,
                    minValue: minValue(1)
                },
                deviceTypeId: {
                    required
                },
                productName: {
                    required
                },
                productLabel: {
                    required
                },
                partNumber: {
                    required
                },

                commissioningCustomFlow: {},
                commissioningCustomFlowUrl: {},
                commissioningModeInitialStepsHint: {},
                commissioningModeInitialStepsInstruction: {},
                commissioningModeSecondaryStepsHint: {},
                commissioningModeSecondaryStepsInstruction: {},
                commissioningFallbackUrl: {},
                userManualUrl: {},
                supportUrl: {},
                productUrl: {},
                lsfUrl: {},
                lsfRevision: {},
                enhancedSetupFlowOptions: {},
                enhancedSetupFlowTCUrl: {},
                enhancedSetupFlowTCRevision: {},
                enhancedSetupFlowTCDigest: {},
                enhancedSetupFlowTCFileSize: {},
                maintenanceUrl: {},
                discoveryCapabilitiesBitmask: {},
                schemaVersion: {},
                icdUserActiveModeTriggerHint: {},
                icdUserActiveModeTriggerInstruction: {},
                factoryResetStepsHint: {},
                factoryResetStepsInstruction: {}
            }
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
            let methodName = 'sendMsgCreateModel';
            if (this.update) {
                methodName = 'sendMsgUpdateModel';
            }
            this.model.creator = creatorAddress;
            this.$store
                .dispatch(`zigbeealliance.distributedcomplianceledger.model/${methodName}`, {
                    value: this.model
                })
                .then(
                    (response) => {
                        this.txProcessing = false;
                        loader.hide();
                        if (response.code == 0) {
                            this.error = null;
                            this.$toast.add({ severity: 'success', summary: 'Successful Tx', detail: 'ModelInfo Tx sent successfully', life: 3000 });
                            this.$emit('close-dialog');
                        } else {
                            this.$toast.add({ severity: 'error', summary: 'Error while processing Tx', detail: 'ModelInfo Tx failed', life: 3000 });
                            this.error = response;
                        }
                    },
                    (error) => {
                        this.$toast.add({ severity: 'error', summary: 'Error while processing Tx', detail: 'ModelInfo Tx failed', life: 3000 });
                        this.txProcessing = false;
                        loader.hide();
                        this.scrollToTop();
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
        if (this.selectedModel) {
            this.model = Model.fromPartial(this.selectedModel);
            this.update = true;
        } else {
            /*
             default value for commissioningModeInitialStepsHint is set to 1
             commissioningModeInitialStepsHint SHALL identify a hint for the steps that can be used to put 
             into commissioning mode a device that has not yet been commissioned. This field is a bitmap with 
             values defined in the Pairing Hint Table. For example, a value of 1 (bit 0 is set) 
             indicates that a device that has not yet been commissioned will enter Commissioning Mode 
             upon a power cycle (default 1).
            */
            this.model.commissioningModeInitialStepsHint = 1;

            // default value for enhancedSetupFlowOptions
            this.model.schemaVersion = 0;
            this.update = false;
        }
    }
};
</script>




	<template>
    <div>
        <div v-if="viewOnly === true">
            <table>
                <tr>
                    <td class="p-text">Vendor ID</td>
                    <td>{{ selectedModel.vidHex }}</td>
                </tr>
                <tr>
                    <td>Product ID</td>
                    <td>{{ selectedModel.pidHex }}</td>
                </tr>
                <tr>
                    <td>Device Type ID</td>
                    <td>{{ selectedModel.deviceTypeIdHex }}</td>
                </tr>
                <tr>
                    <td>Product Name</td>
                    <td>{{ selectedModel.productName }}</td>
                </tr>
                <tr>
                    <td>Product Label</td>
                    <td>{{ selectedModel.productLabel }}</td>
                </tr>
                <tr>
                    <td>Part Number</td>
                    <td>{{ selectedModel.partNumber }}</td>
                </tr>
                <tr>
                    <td>Enhanced Setup Flow</td>
                    <td>{{ selectedModel.enhancedSetupFlowOptions }}</td>
                </tr>
                <tr>
                    <td>Commissioning Custom Flow</td>
                    <td>{{ selectedModel.commissioningCustomFlow }}</td>
                </tr>
                <tr>
                    <td>Commissioning Custom Flow URL</td>
                    <td>{{ selectedModel.commissioningCustomFlowUrl }}</td>
                </tr>
                <tr>
                    <td>Commissioning Mode Initial Steps Hint</td>
                    <td>{{ selectedModel.commissioningModeInitialStepsHint }}</td>
                </tr>
                <tr>
                    <td>Commissioning Mode Initial Steps Instruction</td>
                    <td>{{ selectedModel.commissioningModeInitialStepsInstruction }}</td>
                </tr>
                <tr>
                    <td>Commissioning Mode Secondary Steps Hint</td>
                    <td>{{ selectedModel.commissioningModeSecondaryStepsHint }}</td>
                </tr>
                <tr>
                    <td>Commissioning Mode Secondary Steps Instruction</td>
                    <td>{{ selectedModel.commissioningModeSecondaryStepsInstruction }}</td>
                </tr>
                <tr>
                    <td>Commissioning Fallback URL</td>
                    <td>{{ selectedModel.commissioningFallbackUrl }}</td>
                </tr>
                <tr>
                    <td>User Manual URL</td>
                    <td>{{ selectedModel.userManualUrl }}</td>
                </tr>
                <tr>
                    <td>Support URL</td>
                    <td>{{ selectedModel.supportUrl }}</td>
                </tr>
                <tr>
                    <td>Product URL</td>
                    <td>{{ selectedModel.productUrl }}</td>
                </tr>
                <tr>
                    <td>LSF URL</td>
                    <td>{{ selectedModel.lsfUrl }}</td>
                </tr>
                <tr>
                    <td>LSF Revision</td>
                    <td>{{ selectedModel.lsfRevision }}</td>
                </tr>
                <tr>
                    <td>Enhanced Setup Flow Terms and Conditions URL</td>
                    <td>{{ selectedModel.enhancedSetupFlowTCUrl }}</td>
                </tr>
                <tr>
                    <td>Enhanced Setup Flow Terms and Conditions Revision</td>
                    <td>{{ selectedModel.enhancedSetupFlowTCRevision }}</td>
                </tr>
                <tr>
                    <td>Enhanced Setup Flow Terms and Conditions Digest</td>
                    <td>{{ selectedModel.enhancedSetupFlowTCDigest }}</td>
                </tr>
                <tr>
                    <td>Enhanced Setup Flow Terms and Conditions File Size</td>
                    <td>{{ selectedModel.enhancedSetupFlowTCFileSize }}</td>
                </tr>
                <tr>
                    <td>Maintenance URL</td>
                    <td>{{ selectedModel.maintenanceUrl }}</td>
                </tr>
                <tr>
                    <td>Discovery Capabilities Bitmask</td>
                    <td>{{ selectedModel.discoveryCapabilitiesBitmask }}</td>
                </tr>
                <tr>
                    <td>Schema Version</td>
                    <td>{{ selectedModel.schemaVersion }}</td>
                </tr>
                <tr>
                    <td>ICD User Active Mode Trigger Hint</td>
                    <td>{{ selectedModel.icdUserActiveModeTriggerHint }}</td>
                </tr>
                <tr>
                    <td>ICD User Active Mode Trigger Instruction</td>
                    <td>{{ selectedModel.icdUserActiveModeTriggerInstruction }}</td>
                </tr>
                <tr>
                    <td>Factory Reset Steps Hint</td>
                    <td>{{ selectedModel.factoryResetStepsHint }}</td>
                </tr>
                <tr>
                    <td>Factory Reset Steps Instruction</td>
                    <td>{{ selectedModel.factoryResetStepsInstruction }}</td>
                </tr>
            </table>
        </div>
        <div v-else>
            <Message :closable="false" v-if="error" severity="error">{{ errorMessage() }}</Message>
            <div class="p-fluid">
                <form @submit.prevent="handleSubmit(!v$.$invalid)" class="">
                    <!-- Field for vid -->
                    <div class="field">
                        <label for="vid">
                            <IconField v-tooltip.top="'Vendor ID is a positive non-zero value'">
                                Vendor ID <span class="required">*</span>
                                <i class="pi pi-info-circle ml-2"></i>
                            </IconField>
                        </label>
                        <InputText id="vid" type="text" v-model="v$.model.vid.$model" :class="{ 'p-invalid': v$.model.vid.$invalid && submitted }" />
                        <div v-if="v$.model.vid.$invalid && submitted" class="p-error">Vendor ID is required and must be a positive non-zero value</div>
                    </div>

                    <!-- Field for pid -->
                    <div class="field">
                        <label for="pid">
                            <IconField v-tooltip.top="'Product ID is a positive non-zero value'">
                                Product ID <span class="required">*</span>
                                <i class="pi pi-info-circle ml-2"></i>
                            </IconField>
                        </label>
                        <InputText id="pid" type="text" v-model="v$.model.pid.$model" :class="{ 'p-invalid': v$.model.pid.$invalid && submitted }" />
                        <div v-if="v$.model.pid.$invalid && submitted" class="p-error">Product ID is required and must be a positive non-zero value</div>
                    </div>

                    <!-- Field for deviceTypeId -->
                    <div class="field">
                        <label for="deviceTypeId">
                            <IconField v-tooltip.top="'Device Type ID is the device type identifier. For example, 10 (0x000a) is for a Door Lock.'">
                                Device Type ID <span class="required">*</span>
                                <i class="pi pi-info-circle ml-2"></i>
                            </IconField>
                        </label>
                        <InputText id="deviceTypeId" type="text" v-model="v$.model.deviceTypeId.$model" :class="{ 'p-invalid': v$.model.deviceTypeId.$invalid && submitted }" />
                        <div v-if="v$.model.deviceTypeId.$invalid && submitted" class="p-error">Device Type ID is required</div>
                    </div>

                    <!-- Field for productName -->
                    <div class="field">
                        <label for="productName">
                            <IconField v-tooltip.top="'Product name of the model'">
                                Product Name <span class="required">*</span>
                                <i class="pi pi-info-circle ml-2"></i>
                            </IconField>
                        </label>
                        <InputText id="productName" type="text" v-model="v$.model.productName.$model" :class="{ 'p-invalid': v$.model.productName.$invalid && submitted }" />
                        <div v-if="v$.model.productName.$invalid && submitted" class="p-error">Product Name is required</div>
                    </div>

                    <!-- Field for productLabel -->
                    <div class="field">
                        <label for="productLabel">
                            <IconField v-tooltip.top="'Product description (string or path to file containing data)'">
                                Product Label <span class="required">*</span>
                                <i class="pi pi-info-circle ml-2"></i>
                            </IconField>
                        </label>
                        <InputText id="productLabel" type="text" v-model="v$.model.productLabel.$model" :class="{ 'p-invalid': v$.model.productLabel.$invalid && submitted }" />
                        <div v-if="v$.model.productLabel.$invalid && submitted" class="p-error">Product Label is required</div>
                    </div>

                    <!-- Field for partNumber -->
                    <div class="field">
                        <label for="partNumber">
                            <IconField v-tooltip.top="'Stock keeping unit'">
                                Part Number <span class="required">*</span>
                                <i class="pi pi-info-circle ml-2"></i>
                            </IconField>
                        </label>
                        <InputText id="partNumber" type="text" v-model="v$.model.partNumber.$model" :class="{ 'p-invalid': v$.model.partNumber.$invalid && submitted }" />
                        <div v-if="v$.model.partNumber.$invalid && submitted" class="p-error">Part Number is required</div>
                    </div>

                    <!-- Field for commissioningCustomFlow -->
                    <div class="field">
                        <label for="commissioningCustomFlow">
                            <IconField v-tooltip.top="'1: user interaction required before commissioning, 2: URL for commissioning details'">
                                Commissioning Custom Flow
                                <i class="pi pi-info-circle ml-2"></i>
                            </IconField>
                        </label>
                        <InputText id="commissioningCustomFlow" type="text" v-model="v$.model.commissioningCustomFlow.$model" :class="{ 'p-invalid': v$.model.commissioningCustomFlow.$invalid && submitted }" />
                        <div v-if="v$.model.commissioningCustomFlow.$invalid && submitted" class="p-error">Commissioning Custom Flow is required</div>
                    </div>

                    <!-- Field for commissioningCustomFlowUrl -->
                    <div class="field">
                        <label for="commissioningCustomFlowUrl">
                            <IconField v-tooltip.top="'Vendor-specific URL for commissioning when custom flow is set to 2'">
                                Commissioning Custom Flow URL
                                <i class="pi pi-info-circle ml-2"></i>
                            </IconField>
                        </label>
                        <InputText id="commissioningCustomFlowUrl" type="text" v-model="v$.model.commissioningCustomFlowUrl.$model" :class="{ 'p-invalid': v$.model.commissioningCustomFlowUrl.$invalid && submitted }" />
                        <div v-if="v$.model.commissioningCustomFlowUrl.$invalid && submitted" class="p-error">Commissioning Custom Flow URL is required when custom flow is set to 2</div>
                    </div>

                    <!-- Field for commissioningModeInitialStepsHint -->
                    <div class="field">
                        <label for="commissioningModeInitialStepsHint">
                            <IconField v-tooltip.top="'Hint for steps to put uncommissioned device into commissioning mode. Default: 1 (power cycle)'">
                                Commissioning Mode Initial Steps Hint
                                <i class="pi pi-info-circle ml-2"></i>
                            </IconField>
                        </label>
                        <InputText id="commissioningModeInitialStepsHint" type="text" v-model="v$.model.commissioningModeInitialStepsHint.$model" :class="{ 'p-invalid': v$.model.commissioningModeInitialStepsHint.$invalid && submitted }" />
                        <div v-if="v$.model.commissioningModeInitialStepsHint.$invalid && submitted" class="p-error">Commissioning Mode Initial Steps Hint is required</div>
                    </div>

                    <!-- Field for commissioningModeInitialStepsInstruction -->
                    <div class="field">
                        <label for="commissioningModeInitialStepsInstruction">
                            <IconField v-tooltip.top="'Text related to specific values of initial steps hint'">
                                Commissioning Mode Initial Steps Instruction
                                <i class="pi pi-info-circle ml-2"></i>
                            </IconField>
                        </label>
                        <InputText
                            id="commissioningModeInitialStepsInstruction"
                            type="text"
                            v-model="v$.model.commissioningModeInitialStepsInstruction.$model"
                            :class="{ 'p-invalid': v$.model.commissioningModeInitialStepsInstruction.$invalid && submitted }"
                        />
                        <div v-if="v$.model.commissioningModeInitialStepsInstruction.$invalid && submitted" class="p-error">Commissioning Mode Initial Steps Instruction is required</div>
                    </div>

                    <!-- Field for commissioningModeSecondaryStepsHint -->
                    <div class="field">
                        <label for="commissioningModeSecondaryStepsHint">
                            <IconField v-tooltip.top="'Hint for steps to put commissioned device into commissioning mode. Example: 4 (current CHIP Administrator visit)'">
                                Commissioning Mode Secondary Steps Hint
                                <i class="pi pi-info-circle ml-2"></i>
                            </IconField>
                        </label>
                        <InputText id="commissioningModeSecondaryStepsHint" type="text" v-model="v$.model.commissioningModeSecondaryStepsHint.$model" :class="{ 'p-invalid': v$.model.commissioningModeSecondaryStepsHint.$invalid && submitted }" />
                        <div v-if="v$.model.commissioningModeSecondaryStepsHint.$invalid && submitted" class="p-error">Commissioning Mode Secondary Steps Hint is required</div>
                    </div>

                    <!-- Field for commissioningModeSecondaryStepsInstruction -->
                    <div class="field">
                        <label for="commissioningModeSecondaryStepsInstruction">
                            <IconField v-tooltip.top="'Text related to specific values of secondary steps hint'">
                                Commissioning Mode Secondary Steps Instruction
                                <i class="pi pi-info-circle ml-2"></i>
                            </IconField>
                        </label>
                        <InputText
                            id="commissioningModeSecondaryStepsInstruction"
                            type="text"
                            v-model="v$.model.commissioningModeSecondaryStepsInstruction.$model"
                            :class="{ 'p-invalid': v$.model.commissioningModeSecondaryStepsInstruction.$invalid && submitted }"
                        />
                        <div v-if="v$.model.commissioningModeSecondaryStepsInstruction.$invalid && submitted" class="p-error">Commissioning Mode Secondary Steps Instruction is required</div>
                    </div>

                    <!-- Field for commissioningFallbackUrl -->
                    <div class="field">
                        <label for="commissioningFallbackUrl">
                            <IconField v-tooltip.top="'URL for commissioning fallback details'">
                                Commissioning Fallback URL
                                <i class="pi pi-info-circle ml-2"></i>
                            </IconField>
                        </label>
                        <InputText id="commissioningFallbackUrl" type="text" v-model="v$.model.commissioningFallbackUrl.$model" :class="{ 'p-invalid': v$.model.commissioningFallbackUrl.$invalid && submitted }" />
                        <div v-if="v$.model.commissioningFallbackUrl.$invalid && submitted" class="p-error">Commissioning Fallback URL is required</div>
                    </div>

                    <!-- Field for userManualUrl -->
                    <div class="field">
                        <label for="userManualUrl">
                            <IconField v-tooltip.top="'URL for product user manual'">
                                User Manual URL
                                <i class="pi pi-info-circle ml-2"></i>
                            </IconField>
                        </label>
                        <InputText id="userManualUrl" type="text" v-model="v$.model.userManualUrl.$model" :class="{ 'p-invalid': v$.model.userManualUrl.$invalid && submitted }" />
                        <div v-if="v$.model.userManualUrl.$invalid && submitted" class="p-error">User Manual URL is required</div>
                    </div>

                    <!-- Field for supportUrl -->
                    <div class="field">
                        <label for="supportUrl">
                            <IconField v-tooltip.top="'URL for product support details'">
                                Support URL
                                <i class="pi pi-info-circle ml-2"></i>
                            </IconField>
                        </label>
                        <InputText id="supportUrl" type="text" v-model="v$.model.supportUrl.$model" :class="{ 'p-invalid': v$.model.supportUrl.$invalid && submitted }" />
                        <div v-if="v$.model.supportUrl.$invalid && submitted" class="p-error">Support URL is required</div>
                    </div>

                    <!-- Field for productUrl -->
                    <div class="field">
                        <label for="productUrl">
                            <IconField v-tooltip.top="'URL for product details'">
                                Product URL
                                <i class="pi pi-info-circle ml-2"></i>
                            </IconField>
                        </label>
                        <InputText id="productUrl" type="text" v-model="v$.model.productUrl.$model" :class="{ 'p-invalid': v$.model.productUrl.$invalid && submitted }" />
                        <div v-if="v$.model.productUrl.$invalid && submitted" class="p-error">Product URL is required</div>
                    </div>

                    <!-- Field for lsfUrl -->
                    <div class="field">
                        <label for="lsfUrl">
                            <IconField v-tooltip.top="'URL to the Localized String File of the product'">
                                LSF URL
                                <i class="pi pi-info-circle ml-2"></i>
                            </IconField>
                        </label>
                        <InputText id="lsfUrl" type="text" v-model="v$.model.lsfUrl.$model" :class="{ 'p-invalid': v$.model.lsfUrl.$invalid && submitted }" />
                        <div v-if="v$.model.lsfUrl.$invalid && submitted" class="p-error">LSF URL is required</div>
                    </div>

                    <!-- Field for lsfRevision only shown during update -->
                    <div v-if="this.update" class="field">
                        <label for="lsfRevision">
                            <IconField v-tooltip.top="'LsfRevision is a monotonically increasing positive integer indicating the latest available version of Localized String File'">
                                LSF Revision
                                <i class="pi pi-info-circle ml-2"></i>
                            </IconField>
                        </label>
                        <InputText id="lsfRevision" type="text" v-model="v$.model.lsfRevision.$model" :class="{ 'p-invalid': v$.model.lsfRevision.$invalid && submitted }" />
                        <div v-if="v$.model.lsfRevision.$invalid && submitted" class="p-error">LSF Revision is required</div>
                    </div>

                    <!-- Field for enhancedSetupFlowOptions -->
                    <div class="field">
                        <label for="enhancedSetupFlowOptions">
                            <IconField v-tooltip.top="'Configuration options for the Enhanced Setup Flow'">
                                Enhanced Setup Flow Options
                                <i class="pi pi-info-circle ml-2"></i>
                            </IconField>
                        </label>
                        <InputText id="enhancedSetupFlowOptions" type="text" v-model="v$.model.enhancedSetupFlowOptions.$model" :class="{ 'p-invalid': v$.model.enhancedSetupFlowOptions.$invalid && submitted }" />
                        <div v-if="v$.model.enhancedSetupFlowOptions.$invalid && submitted" class="p-error">Enhanced Setup Flow Options are required</div>
                    </div>

                    <!-- Field for enhancedSetupFlowTCUrl -->
                    <div class="field">
                        <label for="enhancedSetupFlowTCUrl">
                            <IconField v-tooltip.top="'URL for the Enhanced Setup Flow Terms and Conditions File'">
                                Enhanced Setup Flow Terms and Conditions URL
                                <i class="pi pi-info-circle ml-2"></i>
                            </IconField>
                        </label>
                        <InputText id="enhancedSetupFlowTCUrl" type="text" v-model="v$.model.enhancedSetupFlowTCUrl.$model" :class="{ 'p-invalid': v$.model.enhancedSetupFlowTCUrl.$invalid && submitted }" />
                        <div v-if="v$.model.enhancedSetupFlowTCUrl.$invalid && submitted" class="p-error">Enhanced Setup Flow Terms and Conditions URL is required</div>
                    </div>

                    <!-- Field for enhancedSetupFlowTCRevision -->
                    <div class="field">
                        <label for="enhancedSetupFlowTCRevision">
                            <IconField v-tooltip.top="'Revision number of the Enhanced Setup Flow Terms and Conditions file'">
                                Enhanced Setup Flow Terms and Conditions Revision
                                <i class="pi pi-info-circle ml-2"></i>
                            </IconField>
                        </label>
                        <InputText id="enhancedSetupFlowTCRevision" type="text" v-model="v$.model.enhancedSetupFlowTCRevision.$model" :class="{ 'p-invalid': v$.model.enhancedSetupFlowTCRevision.$invalid && submitted }" />
                        <div v-if="v$.model.enhancedSetupFlowTCRevision.$invalid && submitted" class="p-error">Enhanced Setup Flow Terms and Conditions Revision is required</div>
                    </div>

                    <!-- Field for enhancedSetupFlowTCDigest -->
                    <div class="field">
                        <label for="enhancedSetupFlowTCDigest">
                            <IconField v-tooltip.top="'Digest of the Enhanced Setup Flow Terms and Conditions file'">
                                Enhanced Setup Flow Terms and Conditions Digest
                                <i class="pi pi-info-circle ml-2"></i>
                            </IconField>
                        </label>
                        <InputText id="enhancedSetupFlowTCDigest" type="text" v-model="v$.model.enhancedSetupFlowTCDigest.$model" :class="{ 'p-invalid': v$.model.enhancedSetupFlowTCDigest.$invalid && submitted }" />
                        <div v-if="v$.model.enhancedSetupFlowTCDigest.$invalid && submitted" class="p-error">Enhanced Setup Flow Terms and Conditions Digest is required</div>
                    </div>

                    <!-- Field for enhancedSetupFlowTCFileSize -->
                    <div class="field">
                        <label for="enhancedSetupFlowTCFileSize">
                            <IconField v-tooltip.top="'File size of the Enhanced Setup Flow Terms and Conditions file'">
                                Enhanced Setup Flow Terms and Conditions File Size
                                <i class="pi pi-info-circle ml-2"></i>
                            </IconField>
                        </label>
                        <InputText id="enhancedSetupFlowTCFileSize" type="text" v-model="v$.model.enhancedSetupFlowTCFileSize.$model" :class="{ 'p-invalid': v$.model.enhancedSetupFlowTCFileSize.$invalid && submitted }" />
                        <div v-if="v$.model.enhancedSetupFlowTCFileSize.$invalid && submitted" class="p-error">Enhanced Setup Flow Terms and Conditions File Size is required</div>
                    </div>

                    <!-- Field for maintenanceUrl -->
                    <div class="field">
                        <label for="maintenanceUrl">
                            <IconField v-tooltip.top="'URL for maintenance details'">
                                Maintenance URL
                                <i class="pi pi-info-circle ml-2"></i>
                            </IconField>
                        </label>
                        <InputText id="maintenanceUrl" type="text" v-model="v$.model.maintenanceUrl.$model" :class="{ 'p-invalid': v$.model.maintenanceUrl.$invalid && submitted }" />
                        <div v-if="v$.model.maintenanceUrl.$invalid && submitted" class="p-error">Maintenance URL is invalid</div>
                    </div>

                    <!-- Field for discoverCapabilitiesBitmask -->
                    <div class="field">
                        <label for="discoveryCapabilitiesBitmask">
                            <IconField v-tooltip.top="'Bitmask of the discovery capabilities supported by the device'">
                                Discovery Capabilities Bitmask
                                <i class="pi pi-info-circle ml-2"></i>
                            </IconField>
                        </label>
                        <InputText id="discoveryCapabilitiesBitmask" type="text" v-model="v$.model.discoveryCapabilitiesBitmask.$model" :class="{ 'p-invalid': v$.model.discoveryCapabilitiesBitmask.$invalid && submitted }" />
                        <div v-if="v$.model.discoveryCapabilitiesBitmask.$invalid && submitted" class="p-error">Discovery Capabilities Bitmask is invalid</div>
                    </div>



                    <!-- Field for schemaVersion -->
                    <div class="field">
                        <label for="schemaVersion">
                            <IconField v-tooltip.top="'Schema version to support backward/forward compatibility (default 1)'">
                                Schema Version
                                <i class="pi pi-info-circle ml-2"></i>
                            </IconField>
                        </label>
                        <InputText id="schemaVersion" type="text" v-model="v$.model.schemaVersion.$model" :class="{ 'p-invalid': v$.model.schemaVersion.$invalid && submitted }" />
                        <div v-if="v$.model.schemaVersion.$invalid && submitted" class="p-error">Schema Version is required</div>
                    </div>

                    <!-- Field for icdUserActiveModeTriggerHint -->
                    <div class="field">
                        <label for="icdUserActiveModeTriggerHint">
                            <IconField v-tooltip.top="'Hint for steps to trigger user active mode on Intermittently Connected Devices (ICD)'">
                                ICD User Active Mode Trigger Hint
                                <i class="pi pi-info-circle ml-2"></i>
                            </IconField>
                        </label>
                        <InputText id="icdUserActiveModeTriggerHint" type="text" v-model="v$.model.icdUserActiveModeTriggerHint.$model" :class="{ 'p-invalid': v$.model.icdUserActiveModeTriggerHint.$invalid && submitted }" />
                        <div v-if="v$.model.icdUserActiveModeTriggerHint.$invalid && submitted" class="p-error">ICD User Active Mode Trigger Hint is invalid</div>
                    </div>

                    <!-- Field for icdUserActiveModeTriggerInstruction -->
                    <div class="field">
                        <label for="icdUserActiveModeTriggerInstruction">
                            <IconField v-tooltip.top="'Instructions for triggering user active mode on Intermittently Connected Devices (ICD)'">
                                ICD User Active Mode Trigger Instruction
                                <i class="pi pi-info-circle ml-2"></i>
                            </IconField>
                        </label>
                        <InputText id="icdUserActiveModeTriggerInstruction" type="text" v-model="v$.model.icdUserActiveModeTriggerInstruction.$model" :class="{ 'p-invalid': v$.model.icdUserActiveModeTriggerInstruction.$invalid && submitted }" />
                        <div v-if="v$.model.icdUserActiveModeTriggerInstruction.$invalid && submitted" class="p-error">ICD User Active Mode Trigger Instruction is invalid</div>
                    </div>

                    <!-- Field for factoryResetStepsHint -->
                    <div class="field">
                        <label for="factoryResetStepsHint">
                            <IconField v-tooltip.top="'Hint for steps to perform factory reset on the device'">
                                Factory Reset Steps Hint
                                <i class="pi pi-info-circle ml-2"></i>
                            </IconField>
                        </label>
                        <InputText id="factoryResetStepsHint" type="text" v-model="v$.model.factoryResetStepsHint.$model" :class="{ 'p-invalid': v$.model.factoryResetStepsHint.$invalid && submitted }" />
                        <div v-if="v$.model.factoryResetStepsHint.$invalid && submitted" class="p-error">Factory Reset Steps Hint is invalid</div>
                    </div>

                    <!-- Field for factoryResetStepsInstruction -->
                    <div class="field">
                        <label for="factoryResetStepsInstruction">
                            <IconField v-tooltip.top="'Instructions for performing factory reset on the device'">
                                Factory Reset Steps Instruction
                                <i class="pi pi-info-circle ml-2"></i>
                            </IconField>
                        </label>
                        <InputText id="factoryResetStepsInstruction" type="text" v-model="v$.model.factoryResetStepsInstruction.$model" :class="{ 'p-invalid': v$.model.factoryResetStepsInstruction.$invalid && submitted }" />
                        <div v-if="v$.model.factoryResetStepsInstruction.$invalid && submitted" class="p-error">Factory Reset Steps Instruction is invalid</div>
                    </div>

                    <div class="field">
                        <Button class="p-button-primary" v-if="!txProcessing" v-tooltip="'This will open keplr wallet window. Please finish the transaction there.'" type="submit" label="Save" icon="pi pi-save" iconPos="left" />
                        <Button class="p-button-primary" v-if="txProcessing" label="Submitted Tx.." disabled="disabled" icon="pi pi-spin pi-spinner" iconPos="left" />
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
