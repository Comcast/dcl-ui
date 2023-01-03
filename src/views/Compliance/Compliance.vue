<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import CertifyModel from "./CertifyModel.vue";
import RevokeModel from "./RevokeModel.vue";
import ProvisionModel from "./ProvisionModel.vue";
import { FilterMatchMode } from "primevue/api";
export default {
  name: "Compliance",
  data() {
    return {
      selectedCertifiedModel: null,
      selectedRevokedModel: null,
      showCertifyModel: false,
      showRevokeModel: false,
      showProvisionalModel: false,
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
    CertifyModel,
    RevokeModel,
    ProvisionModel,
  },

  computed: {

    allCertifiedModels() {
      const certifiedModelArray =
        this.$store.getters[
          "zigbeealliance.distributedcomplianceledger.compliance/getCertifiedModelAll"
        ]();
			// Add Hex Values for vid, pid
			certifiedModelArray?.certifiedModel?.forEach((certifiedModel) => {
				certifiedModel.vidHex = this.hexValue(certifiedModel.vid);
				certifiedModel.pidHex = this.hexValue(certifiedModel.pid);
			});
      return certifiedModelArray?.certifiedModel;
    },

    allRevokedModels() {
      const revokedModelArray =
        this.$store.getters[
          "zigbeealliance.distributedcomplianceledger.compliance/getRevokedModelAll"
        ]();
			// Add Hex Values for vid, pid
			revokedModelArray?.revokedModel?.forEach((revokedModel) => {
				revokedModel.vidHex = this.hexValue(revokedModel.vid);
				revokedModel.pidHex = this.hexValue(revokedModel.pid);
			});
      return revokedModelArray?.revokedModel;
    },

    allProvisionalModels() {
      const allProvisionalModels =
        this.$store.getters[
          "zigbeealliance.distributedcomplianceledger.compliance/getProvisionalModelAll"
        ]();
			// Add Hex Values for vid, pid
			allProvisionalModels?.provisionalModel?.forEach((provisionalModel) => {
				provisionalModel.vidHex = this.hexValue(provisionalModel.vid);
				provisionalModel.pidHex = this.hexValue(provisionalModel.pid);
			});

      return allProvisionalModels?.provisionalModel;
    },

    isSignedIn() {
      const loggedIn = this.$store.getters["common/wallet/loggedIn"];
      return loggedIn;
    },
  },

  created: function () {
    // Get all the certified compliance models
    this.$store.dispatch(
      "zigbeealliance.distributedcomplianceledger.compliance/QueryComplianceInfoAll",
      {
        options: {
          subscribe: true,
          all: true,
        },
      }
    );

    // Get all the certified compliance models
    this.$store.dispatch(
      "zigbeealliance.distributedcomplianceledger.compliance/QueryCertifiedModelAll",
      {
        options: {
          subscribe: true,
          all: true,
        },
      }
    );
    // Get all the revoked compliance models
    this.$store.dispatch(
      "zigbeealliance.distributedcomplianceledger.compliance/QueryRevokedModelAll",
      {
        options: {
          subscribe: true,
          all: true,
        },
      }
    );
    // Get all the provisional compliance models
    this.$store.dispatch(
      "zigbeealliance.distributedcomplianceledger.compliance/QueryProvisionalModelAll",
      {
        options: {
          subscribe: true,
          all: true,
        },
      }
    );
  },

  methods: {
    showCertifyModelDialog(model) {
      this.selectedRevokedModel = model;
      this.showCertifyModel = true;
    },
    dismissCertifyModelDialog() {
      this.showCertifyModel = false;
    },
    showRevokeModelDialog(model) {
      this.selectedCertifiedModel = model;
      this.showRevokeModel = true;
    },
    dismissRevokeModelDialog() {
      this.showRevokeModel = false;
    },
    showProvisionalModelDialog(model) {
      this.selectedProvisionalModel = model;
      this.showProvisionalModel = true;
    },
    dismissProvisionalModelDialog() {
      this.showProvisionalModel = false;
    },
		hexValue(value) {
			if (value)
				return `${value} (0x${value.toString(16)})`;
			else
				return value
		},
  },
};
</script>

<template>
  <div class="prime-vue-container">
    <TabView>
      <TabPanel header="All Certified Models">
        <Button
          @click="showCertifyModelDialog"
          class="p-button-primary mb-4"
          v-bind:class="{ 'p-disabled': !isSignedIn }"
          label="Certify Model"
        />

        <DataTable
          :value="allCertifiedModels"
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
            field="certificationType"
            header="Certification Type"
            :sortable="true"
          ></Column>
          <Column field="vidHex" header="Vendor ID" :sortable="true"></Column>
          <Column field="pidHex" header="Product ID" :sortable="true"></Column>
          <Column
            field="softwareVersion"
            header="Software Version"
            :sortable="true"
          ></Column>
          <Column
            headerStyle="width: 4rem; text-align: center"
            bodyStyle="text-align: center; overflow: visible"
          >
            <template #body="{ data }">
              <Button
                label="Revoke"
                class="p-button-danger"
                @click="showRevokeModelDialog(data)"
                iconPos="left"
                icon="pi pi-ban"
                v-bind:class="{ 'p-disabled': !isSignedIn }"
              />
            </template>
          </Column>
        </DataTable>
      </TabPanel>

      <TabPanel header="All Revoked Models">
        <Button
          @click="showRevokeModelDialog"
          class="p-button-primary mb-4"
          v-bind:class="{ 'p-disabled': !isSignedIn }"
          label="Revoke Model"
        />

        <DataTable
          :value="allRevokedModels"
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
            field="certificationType"
            header="Certification Type"
            :sortable="true"
          ></Column>
          <Column field="vidHex" header="Vendor ID" :sortable="true"></Column>
          <Column field="pidHex" header="Product ID" :sortable="true"></Column>
          <Column
            field="softwareVersion"
            header="Software Version"
            :sortable="true"
          ></Column>
          <Column
            headerStyle="width: 4rem; text-align: center"
            bodyStyle="text-align: center; overflow: visible"
          >
            <template #body="{ data }">
              <Button
                label="Certify"
                class="p-button-primary"
                @click="showCertifyModelDialog(data)"
                iconPos="left"
                icon="pi pi-check"
                v-bind:class="{ 'p-disabled': !isSignedIn }"
              />
            </template>
          </Column>
        </DataTable>
      </TabPanel>
      <TabPanel header="All Provisional Models">
        <Button
          @click="showProvisionalModelDialog"
          class="p-button-primary mb-4"
          v-bind:class="{ 'p-disabled': !isSignedIn }"
          label="Provision Model"
        />
        <DataTable
          :value="allProvisionalModels"
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
            field="certificationType"
            header="Certification Type"
            :sortable="true"
          ></Column>
          <Column field="vidHex" header="Vendor ID" :sortable="true"></Column>
          <Column field="pidHex" header="Product ID" :sortable="true"></Column>
          <Column
            field="softwareVersion"
            header="Software Version"
            :sortable="true"
          ></Column>
          <Column
            headerStyle="width: 4rem; text-align: center"
            bodyStyle="text-align: center; overflow: visible"
          >
            <template #body="{ data }">
              <Button
                label="Certify"
                class="p-button-primary"
                @click="showCertifyModelDialog(data)"
                iconPos="left"
                icon="pi pi-check"
                v-bind:class="{ 'p-disabled': !isSignedIn }"
              />
            </template>
          </Column>
        </DataTable>
      </TabPanel>
    </TabView>

    <Dialog
      header="Certify a Device Model"
      @update:visible="dismissCertifyModelDialog"
      :visible="showCertifyModel"
      :style="{ width: '50vw' }"
      class="p-fluid"
      :modal="true"
    >
      <CertifyModel
        :model="selectedRevokedModel"
        @close-dialog="dismissCertifyModelDialog"
      ></CertifyModel>
    </Dialog>

    <Dialog
      header="Revoke a Device Model"
      @update:visible="dismissRevokeModelDialog"
      :visible="showRevokeModel"
      :style="{ width: '50vw' }"
      class="p-fluid"
      :modal="true"
    >
      <RevokeModel
        :certifiedModel="selectedCertifiedModel"
        @close-dialog="dismissRevokeModelDialog"
      ></RevokeModel>
    </Dialog>

    <Dialog
      header="Provision a Device Model"
      @update:visible="dismissProvisionalModelDialog"
      :visible="showProvisionalModel"
      :style="{ width: '50vw' }"
      class="p-fluid"
      :modal="true"
    >
      <ProvisionModel
        @close-dialog="dismissProvisionalModelDialog"
      ></ProvisionModel>
    </Dialog>
  </div>
</template>


