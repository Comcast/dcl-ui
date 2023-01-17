<script>
import InputText from 'primevue/inputtext'
import MultiSelect from 'primevue/multiselect'
import Button from 'primevue/button'
import { required } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import Message from 'primevue/message'
import { MsgCertifyModel } from '../../store/generated/zigbee-alliance/distributed-compliance-ledger/zigbeealliance.distributedcomplianceledger.compliance/module/types/compliance/tx'

export default {
  name: 'CertifyModel',
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
      msgCertifyModel: MsgCertifyModel.fromPartial({})
    }
  },

  validations() {
    return {
      msgCertifyModel: {
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
        certificationDate: {
          required
        },
        certificationType: {
          required
        },
        reason: {},
  			programTypeVersion: {},
  			cDCertificateId: {
					required
				},
  			familyId: {},
  			supportedClusters: {},
  			compliantPlatformUsed: {},
  			compliantPlatformVersion: {},
  			OSVersion: {},
  			certificationRoute: {},
  			programType: {},
  			transport: {},
			  parentChild: {},
  			certificationIdOfSoftwareComponent: {},
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
      this.msgCertifyModel.signer = creatorAddress
      this.$store
        .dispatch(`zigbeealliance.distributedcomplianceledger.compliance/sendMsgCertifyModel`, {
          value: this.msgCertifyModel
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
		this.msgCertifyModel = MsgCertifyModel.fromPartial(this.model)
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
          <label for="vid">Vendor ID <span class="required">*</span></label>
					<InputText id="vid" type="text" v-model="v$.msgCertifyModel.vid.$model" :class="{ 'p-invalid': v$.msgCertifyModel.vid.$invalid && submitted }" :readonly="model.vid" />
        </div>

        <!-- Field for pid -->
        <div class="field">
          <label for="pid">Product ID <span class="required">*</span></label>
          <InputText id="pid" type="text" v-model="v$.msgCertifyModel.pid.$model" :class="{ 'p-invalid': v$.msgCertifyModel.pid.$invalid && submitted }" :readonly="model.pid"/>
        </div>

        <!-- Field for softwareVersion -->
        <div class="field">
          <label for="softwareVersion">Software Version <span class="required">*</span></label>
          <InputText
            id="softwareVersion"
            type="text"
            v-model="v$.msgCertifyModel.softwareVersion.$model"
            :class="{ 'p-invalid': v$.msgCertifyModel.softwareVersion.$invalid && submitted }" :readonly="model.softwareVersion"
          />
        </div>

        <!-- Field for softwareVersionString -->
        <div class="field">
          <label for="softwareVersionString">Software Version String <span class="required">*</span></label>
          <InputText
            id="softwareVersionString"
            type="text"
            v-model="v$.msgCertifyModel.softwareVersionString.$model"
            :class="{ 'p-invalid': v$.msgCertifyModel.softwareVersionString.$invalid && submitted }" :readonly="model.softwareVersionString"
          />
        </div>

				<!-- Field for cDCertificateId -->
				<div class="field">
					<label for="cDCertificateId">CD Certificate Id <span class="required">*</span></label>
					<InputText
						id="cDCertificateId"
						type="text"
						v-model="v$.msgCertifyModel.cDCertificateId.$model"
						:class="{ 'p-invalid': v$.msgCertifyModel.cDCertificateId.$invalid && submitted }"
					/>
				</div>

				<!-- Field for CD Version Number -->
				<div class="field">
					<label for="cDVersionNumber">CD Version Number</label>
					<InputText
						id="cDVersionNumber"
						type="text"
						v-model="v$.msgCertifyModel.cDVersionNumber.$model"
						:class="{ 'p-invalid': v$.msgCertifyModel.cDVersionNumber.$invalid && submitted }"
					/>
				</div>

        <!-- Field for certificationDate -->
        <div class="field">
          <label for="certificationDate">Certification Date <span class="required">*</span></label>
          <InputText
            id="certificationDate"
            type="text"
            v-model="v$.msgCertifyModel.certificationDate.$model"
            :class="{ 'p-invalid': v$.msgCertifyModel.certificationDate.$invalid && submitted }"
          />
        </div>

        <!-- Field for certificationType -->
        <div class="field">
          <label for="certificationType">Certification Type <span class="required">*</span></label>
          <InputText
            id="certificationType"
            type="text"
            v-model="v$.msgCertifyModel.certificationType.$model"
            :class="{ 'p-invalid': v$.msgCertifyModel.certificationType.$invalid && submitted }"
          />
        </div>

				<!-- Field for reason -->
        <div class="field">
          <label for="reason">Reason</label>
          <InputText
            id="reason"
            Type="text"
            v-model="v$.msgCertifyModel.reason.$model"
            :class="{ 'p-invalid': v$.msgCertifyModel.reason.$invalid && submitted }"
          />
        </div>

				<!-- Field for programTypeVersion -->
				<div class="field">
					<label for="programTypeVersion">Program Type Version</label>
					<InputText
						id="programTypeVersion"
						type="text"
						v-model="v$.msgCertifyModel.programTypeVersion.$model"
						:class="{ 'p-invalid': v$.msgCertifyModel.programTypeVersion.$invalid && submitted }"
					/>
				</div>

				<!-- Field for familyId -->
				<div class="field">
					<label for="familyId">Family Id</label>
					<InputText
						id="familyId"
						type="text"
						v-model="v$.msgCertifyModel.familyId.$model"
						:class="{ 'p-invalid': v$.msgCertifyModel.familyId.$invalid && submitted }"
					/>
				</div>

				<!-- Field for  supportedClusters -->
				<div class="field">
					<label for="supportedClusters">Supported Clusters</label>
					<InputText
						id="supportedClusters"
						type="text"
						v-model="v$.msgCertifyModel.supportedClusters.$model"
						:class="{ 'p-invalid': v$.msgCertifyModel.supportedClusters.$invalid && submitted }"
					/>
				</div>

				<!-- Field for compliantPlatformUsed -->
				<div class="field">
					<label for="compliantPlatformUsed">Compliant Platform Used</label>
					<InputText
						id="compliantPlatformUsed"
						type="text"
						v-model="v$.msgCertifyModel.compliantPlatformUsed.$model"
						:class="{ 'p-invalid': v$.msgCertifyModel.compliantPlatformUsed.$invalid && submitted }"
					/>
				</div>

				<!-- Field for OSVersion -->
				<div class="field">
					<label for="OSVersion">OS Version</label>
					<InputText
						id="OSVersion"
						type="text"
						v-model="v$.msgCertifyModel.OSVersion.$model"
						:class="{ 'p-invalid': v$.msgCertifyModel.OSVersion.$invalid && submitted }"
					/>
				</div>

				<!-- Field for certificationRoute -->
				<div class="field">
					<label for="certificationRoute">CertificationRoute</label>
					<InputText
						id="certificationRoute"
						type="text"
						v-model="v$.msgCertifyModel.certificationRoute.$model"
						:class="{ 'p-invalid': v$.msgCertifyModel.certificationRoute.$invalid && submitted }"
					/>
				</div>

				<!-- Field for programType -->
				<div class="field">
					<label for="programType">Program Type</label>
					<InputText
						id="programType"
						type="text"
						v-model="v$.msgCertifyModel.programType.$model"
						:class="{ 'p-invalid': v$.msgCertifyModel.programType.$invalid && submitted }"
					/>
				</div>

				<!-- Field for transport -->
				<div class="field">
					<label for="transport">Transport  </label>
					<InputText
						id="transport"
						type="text"
						v-model="v$.msgCertifyModel.transport.$model"
						:class="{ 'p-invalid': v$.msgCertifyModel.transport.$invalid && submitted }"
					/>
				</div>

				<!-- Field for parentChild -->
				<div class="field">
					<label for="parentChild">ParentChild</label>
					<InputText
						id="parentChild"
						type="text"
						v-model="v$.msgCertifyModel.parentChild.$model"
						:class="{ 'p-invalid': v$.msgCertifyModel.parentChild.$invalid && submitted }"
					/>
				</div>

				<!-- Field for certificationIdOfSoftwareComponent -->
				<div class="field">
					<label for="certificationIdOfSoftwareComponent">CertificationId Of SoftwareComponent</label>
					<InputText
						id="certificationIdOfSoftwareComponent"
						type="text"
						v-model="v$.msgCertifyModel.certificationIdOfSoftwareComponent.$model"
						:class="{ 'p-invalid': v$.msgCertifyModel.certificationIdOfSoftwareComponent.$invalid && submitted }"
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
