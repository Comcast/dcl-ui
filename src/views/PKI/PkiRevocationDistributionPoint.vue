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
import { PkiRevocationDistributionPoint } from '../../store/generated/zigbee-alliance/distributed-compliance-ledger/zigbeealliance.distributedcomplianceledger.pki/module/types/pki/pki_revocation_distribution_point';
import Message from 'primevue/message';
import Dropdown from 'primevue/dropdown';
export default {
    name: 'PkiRevocationDistributionPoint',
    components: {
        InputText,
        Dropdown,
        Button,
        Message
    },
    setup: () => ({ v$: useVuelidate() }),
    props: ['selectedPkiRevocationDistributionPoint', 'viewOnly'],
    data() {
        return {
            txProcessing: false,
            update: false,
            submitted: false,
            error: null,
            pkiRevocationDistributionPoint: PkiRevocationDistributionPoint.fromPartial({})
        };
    },
    validations() {
        return {
            pkiRevocationDistributionPoint: {
                vid: {
                    required
                },
                pid: {},
                label: {
                    required
                },
                issuerSubjectKeyID: {
                    required
                },
                isPAA: {},
                crlSignerCertificate: {
                    required
                },
                dataURL: {
                    required
                },
                dataFileSize: {},
                dataDigest: {},
                dataDigestType: {},
                revocationType: {
                    required
                }
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
            let methodName = 'sendMsgAddPkiRevocationDistributionPoint';
            if (this.update) {
                methodName = 'sendMsgUpdatePkiRevocationDistributionPoint';
            }
            this.pkiRevocationDistributionPoint.signer = creatorAddress;
            this.$store
                .dispatch(`zigbeealliance.distributedcomplianceledger.pki/${methodName}`, {
                    value: this.pkiRevocationDistributionPoint
                })
                .then(
                    (response) => {
                        this.txProcessing = false;
                        loader.hide();
                        if (response.code == 0) {
                            this.error = null;
                            this.$toast.add({ severity: 'success', summary: 'Successful Tx', detail: 'PkiRevocationDistributionPoint Tx sent successfully', life: 3000 });
                            this.$emit('close-dialog');
                        } else {
                            this.$toast.add({ severity: 'error', summary: 'Error while processing Tx', detail: 'PkiRevocationDistributionPoint Tx failed', life: 3000 });
                            this.error = response;
                        }
                    },
                    (error) => {
                        this.$toast.add({ severity: 'error', summary: 'Error while processing Tx', detail: 'PkiRevocationDistributionPoint Tx failed', life: 3000 });
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
        if (this.selectedPkiRevocationDistributionPoint) {
            this.pkiRevocationDistributionPoint = PkiRevocationDistributionPoint.fromPartial(this.selectedPkiRevocationDistributionPoint);
            this.update = true;
        } else {
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
                    <td>{{ selectedPkiRevocationDistributionPoint.vidHex }}</td>
                </tr>
                <tr>
                    <td>Product ID</td>
                    <td>{{ selectedPkiRevocationDistributionPoint.pidHex }}</td>
                </tr>
                <tr>
                    <td>Label</td>
                    <td>{{ selectedPkiRevocationDistributionPoint.label }}</td>
                </tr>
                <tr>
                    <td>Issuer Subject Key ID</td>
                    <td>{{ selectedPkiRevocationDistributionPoint.issuerSubjectKeyID }}</td>
                </tr>
                <tr>
                    <td>Is PAA</td>
                    <td>{{ selectedPkiRevocationDistributionPoint.isPAA }}</td>
                </tr>
                <tr>
                    <td>CRL Signer Certificate</td>
                    <td>{{ selectedPkiRevocationDistributionPoint.crlSignerCertificate }}</td>
                </tr>
                <tr>
                    <td>Data URL</td>
                    <td>{{ selectedPkiRevocationDistributionPoint.dataURL }}</td>
                </tr>
                <tr>
                    <td>Data File Size</td>
                    <td>{{ selectedPkiRevocationDistributionPoint.dataFileSize }}</td>
                </tr>
                <tr>
                    <td>Data Digest</td>
                    <td>{{ selectedPkiRevocationDistributionPoint.dataDigest }}</td>
                </tr>
                <tr>
                    <td>Data Digest Type</td>
                    <td>{{ selectedPkiRevocationDistributionPoint.dataDigestType }}</td>
                </tr>
                <tr>
                    <td>Revocation Type</td>
                    <td>{{ selectedPkiRevocationDistributionPoint.revocationType }}</td>
                </tr>
            </table>
        </div>
        <div v-else>
            <Message :closable="false" v-if="error" severity="error">{{ errorMessage() }}</Message>
            <div class="p-fluid">
                <form @submit.prevent="handleSubmit(!v$.$invalid)" class="">
                    <!-- Field for vid -->
                    <div class="field">
                        <label for="vid">Vendor ID <span class="required">*</span> </label>
                        <InputText id="vid" type="text" v-model="v$.pkiRevocationDistributionPoint.vid.$model" :class="{ 'p-invalid': v$.pkiRevocationDistributionPoint.vid.$invalid && submitted }" />
                    </div>

                    <!-- Field for pid -->
                    <div class="field">
                        <label for="pid">Product ID </label>
                        <InputText id="pid" type="text" v-model="v$.pkiRevocationDistributionPoint.pid.$model" :class="{ 'p-invalid': v$.pkiRevocationDistributionPoint.pid.$invalid && submitted }" />
                    </div>

                    <!-- Field for label -->
                    <div class="field">
                        <label for="label">Label <span class="required">*</span> </label>
                        <InputText id="label" type="text" v-model="v$.pkiRevocationDistributionPoint.label.$model" :class="{ 'p-invalid': v$.pkiRevocationDistributionPoint.label.$invalid && submitted }" />
                    </div>

                    <!-- Field for issuerSubjectKeyID -->
                    <div class="field">
                        <label for="issuerSubjectKeyID">Issuer Subject Key ID <span class="required">*</span> </label>
                        <InputText id="issuerSubjectKeyID" type="text" v-model="v$.pkiRevocationDistributionPoint.issuerSubjectKeyID.$model" :class="{ 'p-invalid': v$.pkiRevocationDistributionPoint.issuerSubjectKeyID.$invalid && submitted }" />
                    </div>

                    <!-- Field for isPAA -->
                    <div class="field">
                        <label for="isPAA">Is PAA </label>
                        <Dropdown
                            id="isPAA"
                            v-model="v$.pkiRevocationDistributionPoint.isPAA.$model"
                            :options="[
                                { label: 'True', value: true },
                                { label: 'False', value: false }
                            ]"
                            optionLabel="label"
                            optionValue="value"
                            :class="{ 'p-invalid': v$.pkiRevocationDistributionPoint.isPAA.$invalid && submitted }"
                        />
                    </div>

                    <!-- Field for crlSignerCertificate -->
                    <div class="field">
                        <label for="crlSignerCertificate">CRL Signer Certificate <span class="required">*</span> </label>
                        <Textarea
                            v-model="v$.pkiRevocationDistributionPoint.crlSignerCertificate.$model"
                            :class="{ 'p-invalid': v$.pkiRevocationDistributionPoint.crlSignerCertificate.$invalid && submitted }"
                            style="display: block; width: 100%"
                            rows="10"
                        />
                    </div>

                    <!-- Field for dataURL -->
                    <div class="field">
                        <label for="dataURL">Data URL <span class="required">*</span></label>
                        <InputText id="dataURL" type="text" v-model="v$.pkiRevocationDistributionPoint.dataURL.$model" :class="{ 'p-invalid': v$.pkiRevocationDistributionPoint.dataURL.$invalid && submitted }" />
                    </div>

                    <!-- Field for dataFileSize -->
                    <div class="field">
                        <label for="dataFileSize">Data File Size </label>
                        <InputText id="dataFileSize" type="text" v-model="v$.pkiRevocationDistributionPoint.dataFileSize.$model" :class="{ 'p-invalid': v$.pkiRevocationDistributionPoint.dataFileSize.$invalid && submitted }" />
                    </div>

                    <!-- Field for dataDigest -->
                    <div class="field">
                        <label for="dataDigest">Data Digest </label>
                        <InputText id="dataDigest" type="text" v-model="v$.pkiRevocationDistributionPoint.dataDigest.$model" :class="{ 'p-invalid': v$.pkiRevocationDistributionPoint.dataDigest.$invalid && submitted }" />
                    </div>

                    <!-- Field for dataDigestType -->
                    <div class="field">
                        <label for="dataDigestType">Data Digest Type </label>
                        <InputText id="dataDigestType" type="text" v-model="v$.pkiRevocationDistributionPoint.dataDigestType.$model" :class="{ 'p-invalid': v$.pkiRevocationDistributionPoint.dataDigestType.$invalid && submitted }" />
                    </div>

                    <!-- Field for revocationType -->
                    <div class="field">
                        <label for="revocationType">Revocation Type </label>
                        <InputText id="revocationType" type="text" v-model="v$.pkiRevocationDistributionPoint.revocationType.$model" :class="{ 'p-invalid': v$.pkiRevocationDistributionPoint.revocationType.$invalid && submitted }" />
                    </div>



                    <div class="field">
                        <div class="grid">
                            <div class="col-12">
                                <Button v-if="!txProcessing" type="submit" v-tooltip="'This will open keplr wallet window. Please finish the transaction there.'" label="Save" icon="pi pi-save" iconPos="left" />
                                <Button v-if="txProcessing" label="Submitted Tx.." icon="pi pi-spin pi-spinner" class="p-button" disabled="disabled" iconPos="left" />
                                <Button label="Cancel" @click="onClose" class="p-button-secondary" icon="pi pi-times" iconPos="left" />
                            </div>
                        </div>
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