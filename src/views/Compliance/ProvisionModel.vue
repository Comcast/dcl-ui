<script>
import InputText from 'primevue/inputtext';
import MultiSelect from 'primevue/multiselect';
import Button from 'primevue/button';
import { required, minValue } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
import Message from 'primevue/message';
import { MsgProvisionModel } from '../../store/generated/zigbee-alliance/distributed-compliance-ledger/zigbeealliance.distributedcomplianceledger.compliance/module/types/compliance/tx';

export default {
    name: 'ProvisionModel',
    props: ['model'],

    components: {
        InputText,
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
            msgProvisionModel: MsgProvisionModel.fromPartial({})
        };
    },

    validations() {
        return {
            msgProvisionModel: {
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
                provisionalDate: {
                    required
                },
                certificationType: {
                    required
                },
                reason: {}
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
            this.msgProvisionModel.signer = creatorAddress;
            this.$store
                .dispatch(`zigbeealliance.distributedcomplianceledger.compliance/sendMsgProvisionModel`, {
                    value: this.msgProvisionModel
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
        this.msgProvisionModel = MsgProvisionModel.fromPartial(this.model || {});
    }
};
</script>

	<template>
    <div>
        <Message :closable="false" v-if="error" severity="error">{{ errorMessage() }}</Message>
        <div class="p-fluid">
            <form @submit.prevent="handleSubmit(!v$.$invalid)" class="">
                <!-- Field for vid -->
                <div class="field">
                    <label for="vid">Vendor ID <span class="required">*</span></label>
                    <InputText id="vid" type="text" v-model="v$.msgProvisionModel.vid.$model" :class="{ 'p-invalid': v$.msgProvisionModel.vid.$invalid && submitted }" />
                    <div v-if="v$.msgProvisionModel.vid.$invalid && submitted" class="p-error">Vendor ID is required and must be a positive non-zero value</div>
                </div>

                <!-- Field for pid -->
                <div class="field">
                    <label for="pid">Product ID <span class="required">*</span></label>
                    <InputText id="pid" type="text" v-model="v$.msgProvisionModel.pid.$model" :class="{ 'p-invalid': v$.msgProvisionModel.pid.$invalid && submitted }" />
                    <div v-if="v$.msgProvisionModel.pid.$invalid && submitted" class="p-error">Product ID is required and must be a positive non-zero value</div>
                </div>

                <!-- Field for softwareVersion -->
                <div class="field">
                    <label for="softwareVersion">Software Version <span class="required">*</span></label>
                    <InputText id="softwareVersion" type="text" v-model="v$.msgProvisionModel.softwareVersion.$model" :class="{ 'p-invalid': v$.msgProvisionModel.softwareVersion.$invalid && submitted }" />
                    <div v-if="v$.msgProvisionModel.softwareVersion.$invalid && submitted" class="p-error">Software Version is required</div>
                </div>

                <!-- Field for softwareVersionString -->
                <div class="field">
                    <label for="softwareVersionString">Software Version String <span class="required">*</span></label>
                    <InputText id="softwareVersionString" type="text" v-model="v$.msgProvisionModel.softwareVersionString.$model" :class="{ 'p-invalid': v$.msgProvisionModel.softwareVersionString.$invalid && submitted }" />
                    <div v-if="v$.msgProvisionModel.softwareVersionString.$invalid && submitted" class="p-error">Software Version String is required</div>
                </div>

                <!-- Field for provisionalDate -->
                <div class="field">
                    <label for="provisionalDate">Provisional Date <span class="required">*</span></label>
                    <InputText id="provisionalDate" type="text" v-model="v$.msgProvisionModel.provisionalDate.$model" :class="{ 'p-invalid': v$.msgProvisionModel.provisionalDate.$invalid && submitted }" />
                    <div v-if="v$.msgProvisionModel.provisionalDate.$invalid && submitted" class="p-error">Provisional Date is required</div>
                </div>

                <!-- Field for certificationType -->
                <div class="field">
                    <label for="certificationType">Certification Type <span class="required">*</span></label>
                    <InputText id="certificationType" type="text" v-model="v$.msgProvisionModel.certificationType.$model" :class="{ 'p-invalid': v$.msgProvisionModel.certificationType.$invalid && submitted }" />
                    <div v-if="v$.msgProvisionModel.certificationType.$invalid && submitted" class="p-error">Certification Type is required</div>
                </div>

                <!-- Field for reason -->
                <div class="field">
                    <label for="reason">Reason</label>
                    <InputText id="reason" Type="text" v-model="v$.msgProvisionModel.reason.$model" :class="{ 'p-invalid': v$.msgProvisionModel.reason.$invalid && submitted }" />
                    <div v-if="v$.msgProvisionModel.reason.$invalid && submitted" class="p-error">Reason is required</div>
                </div>

                <div class="field">
                    <Button class="p-button-primary" v-if="!txProcessing" type="submit" label="Submit" v-tooltip="'This will open keplr wallet window. Please finish the transaction there.'" icon="pi pi-check" iconPos="left" />
                    <Button class="p-button-primary" v-if="txProcessing" label="Submitted Tx.." disabled="disabled" icon="pi pi-spin pi-spinner" iconPos="left" />
                    <Button label="Cancel" @click="onClose" class="p-button-secondary" icon="pi pi-times" iconPos="left" />
                </div>
            </form>
        </div>
    </div>
</template>
