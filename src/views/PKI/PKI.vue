<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import ProposeRootCertificate from "./ProposeRootCertificate.vue";
import GrantActionRootCertificate from "./GrantActionRootCertificate.vue";
import AddLeafCertificate from "./AddLeafCertificate.vue";
import LeafCertificates from "./LeafCertificates.vue";
import { FilterMatchMode } from "primevue/api";

export default {
  name: "PKI",
  data() {
    return {
      showGrantActionRootCert: false,
      showProposeRootCert: false,
      showAddLeafCert: false,
      action: null,
      expandedRows: [],
      filters: {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      },
    };
  },

  components: {
    DataTable,
    Column,
    TabView,
    TabPanel,
    Button,
    Dialog,
    GrantActionRootCertificate,
    ProposeRootCertificate,
    AddLeafCertificate,
    LeafCertificates,
  },

  computed: {
    allApprovedCertificates() {
      let rootCertificates = [];
      const approvedCertificatesArray =
        this.$store.getters[
          "zigbeealliance.distributedcomplianceledger.pki/getApprovedCertificatesAll"
        ]();
      if (approvedCertificatesArray.approvedCertificates) {
        let allCerts = approvedCertificatesArray.approvedCertificates;
        rootCertificates = allCerts.filter((cert) => {
          return cert.certs[0].isRoot;
        });
        rootCertificates = rootCertificates.map((item) => {
          item.approvals = item.certs[0].approvals;
          item.serialNumber = item.certs[0].serialNumber;
					item.subjectAsText = item.certs[0].subjectAsText;
          return item;
        });
      }
      return rootCertificates;
    },

    allProposedCertificates() {
      const proposedCertificatesArray =
        this.$store.getters[
          "zigbeealliance.distributedcomplianceledger.pki/getProposedCertificateAll"
        ]();
      return proposedCertificatesArray?.proposedCertificate;
    },

    allProposedCertificateRevocation() {
      const proposedCertificateRevocationArray =
        this.$store.getters[
          "zigbeealliance.distributedcomplianceledger.pki/getProposedCertificateRevocationAll"
        ]();
      return proposedCertificateRevocationArray.proposedCertificateRevocation;
    },

    allRevokedCertificates() {
      let revokedCertificates = [];
      const revokedCertificatesArray =
        this.$store.getters[
          "zigbeealliance.distributedcomplianceledger.pki/getRevokedCertificatesAll"
        ]();

      if (revokedCertificatesArray.revokedCertificates) {
        let allCerts = revokedCertificatesArray.revokedCertificates;
        revokedCertificates = allCerts.map((item) => {
          item.approvals = item.certs[0].approvals;
          item.serialNumber = item.certs[0].serialNumber;
          return item;
        });
      }
      return revokedCertificates;
    },

    isSignedIn() {
      const loggedIn = this.$store.getters["common/wallet/loggedIn"];
      return loggedIn;
    },
  },

  created: function () {
    // Get all the approved certificates
    this.$store.dispatch(
      "zigbeealliance.distributedcomplianceledger.pki/QueryApprovedCertificatesAll",
      {
        options: {
          subscribe: true,
          all: true,
        },
      }
    );

    // Get all the proposed certificates
    this.$store.dispatch(
      "zigbeealliance.distributedcomplianceledger.pki/QueryProposedCertificateAll",
      {
        options: {
          subscribe: true,
          all: true,
        },
      }
    );
    // Get all the revoked certificates
    this.$store.dispatch(
      "zigbeealliance.distributedcomplianceledger.pki/QueryRevokedCertificatesAll",
      {
        options: {
          subscribe: true,
          all: true,
        },
      }
    );

    // Get all certificates that are proposed for revocation
    this.$store.dispatch(
      "zigbeealliance.distributedcomplianceledger.pki/QueryProposedCertificateRevocationAll",
      {
        options: {
          subscribe: true,
          all: true,
        },
      }
    );
  },

  methods: {
		trimAddress(address) {
			// Return first 6 and last 4 characters
			if(address && address.length > 16) {
				return address.substring(0, 10) + "..." + address.substring(address.length - 4);
			} else {
				return address;
			}
		},
		breakLongSubject(subject) {
			// If subject is 30 characters long and has no line breaks, break the subject and insert a line break at every 15 charactacters
			if(subject && subject.length > 30 && subject.indexOf("\n") == -1) {
				let newSubject = "";
				let i = 0;
				while(i < subject.length) {
					newSubject += subject.substring(i, i + 15) + "\n";
					i += 15;
				}
				return newSubject;
			} else {
				return subject;
			}
		},
    showProposeRootCertificateDialog() {
      this.showProposeRootCert = true;
    },
    dismissProposeRootCertificateDialog() {
      this.showProposeRootCert = false;
    },

    showAddLeafCertificateDialog() {
      this.showAddLeafCert = true;
    },
    dismissAddLeafCertificateDialog() {
      this.showAddLeafCert = false;
    },

    showGrantActionRootCertificateDialog(certificate, action) {
      this.showGrantActionRootCert = true;
      this.action = action;
      this.selectedCertificate = certificate;
    },

    dismissGrantActionRootCertificateDialog() {
      this.showGrantActionRootCert = false;
    },

    grantActionHeader() {
      switch (this.action) {
        case "ProposeAddX509RootCert":
          return "Propose Add X509 Root Certificate";
        case "ProposeRevokeX509RootCert":
          return "Propose Revoke X509 Root Certificate";
        case "ApproveAddX509RootCert":
          return "Approve Add X509 Root Certificate";
				case "RejectAddX509RootCert" :
					return "Reject Add X509 Root Certificate";
        case "ApproveRevokeX509RootCert":
          return "Approve Revoke X509 Root Certificate";
        case "RevokeX509Cert":
          return "Revoke a X509 Certificate";
        default:
          return "Grant Action Failed";
      }
    },
  },
};
</script>

<template>
  <div class="prime-vue-container">
    <TabView>
      <TabPanel header="All Approved Certificates">
        <Button
          @click="showProposeRootCertificateDialog"
          class="p-button-primary mb-4 mr-4"
          v-bind:class="{ 'p-disabled': !isSignedIn }"
          label="Propose Root Certificate"
        />
        <Button
          @click="showAddLeafCertificateDialog"
          class="p-button-primary mb-4"
          v-bind:class="{ 'p-disabled': !isSignedIn }"
          label="Add Leaf Certificate"
        />

        <DataTable
          :value="allApprovedCertificates"
          :auto-layout="true"
          :paginator="true"
          :rows="10"
          v-model:filters="filters"
					v-model:expandedRows="expandedRows"
      @rowExpand="onRowExpand"
      @rowCollapse="onRowCollapse"
          filterDisplay="row"
          showGridlines
          stripedRows
        >
          <template #header>
            <div class="flex justify-content-end">
              <span class="p-input-icon-left">
                <i class="pi pi-search" />
                <InputText
                  v-model="filters['global'].value"
                  placeholder="Search"
                />
              </span>
            </div>
          </template>

          <Column :expander="true" headerStyle="width: 3rem" />
          <Column field="subjectAsText" header="Subject" :sortable="true"></Column>
          <Column field="subjectKeyId" header="Subject Key ID"></Column>
          <Column field="approvals" header="Approvals">
            <template #body="row">
              <ol>
                <li
                  class="mb-2"
                  v-for="(approval, index) in row.data.approvals"
                  :key="index"
                >
                  Address : {{ approval.address }} <br />
                  Time : {{ new Date(approval.time * 1000).toString() }} <br />
                  Info : {{ approval.info }}
                </li>
              </ol>
            </template>
          </Column>
          <Column
            headerStyle="width: 4rem; text-align: center"
            bodyStyle="text-align: center; overflow: visible"
          >
            <template #body="{ data }">
              <Button
                label="Propose Revoke"
                class="p-button-danger"
                @click="
                  showGrantActionRootCertificateDialog(
                    data,
                    'ProposeRevokeX509RootCert'
                  )
                "
                iconPos="left"
                icon="pi pi-ban"
                v-bind:class="{ 'p-disabled': !isSignedIn }"
              />
            </template>
          </Column>
          <template #expansion="certificate">
            <div>
              <LeafCertificates
                :subject="certificate.data.subject"
                :subjectKeyId="certificate.data.subjectKeyId"
              ></LeafCertificates>
            </div>
          </template>
        </DataTable>
      </TabPanel>

      <TabPanel header="All Proposed Certificates">

        <DataTable
          :value="allProposedCertificates"
          :auto-layout="true"
          :paginator="true"
          :rows="10"
          v-model:filters="filters"
          filterDisplay="row"
          showGridlines
          stripedRows
        >
          <template #header>
            <div class="flex justify-content-end">
              <span class="p-input-icon-left">
                <i class="pi pi-search" />
                <InputText
                  v-model="filters['global'].value"
                  placeholder="Search"
                />
              </span>
            </div>
          </template>

          <Column field="subjectAsText" header="Subject" :sortable="true"></Column>

          <Column
            field="subjectKeyId"
            header="Subject Key ID"
            :sortable="true"
          ></Column>
          <Column field="approvals" header="Approvals">
            <template #body="row">
              <ol>
                <li
                  class="mb-2"
                  v-for="(approval, index) in row.data.approvals"
                  :key="index"
                >
                  Address : {{ trimAddress(approval.address) }} <br />
                  Time : {{ new Date(approval.time * 1000).toString() }} <br />
                  Info : {{ approval.info }}
                </li>
              </ol>
            </template>
          </Column>
					<Column field="rejects" header="Rejects">
            <template #body="row">
              <ol>
                <li
                  class="mb-2"
                  v-for="(reject, index) in row.data.rejects"
                  :key="index"
                >
                  Address : {{ trimAddress(reject.address) }} <br />
                  Time : {{ new Date(reject.time * 1000).toString() }} <br />
                  Info : {{ reject.info }}
                </li>
              </ol>
            </template>
          </Column>
          <Column
            headerStyle="width: 4rem; text-align: center"
            bodyStyle="text-align: left; overflow: visible"
          >
            <template #body="{ data }">
              <Button
                label="Approve"
                class="p-button-primary"
                @click="
                  showGrantActionRootCertificateDialog(
                    data,
                    'ApproveAddX509RootCert'
                  )
                "
                iconPos="left"
                icon="pi pi-check"
                v-bind:class="{ 'p-disabled': !isSignedIn }"
              />


              <Button
                label="Reject"
                class="mt-3 p-button-danger"
                @click="
                  showGrantActionRootCertificateDialog(
                    data,
                    'RejectAddX509RootCert'
                  )
                "
                iconPos="left"
                icon="pi pi-ban"


                v-bind:class="{ 'p-disabled': !isSignedIn }"
              />
            </template>
          </Column>
        </DataTable>
      </TabPanel>

      <TabPanel header="All Proposed Revoked Certificates">

        <DataTable
          :value="allProposedCertificateRevocation"
          :auto-layout="true"
          :paginator="true"
          :rows="10"
          v-model:filters="filters"
          filterDisplay="row"
          showGridlines
          stripedRows
        >
          <template #header>
            <div class="flex justify-content-end">
              <span class="p-input-icon-left">
                <i class="pi pi-search" />
                <InputText
                  v-model="filters['global'].value"
                  placeholder="Search"
                />
              </span>
            </div>
          </template>
          <Column field="subject" header="Subject" :sortable="true">
						<template #body="{ data }">
							<span>
								{{ breakLongSubject(data.subject) }}
							</span>
						</template>
					</Column>
          <Column
            field="subjectKeyId"
            header="Subject Key ID"
            :sortable="true"
          ></Column>
          <Column field="approvals" header="Revokes">
            <template #body="row">
              <ol>
                <li
                  class="mb-2"
                  v-for="(approval, index) in row.data.approvals"
                  :key="index"
                >
                  Address : {{ approval.address }} <br />
                  Time : {{ new Date(approval.time * 1000).toString() }} <br />
                  Info : {{ approval.info }}
                </li>
              </ol>
            </template>
          </Column>
          <Column
            headerStyle="width: 4rem; text-align: center"
            bodyStyle="text-align: center; overflow: visible"
          >
            <template #body="{ data }">
              <Button
                label="Revoke"
                class="p-button-danger"
                @click="
                  showGrantActionRootCertificateDialog(
                    data,
                    'ApproveRevokeX509RootCert'
                  )
                "
                iconPos="left"
                icon="pi pi-ban"
                v-bind:class="{ 'p-disabled': !isSignedIn }"
              />
            </template>
          </Column>
        </DataTable>
      </TabPanel>

      <TabPanel header="All Revoked Certificates">
        <DataTable
          :value="allRevokedCertificates"
          :auto-layout="true"
          :paginator="true"
          :rows="10"
          v-model:filters="filters"
          filterDisplay="row"
          showGridlines
          stripedRows
        >

          <template #header>
            <div class="flex justify-content-end">
              <span class="p-input-icon-left">
                <i class="pi pi-search" />
                <InputText
                  v-model="filters['global'].value"
                  placeholder="Search"
                />
              </span>
            </div>
          </template>
          <Column class="subject" field="subject" header="Subject" :sortable="true"></Column>
          <Column
            field="subjectKeyId"
            header="Subject Key ID"
            :sortable="true"
          ></Column>
          <Column field="approvals" header="Revokes">
            <template #body="row">
              <ol>
                <li
                  class="mb-2"
                  v-for="(approval, index) in row.data.approvals"
                  :key="index"
                >
                  Address : {{ approval.address }} <br />
                  Time : {{ new Date(approval.time * 1000).toString() }} <br />
                  Info : {{ approval.info }}
                </li>
              </ol>
            </template>
          </Column>
        </DataTable>
      </TabPanel>
    </TabView>

    <Dialog
      header="Propose X-509 Root Certificate"
      @update:visible="dismissProposeRootCertificateDialog"
      :visible="showProposeRootCert"
      :style="{ width: '50vw' }"
      class="p-fluid"
      :modal="true"
    >
      <ProposeRootCertificate
        :action="action"
        :certificate="selectedCertificate"
        @close-dialog="dismissProposeRootCertificateDialog"
      ></ProposeRootCertificate>
    </Dialog>

    <Dialog
      header="Add X-509 Certificate"
      @update:visible="dismissAddLeafCertificateDialog"
      :visible="showAddLeafCert"
      :style="{ width: '50vw' }"
      class="p-fluid"
      :modal="true"
    >
      <AddLeafCertificate
        :action="action"
        :certificate="selectedCertificate"
        @close-dialog="dismissAddLeafCertificateDialog"
      ></AddLeafCertificate>
    </Dialog>

    <Dialog
      :header="grantActionHeader()"
      @update:visible="dismissGrantActionRootCertificateDialog"
      :visible="showGrantActionRootCert"
      :style="{ width: '50vw' }"
      class="p-fluid"
      :modal="true"
    >
      <GrantActionRootCertificate
        :action="action"
        :certificate="selectedCertificate"
        @close-dialog="dismissGrantActionRootCertificateDialog"
      ></GrantActionRootCertificate>
    </Dialog>
  </div>
</template>

<style>
 td.subject {
	  max-width: 400px;
    text-overflow: ellipsis;
    overflow: hidden;
}

</style>


