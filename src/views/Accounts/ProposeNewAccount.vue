<script>
import InputText from 'primevue/inputtext'
import MultiSelect from 'primevue/multiselect'
import Button from 'primevue/button'
import { required } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
//import {encoding_1} from "@cosmjs/encoding";
const encoding_1 = require('@cosmjs/encoding')
import { DirectSecp256k1HdWallet, Registry } from '@cosmjs/proto-signing'
import { assertIsBroadcastTxSuccess, SigningStargateClient, StargateClient } from '@cosmjs/stargate'
import { fromBase64 } from '@cosmjs/encoding'
import { Any } from 'cosmjs-types/google/protobuf/any'
import { decodePubkey, encodePubkey } from '@cosmjs/proto-signing'
import Message from 'primevue/message'
export default {
  name: 'ProposeNewAccount',
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
      selectedRoles: [],
      address: '',
      pubKey: '',
      info: '',
      vendorID: '',
      roles: ['Vendor', 'NodeAdmin', 'VendorAdmin', 'Trustee', 'CertificationCenter']
    }
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
      }
    }
  },
  methods: {
    handleSubmit(isFormValid) {
      this.submitted = true
      this.error = null
      if (!isFormValid) {
        return
      }

      let encodedBasePubkey
      try {
        encodedBasePubkey = encodePubkey({ type: 'tendermint/PubKeySecp256k1', value: this.pubKey })
      } catch (e) {
        this.error = e.message
      }
      
      
      const account = this.$store.state.selectedKeplrAccount;
      const creatorAddress = account.address

      //this.$store.dispatch('zigbeealliance.distributedcomplianceledger.model/sendMsgCreateModel', {

      this.txProcessing = true;
			let loader = this.$loading.show();
      let returnValue = this.$store
        .dispatch('zigbeealliance.distributedcomplianceledger.dclauth/sendMsgProposeAddAccount', {
          value: {
            signer: creatorAddress,
            vendorID: this.vendorID,
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
              this.error = null
              this.$toast.add({ severity: 'success', summary: 'Successful Tx', detail: 'Account proposal sent successfully', life: 3000 })
              this.$emit('close-dialog')
            } else {
							this.$toast.add({ severity: 'error', summary: 'Error while processing Tx', detail: 'Tx failed', life: 3000 })
              this.error = response
            }
          },
          (error) => {
						this.$toast.add({ severity: 'error', summary: 'Error while processing Tx', detail: 'Tx failed', life: 3000 })
						this.txProcessing = false;
						loader.hide();
            this.error = error.message
          }
        )
    },

    onClose(e) {
      e.preventDefault()
      this.$emit('close-dialog')
    },

    errorMessage() {
      if (this.error && this.error.rawLog) {
        return this.error.rawLog
      } else if (this.error) {
        return this.error
      } else {
        return null
      }
    }
  }
}
</script>




<template>
  <div class="grid">
    <div class="col-12">
      <Message :closable="false" v-if="error" severity="error">{{ errorMessage() }}</Message>

      <form @submit.prevent="handleSubmit(!v$.$invalid)" class="">
        <div class="p-fluid">
          <div class="p-grid mb-4">
            <div class="field">
              <label for="address">Account Address</label>
              <InputText id="address" type="text" v-model="v$.address.$model" :class="{ 'p-invalid': v$.address.$invalid && submitted }" />
            </div>
            <div class="field">
              <label for="pubKey">Public Key</label>
              <InputText id="pubKey" type="text" v-model="pubKey" />
            </div>
          </div>
          <div class="field">
            <label for="info">Roles</label>
            <MultiSelect
              :options="roles"
              :showToggleAll="false"
              v-model="v$.selectedRoles.$model"
              :class="{ 'p-invalid': v$.selectedRoles.$invalid && submitted }"
            />
          </div>

          <div class="field">
            <label for="vendorID">Vendor ID</label>
            <InputText id="vendorID" type="text" v-model="vendorID" />
          </div>

          <div class="field">
            <label for="info">Optional Information</label>
            <InputText id="info" type="text" v-model="info" />
          </div>

          <div class="field">
            <div class="grid">
              <div class="col-3">
                <Button
                  v-if="!txProcessing"
                  type="submit"
                  label="Propose Add Account"
                  icon="pi pi-user"
                  iconPos="left"
                  v-bind:class="[v$.$invalid ? 'p-disabled' : '']"
                />
                <Button v-if="txProcessing" label="Submitted Tx.." icon="pi pi-spin pi-spinner" class="p-button" disabled="disabled" iconPos="left" />
              </div>
              <div class="col-3">
                <Button label="Cancel" @click="onClose" class="p-button-secondary" icon="pi pi-times" iconPos="left" />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>


