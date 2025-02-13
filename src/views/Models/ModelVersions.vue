<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import ModelVersionInfo from "./ModelVersionInfo.vue";
import CertifyModel from "../Compliance/CertifyModel.vue";
import Message from "primevue/message";

export default {
  name: "ModelVersions",
  props: ["vid", "pid"],

  data() {
    return {
      showModelVersionInfo: false,
      selectedModelVersionInfo: null,
			showCertifyModel: false,
      viewOnly: false,
      error: null,
      modelVersionArray: [],
    };
  },

  methods: {
    dismissModelVersionInfoDialog() {
      this.showModelVersionInfo = false;
    },
		dismissCertifyModelDialog() {
			this.showCertifyModel = false;
		},
		showCertifyModelDialog(modelVersionInfo) {
			this.showModelVersionInfo = false;
      this.selectedModelVersionInfo = modelVersionInfo;
      this.showCertifyModel = true;
    },
    showModelVersionInfoDialog(modelVersionInfo, viewOnly) {
      this.showModelVersionInfo = true;
      this.selectedModelVersionInfo = modelVersionInfo;
      this.viewOnly = viewOnly;
    },
    showNewModelVersionInfoDialog() {
      this.showModelVersionInfo = true;
      this.selectedModelVersionInfo = null;
      this.viewOnly = false;
    },
    confirmDeleteModelVersion(modelVersion) {
      console.log('inside conformation dialog');
      this.$confirm.require({
        message: "Are you sure you want to delete this model version ?",
        header: "Confirmation",
        icon: "pi pi-exclamation-triangle",
        accept: () => {
          this.deleteModelVersion(modelVersion);
        },
        reject: () => {
          //callback to execute when user rejects the action
        },
      });
    },
    deleteModelVersion(modelVersion) {
      const account = this.$store.state.selectedKeplrAccount;
      const creatorAddress = account.address;
      this.txProcessing = true;
			let loader = this.$loading.show();
      this.$store
        .dispatch(
          `zigbeealliance.distributedcomplianceledger.model/sendMsgDeleteModelVersion`,
          {
            value: {
              creator: creatorAddress,
              vid: modelVersion.vid,
              pid: modelVersion.pid,
              version: modelVersion.version,
              softwareVersion: modelVersion.softwareVersion,
            },
          }
        )
        .then(
          (response) => {
            this.txProcessing = false;
						loader.hide();
            if (response.code == 0) {
              this.error = null;
              this.$toast.add({
                severity: "success",
                summary: "Successful Tx",
                detail: "Delete ModelVersion Tx sent successfully",
                life: 3000,
              });
            } else {
              this.error = response;
            }
          },
          (error) => {
            this.txProcessing = false;
						loader.hide();
            this.error = error.message;
          }
        );
    },

    refresh() {
      // Get all the accounts
      this.$store
        .dispatch(
          "zigbeealliance.distributedcomplianceledger.model/QueryModelVersions",
          {
            options: {
              subscribe: false,
              all: true,
            },
            params: {
              vid: this.vid,
              pid: this.pid,
            },
          }
        )
        .then(() => {
          const ModelVersionInfoArray = this.$store.getters[
            "zigbeealliance.distributedcomplianceledger.model/getModelVersions"
          ]({
            params: {
              vid: this.vid,
              pid: this.pid,
            },
          });

          this.modelVersionArray = ModelVersionInfoArray?.modelVersions;
          if (
            this.modelVersionArray &&
            this.modelVersionArray.softwareVersions
          ) {
            this.modelVersionArray.softwareVersions.forEach(
              function (version) {
                this.$store.dispatch(
                  "zigbeealliance.distributedcomplianceledger.model/QueryModelVersion",
                  {
                    options: {
                      subscribe: false,
                      all: true,
                    },
                    params: {
                      vid: this.vid,
                      pid: this.pid,
                      softwareVersion: version,
                    },
                  }
                );
              }.bind(this)
            );
          }
        });
    },

    errorMessage() {
      if (this.error && this.error.rawLog) {
        return this.error.rawLog;
      } else if (this.error) {
        return this.error;
      } else {
        return null;
      }
    },
		getHexValue(value) {
			if (value)
				return `${value} (0x${value.toString(16)})`;
			else
				return value;
		},
	},
  components: {
    DataTable,
    Column,
    Button,
    Dialog,
    ModelVersionInfo,
		CertifyModel,
    Message,
  },

  computed: {
    allModelVersions() {
      const modelVersions = [];
      if (this.modelVersionArray && this.modelVersionArray.softwareVersions) {
        // loop thru this.modelVersionArray.softwareVersions
        for (
          let i = 0;
          i < this.modelVersionArray.softwareVersions.length;
          i++
        ) {
          const softwareVersion = this.modelVersionArray.softwareVersions[i];
          const modelVersion = this.$store.getters[
            "zigbeealliance.distributedcomplianceledger.model/getModelVersion"
          ]({
            params: {
              vid: this.vid,
              pid: this.pid,
              softwareVersion: softwareVersion,
            },
          });
          if (modelVersion.modelVersion)
            modelVersions.push(modelVersion.modelVersion);
        }
      }
			// Add hex values to vid and pid
			modelVersions.forEach((modelVersion) => {
				modelVersion.vidHex = this.getHexValue(modelVersion.vid);
				modelVersion.pidHex = this.getHexValue(modelVersion.pid);
			});

      return modelVersions;
    },

    isSignedIn() {
      const loggedIn = this.$store.getters["loggedIn"] || this.$store.getters["common/wallet/loggedIn"];
      return loggedIn;
    },
  },

  created: function () {
    this.refresh();
  },
};
</script>

<template>
  <div class="prime-vue-container ml-5">
    <Message :closable="false" v-if="error" severity="error">{{
      errorMessage()
    }}</Message>

    <div class="mb-5 ml-2">
      <Button
        @click="showNewModelVersionInfoDialog"
        icon="pi pi-check"
        v-bind:class="{ 'p-disabled': !isSignedIn }"
        label="New Model Version"
        >New Model Version</Button
      >
    </div>
    <div v-if="allModelVersions.length > 0">
      <DataTable
        :value="allModelVersions"
        :auto-layout="true"
        :paginator="true"
        :rows="10" 
        showGridlines
        stripedRows
      >
        <Column field="softwareVersion" header="Software Version"></Column>
        <Column
          field="softwareVersionString"
          header="Software Version String"
        ></Column>
        <Column
          field="minApplicableSoftwareVersion"
          header="Min Applicable Software Version"
        ></Column>
        <Column
          field="maxApplicableSoftwareVersion"
          header="Max Applicable Software Version"
        ></Column>

        <Column
          field="vid"
          header="Action"
          headerStyle="text-align: center"
          bodyStyle="text-align: center; overflow: visible"
        >
          <template #body="{ data }">
            <span style="margin-right: 0.1rem">
              <Button
                label=""
                @click="showModelVersionInfoDialog(data, true)"
                iconPos="left"
                icon="pi pi-info-circle"
                class="p-button-rounded p-button-primary p-button-text"
                v-tooltip="'Show Model Version'"
              />
            </span>
            <span style="margin-right: 0.1rem">
              <Button
                label=""
                @click="showModelVersionInfoDialog(data, false)"
                iconPos="left"
                icon="pi pi-pencil"
                class="p-button-rounded p-button-secondary p-button-text"
                v-bind:class="{ 'p-disabled': !isSignedIn }"
                v-tooltip="'Update Model Version'"
              />
            </span>
						<!-- Add button to approve the model version 
						<span style="margin-right: 0.1rem">
							<Button
								label=""
								@click="showCertifyModelDialog(data)"
								iconPos="left"
								icon="pi pi-check"
								class="p-button-rounded p-button-success p-button-text"
								v-bind:class="{ 'p-disabled': !isSignedIn }"
								v-tooltip="'Certify Model Version'"
							/>
						</span> 
            Currently disabled based on request from CSA
            -->
            <!-- Add button to delete the model version -->
            <span style="margin-right: 0.1rem">
              <Button
                label=""
                @click="confirmDeleteModelVersion(data)"
                iconPos="left"
                icon="pi pi-trash"
                class="p-button-rounded p-button-danger p-button-text"
                v-bind:class="{ 'p-disabled': !isSignedIn }"
                v-tooltip="'Delete Model Version'"
              />
            </span>  

          </template>
        </Column>
      </DataTable>
    </div>
    <div v-else>
      <h5>
        No Software Versions available for VID : {{ vid }} and PID : {{ pid }}
      </h5>
    </div>

    <Dialog
      :visible="showModelVersionInfo"
      @update:visible="dismissModelVersionInfoDialog"
      :style="{ width: '40vw' }"
      :header="
        viewOnly ? 'Device Model Version' : 'Device Model Version Add/Update'
      "
      :modal="true"
    >
      <ModelVersionInfo
        :viewOnly="viewOnly"
        :vid="vid"
        :pid="pid"
				@refresh="refresh"
        :selectedModelVersion="selectedModelVersionInfo"
        @close-dialog="dismissModelVersionInfoDialog"
      ></ModelVersionInfo>
    </Dialog>

    <Dialog
      header="Certify a Device Model"
      @update:visible="dismissCertifyModelDialog"
      :visible="showCertifyModel"
      :style="{ width: '50vw' }"
      class="p-fluid"
      :modal="true"
    >
      <CertifyModel
        :model="selectedModelVersionInfo"
        @close-dialog="dismissCertifyModelDialog"
      ></CertifyModel>
    </Dialog>

  </div>
</template>
