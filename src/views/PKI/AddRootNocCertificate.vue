<script>
import InputText from 'primevue/inputtext'
import MultiSelect from 'primevue/multiselect'
import Button from 'primevue/button'
import Textarea from 'primevue/textarea'
import { required } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import Message from 'primevue/message'
import { MsgAddNocX509RootCert } from '../../store/generated/zigbee-alliance/distributed-compliance-ledger/zigbeealliance.distributedcomplianceledger.pki/module/types/pki/tx'

export default {
  name: 'AddRootNocCertificate',
  props: ['model'],

  components: {
    InputText,
    MultiSelect,
    Button,
    Textarea,
    Message
  },
  setup: () => ({ v$: useVuelidate() }),
  data() {
    return {
      txProcessing: false,
      submitted: false,
      error: null,
      certificationType: ['zigbee', 'matter'],
      msgAddNocX509RootCert: MsgAddNocX509RootCert.fromPartial({ })
    }
  },

  validations() {
    return {
      msgAddNocX509RootCert: {
        cert: {
          required
        },
        certSchemaVersion: {
        },
        info: {
        }
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

      const account = this.$store.state.selectedKeplrAccount;
      const creatorAddress = account.address

      this.txProcessing = true;
      let loader = this.$loading.show();
      this.msgAddNocX509RootCert.signer = creatorAddress
      this.msgAddNocX509RootCert.time = parseInt(new Date().getTime() / 1000)
      this.$store
        .dispatch(`zigbeealliance.distributedcomplianceledger.pki/sendMsgAddNocX509RootCert`, {
          value: this.msgAddNocX509RootCert
        })
        .then(
          (response) => {
            this.txProcessing = false;
            loader.hide();
            if (response.code == 0) {
              this.error = null
              this.$toast.add({ severity: 'success', summary: 'Successful Tx', detail: 'NOC Root Certificate added successfully', life: 3000 })
              this.$emit('close-dialog')
            } else {
              this.$toast.add({ severity: 'error', summary: 'Error while processing Tx', detail: 'Failed to add NOC Root Certificate', life: 3000 })
              this.error = response
            }
          },
          (error) => {
            console.log(error)
            this.$toast.add({ severity: 'error', summary: 'Error while processing Tx', detail: 'Failed to add NOC Root Certificate', life: 3000 })
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
  },
}
</script>
<template>
  <div>
    <Message :closable="false" v-if="error" severity="error">{{ errorMessage() }}</Message>
    <div class="p-fluid">
      <form @submit.prevent="handleSubmit(!v$.$invalid)" class="">
        <div class="field">
          <label for="cert">Certificate <span class="required">*</span></label>
          <Textarea v-model="v$.msgAddNocX509RootCert.$model.cert"
            :class="{ 'p-invalid': v$.msgAddNocX509RootCert.$model.cert.$invalid && submitted }"
            style="display:block;width:100%" rows="10" />
        </div>
        <div class="field">
          <label for="schemaVersion">
            <IconField
              v-tooltip.top="'Certificate\'s Schema version to support backward/forward compatibility (default 0)'">
              Schema Version
              <i class="pi pi-info-circle ml-2"></i>
            </IconField>
          </label>
          <InputText id="schemaVersion" type="text" v-model="v$.msgAddNocX509RootCert.certSchemaVersion.$model" />
        </div>

        <div class="field">
          <label for="info">Info</label>
          <InputText id="info" type="text" v-model="v$.msgAddNocX509RootCert.info.$model"
            :class="{ 'p-invalid': v$.msgAddNocX509RootCert.info.$invalid && submitted }" />
        </div>

        <div class="field">
          <div class="grid">
            <div class="col-12">
              <Button v-if="!txProcessing" type="submit"
                v-tooltip="'This will open keplr wallet window. Please finish the transaction there.'"
                label="Add NOC Root Certificate" icon="pi pi-check" iconPos="left"
                v-bind:class="[v$.$invalid ? 'p-disabled' : '']" />
              <Button v-if="txProcessing" label="Submitted Tx.." icon="pi pi-spin pi-spinner" class="p-button"
                disabled="disabled" iconPos="left" />
              <Button label="Cancel" @click="onClose" class="p-button-secondary" icon="pi pi-times" iconPos="left" />
            </div>
          </div>
        </div>

      </form>
    </div>
  </div>
</template>