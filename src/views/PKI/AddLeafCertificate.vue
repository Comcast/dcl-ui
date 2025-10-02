<script>
import InputText from 'primevue/inputtext'
import MultiSelect from 'primevue/multiselect'
import Button from 'primevue/button'
import Textarea from 'primevue/textarea';
import { required } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import Message from 'primevue/message'
import { MsgAddX509Cert } from 'zigbee-alliance-distributed-compliance-ledger-client-ts/zigbeealliance.distributedcomplianceledger.pki/types'

export default {
	name: 'AddLeafCertificate',

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
			msgAddX509Cert: MsgAddX509Cert.fromPartial({})
		}
	},

	validations() {
		return {
			msgAddX509Cert: {
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
			this.msgAddX509Cert.signer = creatorAddress
			this.msgAddX509Cert.time = parseInt(new Date().getTime() / 1000)

			this.$store
				.dispatch(`zigbeealliance.distributedcomplianceledger.pki/sendMsgAddX509Cert`, {
					value: this.msgAddX509Cert
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
				<!-- Field for vid -->
				<div class="field">
					<label for="cert">Certificate</label>
					<Textarea v-model="v$.msgAddX509Cert.$model.cert"
						:class="{ 'p-invalid': v$.msgAddX509Cert.$model.cert.$invalid && submitted }"
						style="display:block;width:100%" rows="10" />
				</div>

				<!-- Field for pid -->
				<div class="field">
					<label for="info">Info</label>
					<InputText id="info" type="text" v-model="v$.msgAddX509Cert.info.$model"
						:class="{ 'p-invalid': v$.msgAddX509Cert.info.$invalid && submitted }" />
				</div>


				<div class="field">
					<div class="grid">
						<div class="col-3">
							<Button class="p-button-primary" v-if="!txProcessing" type="submit" label="Submit" icon="pi pi-check"
								iconPos="left" v-bind:class="[v$.$invalid ? 'p-disabled' : '']" />
							<Button class="p-button-primary" v-if="txProcessing" label="Submitted Tx.." disabled="disabled"
								icon="pi pi-spin pi-spinner" iconPos="left" />
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
