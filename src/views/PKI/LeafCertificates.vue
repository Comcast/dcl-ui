<script>
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import Message from 'primevue/message'
import GrantActionRootCertificate from './GrantActionRootCertificate'

export default {
  name: 'LeafCertificates',
  props: ['subject', 'subjectKeyId'],

  data() {
    return {
			showRevokeCert: false,
			revokeCertificate: null,
			expandedRows: [],
    }
  },

  methods: {
		showRevokeCertificateDialog(certificate) {
			this.showRevokeCert = true
			this.revokeCertificate = certificate
		},

		dismissRevokeCertificateDialog() {
			this.showRevokeCert = false
		}

  },
  components: {
    DataTable,
    Column,
    Button,
    Dialog,
    Message,
		GrantActionRootCertificate,
  },

  computed: {


		allCertificates() {
			let childCerts = [];
			const certificatesArray = this.$store.getters['zigbeealliance.distributedcomplianceledger.pki/getChildCertificates']({
            params: {
							issuer: this.subject,
							authorityKeyId: this.subjectKeyId
            }
          });
			if (certificatesArray && certificatesArray.childCertificates) {
				childCerts = certificatesArray.childCertificates.certIds;
			}
			return childCerts;
		},

		    isSignedIn() {
      const loggedIn = this.$store.getters['common/wallet/loggedIn']
      return loggedIn
    }


  },

  created: function () {
    // Get all the accounts
    this.$store
      .dispatch('zigbeealliance.distributedcomplianceledger.pki/QueryChildCertificates', {
        options: {
          subscribe: false,
          all: true
        },
        params: {
          issuer: this.subject,
          authorityKeyId: this.subjectKeyId,
        }
      }).then(
				(response) => {
				},
				(error) => {
					this.error = error.message
				}
			);
  }
}
</script>

<template>
  <div class="prime-vue-container ml-5">

		<div v-if="allCertificates.length>0">
			<DataTable v-model:expandedRows="expandedRows" :value="allCertificates" :auto-layout="true" showGridlines stripedRows>
				<Column :expander="true" headerStyle="width: 3rem" />
				<Column field="subject" header="Subject"></Column>
				<Column field="subjectKeyId" header="Subject Key Id"></Column>
				<Column headerStyle="width: 4rem; text-align: center" bodyStyle="text-align: center; overflow: visible">
            <template #body="{ data }">
              <Button
                label="Revoke"
                class="p-button-danger"
                @click="showRevokeCertificateDialog(data)"
                iconPos="left"
                icon="pi pi-ban"
                v-bind:class="{ 'p-disabled': !isSignedIn }"
              />
            </template>
				</Column>
					<template #expansion="certificate">

						<div>

							<LeafCertificates :subject="certificate.data.subject" :subjectKeyId="certificate.data.subjectKeyId"></LeafCertificates>
						</div>
					</template>

			</DataTable>

    <Dialog
      header="Revoke X509 Certificate"
      @update:visible="dismissRevokeCertificateDialog"
      :visible="showRevokeCert"
      :style="{ width: '50vw' }"
      class="p-fluid"
      :modal="true">
      <GrantActionRootCertificate action="RevokeX509Cert" :certificate="revokeCertificate" @close-dialog="dismissRevokeCertificateDialog"></GrantActionRootCertificate>
    </Dialog>

		</div>
		<div v-else>
			<h5> No Child Certificates present on ledger </h5>
		</div>

  </div>
</template>
