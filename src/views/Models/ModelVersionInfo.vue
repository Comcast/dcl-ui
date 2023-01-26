<script>
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import { required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
//import {encoding_1} from "@cosmjs/encoding";
const encoding_1 = require("@cosmjs/encoding");
import { DirectSecp256k1HdWallet, Registry } from "@cosmjs/proto-signing";
import {
  assertIsBroadcastTxSuccess,
  SigningStargateClient,
  StargateClient,
} from "@cosmjs/stargate";
import { fromBase64 } from "@cosmjs/encoding";
import { Any } from "cosmjs-types/google/protobuf/any";
import { decodePubkey, encodePubkey } from "@cosmjs/proto-signing";
import { ModelVersion } from "../../store/generated/zigbee-alliance/distributed-compliance-ledger/zigbeealliance.distributedcomplianceledger.model/module/types/model/model_version";
import Message from "primevue/message";
export default {
  name: "ModelVersionInfo",
  components: {
    InputText,
    Button,
    Message,
  },
  setup: () => ({ v$: useVuelidate() }),
  props: ["selectedModelVersion", "viewOnly", "vid", "pid"],
  data() {
    return {
      txProcessing: false,
      update: false,
      submitted: false,
      error: null,
      modelVersion: ModelVersion.fromPartial({}),
    };
  },
  validations() {
    return {
      modelVersion: {
        vid: {
          required,
        },
        pid: {
          required,
        },
        softwareVersion: {
          required,
        },
        softwareVersionString: {
          required,
        },
        cdVersionNumber: {},
        firmwareInformation: {},
        softwareVersionValid: {},
        otaUrl: {},
        otaFileSize: {},
        otaChecksum: {},
        otaChecksumType: {},
        minApplicableSoftwareVersion: {
          required,
        },
        maxApplicableSoftwareVersion: {
          required,
        },
        releaseNotesUrl: {},
        creator: {},
      },
    };
  },
  methods: {
    handleSubmit(isFormValid) {
      this.submitted = true;
      this.error = null;
      if (!isFormValid) {
        return;
      }

      const wallet = this.$store.getters["common/wallet/wallet"];
      const account = wallet.accounts[0];
      const creatorAddress = account.address;

      this.txProcessing = true;
			let loader = this.$loading.show();
      let methodName = "sendMsgCreateModelVersion";
      if (this.update) {
        methodName = "sendMsgUpdateModelVersion";
      }
      this.modelVersion.creator = creatorAddress;
      this.$store
        .dispatch(
          `zigbeealliance.distributedcomplianceledger.model/${methodName}`,
          {
            value: this.modelVersion,
          }
        )
        .then(
          (response) => {
            this.txProcessing = false;
						loader.hide();
            if (response.code == 0) {
              this.error = null;
							 this.$emit("refresh");
              this.$toast.add({
                severity: "success",
                summary: "Successful Tx",
                detail: "ModelVersionInfo Tx sent successfully",
                life: 3000,
              });
              this.$emit("close-dialog");
            } else {
              this.$toast.add({
                severity: "error",
                summary: "Error while processing Tx",
                detail: "ModelVersionInfo Tx failed",
                life: 3000,
              });
              this.error = response;
            }
          },
          (error) => {
            this.$toast.add({
              severity: "error",
              summary: "Error while processing Tx",
              detail: "ModelVersionInfo Tx failed",
              life: 3000,
            });
            this.txProcessing = false;
						loader.hide();
            this.error = error.message;
          }
        );
    },

    onClose(e) {
      e.preventDefault();
      this.$emit("close-dialog");
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
  },
  created() {
    if (this.selectedModelVersion) {
      this.modelVersion = ModelVersion.fromPartial(this.selectedModelVersion);
      this.update = true;
    } else {
      this.modelVersion = ModelVersion.fromPartial({
        vid: this.vid,
        pid: this.pid,
				softwareVersionValid: true,
				cdVersionNumber: 1,
      });
      this.update = false;
    }
  },
};
</script>




	<template>
  <div>
    <div v-if="viewOnly === true">
      <table>
        <tr>
          <td class="p-text">Vendor ID</td>
          <td>{{ selectedModelVersion.vidHex }}</td>
        </tr>
        <tr>
          <td>Product ID</td>
          <td>{{ selectedModelVersion.pidHex }}</td>
        </tr>
        <tr>
          <td>Software Version</td>
          <td>{{ selectedModelVersion.softwareVersion }}</td>
        </tr>
        <tr>
          <td>Software Version String</td>
          <td>{{ selectedModelVersion.softwareVersionString }}</td>
        </tr>
        <tr>
          <td>CD Version Number</td>
          <td>{{ selectedModelVersion.cdVersionNumber }}</td>
        </tr>
        <tr>
          <td>Firmware Information</td>
          <td>{{ selectedModelVersion.firmwareInformation }}</td>
        </tr>
        <tr>
          <td>Software Version Valid</td>
          <td>{{ selectedModelVersion.softwareVersionValid }}</td>
        </tr>
        <tr>
          <td>OTA URL</td>
          <td>{{ selectedModelVersion.otaUrl }}</td>
        </tr>
        <tr>
          <td>OTA File Size</td>
          <td>{{ selectedModelVersion.otaFileSize }}</td>
        </tr>
        <tr>
          <td>OTA Checksum</td>
          <td>{{ selectedModelVersion.otaChecksum }}</td>
        </tr>
        <tr>
          <td>OTA Checksum Type</td>
          <td>{{ selectedModelVersion.otaChecksumType }}</td>
        </tr>
        <tr>
          <td>Min Applicable Software Version</td>
          <td>{{ selectedModelVersion.minApplicableSoftwareVersion }}</td>
        </tr>
        <tr>
          <td>Max Applicable Software Version</td>
          <td>{{ selectedModelVersion.maxApplicableSoftwareVersion }}</td>
        </tr>
        <tr>
          <td>Release Notes URL</td>
          <td>{{ selectedModelVersion.releaseNotesUrl }}</td>
        </tr>
        <tr>
          <td>Creator</td>
          <td>{{ selectedModelVersion.creator }}</td>
        </tr>
      </table>
    </div>
    <div v-else>
      <Message :closable="false" v-if="error" severity="error">{{
        errorMessage()
      }}</Message>
      <div class="p-fluid">
        <form @submit.prevent="handleSubmit(!v$.$invalid)" class="">
          <!-- Field for vid -->
          <div class="field">
            <label for="vid">VID <span class="required">*</span></label>
            <InputText
              id="vid"
              type="text"
							class="p-disabled"
              v-model="v$.modelVersion.vid.$model"
            />
          </div>

          <!-- Field for pid -->
          <div class="field">
            <label for="pid">PID <span class="required">*</span></label>
            <InputText
              id="pid"
              type="text"
							class="p-disabled"
              v-model="v$.modelVersion.pid.$model"
            />
          </div>

          <!-- Field for softwareVersion -->
          <div class="field">
            <label for="softwareVersion">Software Version <span class="required">*</span></label>
            <InputText
              id="softwareVersion"
              type="text"
              v-model="v$.modelVersion.softwareVersion.$model"
              :class="{
                'p-invalid': v$.modelVersion.softwareVersion.$invalid && submitted,
								'p-disabled': this.update
              }"
            />
          </div>

          <!-- Field for softwareVersionString -->
          <div class="field">
            <label for="softwareVersionString">Software Version String <span class="required">*</span></label>
            <InputText
              id="softwareVersionString"
              type="text"
              v-model="v$.modelVersion.softwareVersionString.$model"
              :class="{
                'p-invalid': v$.modelVersion.softwareVersionString.$invalid && submitted,
								'p-disabled': this.update
              }"
            />
          </div>

          <!-- Field for minApplicableSoftwareVersion -->
          <div class="field">
            <label for="minApplicableSoftwareVersion"
              >Min Applicable Software Version <span class="required">*</span></label>
            <InputText
              id="minApplicableSoftwareVersion"
              type="text"
              v-model="v$.modelVersion.minApplicableSoftwareVersion.$model"
              :class="{
                'p-invalid':
                  v$.modelVersion.minApplicableSoftwareVersion.$invalid &&
                  submitted,
              }"
            />
          </div>

          <!-- Field for maxApplicableSoftwareVersion -->
          <div class="field">
            <label for="maxApplicableSoftwareVersion"
              >Max Applicable Software Version <span class="required">*</span></label>
            <InputText
              id="maxApplicableSoftwareVersion"
              type="text"
              v-model="v$.modelVersion.maxApplicableSoftwareVersion.$model"
              :class="{
                'p-invalid':
                  v$.modelVersion.maxApplicableSoftwareVersion.$invalid &&
                  submitted,
              }"
            />
          </div>


          <!-- Field for cdVersionNumber -->
          <div class="field">
            <label for="cdVersionNumber">CD Version Number</label>
            <InputText
              id="cdVersionNumber"
              type="text"
              v-model="v$.modelVersion.cdVersionNumber.$model"
							class="p-disabled"
            />
          </div>


          <!-- Field for firmwareInformation -->
          <div class="field">
            <label for="firmwareInformation">Firmware Information</label>
            <InputText
              id="firmwareInformation"
              type="text"
              v-model="v$.modelVersion.firmwareInformation.$model"
              :class="{
                'p-invalid':
                  v$.modelVersion.firmwareInformation.$invalid && submitted,
								'p-disabled': this.update
              }"
            />
          </div>

          <!-- Field for softwareVersionValid -->
          <div class="field">
            <label for="softwareVersionValid">Software Version Valid</label>
            <InputText
              id="softwareVersionValid"
              type="text"
              v-model="v$.modelVersion.softwareVersionValid.$model"
              :class="{
                'p-invalid':
                  v$.modelVersion.softwareVersionValid.$invalid && submitted,
              }"
            />
          </div>

          <!-- Field for otaUrl -->
          <div class="field">
            <label for="otaUrl">Ota Url</label>
            <InputText
              id="otaUrl"
              type="text"
              v-model="v$.modelVersion.otaUrl.$model"
              :class="{
                'p-invalid': v$.modelVersion.otaUrl.$invalid && submitted,
              }"
            />
          </div>

          <!-- Field for otaFileSize -->
          <div class="field">
            <label for="otaFileSize">Ota File Size</label>
            <InputText
              id="otaFileSize"
              type="text"
              v-model="v$.modelVersion.otaFileSize.$model"
              :class="{
                'p-invalid': v$.modelVersion.otaFileSize.$invalid && submitted,
								'p-disabled': this.update
              }"
            />
          </div>

          <!-- Field for otaChecksum -->
          <div class="field">
            <label for="otaChecksum">Ota Checksum</label>
            <InputText
              id="otaChecksum"
              type="text"
              v-model="v$.modelVersion.otaChecksum.$model"
              :class="{
                'p-invalid': v$.modelVersion.otaChecksum.$invalid && submitted,
								'p-disabled': this.update
              }"
            />
          </div>

          <!-- Field for otaChecksumType -->
          <div class="field">
            <label for="otaChecksumType">Ota Checksum Type</label>
            <InputText
              id="otaChecksumType"
              type="text"
              v-model="v$.modelVersion.otaChecksumType.$model"
              :class="{
                'p-invalid':
                  v$.modelVersion.otaChecksumType.$invalid && submitted,
									'p-disabled': this.update
              }"
            />
          </div>

          <!-- Field for releaseNotesUrl -->
          <div class="field">
            <label for="releaseNotesUrl">Release Notes Url</label>
            <InputText
              id="releaseNotesUrl"
              type="text"
              v-model="v$.modelVersion.releaseNotesUrl.$model"
              :class="{
                'p-invalid':
                  v$.modelVersion.releaseNotesUrl.$invalid && submitted,
              }"
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
                <Button
                  class="p-button-primary"
                  v-if="txProcessing"
                  label="Submitted Tx.."
                  disabled="disabled"
                  icon="pi pi-spin pi-spinner"
                  iconPos="left"
                />
              </div>
              <div class="col-3">
                <Button
                  label="Cancel"
                  @click="onClose"
                  class="p-button-secondary"
                  icon="pi pi-times"
                  iconPos="left"
                />
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
