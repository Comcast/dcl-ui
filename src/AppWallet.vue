<template>
  <div class="main-container">
    <div class="wallet-container">
      <KeplrWallet v-if="isKeplrWallet" ref="wallet" />
      <SpWallet v-else ref="wallet" />
    </div>
    <div ref="switchContainer" class="switch-container">
      <div @click="toggleWallet" :class="['custom-switch', isKeplrWallet ? 'active' : '']">
        <div class="switch-text">{{ switchText }}</div>
        <div class="switch-button"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import KeplrWallet from "@/components/KeplrWallet.vue";
import SpWallet from "@/components/SpWallet.vue";
import { useStore } from 'vuex';

export default {
  components: {
    KeplrWallet,
    SpWallet,
  },
  setup() {
    const store = useStore();
    const isKeplrWallet = ref(true);

    const switchText = computed(() => {
      return isKeplrWallet.value ? 'Keplr' : 'Keplr';
    });
    const wallet = ref(null);

    const toggleWallet = () => {
      store.dispatch("disconnectKeplr");
      if (wallet.value && wallet.value.toggle) wallet.value.toggle();
      isKeplrWallet.value = !isKeplrWallet.value;
    }

    return { isKeplrWallet, toggleWallet, switchText, wallet };

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
  margin-right: 10px;
	margin-left: 10px;
}

.custom-switch {
  width: 100px;
  height: 30px;
  border-radius: 15px;
  background-color: #ccc;
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.custom-switch.active {
  background-color: #4caf50;
}

.switch-button {
  width: 28px;
  height: 28px;
  border-radius: 14px;
  background-color: white;
  position: absolute;
  right: 1px;
  transition: right 0.3s ease;
}

.custom-switch.active .switch-button {
  right: 71px;
}

.switch-text {
  position: absolute;
  width: 100%;
  text-align: center;
  color: white;
  font-weight: bold;
}

.wallet-container {
  flex-grow: 1;
}

.sp-wallet {
  position: relative;
  z-index: 90;
  right: 0%;
  transform: scale(0.7) translateX(-50%) translateY(50%) !important;
  left: 50%;
  top: 50%;
}
</style>
