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
    name: 'ValidatorInfo',
    components: {
        InputText,
        Button,
        Message
    },
    setup: () => ({ v$: useVuelidate() }),
    props: ['ValidatorInfo', 'viewOnly'],
    data() {
        return {
            txProcessing: false,
            update: false,
            submitted: false,
            error: null,
            moniker: null,
            identity: null,
            website: null,
            details: null,
            pubKey: null
        };
    },
    validations() {
        return {
            moniker: {
                required,
                $autoDirty: true
            },
            website: {},
            details: {},
            identity: {},
            pubKey: {
                required
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

            let encodedBasePubkey;
            try {
                encodedBasePubkey = encodePubkey({ type: 'tendermint/PubKeyEd25519', value: this.pubKey });
            } catch (e) {
                this.error = e.message;
            }

            this.txProcessing = true;
            let loader = this.$loading.show();

            this.$store
                .dispatch(`zigbeealliance.distributedcomplianceledger.validator/sendMsgCreateValidator`, {
                    value: {
                        signer: creatorAddress,
                        pubKey: encodedBasePubkey,
                        description: {
                            moniker: this.moniker,
                            website: this.website,
                            details: this.details,
                            identity: this.identity
                        }
                    }
                })
                .then(
                    (response) => {
                        this.txProcessing = false;
                        loader.hide();
                        if (response.code == 0) {
                            this.error = null;
                            this.$toast.add({ severity: 'success', summary: 'Successful Tx', detail: 'Validator Tx sent successfully', life: 3000 });
                            this.$emit('close-dialog');
                        } else {
                            this.$toast.add({ severity: 'error', summary: 'Error while processing Tx', detail: 'Validator Tx failed', life: 3000 });
                            this.error = response;
                        }
                    },
                    (error) => {
                        this.$toast.add({ severity: 'error', summary: 'Error while processing Tx', detail: 'Validator Tx failed', life: 3000 });
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
        if (this.ValidatorInfo) {
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
                    <td class="p-text">Validator Moniker</td>
                    <td>{{ ValidatorInfo.description.moniker }}</td>
                </tr>
                <tr>
                    <td>Validator Owner</td>
                    <td>{{ ValidatorInfo.owner }}</td>
                </tr>
                <tr>
                    <td>Validator Public Key</td>
                    <td>{{ ValidatorInfo.pubKey.key }}</td>
                </tr>
                <tr>
                    <td>Validator Power</td>
                    <td>{{ ValidatorInfo.power }}</td>
                </tr>
                <tr>
                    <td>Validator Jailed</td>
                    <td>{{ ValidatorInfo.jailed ? 'true' : 'false' }}</td>
                </tr>
            </table>
        </div>
        <div v-else class="col-12">
            <Message :closable="false" v-if="error" severity="error">{{ errorMessage() }}</Message>
            <div class="p-fluid">
                <form @submit.prevent="handleSubmit(!v$.$invalid)" class="">
                    <!-- Field for ValidatorID -->
                    <div class="field">
                        <label for="moniker">Validator Moniker <span>*</span></label>
                        <InputText id="moniker" type="text" v-model="v$.moniker.$model" :class="{ 'p-invalid': v$.moniker.$invalid && submitted }" />
                    </div>

                    <!-- Field for ValidatorName -->
                    <div class="field">
                        <label for="pubKey">Validator Public Key <span>*</span></label>
                        <InputText id="pubKey" type="text" v-model="v$.pubKey.$model" :class="{ 'p-invalid': v$.pubKey.$invalid && submitted }" />
                    </div>

                    <!-- Field for details -->
                    <div class="field">
                        <label for="details">Validator Details </label>
                        <InputText id="details" type="text" v-model="v$.details.$model" />
                    </div>

                    <!-- Field for website -->
                    <div class="field">
                        <label for="website">Validator Website </label>
                        <InputText id="website" type="text" v-model="v$.website.$model" />
                    </div>

                    <!-- Field for identity -->
                    <div class="field">
                        <label for="identity">Validator Website </label>
                        <InputText id="identity" type="text" v-model="v$.identity.$model" />
                    </div>

                    {{ v$.description }}
                    <div class="field">
                        <div class="grid">
                            <div class="col-3">
                                <Button v-if="!txProcessing" type="submit" label="Save" icon="pi pi-user" iconPos="left" v-bind:class="[v$.$invalid ? 'p-disabled' : '']" />
                                <Button v-if="txProcessing" label="Submitted Tx.." disabled="disabled" icon="pi pi-spin pi-spinner" iconPos="left" />
                            </div>
                            <div class="col-3">
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
