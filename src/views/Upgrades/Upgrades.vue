<script>
import { onMounted } from "vue";
import { ref } from "vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import { email, required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { FilterMatchMode } from "primevue/api";


export default {
  name: "Upgrades",

  data() {
    return {
      showProposeNewAccount: false,
      showGrantActionAccount: false,
      selectedAccount: null,
      grantAction: null,
      filters: {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      },
    };
  },

  methods: {
    showProposeNewAccountDialog() {
      this.showProposeNewAccount = true;
    },
    dismissProposeNewAccountDialog() {
      this.showProposeNewAccount = false;
    },
    showGrantActionAccountDialog(account, action) {
      this.showGrantActionAccount = true;
      this.selectedAccount = account;
      this.grantAction = action;
    },
    dismissGrantActionAccountDialog() {
      this.showGrantActionAccount = false;
    },
		trimAddress(address) {
			// Return first 6 and last 4 characters
			if(address && address.length > 16) {
				return address.substring(0, 10) + "..." + address.substring(address.length - 4);
			} else {
				return address;
			}
		},
		copyToClipboard(value) {
			const el = document.createElement('textarea');
			el.value = value;
			document.body.appendChild(el);
			el.select();
			document.execCommand('copy');
			document.body.removeChild(el);
		},
  },
  components: {
    DataTable,
    Column,
    TabView,
    TabPanel,
    Button,
    Dialog,

  },

  computed: {
    allProposedUpgrades() {
      const proposedUpgradeArray =
        this.$store.getters[
          "zigbeealliance.distributedcomplianceledger.dclupgrade/getProposedUpgradeAll"
        ]();
      return proposedUpgradeArray?.proposedUpgrade;
    },

    allRejectedUpgrades() {
      const rejectedUpgradeArray =
        this.$store.getters[
          "zigbeealliance.distributedcomplianceledger.dclupgrade/getRejectedUpgradeAll"
        ]();
      return rejectedUpgradeArray?.rejectedUpgrade;
    },

    allApprovedUpgrades() {
      const approvedUpgradesArray =
        this.$store.getters[
          "zigbeealliance.distributedcomplianceledger.dclupgrade/getApprovedUpgradeAll"
        ]();
      return approvedUpgradesArray?.approvedUpgrade;
    },

    isSignedIn() {
      const loggedIn = this.$store.getters["loggedIn"] || this.$store.getters["common/wallet/loggedIn"];
      return loggedIn;
    },

    grantActionHeader() {
      switch (this.grantAction) {
        case "ApproveAddAccount":
          return "Approve Add Account";
        case "RejectAddAccount":
          return "Reject Add Account";
        case "ProposeRevokeAccount":
          return "Propose Revoke Account";
        case "ApproveRevokeAccount":
          return "Approve Revoke Account";
        default:
          return "Grant Action Failed";
      }
    },
  },

  created: function () {
    // Get all the accounts
    this.$store.dispatch(
      "zigbeealliance.distributedcomplianceledger.dclupgrade/QueryApprovedUpgradeAll",
      {
        options: {
          subscribe: true,
          all: true,
        },
      }
    );
    // Get all the pending accounts
    this.$store.dispatch(
      "zigbeealliance.distributedcomplianceledger.dclupgrade/QueryProposedUpgradeAll",
      {
        options: {
          subscribe: true,
          all: true,
        },
      }
    );
    // Get all the revoked accounts
    this.$store.dispatch(
      "zigbeealliance.distributedcomplianceledger.dclupgrade/QueryRejectedUpgradeAll",
      {
        options: {
          subscribe: true,
          all: true,
        },
      }
    );
  },
};
</script>

<template>
  <div class="prime-vue-container">
    <TabView>
      <TabPanel header="All Approved Upgrades">

        <div class="mb-4"></div>
        <DataTable
          :value="allApprovedUpgrades"
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

          <Column
            field="creator"
            header="Creator Address"
          ></Column>
          <Column field="plan" header="Plan">

					<template #body="{ data }">
						Name : {{ data.plan.name }} <br />
						<!-- Time : {{ data.plan.time}}	<br /> -->
						Height : {{ data.plan.height}}	<br />
						<!-- checksum: <pre id="json">{{JSON.parse(data.plan.info)}}</pre> 	<br /> -->
          </template>
					</Column>
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
                  v-for="(rejects, index) in row.data.rejects"
                  :key="index"
                >
                  Address : {{ trimAddress(rejects.address) }} <br />
                  Time : {{ new Date(rejects.time * 1000).toString() }} <br />
                  Info : {{ rejects.info }}
                </li>
              </ol>
            </template>
          </Column>
        </DataTable>
      </TabPanel>

      <TabPanel header="All Proposed Upgrades">
        <DataTable
          :value="allProposedUpgrades"
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

          <Column
            field="creator"
            header="Creator Address"
          ></Column>
          <Column field="plan" header="Plan">

					<template #body="{ data }">
						Name : {{ data.plan.name }} <br />
						<!-- Time : {{ data.plan.time}}	<br /> -->
						Height : {{ data.plan.height}}	<br />
						<!-- checksum: <pre id="json">{{JSON.parse(data.plan.info)}}</pre> 	<br /> -->
          </template>
					</Column>
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
                  v-for="(rejects, index) in row.data.rejects"
                  :key="index"
                >
                  Address : {{ trimAddress(rejects.address) }} <br />
                  Time : {{ new Date(rejects.time * 1000).toString() }} <br />
                  Info : {{ rejects.info }}
                </li>
              </ol>
            </template>
          </Column>

        </DataTable>
      </TabPanel>
      <TabPanel header="All Rejected Upgrades">
        <DataTable
          :value="allRejectedUpgrades"
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

          <Column
            field="creator"
            header="Creator Address"
          ></Column>
          <Column field="plan" header="Plan">

					<template #body="{ data }">
						Name : {{ data.plan.name }} <br />
						<!-- Time : {{ data.plan.time}}	<br /> -->
						Height : {{ data.plan.height}}	<br />
						<!-- checksum: <pre id="json">{{JSON.parse(data.plan.info)}}</pre> 	<br /> -->
          </template>
					</Column>
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
                  v-for="(rejects, index) in row.data.rejects"
                  :key="index"
                >
                  Address : {{ trimAddress(rejects.address) }} <br />
                  Time : {{ new Date(rejects.time * 1000).toString() }} <br />
                  Info : {{ rejects.info }}
                </li>
              </ol>
            </template>
          </Column>

        </DataTable>
      </TabPanel>
    </TabView>

    <Dialog
      :header="grantActionHeader"
      @update:visible="dismissGrantActionAccountDialog"
      :visible="showGrantActionAccount"
      :style="{ width: '50vw' }"
      :modal="true"
    >

    </Dialog>

    <Dialog
      header="Propose a new account"
      @update:visible="dismissProposeNewAccountDialog"
      :visible="showProposeNewAccount"
      :style="{ width: '50vw' }"
      class="p-fluid"
      :modal="true"
    >

    </Dialog>
  </div>
</template>


