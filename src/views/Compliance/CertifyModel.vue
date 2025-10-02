<script>
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import MultiSelect from 'primevue/multiselect';
import Button from 'primevue/button';
import { required, minValue } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
import Message from 'primevue/message';
import { MsgCertifyModel } from 'zigbee-alliance-distributed-compliance-ledger-client-ts/zigbeealliance.distributedcomplianceledger.compliance/types';

export default {
    name: 'CertifyModel',
    props: ['model', 'viewOnly'],

    components: {
        InputText,
        Dropdown,
        MultiSelect,
        Button,
        Message
    },
    setup: () => ({ v$: useVuelidate() }),
    data() {
        return {
            txProcessing: false,
            submitted: false,
            error: null,
            certificationType: ['zigbee', 'matter'],
            msgCertifyModel: MsgCertifyModel.fromPartial({})
        };
    },

    validations() {
        return {
            msgCertifyModel: {
                vid: {
                    required,
                    minValue: minValue(1)
                },
                pid: {
                    required,
                    minValue: minValue(1)
                },
                softwareVersion: {
                    required
                },
                softwareVersionString: {
                    required
                },
                cDVersionNumber: {},
                certificationDate: {
                    required
                },
                certificationType: {
                    required
                },
                reason: {},
                programTypeVersion: {},
                cDCertificateId: {
                    required
                },
                familyId: {},
                supportedClusters: {},
                compliantPlatformUsed: {},
                compliantPlatformVersion: {},
                OSVersion: {},
                certificationRoute: {},
                programType: {},
                transport: {},
                parentChild: {},
                certificationIdOfSoftwareComponent: {}
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
            const method = this.update ? 'sendMsgUpdateComplianceInfo' : 'sendMsgCertifyModel';

            this.txProcessing = true;
            let loader = this.$loading.show();
            this.msgCertifyModel.signer = creatorAddress;
            this.msgCertifyModel.creator = creatorAddress;
            this.$store
                .dispatch(`zigbeealliance.distributedcomplianceledger.compliance/${method}`, {
                    value: this.msgCertifyModel
                })
                .then(
                    (response) => {
                        this.txProcessing = false;
                        loader.hide();
                        if (response.code == 0) {
                            this.error = null;
                            this.$toast.add({ severity: 'success', summary: 'Successful Tx', detail: ' Tx sent successfully', life: 3000 });
                            this.$emit('close-dialog');
                        } else {
                            this.$toast.add({ severity: 'error', summary: 'Error while processing Tx', detail: ' Tx failed', life: 3000 });
                            this.error = response;
                        }
                    },
                    (error) => {
                        this.$toast.add({ severity: 'error', summary: 'Error while processing Tx', detail: ' Tx failed', life: 3000 });
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
        if (this.model) {
            this.update = true;
            this.msgCertifyModel = MsgCertifyModel.fromPartial(this.model);
        } else {
            this.update = false;
            this.msgCertifyModel = MsgCertifyModel.fromPartial({});
        }

        // Set default as 1 for cDVersionNumber and 'matter' for certificationType
        this.msgCertifyModel.cDVersionNumber = 1;
        this.msgCertifyModel.certificationType = 'matter';
    }
};
</script>

	<template>
    <div>
        <Message :closable="false" v-if="error" severity="error">{{ errorMessage() }}</Message>
        <div v-if="viewOnly === true">
            <table>
                <tr>
                    <td class="p-text">Vendor ID</td>
                    <td>{{ msgCertifyModel.vid }}</td>
                </tr>
                <tr>
                    <td>Product ID</td>
                    <td>{{ msgCertifyModel.pid }}</td>
                </tr>
                <tr>
                    <td>Software Version</td>
                    <td>{{ msgCertifyModel.softwareVersion }}</td>
                </tr>
                <tr>
                    <td>Software Version String</td>
                    <td>{{ msgCertifyModel.softwareVersionString }}</td>
                </tr>
                <tr>
                    <td>CD Version Number</td>
                    <td>{{ msgCertifyModel.cDVersionNumber }}</td>
                </tr>
                <tr>
                    <td>Certification Date</td>
                    <td>{{ msgCertifyModel.certificationDate }}</td>
                </tr>
                <tr>
                    <td>Certification Type</td>
                    <td>{{ msgCertifyModel.certificationType }}</td>
                </tr>
                <tr>
                    <td>Reason</td>
                    <td>{{ msgCertifyModel.reason }}</td>
                </tr>
                <tr>
                    <td>Program Type Version</td>
                    <td>{{ msgCertifyModel.programTypeVersion }}</td>
                </tr>
                <tr>
                    <td>CD Certificate Id</td>
                    <td>{{ msgCertifyModel.cDCertificateId }}</td>
                </tr>
                <tr>
                    <td>Family Id</td>
                    <td>{{ msgCertifyModel.familyId }}</td>
                </tr>
                <tr>
                    <td>Supported Clusters</td>
                    <td>{{ msgCertifyModel.supportedClusters }}</td>
                </tr>
                <tr>
                    <td>Compliant Platform Used</td>
                    <td>{{ msgCertifyModel.compliantPlatformUsed }}</td>
                </tr>
                <tr>
                    <td>Compliant Platform Version</td>
                    <td>{{ msgCertifyModel.compliantPlatformVersion }}</td>
                </tr>
                <tr>
                    <td>OS Version</td>
                    <td>{{ msgCertifyModel.OSVersion }}</td>
                </tr>
                <tr>
                    <td>Certification Route</td>
                    <td>{{ msgCertifyModel.certificationRoute }}</td>
                </tr>
                <tr>
                    <td>Program Type</td>
                    <td>{{ msgCertifyModel.programType }}</td>
                </tr>
                <tr>
                    <td>Transport</td>
                    <td>{{ msgCertifyModel.transport }}</td>
                </tr>
                <tr>
                    <td>ParentChild</td>
                    <td>{{ msgCertifyModel.parentChild }}</td>
                </tr>
                <tr>
                    <td>CertificationId Of SoftwareComponent</td>
                    <td>{{ msgCertifyModel.certificationIdOfSoftwareComponent }}</td>
                </tr>
            </table>
        </div>
        <div v-else class="p-fluid">
            <form @submit.prevent="handleSubmit(!v$.$invalid)" class="">
                <!-- Field for vid -->
                <div class="field">
                    <label for="vid"> Vendor ID <span class="required">*</span> </label>
                    <InputText id="vid" type="text" v-model="v$.msgCertifyModel.vid.$model" :class="{ 'p-invalid': v$.msgCertifyModel.vid.$invalid && submitted }" :readonly="model.vid" />
                    <div v-if="v$.msgCertifyModel.vid.$invalid && submitted" class="p-error">Vendor ID is required and must be a positive non-zero value</div>
                </div>

                <!-- Field for pid -->
                <div class="field">
                    <label for="pid"> Product ID <span class="required">*</span> </label>
                    <InputText id="pid" type="text" v-model="v$.msgCertifyModel.pid.$model" :class="{ 'p-invalid': v$.msgCertifyModel.pid.$invalid && submitted }" :readonly="model.pid" />
                    <div v-if="v$.msgCertifyModel.pid.$invalid && submitted" class="p-error">Product ID is required and must be a positive non-zero value</div>
                </div>

                <!-- Field for softwareVersion -->
                <div class="field">
                    <label for="softwareVersion"> Software Version <span class="required">*</span> </label>
                    <InputText id="softwareVersion" type="text" v-model="v$.msgCertifyModel.softwareVersion.$model" :class="{ 'p-invalid': v$.msgCertifyModel.softwareVersion.$invalid && submitted }" :readonly="model.softwareVersion" />
                    <div v-if="v$.msgCertifyModel.softwareVersion.$invalid && submitted" class="p-error">Software Version is required</div>
                </div>

                <!-- Field for softwareVersionString -->
                <div class="field">
                    <label for="softwareVersionString"> Software Version String <span class="required">*</span> </label>
                    <InputText
                        id="softwareVersionString"
                        type="text"
                        v-model="v$.msgCertifyModel.softwareVersionString.$model"
                        :class="{ 'p-invalid': v$.msgCertifyModel.softwareVersionString.$invalid && submitted }"
                        :readonly="model.softwareVersionString"
                    />
                    <div v-if="v$.msgCertifyModel.softwareVersionString.$invalid && submitted" class="p-error">Software Version String is required</div>
                </div>

                <!-- Field for cDCertificateId -->
                <div class="field">
                    <label for="cDCertificateId"> CD Certificate Id <span class="required">*</span> </label>
                    <InputText id="cDCertificateId" type="text" v-model="v$.msgCertifyModel.cDCertificateId.$model" :class="{ 'p-invalid': v$.msgCertifyModel.cDCertificateId.$invalid && submitted }" />
                    <div v-if="v$.msgCertifyModel.cDCertificateId.$invalid && submitted" class="p-error">CD Certificate Id is required</div>
                </div>

                <!-- Field for CD Version Number -->
                <div class="field">
                    <label for="cDVersionNumber"> CD Version Number </label>
                    <InputText id="cDVersionNumber" type="text" v-model="v$.msgCertifyModel.cDVersionNumber.$model" :class="{ 'p-invalid': v$.msgCertifyModel.cDVersionNumber.$invalid && submitted }" />
                    <div v-if="v$.msgCertifyModel.cDVersionNumber.$invalid && submitted" class="p-error">CD Version Number is required</div>
                </div>

                <!-- Field for certificationDate -->
                <div class="field">
                    <label for="certificationDate"> Certification Date <span class="required">*</span> </label>
                    <InputText id="certificationDate" type="text" v-model="v$.msgCertifyModel.certificationDate.$model" :class="{ 'p-invalid': v$.msgCertifyModel.certificationDate.$invalid && submitted }" />
                    <div v-if="v$.msgCertifyModel.certificationDate.$invalid && submitted" class="p-error">Certification Date is required</div>
                </div>

                <!-- Field for certificationType -->
                <div class="field">
                    <label for="certificationType"> Certification Type <span class="required">*</span> </label>
                    <Dropdown id="certificationType" v-model="v$.msgCertifyModel.certificationType.$model" :options="certificationType" :class="{ 'p-invalid': v$.msgCertifyModel.certificationType.$invalid && submitted }" />
                    <div v-if="v$.msgCertifyModel.certificationType.$invalid && submitted" class="p-error">Certification Type is required</div>
                </div>

                <!-- Field for reason -->
                <div class="field">
                    <label for="reason"> Reason </label>
                    <InputText id="reason" Type="text" v-model="v$.msgCertifyModel.reason.$model" :class="{ 'p-invalid': v$.msgCertifyModel.reason.$invalid && submitted }" />
                    <div v-if="v$.msgCertifyModel.reason.$invalid && submitted" class="p-error">Reason is required</div>
                </div>

                <!-- Field for programTypeVersion -->
                <div class="field">
                    <label for="programTypeVersion"> Program Type Version </label>
                    <InputText id="programTypeVersion" type="text" v-model="v$.msgCertifyModel.programTypeVersion.$model" :class="{ 'p-invalid': v$.msgCertifyModel.programTypeVersion.$invalid && submitted }" />
                    <div v-if="v$.msgCertifyModel.programTypeVersion.$invalid && submitted" class="p-error">Program Type Version is required</div>
                </div>

                <!-- Field for familyId -->
                <div class="field">
                    <label for="familyId"> Family Id </label>
                    <InputText id="familyId" type="text" v-model="v$.msgCertifyModel.familyId.$model" :class="{ 'p-invalid': v$.msgCertifyModel.familyId.$invalid && submitted }" />
                    <div v-if="v$.msgCertifyModel.familyId.$invalid && submitted" class="p-error">Family Id is required</div>
                </div>

                <!-- Field for supportedClusters -->
                <div class="field">
                    <label for="supportedClusters"> Supported Clusters </label>
                    <InputText id="supportedClusters" type="text" v-model="v$.msgCertifyModel.supportedClusters.$model" :class="{ 'p-invalid': v$.msgCertifyModel.supportedClusters.$invalid && submitted }" />
                    <div v-if="v$.msgCertifyModel.supportedClusters.$invalid && submitted" class="p-error">Supported Clusters is required</div>
                </div>

                <!-- Field for compliantPlatformUsed -->
                <div class="field">
                    <label for="compliantPlatformUsed"> Compliant Platform Used </label>
                    <InputText id="compliantPlatformUsed" type="text" v-model="v$.msgCertifyModel.compliantPlatformUsed.$model" :class="{ 'p-invalid': v$.msgCertifyModel.compliantPlatformUsed.$invalid && submitted }" />
                    <div v-if="v$.msgCertifyModel.compliantPlatformUsed.$invalid && submitted" class="p-error">Compliant Platform Used is required</div>
                </div>

                <!-- Field for OSVersion -->
                <div class="field">
                    <label for="OSVersion"> OS Version </label>
                    <InputText id="OSVersion" type="text" v-model="v$.msgCertifyModel.OSVersion.$model" :class="{ 'p-invalid': v$.msgCertifyModel.OSVersion.$invalid && submitted }" />
                    <div v-if="v$.msgCertifyModel.OSVersion.$invalid && submitted" class="p-error">OS Version is required</div>
                </div>

                <!-- Field for certificationRoute -->
                <div class="field">
                    <label for="certificationRoute"> Certification Route </label>
                    <InputText id="certificationRoute" type="text" v-model="v$.msgCertifyModel.certificationRoute.$model" :class="{ 'p-invalid': v$.msgCertifyModel.certificationRoute.$invalid && submitted }" />
                    <div v-if="v$.msgCertifyModel.certificationRoute.$invalid && submitted" class="p-error">Certification Route is required</div>
                </div>

                <!-- Field for programType -->
                <div class="field">
                    <label for="programType"> Program Type </label>
                    <InputText id="programType" type="text" v-model="v$.msgCertifyModel.programType.$model" :class="{ 'p-invalid': v$.msgCertifyModel.programType.$invalid && submitted }" />
                    <div v-if="v$.msgCertifyModel.programType.$invalid && submitted" class="p-error">Program Type is required</div>
                </div>

                <!-- Field for transport -->
                <div class="field">
                    <label for="transport"> Transport </label>
                    <InputText id="transport" type="text" v-model="v$.msgCertifyModel.transport.$model" :class="{ 'p-invalid': v$.msgCertifyModel.transport.$invalid && submitted }" />
                    <div v-if="v$.msgCertifyModel.transport.$invalid && submitted" class="p-error">Transport is required</div>
                </div>

                <!-- Field for parentChild -->
                <div class="field">
                    <label for="parentChild"> ParentChild </label>
                    <InputText id="parentChild" type="text" v-model="v$.msgCertifyModel.parentChild.$model" :class="{ 'p-invalid': v$.msgCertifyModel.parentChild.$invalid && submitted }" />
                    <div v-if="v$.msgCertifyModel.parentChild.$invalid && submitted" class="p-error">ParentChild is required</div>
                </div>

                <!-- Field for certificationIdOfSoftwareComponent -->
                <div class="field">
                    <label for="certificationIdOfSoftwareComponent"> CertificationId Of SoftwareComponent </label>
                    <InputText
                        id="certificationIdOfSoftwareComponent"
                        type="text"
                        v-model="v$.msgCertifyModel.certificationIdOfSoftwareComponent.$model"
                        :class="{ 'p-invalid': v$.msgCertifyModel.certificationIdOfSoftwareComponent.$invalid && submitted }"
                    />
                    <div v-if="v$.msgCertifyModel.certificationIdOfSoftwareComponent.$invalid && submitted" class="p-error">CertificationId Of SoftwareComponent is required</div>
                </div>

                <div class="field">
                    <Button class="p-button-primary" v-if="!txProcessing" type="submit" label="Submit" icon="pi pi-check" v-tooltip="'This will open keplr wallet window. Please finish the transaction there.'" iconPos="left" />
                    <Button class="p-button-primary" v-if="txProcessing" label="Submitted Tx.." disabled="disabled" icon="pi pi-spin pi-spinner" iconPos="left" />
                    <Button label="Cancel" @click="onClose" class="p-button-secondary" icon="pi pi-times" iconPos="left" />
                </div>
            </form>
        </div>
    </div>
</template>