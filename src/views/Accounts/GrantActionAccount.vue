<script>
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import { required } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
import Message from 'primevue/message';

export default {
    name: 'GrantActionAccount',

    components: {
        InputText,
        Button,
        Message
    },

    props: ['account', 'action'],
    setup: () => ({ v$: useVuelidate() }),
    data() {
        return {
            txProcessing: false,
            error: null
        };
    },

    computed: {
        isSignedIn() {
            const loggedIn = this.$store.getters['loggedIn'];
            return loggedIn;
        }
    },
    methods: {
        submitApproval() {
            this.error = null;
            this.txProcessing = true;
            let loader = this.$loading.show();

            let account;
            if (this.$store.state.selectedKeplrAccount) {
                account = this.$store.state.selectedKeplrAccount;
            } else {
                const wallet = this.$store.getters['common/wallet/wallet'];
                account = wallet && wallet.accounts && wallet.accounts.length > 0 ? wallet.accounts[0] : null;
            }
            const creatorAddress = account.address;

            this.$store
                .dispatch('zigbeealliance.distributedcomplianceledger.dclauth/sendMsg' + this.action, {
                    value: {
                        signer: creatorAddress,
                        address: this.account.address || this.account.base_account.address,
                        info: this.info,
                        time: parseInt(new Date().getTime() / 1000)
                    }
                })
                .then(
                    (response) => {
                        this.txProcessing = false;
                        loader.hide();
                        if (response.code != 0) {
                            this.error = response;
                        } else {
                            this.error = null;
                            this.$toast.add({ severity: 'success', summary: 'Successful Tx', detail: this.action + ' transaction was submitted successfully', life: 3000 });
                            this.$emit('close-dialog');
                        }
                    },
                    (error) => {
                        this.error = error;
                        this.txProcessing = false;
                        loader.hide();
                        this.$toast.add({ severity: 'error', summary: 'Error while processing Tx', detail: 'Tx failed', life: 3000 });
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

            <form @submit.prevent="submitApproval">
                <div class="p-fluid">
                    <div class="p-grid mb-4">
                        <div class="field">
                            <label for="address">Address</label>
                            <InputText id="address" type="text" disabled="true" :value="account.address || account.base_account.address" />
                        </div>
                        <div class="field">
                            <label for="roles">Roles</label>
                            <InputText id="roles" type="text" disabled="true" :value="account.roles" />
                        </div>
                    </div>
                    <div class="field">
                        <label for="info">Optional Information</label>
                        <InputText id="info" type="text" v-model="info" />
                    </div>

                    <div class="field">
                        <Button
                            class="mr-2 mb-2 p-button p-button-primary"
                            v-if="!txProcessing && action == 'ApproveAddAccount'"
                            v-tooltip="'This will open keplr wallet window. Please finish the transaction there.'"
                            type="submit"
                            label="Approve Account"
                            icon="pi pi-user"
                            iconPos="left"
                        />
                        <Button
                            class="mr-2 mb-2 p-button p-button-primary"
                            v-if="!txProcessing && action != 'ApproveAddAccount'"
                            v-tooltip="'This will open keplr wallet window. Please finish the transaction there.'"
                            type="submit"
                            label="Revoke Account"
                            icon="pi pi-ban"
                            iconPos="left"
                        />
                        <Button class="mr-2 mb-2 p-button p-button-primary" v-if="txProcessing" label="Submitted Tx.." disabled="disabled" icon="pi pi-spin pi-spinner" iconPos="left" />
                        <Button class="mr-2 mb-2 p-button p-button-secondary" v-on:click="onClose" label="Cancel" icon="pi pi-times" iconPos="left" />
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

