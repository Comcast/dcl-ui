<template>
  <div>
    <div v-if="!selectedKeplrAccount">
      <Button @click="connect" class="wallet-button" label="Connect Keplr"></Button>
    </div>
    <div v-else>
      <SplitButton
        class="keplr-split-button"
        :label="`${accountName} (${trimAddress(selectedKeplrAccount.address)})`"
        :model="menuItems"
      ></SplitButton>
    </div>

    <Dialog
      header="Keplr Wallet"
      :visible="dialogVisible"
      :modal="true"
      :closable="true"
      :width="400"
    >
      <p>To use this application, you need to have the Keplr wallet extension installed in your browser.</p>
      <p>
        If you're using Google Chrome, you can install it from the
        <a
          href="https://chrome.google.com/webstore/detail/keplr/dmkamcknogkgcdfhhbddcghachkejeap"
          target="_blank"
          rel="noopener noreferrer"
        >Chrome Web Store</a>.
      </p>
      <p>
        If you're using Mozilla Firefox, you can install it from the
        <a
          href="https://addons.mozilla.org/en-US/firefox/addon/keplr/"
          target="_blank"
          rel="noopener noreferrer"
        >Firefox Add-ons Store</a>.
      </p>

      <Button label="Close" class="p-mt-2" @click="closeDialog"></Button>
    </Dialog>
  </div>
</template>

<script>
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import SplitButton from "primevue/splitbutton";
import { mapState } from "vuex";

export default {
  name: 'KeplrConnector',
  components: {
    Button,
    Dialog,
    SplitButton,
  },
  computed: {
    ...mapState(["selectedKeplrAccount"]),
  },
  data() {
    return {
      dialogVisible: false,
      accountName: null,
      menuItems: [
        {
          label: "Disconnect Keplr",
          command: () => {
            this.disconnect();
          },
        },
      ],
    };
  },
  methods: {
    trimAddress(address) {
      if (address && address.length > 16) {
        return `${address.substring(0, 10)}...${address.substring(address.length - 4)}`;
      }
      return address;
    },

    async connect() {
  if (!window.keplr) {
    this.dialogVisible = true;
    return;
  }

  try {
    const { offlineSigner, accounts } = await this.setupKeplrConnection(
      process.env.VUE_APP_DCL_CHAIN_ID,
      this.getChainInfo()
    );

    await this.$store.dispatch("setKeplrSigner", offlineSigner);
    const key = await window.keplr.getKey(process.env.VUE_APP_DCL_CHAIN_ID);
    this.accountName = key.name;

    this.$toast.add({
      severity: "success",
      summary: "Connected to Keplr wallet",
      life: 5000,
    });
  } catch (error) {
    console.error("Error connecting to Keplr:", error);
    this.$toast.add({
      severity: "error",
      summary: "Error Connecting to Keplr Wallet",
      detail: error.message,
      life: 7000,
    });

    if (error.message.includes("Please approve the chain in Keplr")) {
      this.$toast.add({
        severity: "info",
        summary: "Action Required",
        detail: "Please check your Keplr wallet and approve the chain addition.",
        life: 10000,
      });
    }
  }
},

    async setupKeplrConnection(chainId, chainInfo) {
      if (!window.keplr) {
        throw new Error("Keplr extension not found");
      }

      let chainWasEnabled = false;

      try {
        await window.keplr.enable(chainId);
        console.log("Chain was already enabled");
        chainWasEnabled = true;
      } catch (error) {
        console.log("Chain not yet enabled, attempting to suggest...");
      }

      if (!chainWasEnabled) {
        try {
          await window.keplr.experimentalSuggestChain(chainInfo);
          console.log("Suggested chain successfully");
        } catch (error) {
          console.log("Error suggesting chain:", error);

          if (error.message && error.message.includes("/cosmos/bank/v1beta1/balances")) {
            console.log("Ignoring error related to /balances endpoint");
          } else if (error.message !== "Chain already exists.") {
            throw error;
          }
        }

        try {
          await window.keplr.enable(chainId);
          console.log("Chain enabled successfully");
        } catch (error) {
          throw new Error(`Error Enabling the Chain: ${error.message}`);
        }
      }

      const offlineSigner = await window.keplr.getOfflineSigner(chainId);
      const accounts = await offlineSigner.getAccounts();

      return { offlineSigner, accounts };
    },

    disconnect() {
      this.$store.dispatch("disconnectKeplr");
      this.accountName = null;
    },
    
    closeDialog() {
      this.dialogVisible = false;
    },

    getChainInfo() {
      return {
        chainId: process.env.VUE_APP_DCL_CHAIN_ID,
        chainName: process.env.VUE_APP_DCL_CHAIN_NAME || "DCL Chain",
        rpc: process.env.VUE_APP_DCL_RPC_NODE,
        rest: process.env.VUE_APP_DCL_API_NODE,
        stakeCurrency: {
          coinDenom: "DCL",
          coinMinimalDenom: "DCL",
          coinDecimals: 6,
        },
        bip44: { coinType: 118 },
        bech32Config: {
          bech32PrefixAccAddr: "cosmos",
          bech32PrefixAccPub: "cosmospub",
          bech32PrefixValAddr: "cosmosvaloper",
          bech32PrefixValPub: "cosmosvaloperpub",
          bech32PrefixConsAddr: "cosmosvalcons",
          bech32PrefixConsPub: "cosmosvalconspub",
        },
        currencies: [{ coinDenom: "DCL", coinMinimalDenom: "DCL", coinDecimals: 6 }],
        feeCurrencies: [{ coinDenom: "DCL", coinMinimalDenom: "DCL", coinDecimals: 6 }],
        gasPriceStep: { low: 0.0, average: 0.0, high: 0.0 },
      };
    },
  },
};
</script>

<style scoped>
.keplr-split-button {
  /* Style the keplr split button as needed */
}
</style>