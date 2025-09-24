<script>
import InputText from 'primevue/inputtext'
import MultiSelect from 'primevue/multiselect'
import Button from 'primevue/button'
import Textarea from 'primevue/textarea';
import { required } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import Message from 'primevue/message'
import { MsgAddNocX509IcaCert } from 'zigbee-alliance-distributed-compliance-ledger-client-ts/zigbeealliance.distributedcomplianceledger.pki/types'

export default {
	name: 'AddNocIcaCertificate',

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
			msgAddNocX509IcaCert: MsgAddNocX509IcaCert.fromPartial({})
		}
	},

	validations() {
		return {
			msgAddNocX509IcaCert: {
				cert: {
					required
				},
				info: {
				}
			}
		}
	},
	methods: {
		handleSubmit(isFormValid) {
			let loader = this.$loading.show();
			this.submitted = true
			this.error = null
			if (!isFormValid) {
				return
			}
			const account = this.$store.state.selectedKeplrAccount;
			const creatorAddress = account.address

			this.txProcessing = true
			this.msgAddNocX509IcaCert.signer = creatorAddress
			this.msgAddNocX509IcaCert.time = parseInt(new Date().getTime() / 1000)

			this.$store
				.dispatch(`zigbeealliance.distributedcomplianceledger.pki/sendMsgAddNocX509IcaCert`, {
					value: this.msgAddNocX509IcaCert
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
					<label for="cert">Certificate</label>
					<Textarea v-model="v$.msgAddNocX509IcaCert.$model.cert"
						:class="{ 'p-invalid': v$.msgAddNocX509IcaCert.$model.cert.$invalid && submitted }"
						style="display:block;width:100%" rows="10" />
				</div>

				<div class="field">
					<label for="info">Info</label>
					<InputText id="info" type="text" v-model="v$.msgAddNocX509IcaCert.info.$model"
						:class="{ 'p-invalid': v$.msgAddNocX509IcaCert.info.$invalid && submitted }" />
				</div>


        <div class="field">
          <div class="grid">
            <div class="col-12">
              <Button v-if="!txProcessing" type="submit"
                v-tooltip="'This will open keplr wallet window. Please finish the transaction there.'"
                label="Add NOC Ica Certificate" icon="pi pi-check" iconPos="left"
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
