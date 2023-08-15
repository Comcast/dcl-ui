<script>
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import { required } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import Message from 'primevue/message'

export default {
  name: 'GrantActionRootCertificate',


  props: ['certificate', 'action'],

  data() {
    return {
      txProcessing: false,
      error: null
    }
  },

  computed: {
    isSignedIn() {
      const loggedIn = this.$store.getters["loggedIn"]
      return loggedIn
    }
  },
  methods: {
    handleSubmit() {
      this.error = null
      this.txProcessing = true;
			let loader = this.$loading.show();

      if (!this.$store.getters["loggedIn"]) {
        this.$toast.add({ severity: 'warn', summary: 'Please sign in', detail: 'Please sign in to at least one account', life: 3000 })
        return
      }
      
      
      const account = this.$store.state.selectedKeplrAccount;
      const creatorAddress = account.address
			const methodName = `zigbeealliance.distributedcomplianceledger.pki/sendMsg${this.action}`

      this.$store
        .dispatch(methodName, {
          value: {
						signer: creatorAddress,
						subject: this.certificate.subject,
						subjectKeyId: this.certificate.subjectKeyId,
						info: this.info,
						time: parseInt(new Date().getTime() / 1000),
          }
        })
        .then(
          (response) => {
            this.txProcessing = false;
						loader.hide();
            if (response.code != 0) {
              this.error = response
            } else {
              this.error = null
              this.$toast.add({ severity: 'success', summary: 'Successful Tx', detail: this.action + ' transaction was submitted successfully', life: 3000 })
              this.$emit('close-dialog')
            }
          },
          (error) => {
            this.error = error
            this.txProcessing = false;
						loader.hide();
						this.$toast.add({ severity: 'error', summary: 'Error while processing Tx', detail: 'Tx failed', life: 3000 })
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

      <form @submit.prevent="handleSubmit()" class="">

        <!-- Field for Subject -->
        <div class="field">
          <label for="subject">Subject</label>
          <InputText id="subject" type="text" v-model="certificate.subject"  class="p-disabled"/>
        </div>

				<!-- Field for SubjectKeyId -->
				<div class="field">
					<label for="subjectKeyId">Subject Key Id</label>
					<InputText id="subjectKeyId" type="text" v-model="certificate.subjectKeyId"  class="p-disabled"/>
				</div>

				<!-- Field for Info -->
				<div class="field">
          <label for="info">Info</label>
          <InputText id="info" type="text" v-model="info"  />
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

