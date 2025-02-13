<script>
import InputText from 'primevue/inputtext'
import MultiSelect from 'primevue/multiselect'
import Button from 'primevue/button'
import Textarea from 'primevue/textarea';
import { required } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import Message from 'primevue/message'
import { MsgProposeAddX509RootCert } from '../../store/generated/zigbee-alliance/distributed-compliance-ledger/zigbeealliance.distributedcomplianceledger.pki/module/types/pki/tx'

export default {
  name: 'ProposeRootCertificate',
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
      msgProposeAddX509RootCert: MsgProposeAddX509RootCert.fromPartial({ vid: '' })
    }
  },

  validations() {
    return {
      msgProposeAddX509RootCert: {
        cert: {
          required
        },
        vid: {
          required,
          validate: (value) => { // Custom validation for `vid`
            if (typeof value !== 'number' || value < 1) {
              return 'VID must be a number greater than 1.';
            }
            return true; // Explicitly return true for valid input
          }
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
      this.msgProposeAddX509RootCert.signer = creatorAddress
      this.msgProposeAddX509RootCert.time = parseInt(new Date().getTime() / 1000)
      this.$store
        .dispatch(`zigbeealliance.distributedcomplianceledger.pki/sendMsgProposeAddX509RootCert`, {
          value: this.msgProposeAddX509RootCert
        })
        .then(
          (response) => {
            this.txProcessing = false;
            loader.hide();
            if (response.code == 0) {
              this.error = null
              this.$toast.add({ severity: 'success', summary: 'Successful Tx', detail: ' Tx sent successfully', life: 3000 })
              this.$emit('close-dialog')
            } else {
              this.$toast.add({ severity: 'error', summary: 'Error while processing Tx', detail: ' Tx failed', life: 3000 })
              this.error = response
            }
          },
          (error) => {
            this.$toast.add({ severity: 'error', summary: 'Error while processing Tx', detail: ' Tx failed', life: 3000 })
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
    <div class="p-fluid  ">
      <form @submit.prevent="handleSubmit(!v$.$invalid)" class="">
        <!-- Field for Certificate -->
        <div class="field">
          <label for="cert">Certificate <span class="required">*</span></label>
          <Textarea v-model="v$.msgProposeAddX509RootCert.$model.cert"
            :class="{ 'p-invalid': v$.msgProposeAddX509RootCert.$model.cert.$invalid && submitted }"
            style="display:block;width:100%" rows="10" />
        </div>

        <!-- Field for vid -->
        <div class="field">
          <label for="vid">Vendor ID <span class="required">*</span></label>
          <InputText id="vid" type="text" v-model="v$.msgProposeAddX509RootCert.$model.vid"
            :class="{ 'p-invalid': v$.msgProposeAddX509RootCert.$model.vid.$invalid && submitted }" />
        </div>

        <!-- Field for SchemaVersion -->
        <div class="field">
          <label for="schemaVersion">
            <IconField
              v-tooltip.top="'Certificate\'s Schema version to support backward/forward compatibility (default 0)'">
              Schema Version
              <i class="pi pi-info-circle ml-2"></i>
            </IconField>
          </label>
          <InputText id="schemaVersion" type="text" v-model="v$.msgProposeAddX509RootCert.certSchemaVersion.$model" />
        </div>

        <!-- Field for Info -->
        <div class="field">
          <label for="info">Info</label>
          <InputText id="info" type="text" v-model="v$.msgProposeAddX509RootCert.info.$model"
            :class="{ 'p-invalid': v$.msgProposeAddX509RootCert.info.$invalid && submitted }" />
        </div>

        <div class="field">
          <div class="grid">
            <div class="col-12">
              <Button v-if="!txProcessing" type="submit"
                v-tooltip="'This will open keplr wallet window. Please finish the transaction there.'"
                label="Propose Root Certificate" icon="pi pi-check" iconPos="left"
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
