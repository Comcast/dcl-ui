<template>
  <div>
      <div v-if="!selectedKeplrAccount">
          <Button @click="connect" class="wallet-button" label="Connect Keplr"></Button>
      </div>
      <div v-else>
          <SplitButton class="keplr-split-button" :label="`${accountName} (${trimAddress(selectedKeplrAccount.address)})`" :model="menuItems"></SplitButton>
      </div>

      <Dialog header="Keplr Wallet" :visible="dialogVisible" :modal="true" :closable="true" :width="400">
          <p>To use this application, you need to have the Keplr wallet extension installed in your browser.</p>
          <p>
              If you're using Google Chrome, you can install it from the
              <a href="https://chrome.google.com/webstore/detail/keplr/dmkamcknogkgcdfhhbddcghachkejeap" target="_blank" rel="noopener noreferrer">Chrome Web Store</a>.
          </p>
          <p>
              If you're using Mozilla Firefox, you can install it from the
              <a href="https://addons.mozilla.org/en-US/firefox/addon/keplr/" target="_blank" rel="noopener noreferrer">Firefox Add-ons Store</a>.
          </p>

          <Button label="Close" class="p-mt-2" @click="dialogVisible = false"></Button>
      </Dialog>
  </div>
</template>

<script>
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import SplitButton from 'primevue/splitbutton';
import { mapState } from 'vuex';

export default {
  components: {
      Button,
      Dialog,
      SplitButton
  },
  computed: {
      ...mapState(['selectedKeplrAccount'])
  },
  data() {
      return {
          dialogVisible: false,
          accountName: null,
          isAutoConnecting: false,
          menuItems: [
              {
                  label: 'Disconnect Keplr',
                  command: () => {
                      this.disconnect();
                  }
              }
          ]
      };
  },
  methods: {
      trimAddress(address) {
          // Return first 6 and last 4 characters
          if (address && address.length > 16) {
              return address.substring(0, 10) + '...' + address.substring(address.length - 4);
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
          const chainId = import.meta.env.VITE_APP_DCL_CHAIN_ID;
          const chainName = import.meta.env.VITE_APP_DCL_CHAIN_NAME || 'DCL Chain';
          const chainInfo = {
              // Update this with actual values
              chainId,
              chainName: chainName,
              rpc: import.meta.env.VITE_APP_DCL_RPC_NODE,
              rest: import.meta.env.VITE_APP_DCL_API_NODE,
              stakeCurrency: {
                  coinDenom: 'DCL',
                  coinMinimalDenom: 'DCL',
                  coinDecimals: 6
              },
              bip44: {
                  coinType: 118
              },
              bech32Config: {
                  bech32PrefixAccAddr: 'cosmos',
                  bech32PrefixAccPub: 'cosmospub',
                  bech32PrefixValAddr: 'cosmosvaloper',
                  bech32PrefixValPub: 'cosmosvaloperpub',
                  bech32PrefixConsAddr: 'cosmosvalcons',
                  bech32PrefixConsPub: 'cosmosvalconspub'
              },
              currencies: [
                  {
                      coinDenom: 'DCL',
                      coinMinimalDenom: 'DCL',
                      coinDecimals: 6
                  }
              ],
              feeCurrencies: [
                  {
                      coinDenom: 'DCL',
                      coinMinimalDenom: 'DCL',
                      coinDecimals: 6
                  }
              ],
              gasPriceStep: {
                  low: 0.0,
                  average: 0.0,
                  high: 0.0
              }
          };

          try {
              await keplr.experimentalSuggestChain(chainInfo);
          } catch (error) {
              // This error might be thrown if the chain already exists, but you should inspect the error message to determine this
              if (error.message !== 'Chain already exists.') {
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
              await keplr.enable(chainId);
          } catch (error) {
              this.$toast.add({
                  severity: 'error',
                  summary: 'Error Enabling the DCL Chain on the Keplr Wallet',
                  detail: error.message,
                  life: 5000
              });
          }

          try {
              await this.$store.dispatch('setKeplrSigner');
              const key = await keplr.getKey(import.meta.env.VITE_APP_DCL_CHAIN_ID);
              this.accountName = key.name;

              // Save connection state to localStorage
              localStorage.setItem('keplr_connected', 'true');
              localStorage.setItem('keplr_chain_id', chainId);

              // Only show success toast if not auto-connecting
              if (!this.isAutoConnecting) {
                  this.$toast.add({
                      severity: 'success',
                      summary: 'Connected to Keplr wallet',
                      life: 5000
                  });
              }
          } catch (error) {
              console.error('Error fetching account name:', error);
          }
      },

      disconnect() {
          // Clear localStorage
          localStorage.removeItem('keplr_connected');
          localStorage.removeItem('keplr_chain_id');

          // Remove account change listener
          if (window.keplr && window.keplr._events) {
              window.removeEventListener('keplr_keystorechange', this.handleAccountChange);
          }

          this.$store.dispatch('disconnectKeplr');

          this.$toast.add({
              severity: 'info',
              summary: 'Disconnected from Keplr wallet',
              life: 3000
          });
      },

      handleAccountChange() {
          // Auto-reconnect when user changes account in Keplr
          console.log('Keplr account changed, reconnecting...');
          this.connect();
      },

      closeDialog() {
          this.dialogVisible = false;
      },

      async autoReconnect() {
          const wasConnected = localStorage.getItem('keplr_connected');
          const savedChainId = localStorage.getItem('keplr_chain_id');
          const currentChainId = import.meta.env.VITE_APP_DCL_CHAIN_ID;

          if (wasConnected === 'true' && savedChainId === currentChainId && window.keplr) {
              this.isAutoConnecting = true;
              try {
                  await this.connect();
                  console.log('Auto-reconnected to Keplr wallet');
              } catch (error) {
                  console.error('Auto-reconnect failed:', error);
                  // Clear invalid connection state
                  localStorage.removeItem('keplr_connected');
                  localStorage.removeItem('keplr_chain_id');
              } finally {
                  this.isAutoConnecting = false;
              }
          }
      }
  },

  async mounted() {
      // Attempt auto-reconnect on component mount
      await this.autoReconnect();

      // Listen for account changes
      if (window.keplr) {
          window.addEventListener('keplr_keystorechange', this.handleAccountChange.bind(this));
      }
  },

  beforeUnmount() {
      // Clean up event listener
      if (window.keplr) {
          window.removeEventListener('keplr_keystorechange', this.handleAccountChange);
      }
  }
};
</script>

<style scoped>
.keplr-split-button {
  /* Style the keplr split button as needed */
}
</style>