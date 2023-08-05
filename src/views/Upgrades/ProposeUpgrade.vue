<script>
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import MultiSelect from 'primevue/multiselect'
import Button from 'primevue/button'
import { required, helpers } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
//import {encoding_1} from "@cosmjs/encoding";
const encoding_1 = require('@cosmjs/encoding')
import { DirectSecp256k1HdWallet, Registry } from '@cosmjs/proto-signing'
import { assertIsBroadcastTxSuccess, SigningStargateClient, StargateClient } from '@cosmjs/stargate'
import { fromBase64 } from '@cosmjs/encoding'
import { Any } from 'cosmjs-types/google/protobuf/any'
import { decodePubkey, encodePubkey } from '@cosmjs/proto-signing'
import Message from 'primevue/message'

const isJsonAndHasRequiredFields = helpers.withMessage(
  'JSON is not valid or missing required properties',
  value => {
    try {
      const parsedValue = JSON.parse(value)
      return parsedValue && parsedValue.binaries && parsedValue.binaries['linux/amd64']
    } catch (error) {
      return false
    }
  }
)

export default {
  name: 'ProposeUpgrade',
  components: {
    InputText,
    Textarea,
    Button,
    Message
  },
  setup: () => ({ v$: useVuelidate() }),
  data() {
    return {
      txProcessing: false,
      submitted: false,
      error: null,
      name: '',
      upgradeHeight: '',
      upgradeInfo: '',
    }
  },
  validations() {
    return {
      name: {
        required
      },
      upgradeHeight: {
        required
      },
      upgradeInfo: { 
        required, 
        isJsonAndHasRequiredFields 
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

      const wallet = this.$store.getters['common/wallet/wallet']
      const accounts = wallet.accounts
      const account = wallet.accounts[0]
      const creatorAddress = account.address

      //this.$store.dispatch('zigbeealliance.distributedcomplianceledger.model/sendMsgCreateModel', {

      this.txProcessing = true;
			let loader = this.$loading.show();
      let returnValue = this.$store
        .dispatch('zigbeealliance.distributedcomplianceledger.dclupgrade/sendMsgProposeUpgrade', {
          value: {
            signer: creatorAddress,
            creator: creatorAddress,
            plan: {
              name: this.name,
              height: this.upgradeHeight,
              info: this.upgradeInfo
            },
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
              this.$toast.add({ severity: 'success', summary: 'Successful Tx', detail: 'Upgrade proposal sent successfully', life: 3000 })
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
            <label for="name">Upgrade Name <span class="required">*</span></label>
            <InputText id="name" type="text" v-model="v$.name.$model" @blur="v$.name.$touch()" :class="{ 'p-invalid': v$.name.$invalid && v$.name.$dirty }" />
            <small v-if="v$.name.$invalid && v$.name.$dirty" class="p-error">This field is required.</small>
          </div>

          <div class="field">
            <label for="upgradeHeight">Upgrade Height <span class="required">*</span></label>
            <InputText id="upgradeHeight" type="text" v-model="v$.upgradeHeight.$model" @blur="v$.upgradeHeight.$touch()" :class="{ 'p-invalid': v$.upgradeHeight.$invalid && v$.upgradeHeight.$dirty }" />
            <small v-if="v$.upgradeHeight.$invalid && v$.upgradeHeight.$dirty" class="p-error">This field is required.</small>
          </div>

          <div class="field">
            <label for="upgradeInfo">Upgrade Info <span class="required mr-2">*</span>
            <a href="https://github.com/zigbee-alliance/distributed-compliance-ledger/blob/master/docs/transactions.md#upgrade" target="_blank" rel="noopener noreferrer">
                    More Details
                    <i class="pi pi-external-link"></i>
                  </a>
            </label>
            <Textarea id="upgradeInfo" type="text" v-model="v$.upgradeInfo.$model" @blur="v$.upgradeInfo.$touch()" :class="{ 'p-invalid': v$.upgradeInfo.$invalid && v$.upgradeInfo.$dirty }" />
            <small v-if="v$.upgradeInfo.$invalid && v$.upgradeInfo.$dirty" class="p-error">JSON is not valid or missing required properties.</small>
          </div>

          <div class="field">
            <label for="info">Optional Info</label>
            <InputText id="info" type="text" v-model="info" />
          </div>          

          </div>
          <div class="field">
            <div class="grid">
              <div class="col-3">
                <Button
                  v-if="!txProcessing"
                  type="submit"
                  label="Propose Upgrade"
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


