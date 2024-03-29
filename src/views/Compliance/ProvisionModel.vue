<script>
import InputText from 'primevue/inputtext'
import MultiSelect from 'primevue/multiselect'
import Button from 'primevue/button'
import { required } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import Message from 'primevue/message'
import { MsgProvisionModel } from '../../store/generated/zigbee-alliance/distributed-compliance-ledger/zigbeealliance.distributedcomplianceledger.compliance/module/types/compliance/tx'

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
    }
  },

  validations() {
    return {
      msgProvisionModel: {
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
        cDVersionNumber: {},
        provisionalDate: {
          required
        },
        certificationType: {
          required
        },
        reason: {}
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

      let account;

      if(this.$store.state.selectedKeplrAccount) {
          account = this.$store.state.selectedKeplrAccount;
      } else {
          const wallet = this.$store.getters['common/wallet/wallet'];
          account = wallet && wallet.accounts && wallet.accounts.length > 0 ? wallet.accounts[0] : null;
      }
      const creatorAddress = account.address

      this.txProcessing = true;
			let loader = this.$loading.show();
      this.msgProvisionModel.signer = creatorAddress
      this.$store
        .dispatch(`zigbeealliance.distributedcomplianceledger.compliance/sendMsgProvisionModel`, {
          value: this.msgProvisionModel
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
	created() {
		this.msgProvisionModel = MsgProvisionModel.fromPartial(this.model || {})
	}
}
</script>

	<template>
  <div>
    <Message :closable="false" v-if="error" severity="error">{{ errorMessage() }}</Message>
    <div class="p-fluid">
      <form @submit.prevent="handleSubmit(!v$.$invalid)" class="">
        <!-- Field for vid -->
        <div class="field">
          <label for="vid">Vendor ID</label>
          <InputText id="vid" type="text" v-model="v$.msgProvisionModel.vid.$model" :class="{ 'p-invalid': v$.msgProvisionModel.vid.$invalid && submitted }" />
        </div>

        <!-- Field for pid -->
        <div class="field">
          <label for="pid">Product ID</label>
          <InputText id="pid" type="text" v-model="v$.msgProvisionModel.pid.$model" :class="{ 'p-invalid': v$.msgProvisionModel.pid.$invalid && submitted }" />
        </div>

        <!-- Field for softwareVersion -->
        <div class="field">
          <label for="softwareVersion">Software Version</label>
          <InputText
            id="softwareVersion"
            type="text"
            v-model="v$.msgProvisionModel.softwareVersion.$model"
            :class="{ 'p-invalid': v$.msgProvisionModel.softwareVersion.$invalid && submitted }"
          />
        </div>

        <!-- Field for softwareVersionString -->
        <div class="field">
          <label for="softwareVersionString">Software Version String</label>
          <InputText
            id="softwareVersionString"
            type="text"
            v-model="v$.msgProvisionModel.softwareVersionString.$model"
            :class="{ 'p-invalid': v$.msgProvisionModel.softwareVersionString.$invalid && submitted }"
          />
        </div>

        <!-- Field for provisionalDate -->
        <div class="field">
          <label for="provisionalDate">Provisional Date</label>
          <InputText
            id="provisionalDate"
            type="text"
            v-model="v$.msgProvisionModel.provisionalDate.$model"
            :class="{ 'p-invalid': v$.msgProvisionModel.provisionalDate.$invalid && submitted }"
          />
        </div>

        <!-- Field for certificationType -->
        <div class="field">
          <label for="certificationType">Certification Type</label>
          <InputText
            id="certificationType"
            type="text"
            v-model="v$.msgProvisionModel.certificationType.$model"
            :class="{ 'p-invalid': v$.msgProvisionModel.certificationType.$invalid && submitted }"
          />
        </div>

        <!-- Field for reason -->
        <div class="field">
          <label for="reason">Reason</label>
          <InputText
            id="reason"
            Type="text"
            v-model="v$.msgProvisionModel.reason.$model"
            :class="{ 'p-invalid': v$.msgProvisionModel.reason.$invalid && submitted }"
          />
        </div>

        <div class="field">
          <div class="grid">
            <div class="col-3">
              <Button
                class="p-button-primary"
                v-if="!txProcessing"
                type="submit"
                label="Submit"
                icon="pi pi-check"
                iconPos="left"
                v-bind:class="[v$.$invalid ? 'p-disabled' : '']"
              />
              <Button class="p-button-primary" v-if="txProcessing" label="Submitted Tx.." disabled="disabled" icon="pi pi-spin pi-spinner" iconPos="left" />
            </div>
            <div class="col-3">
              <Button label="Cancel" @click="onClose" class="p-button-secondary" icon="pi pi-times" iconPos="left" />
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
