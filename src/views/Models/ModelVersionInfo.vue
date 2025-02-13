<script>
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import Button from 'primevue/button';
import { required } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
//import {encoding_1} from "@cosmjs/encoding";
//const encoding_1 = require("@cosmjs/encoding");
import { DirectSecp256k1HdWallet, Registry } from '@cosmjs/proto-signing';
import { assertIsBroadcastTxSuccess, SigningStargateClient, StargateClient } from '@cosmjs/stargate';
import { fromBase64 } from '@cosmjs/encoding';
import { Any } from 'cosmjs-types/google/protobuf/any';
import { decodePubkey, encodePubkey } from '@cosmjs/proto-signing';
import { ModelVersion } from '../../store/generated/zigbee-alliance/distributed-compliance-ledger/zigbeealliance.distributedcomplianceledger.model/module/types/model/model_version';
import Message from 'primevue/message';
export default {
    name: 'ModelVersionInfo',
    components: {
        InputText,
        Dropdown,
        Button,
        Message
    },
    setup: () => ({ v$: useVuelidate() }),
    props: ['selectedModelVersion', 'viewOnly', 'vid', 'pid'],
    data() {
        return {
            txProcessing: false,
            update: false,
            submitted: false,
            error: null,
            modelVersion: ModelVersion.fromPartial({})
        };
    },
    validations() {
        return {
            modelVersion: {
                vid: {
                    required
                },
                pid: {
                    required
                },
                softwareVersion: {
                    required
                },
                softwareVersionString: {
                    required
                },
                cdVersionNumber: {},
                firmwareInformation: {},
                softwareVersionValid: {},
                otaUrl: {},
                otaFileSize: {},
                otaChecksum: {},
                otaChecksumType: {},
                minApplicableSoftwareVersion: {
                    required
                },
                maxApplicableSoftwareVersion: {
                    required
                },
                releaseNotesUrl: {},
                creator: {},
                schemaVersion: {}
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
            let methodName = 'sendMsgCreateModelVersion';
            if (this.update) {
                methodName = 'sendMsgUpdateModelVersion';
            }
            this.modelVersion.creator = creatorAddress;
            this.$store
                .dispatch(`zigbeealliance.distributedcomplianceledger.model/${methodName}`, {
                    value: this.modelVersion
                })
                .then(
                    (response) => {
                        this.txProcessing = false;
                        loader.hide();
                        if (response.code == 0) {
                            this.error = null;
                            this.$emit('refresh');
                            this.$toast.add({
                                severity: 'success',
                                summary: 'Successful Tx',
                                detail: 'ModelVersionInfo Tx sent successfully',
                                life: 3000
                            });
                            this.$emit('close-dialog');
                        } else {
                            this.$toast.add({
                                severity: 'error',
                                summary: 'Error while processing Tx',
                                detail: 'ModelVersionInfo Tx failed',
                                life: 3000
                            });
                            this.error = response;
                        }
                    },
                    (error) => {
                        this.$toast.add({
                            severity: 'error',
                            summary: 'Error while processing Tx',
                            detail: 'ModelVersionInfo Tx failed',
                            life: 3000
                        });
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
        if (this.selectedModelVersion) {
            this.modelVersion = ModelVersion.fromPartial(this.selectedModelVersion);
            this.update = true;
        } else {
            this.modelVersion = ModelVersion.fromPartial({
                vid: this.vid,
                pid: this.pid,
                softwareVersionValid: true,
                cdVersionNumber: 1
            });
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
                    <td>{{ selectedModelVersion.vidHex }}</td>
                </tr>
                <tr>
                    <td>Product ID</td>
                    <td>{{ selectedModelVersion.pidHex }}</td>
                </tr>
                <tr>
                    <td>Software Version</td>
                    <td>{{ selectedModelVersion.softwareVersion }}</td>
                </tr>
                <tr>
                    <td>Software Version String</td>
                    <td>{{ selectedModelVersion.softwareVersionString }}</td>
                </tr>
                <tr>
                    <td>CD Version Number</td>
                    <td>{{ selectedModelVersion.cdVersionNumber }}</td>
                </tr>
                <tr>
                    <td>Firmware Information</td>
                    <td>{{ selectedModelVersion.firmwareInformation }}</td>
                </tr>
                <tr>
                    <td>Software Version Valid</td>
                    <td>{{ selectedModelVersion.softwareVersionValid }}</td>
                </tr>
                <tr>
                    <td>OTA URL</td>
                    <td>{{ selectedModelVersion.otaUrl }}</td>
                </tr>
                <tr>
                    <td>OTA File Size</td>
                    <td>{{ selectedModelVersion.otaFileSize }}</td>
                </tr>
                <tr>
                    <td>OTA Checksum</td>
                    <td>{{ selectedModelVersion.otaChecksum }}</td>
                </tr>
                <tr>
                    <td>OTA Checksum Type</td>
                    <td>{{ selectedModelVersion.otaChecksumType }}</td>
                </tr>
                <tr>
                    <td>Min Applicable Software Version</td>
                    <td>{{ selectedModelVersion.minApplicableSoftwareVersion }}</td>
                </tr>
                <tr>
                    <td>Max Applicable Software Version</td>
                    <td>{{ selectedModelVersion.maxApplicableSoftwareVersion }}</td>
                </tr>
                <tr>
                    <td>Release Notes URL</td>
                    <td>{{ selectedModelVersion.releaseNotesUrl }}</td>
                </tr>
                <tr>
                    <td>Schema Version</td>
                    <td>{{ selectedModelVersion.schemaVersion }}</td>
                </tr>
                <tr>
                    <td>Creator</td>
                    <td>{{ selectedModelVersion.creator }}</td>
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
                                VID <span class="required">*</span>
                                <i class="pi pi-info-circle ml-2"></i>
                            </IconField>
                        </label>
                        <InputText id="vid" type="text" class="p-disabled" v-model="v$.modelVersion.vid.$model" />
                        <div v-if="v$.modelVersion.vid.$invalid && submitted" class="p-error">VID is required and must be a positive non-zero value</div>
                    </div>

                    <!-- Field for pid -->
                    <div class="field">
                        <label for="pid">
                            <IconField v-tooltip.top="'Product ID is a positive non-zero value'">
                                PID <span class="required">*</span>
                                <i class="pi pi-info-circle ml-2"></i>
                            </IconField>
                        </label>
                        <InputText id="pid" type="text" class="p-disabled" v-model="v$.modelVersion.pid.$model" />
                        <div v-if="v$.modelVersion.pid.$invalid && submitted" class="p-error">PID is required and must be a positive non-zero value</div>
                    </div>

                    <!-- Field for softwareVersion -->
                    <div class="field">
                        <label for="softwareVersion">
                            <IconField v-tooltip.top="'Model software version'">
                                Software Version <span class="required">*</span>
                                <i class="pi pi-info-circle ml-2"></i>
                            </IconField>
                        </label>
                        <InputText
                            id="softwareVersion"
                            type="text"
                            v-model="v$.modelVersion.softwareVersion.$model"
                            :class="{
                                'p-invalid': v$.modelVersion.softwareVersion.$invalid && submitted,
                                'p-disabled': this.update
                            }"
                        />
                        <div v-if="v$.modelVersion.softwareVersion.$invalid && submitted" class="p-error">Software Version is required</div>
                    </div>

                    <!-- Field for softwareVersionString -->
                    <div class="field">
                        <label for="softwareVersionString">
                            <IconField v-tooltip.top="'Model software version string'">
                                Software Version String <span class="required">*</span>
                                <i class="pi pi-info-circle ml-2"></i>
                            </IconField>
                        </label>
                        <InputText
                            id="softwareVersionString"
                            type="text"
                            v-model="v$.modelVersion.softwareVersionString.$model"
                            :class="{
                                'p-invalid': v$.modelVersion.softwareVersionString.$invalid && submitted,
                                'p-disabled': this.update
                            }"
                        />
                        <div v-if="v$.modelVersion.softwareVersionString.$invalid && submitted" class="p-error">Software Version String is required</div>
                    </div>

                    <!-- Field for minApplicableSoftwareVersion -->
                    <div class="field">
                        <label for="minApplicableSoftwareVersion">
                            <IconField v-tooltip.top="'Lowest Software Version for which this image can be applied'">
                                Min Applicable Software Version <span class="required">*</span>
                                <i class="pi pi-info-circle ml-2"></i>
                            </IconField>
                        </label>
                        <InputText
                            id="minApplicableSoftwareVersion"
                            type="text"
                            v-model="v$.modelVersion.minApplicableSoftwareVersion.$model"
                            :class="{
                                'p-invalid': v$.modelVersion.minApplicableSoftwareVersion.$invalid && submitted
                            }"
                        />
                        <div v-if="v$.modelVersion.minApplicableSoftwareVersion.$invalid && submitted" class="p-error">Min Applicable Software Version is required</div>
                    </div>

                    <!-- Field for maxApplicableSoftwareVersion -->
                    <div class="field">
                        <label for="maxApplicableSoftwareVersion">
                            <IconField v-tooltip.top="'Highest Software Version for which this image can be applied'">
                                Max Applicable Software Version <span class="required">*</span>
                                <i class="pi pi-info-circle ml-2"></i>
                            </IconField>
                        </label>
                        <InputText
                            id="maxApplicableSoftwareVersion"
                            type="text"
                            v-model="v$.modelVersion.maxApplicableSoftwareVersion.$model"
                            :class="{
                                'p-invalid': v$.modelVersion.maxApplicableSoftwareVersion.$invalid && submitted
                            }"
                        />
                        <div v-if="v$.modelVersion.maxApplicableSoftwareVersion.$invalid && submitted" class="p-error">Max Applicable Software Version is required</div>
                    </div>

                    <!-- Field for cdVersionNumber -->
                    <div class="field">
                        <label for="cdVersionNumber">
                            <IconField v-tooltip.top="'CD Version Number of the certification'">
                                CD Version Number
                                <i class="pi pi-info-circle ml-2"></i>
                            </IconField>
                        </label>
                        <InputText id="cdVersionNumber" type="text" v-model="v$.modelVersion.cdVersionNumber.$model" class="p-disabled" />
                        <div v-if="v$.modelVersion.cdVersionNumber.$invalid && submitted" class="p-error">CD Version Number is required</div>
                    </div>

                    <!-- Field for firmwareInformation -->
                    <div class="field">
                        <label for="firmwareInformation">
                            <IconField v-tooltip.top="'Firmware Information field included in the Device Attestation response when this Software Image boots on the device'">
                                Firmware Information
                                <i class="pi pi-info-circle ml-2"></i>
                            </IconField>
                        </label>
                        <InputText
                            id="firmwareInformation"
                            type="text"
                            v-model="v$.modelVersion.firmwareInformation.$model"
                            :class="{
                                'p-invalid': v$.modelVersion.firmwareInformation.$invalid && submitted,
                                'p-disabled': this.update
                            }"
                        />
                        <div v-if="v$.modelVersion.firmwareInformation.$invalid && submitted" class="p-error">Firmware Information is required</div>
                    </div>

                    <!-- Field for softwareVersionValid -->
                    <div class="field">
                        <label for="softwareVersionValid">
                            <IconField v-tooltip.top="'Flag to indicate whether the software version is valid or not (default true)'">
                                Software Version Valid
                                <i class="pi pi-info-circle ml-2"></i>
                            </IconField>
                        </label>
                        <Dropdown
                            id="softwareVersionValid"
                            v-model="v$.modelVersion.softwareVersionValid.$model"
                            :options="[
                                { label: 'True', value: true },
                                { label: 'False', value: false }
                            ]"
                            optionLabel="label"
                            optionValue="value"
                            :class="{ 'p-invalid': v$.modelVersion.softwareVersionValid.$invalid && submitted }"
                        />
                        <div v-if="v$.modelVersion.softwareVersionValid.$invalid && submitted" class="p-error">Software Version Valid is required</div>
                    </div>

                    <!-- Field for otaUrl -->
                    <div class="field">
                        <label for="otaUrl">
                            <IconField v-tooltip.top="'URL where to obtain the OTA image'">
                                OTA URL
                                <i class="pi pi-info-circle ml-2"></i>
                            </IconField>
                        </label>
                        <InputText
                            id="otaUrl"
                            type="text"
                            v-model="v$.modelVersion.otaUrl.$model"
                            :class="{
                                'p-invalid': v$.modelVersion.otaUrl.$invalid && submitted
                            }"
                        />
                        <div v-if="v$.modelVersion.otaUrl.$invalid && submitted" class="p-error">OTA URL is required</div>
                    </div>

                    <!-- Field for otaFileSize -->
                    <div class="field">
                        <label for="otaFileSize">
                            <IconField v-tooltip.top="'Total size of the OTA software image in bytes'">
                                OTA File Size
                                <i class="pi pi-info-circle ml-2"></i>
                            </IconField>
                        </label>
                        <InputText
                            id="otaFileSize"
                            type="text"
                            v-model="v$.modelVersion.otaFileSize.$model"
                            :class="{
                                'p-invalid': v$.modelVersion.otaFileSize.$invalid && submitted,
                                'p-disabled': this.update
                            }"
                        />
                        <div v-if="v$.modelVersion.otaFileSize.$invalid && submitted" class="p-error">OTA File Size is required</div>
                    </div>

                    <!-- Field for otaChecksum -->
                    <div class="field">
                        <label for="otaChecksum">
                            <IconField v-tooltip.top="'Digest of the entire contents of the associated OTA Software Update Image under the OtaUrl attribute, encoded in base64 string representation'">
                                OTA Checksum
                                <i class="pi pi-info-circle ml-2"></i>
                            </IconField>
                        </label>
                        <InputText
                            id="otaChecksum"
                            type="text"
                            v-model="v$.modelVersion.otaChecksum.$model"
                            :class="{
                                'p-invalid': v$.modelVersion.otaChecksum.$invalid && submitted,
                                'p-disabled': this.update
                            }"
                        />
                        <div v-if="v$.modelVersion.otaChecksum.$invalid && submitted" class="p-error">OTA Checksum is required</div>
                    </div>

                    <!-- Field for otaChecksumType -->
                    <div class="field">
                        <label for="otaChecksumType">
                            <IconField
                                v-tooltip.top="
                                    'Numeric identifier as defined in IANA Named Information Hash Algorithm Registry for the type of otaChecksum. For example, a value of 1 would match the sha-256 identifier, which maps to the SHA-256 digest algorithm'
                                "
                            >
                                OTA Checksum Type
                                <i class="pi pi-info-circle ml-2"></i>
                            </IconField>
                        </label>
                        <InputText
                            id="otaChecksumType"
                            type="text"
                            v-model="v$.modelVersion.otaChecksumType.$model"
                            :class="{
                                'p-invalid': v$.modelVersion.otaChecksumType.$invalid && submitted,
                                'p-disabled': this.update
                            }"
                        />
                        <div v-if="v$.modelVersion.otaChecksumType.$invalid && submitted" class="p-error">OTA Checksum Type is required</div>
                    </div>

                    <!-- Field for releaseNotesUrl -->
                    <div class="field">
                        <label for="releaseNotesUrl">
                            <IconField v-tooltip.top="'URL that contains product-specific web page with release notes for the device model'">
                                Release Notes URL
                                <i class="pi pi-info-circle ml-2"></i>
                            </IconField>
                        </label>
                        <InputText
                            id="releaseNotesUrl"
                            type="text"
                            v-model="v$.modelVersion.releaseNotesUrl.$model"
                            :class="{
                                'p-invalid': v$.modelVersion.releaseNotesUrl.$invalid && submitted
                            }"
                        />
                        <div v-if="v$.modelVersion.releaseNotesUrl.$invalid && submitted" class="p-error">Release Notes URL is required</div>
                    </div>

                    <!-- Field for schemaVersion -->
                    <div class="field">
                        <label for="schemaVersion">
                            <IconField v-tooltip.top="'Schema version to support backward/forward compatibility (default 0)'">
                                Schema Version
                                <i class="pi pi-info-circle ml-2"></i>
                            </IconField>
                        </label>
                        <InputText
                            id="schemaVersion"
                            type="text"
                            v-model="v$.modelVersion.schemaVersion.$model"
                            :class="{
                                'p-invalid': v$.modelVersion.schemaVersion.$invalid && submitted
                            }"
                        />
                        <div v-if="v$.modelVersion.schemaVersion.$invalid && submitted" class="p-error">Schema Version is required</div>
                    </div>

                    <div class="field">
                        <Button class="p-button-primary" v-tooltip="'This will open keplr wallet window. Please finish the transaction there.'" v-if="!txProcessing" type="submit" label="Save" icon="pi pi-save" iconPos="left" />
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
