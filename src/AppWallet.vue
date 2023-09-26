<template>
  <div class="main-container">
    <div class="wallet-container">
      <KeplrWallet v-if="isKeplrWallet" ref="wallet" />
      <SpWallet v-else ref="wallet" />
    </div>
    <div ref="switchContainer" class="switch-container">
      <InputSwitch v-model="isKeplrWallet" @change="toggleWallet" v-tooltip="'Toggle between SPWallet and Keplr Wallet'" />
    </div>
   
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import KeplrWallet from "@/components/KeplrWallet.vue";
import SpWallet from "@/components/SpWallet.vue";
import InputSwitch from 'primevue/inputswitch';
import Tooltip from 'primevue/tooltip';

export default {
  components: {
    KeplrWallet,
    SpWallet,
    InputSwitch,
    Tooltip,
  },
  setup() {
    const isKeplrWallet = ref(true); // Default is KeplrWallet, so the switch is "on"
    const switchContainer = ref(null);
    
    const tooltipContent = computed(() => {
      return isKeplrWallet.value ? 'Using New Wallet (KeplrWallet)' : 'Using Old Wallet (SpWallet)';
    });
    
    const target = computed(() => {
      return switchContainer.value ? ".switch-container" : "";
    });
    
    const toggleWallet = () => {
      // Assuming that there is a 'toggle' method in both wallet components, you might need to adjust this as per your implementation
      if (this.$refs.wallet && this.$refs.wallet.toggle) this.$refs.wallet.toggle();
    }
    
    // onMounted(() => {
    //   if (!switchContainer.value) {
    //     console.warn('Switch Container not found. Tooltip will not be attached.');
    //   }
    // });
    
    return { isKeplrWallet, toggleWallet, tooltipContent, switchContainer, target };
  },
}
</script>

<style scoped>
.main-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.switch-container {
  position: relative;
  margin-right: 10px; /* Adjust as needed */
	margin-left: 10px; /* Adjust as needed */
}

.wallet-container {
  flex-grow: 1;
}

.sp-wallet {
    position: relative;
    z-index: 90;
		right: 0%;
    transform: scale(0.7) translateX(-50%) !important;
		left: 50%;
}
</style>
