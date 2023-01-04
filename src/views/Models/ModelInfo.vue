<script>
import InputText from 'primevue/inputtext'
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
import { Model } from '../../store/generated/zigbee-alliance/distributed-compliance-ledger/zigbeealliance.distributedcomplianceledger.model/module/types/model/model'
import Message from 'primevue/message'
export default {
  name: 'ModelInfo',
  components: {
    InputText,
    Button,
    Message
  },
  setup: () => ({ v$: useVuelidate() }),
  props: ['selectedModel', 'viewOnly'],
  data() {
    return {
      txProcessing: false,
      update: false,
      submitted: false,
      error: null,
      model: Model.fromPartial({})
    }
  },
  validations() {
    return {
      model: {
        vid: {
          required
        },
        pid: {
          required
        },
        deviceTypeId: {
          required
        },
        productName: {
          required
        },
        productLabel: {
          required
        },
        partNumber: {
          required
        },
        commissioningCustomFlow: {},
        commissioningCustomFlowUrl: {},
        commissioningModeInitialStepsHint: {},
        commissioningModeInitialStepsInstruction: {},
        commissioningModeSecondaryStepsHint: {},
        commissioningModeSecondaryStepsInstruction: {},
        userManualUrl: {},
        supportUrl: {},
        productUrl: {},
        lsfUrl: {},
        lsfRevision: {}
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
      const account = wallet.accounts[0]
      const creatorAddress = account.address

      this.txProcessing = true;
			let loader = this.$loading.show();
      let methodName = 'sendMsgCreateModel'
      if (this.update) {
        methodName = 'sendMsgUpdateModel'
      }
      this.model.creator = creatorAddress
      this.$store
        .dispatch(`zigbeealliance.distributedcomplianceledger.model/${methodName}`, {
          value: this.model
        })
        .then(
          (response) => {
            this.txProcessing = false;
						loader.hide();
            if (response.code == 0) {
              this.error = null
              this.$toast.add({ severity: 'success', summary: 'Successful Tx', detail: 'ModelInfo Tx sent successfully', life: 3000 })
              this.$emit('close-dialog')
            } else {
							this.$toast.add({ severity: 'error', summary: 'Error while processing Tx', detail: 'ModelInfo Tx failed', life: 3000 })
              this.error = response
            }
          },
          (error) => {
						this.$toast.add({ severity: 'error', summary: 'Error while processing Tx', detail: 'ModelInfo Tx failed', life: 3000 })
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
    if (this.selectedModel) {
      this.model = Model.fromPartial(this.selectedModel)
      this.update = true
    } else {
      this.update = false
    }
  }
}
</script>




	<template>
  <div>
    <div v-if="viewOnly === true">
      <table>
        <tr>
          <td class="p-text">Vendor ID</td>
          <td>{{ selectedModel.vidHex }}</td>
        </tr>
        <tr>
          <td>Product ID</td>
          <td>{{ selectedModel.pidHex }}</td>
        </tr>
        <tr>
          <td>Device Type ID</td>
          <td>{{ selectedModel.deviceTypeIdHex }}</td>
        </tr>
        <tr>
          <td>Product Name</td>
          <td>{{ selectedModel.productName }}</td>
        </tr>
        <tr>
          <td>Product Label</td>
          <td>{{ selectedModel.productLabel }}</td>
        </tr>
        <tr>
          <td>Part Number</td>
          <td>{{ selectedModel.partNumber }}</td>
        </tr>
        <tr>
          <td>Commissioning Custom Flow</td>
          <td>{{ selectedModel.commissioningCustomFlow }}</td>
        </tr>
        <tr>
          <td>Commissioning Custom Flow URL</td>
          <td>{{ selectedModel.commissioningCustomFlowUrl }}</td>
        </tr>
        <tr>
          <td>Commissioning Mode Initial Steps Hint</td>
          <td>{{ selectedModel.commissioningModeInitialStepsHint }}</td>
        </tr>
        <tr>
          <td>Commissioning Mode Initial Steps Instruction</td>
          <td>{{ selectedModel.commissioningModeInitialStepsInstruction }}</td>
        </tr>
        <tr>
          <td>Commissioning Mode Secondary Steps Hint</td>
          <td>{{ selectedModel.commissioningModeSecondaryStepsHint }}</td>
        </tr>
        <tr>
          <td>Commissioning Mode Secondary Steps Instruction</td>
          <td>{{ selectedModel.commissioningModeSecondaryStepsInstruction }}</td>
        </tr>
        <tr>
          <td>User Manual URL</td>
          <td>{{ selectedModel.userManualUrl }}</td>
        </tr>
        <tr>
          <td>Support URL</td>
          <td>{{ selectedModel.supportUrl }}</td>
        </tr>
        <tr>
          <td>Product URL</td>
          <td>{{ selectedModel.productUrl }}</td>
        </tr>
        <tr>
          <td>LSF URL</td>
          <td>{{ selectedModel.lsfUrl }}</td>
        </tr>
        <tr>
          <td>LSF Revision</td>
          <td>{{ selectedModel.lsfRevision }}</td>
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
            <InputText id="vid" type="text" v-model="v$.model.vid.$model" :class="{ 'p-invalid': v$.model.vid.$invalid && submitted }" />
          </div>

          <!-- Field for pid -->
          <div class="field">
            <label for="pid">Product ID <span class="required">*</span> </label>
            <InputText id="pid" type="text" v-model="v$.model.pid.$model" :class="{ 'p-invalid': v$.model.pid.$invalid && submitted }" />
          </div>

          <!-- Field for deviceTypeId -->
          <div class="field">
            <label for="deviceTypeId">Device Type Id <span class="required">*</span> </label>
            <InputText
              id="deviceTypeId"
              type="text"
              v-model="v$.model.deviceTypeId.$model"
              :class="{ 'p-invalid': v$.model.deviceTypeId.$invalid && submitted }"
            />
          </div>

          <!-- Field for productName -->
          <div class="field">
            <label for="productName">Product Name <span class="required">*</span> </label>
            <InputText
              id="productName"
              type="text"
              v-model="v$.model.productName.$model"
              :class="{ 'p-invalid': v$.model.productName.$invalid && submitted }"
            />
          </div>

          <!-- Field for productLabel -->
          <div class="field">
            <label for="productLabel">Product Label <span class="required">*</span> </label>
            <InputText
              id="productLabel"
              type="text"
              v-model="v$.model.productLabel.$model"
              :class="{ 'p-invalid': v$.model.productLabel.$invalid && submitted }"
            />
          </div>

          <!-- Field for partNumber -->
          <div class="field">
            <label for="partNumber">Part Number <span class="required">*</span> </label>
            <InputText id="partNumber" type="text" v-model="v$.model.partNumber.$model" :class="{ 'p-invalid': v$.model.partNumber.$invalid && submitted }" />
          </div>

          <!-- Field for commissioningCustomFlow -->
          <div class="field">
            <label for="commissioningCustomFlow">Commissioning Custom Flow</label>
            <InputText
              id="commissioningCustomFlow"
              type="text"
              v-model="v$.model.commissioningCustomFlow.$model"
              :class="{ 'p-invalid': v$.model.commissioningCustomFlow.$invalid && submitted }"
            />
          </div>

          <!-- Field for commissioningCustomFlowUrl -->
          <div class="field">
            <label for="commissioningCustomFlowUrl">Commissioning Custom FlowURL</label>
            <InputText
              id="commissioningCustomFlowUrl"
              type="text"
              v-model="v$.model.commissioningCustomFlowUrl.$model"
              :class="{ 'p-invalid': v$.model.commissioningCustomFlowUrl.$invalid && submitted }"
            />
          </div>

          <!-- Field for commissioningModeInitialStepsHint -->
          <div class="field">
            <label for="commissioningModeInitialStepsHint">Commissioning Mode Initial Steps Hint</label>
            <InputText
              id="commissioningModeInitialStepsHint"
              type="text"
              v-model="v$.model.commissioningModeInitialStepsHint.$model"
              :class="{ 'p-invalid': v$.model.commissioningModeInitialStepsHint.$invalid && submitted }"
            />
          </div>

          <!-- Field for commissioningModeInitialStepsInstruction -->
          <div class="field">
            <label for="commissioningModeInitialStepsInstruction">Commissioning Mode Initial Steps Instruction</label>
            <InputText
              id="commissioningModeInitialStepsInstruction"
              type="text"
              v-model="v$.model.commissioningModeInitialStepsInstruction.$model"
              :class="{ 'p-invalid': v$.model.commissioningModeInitialStepsInstruction.$invalid && submitted }"
            />
          </div>

          <!-- Field for commissioningModeSecondaryStepsHint -->
          <div class="field">
            <label for="commissioningModeSecondaryStepsHint">Commissioning Mode Secondary Steps Hint</label>
            <InputText
              id="commissioningModeSecondaryStepsHint"
              type="text"
              v-model="v$.model.commissioningModeSecondaryStepsHint.$model"
              :class="{ 'p-invalid': v$.model.commissioningModeSecondaryStepsHint.$invalid && submitted }"
            />
          </div>

          <!-- Field for commissioningModeSecondaryStepsInstruction -->
          <div class="field">
            <label for="commissioningModeSecondaryStepsInstruction">Commissioning Mode Secondary Steps Instruction</label>
            <InputText
              id="commissioningModeSecondaryStepsInstruction"
              type="text"
              v-model="v$.model.commissioningModeSecondaryStepsInstruction.$model"
              :class="{ 'p-invalid': v$.model.commissioningModeSecondaryStepsInstruction.$invalid && submitted }"
            />
          </div>

          <!-- Field for userManualUrl -->
          <div class="field">
            <label for="userManualUrl">User ManualURL</label>
            <InputText
              id="userManualUrl"
              type="text"
              v-model="v$.model.userManualUrl.$model"
              :class="{ 'p-invalid': v$.model.userManualUrl.$invalid && submitted }"
            />
          </div>

          <!-- Field for supportUrl -->
          <div class="field">
            <label for="supportUrl">SupportURL</label>
            <InputText id="supportUrl" type="text" v-model="v$.model.supportUrl.$model" :class="{ 'p-invalid': v$.model.supportUrl.$invalid && submitted }" />
          </div>

          <!-- Field for productUrl -->
          <div class="field">
            <label for="productUrl">ProductURL</label>
            <InputText id="productUrl" type="text" v-model="v$.model.productUrl.$model" :class="{ 'p-invalid': v$.model.productUrl.$invalid && submitted }" />
          </div>

          <!-- Field for lsfUrl -->
          <div class="field">
            <label for="lsfUrl">LsfURL</label>
            <InputText id="lsfUrl" type="text" v-model="v$.model.lsfUrl.$model" :class="{ 'p-invalid': v$.model.lsfUrl.$invalid && submitted }" />
          </div>

          <!-- Field for lsfRevision -->
          <div class="field">
            <label for="lsfRevision">Lsf Revision</label>
            <InputText
              id="lsfRevision"
              type="text"
              v-model="v$.model.lsfRevision.$model"
              :class="{ 'p-invalid': v$.model.lsfRevision.$invalid && submitted }"
            />
          </div>

          <div class="field">
            <div class="grid">
              <div class="col-3">
                <Button
                  class="p-button-primary"
                  v-if="!txProcessing"
                  type="submit"
                  label="Save"
                  icon="pi pi-save"
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
