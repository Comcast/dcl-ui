
<template>
  <div>
    <div v-if="!selectedKeplrAccount">
      <Button
        @click="connect"
        class="wallet-button"
        label="Connect Keplr"
      ></Button>
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
      <p>
        To use this application, you need to have the Keplr wallet extension
        installed in your browser.
      </p>
      <p>
        If you're using Google Chrome, you can install it from the
        <a
          href="https://chrome.google.com/webstore/detail/keplr/dmkamcknogkgcdfhhbddcghachkejeap"
          target="_blank"
          rel="noopener noreferrer"
          >Chrome Web Store</a
        >.
      </p>
      <p>
        If you're using Mozilla Firefox, you can install it from the
        <a
          href="https://addons.mozilla.org/en-US/firefox/addon/keplr/"
          target="_blank"
          rel="noopener noreferrer"
          >Firefox Add-ons Store</a
        >.
      </p>

      <Button
        label="Close"
        class="p-mt-2"
        @click="dialogVisible = false"
      ></Button>
    </Dialog>
  </div>
</template>

<script>
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import SplitButton from "primevue/splitbutton";
import { mapState } from "vuex";

export default {
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
      // Return first 6 and last 4 characters
      if (address && address.length > 16) {
        return (
          address.substring(0, 10) +
          "..." +
          address.substring(address.length - 4)
        );
      } else {
        return address;
      }
    },

    async connect() {
      const keplr = window.keplr;
      if (!keplr) {
        this.dialogVisible = true;
        return;
      }
      const chainId = process.env.VUE_APP_DCL_CHAIN_ID
      const chainInfo = {
        // Update this with actual values
        chainId,
        chainName: "DCL Chain",
        rpc: process.env.VUE_APP_DCL_RPC_NODE,
        rest: process.env.VUE_APP_DCL_API_NODE,
        stakeCurrency: {
          coinDenom: "DCL",
          coinMinimalDenom: "DCL",
          coinDecimals: 6,
        },
        bip44: {
          coinType: 118,
        },
        bech32Config: {
          bech32PrefixAccAddr: "cosmos",
          bech32PrefixAccPub: "cosmospub",
          bech32PrefixValAddr: "cosmosvaloper",
          bech32PrefixValPub: "cosmosvaloperpub",
          bech32PrefixConsAddr: "cosmosvalcons",
          bech32PrefixConsPub: "cosmosvalconspub",
        },
        currencies: [
          {
            coinDenom: "DCL",
            coinMinimalDenom: "DCL",
            coinDecimals: 6,
          },
        ],
        feeCurrencies: [
          {
            coinDenom: "DCL",
            coinMinimalDenom: "DCL",
            coinDecimals: 6,
          },
        ],
        gasPriceStep: {
          low: 0.0,
          average: 0.0,
          high: 0.0,
        },
      };

      try {
        console.log('Connecting to keplr')
        await keplr.experimentalSuggestChain(chainInfo);
      } catch (error) {
        console.log('Error connecting to keplr', error)
        // This error might be thrown if the chain already exists, but you should inspect the error message to determine this
        if (error.message !== "Chain already exists.") {
          this.$toast.add({
                  severity: 'error',
                  summary: 'Error Adding the DCL Chain to Keplr Wallet',
                  detail: error.message,
                  life: 5000
              });
              return;
        }
      }

      try {
        console.log('Enabling keplr')
        await keplr.enable(chainId);
        console.log('Enabled keplr')
      } catch (error) {
        this.$toast.add({
                  severity: 'error',
                  summary: 'Error Enabling the DCL Chain on the Keplr Wallet',
                  detail: error.message,
                  life: 5000
              });
      }

      try {
        console.log('Setting keplr signer')
        await this.$store.dispatch("setKeplrSigner");
        console.log('Fetching account name')
        const key = await keplr.getKey(process.env.VUE_APP_DCL_CHAIN_ID);
        console.log('Fetched account name', key)
        this.accountName = key.name;
        this.$toast.add({
          severity: "success",
          summary: "Connected to Keplr wallet",
          life: 5000,
        });        
      } catch (error) {
        console.error("Error fetching account name:", error);
      }
    },

    disconnect() {
      this.$store.dispatch("disconnectKeplr");
      console.log("Disconnected from Keplr wallet");
    },
    
    closeDialog() {
      this.dialogVisible = false;
    },
    // ... rest of the methods, created, etc.
  },
};
</script>

<style scoped>
.keplr-split-button {
  /* Style the keplr split button as needed */
}
</style>
