<template>
  <div class="wallet-manager">
    <div class="notice p-4 mb-4 bg-blue-100 border-l-4 border-blue-500 text-blue-700">
      <h3 class="font-bold text-blue-900">⚠️ Important Notice</h3>
      <p>This page is intended solely for recovering mnemonics from legacy wallet local storage. After retrieval:</p>
      <ul class="list-disc pl-5 mt-2">
        <li>Store your mnemonic securely in an offline location. This menmonic can also be used to create/restore this account in Keplr Wallet.</li>
        <li>Delete the wallet from local storage immediately.</li>
        <li>Consider using a hardware wallet for enhanced security.</li>
      </ul>
    </div>

    <DataTable :value="wallets" :paginator="true" :rows="10" :rowsPerPageOptions="[10, 20, 50, 100]" class="p-datatable-sm">
      <Column field="name" header="Wallet Name" style="width: 60%;">
        <template #body="slotProps">
          <div class="wallet-name">{{ slotProps.data.name }}</div>
        </template>
      </Column>
      <Column header="Actions" style="width: 40%;">
        <template #body="slotProps">
          <Button label="Decrypt" icon="pi pi-lock-open" class="p-button-sm p-button-outlined mr-2" @click="openDecryptDialog(slotProps.data)" />
          <Button label="Delete" icon="pi pi-trash" class="p-button-sm p-button-danger p-button-outlined" @click="openDeleteDialog(slotProps.data)" />
        </template>
      </Column>
    </DataTable>

    <Dialog v-model:visible="dialogVisible" :header="'Decrypt Wallet: ' + (selectedWallet?.name || '')" :style="{ width: '400px' }" :modal="true" class="decrypt-dialog p-fluid">
      <div v-if="!decryptedWallet" class="p-field">
        <label for="password" class="mb-2">Password</label>
        <Password id="password" v-model="password" :feedback="false" toggleMask class="mb-3" />
        <small v-if="decryptionError" class="p-error mb-3 mt-2 p-d-block">{{ decryptionError }}</small>
        <Button label="Decrypt" icon="pi pi-unlock" @click="decryptWallet" class="mt-2" />
      </div>
      <div v-else class="decrypted-info">
        <ScrollPanel style="width: 100%; height: 200px" class="mt-2">
          <div class="wallet-detail">
            <strong>Name:</strong> {{ decryptedWallet.name }}
          </div>
          <div class="wallet-detail">
            <strong>Mnemonic:</strong> {{ decryptedWallet.mnemonic }}
          </div>
          <div class="wallet-detail">
            <strong>Accounts:</strong>
            <ul>
              <li v-for="account in decryptedWallet.accounts" :key="account.address">
                {{ account.address }}
              </li>
            </ul>
          </div>
        </ScrollPanel>
      </div>
      <template #footer>
        <Button label="Close" icon="pi pi-times" @click="closeDialog" class="p-button-text" />
      </template>
    </Dialog>

    <Dialog v-model:visible="deleteDialogVisible" header="Confirm Deletion" :style="{ width: '350px' }" :modal="true">
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
        <span>Are you sure you want to delete the wallet "{{ selectedWallet?.name }}"?</span>
      </div>
      <template #footer>
        <Button label="No" icon="pi pi-times" @click="deleteDialogVisible = false" class="p-button-text" />
        <Button label="Yes" icon="pi pi-check" @click="deleteWallet" class="p-button-danger" />
      </template>
    </Dialog>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import Password from 'primevue/password';
import ScrollPanel from 'primevue/scrollpanel';
import CryptoJS from 'crypto-js';

export default {
  components: {
    DataTable,
    Column,
    Button,
    Dialog,
    Password,
    ScrollPanel
  },
  setup() {
    const wallets = ref([]);
    const dialogVisible = ref(false);
    const deleteDialogVisible = ref(false);
    const selectedWallet = ref(null);
    const password = ref('');
    const decryptedWallet = ref(null);
    const decryptionError = ref('');

    onMounted(() => {
      loadWallets();
    });

    const loadWallets = () => {
      const storedWallets = localStorage.getItem('wallets');
      if (storedWallets) {
        wallets.value = JSON.parse(storedWallets);
      }
    };

    const openDecryptDialog = (wallet) => {
      selectedWallet.value = wallet;
      password.value = '';
      decryptedWallet.value = null;
      decryptionError.value = '';
      dialogVisible.value = true;
    };

    const openDeleteDialog = (wallet) => {
      selectedWallet.value = wallet;
      deleteDialogVisible.value = true;
    };

    const decryptWallet = () => {
      try {
        const decrypted = JSON.parse(CryptoJS.AES.decrypt(selectedWallet.value.wallet, password.value).toString(CryptoJS.enc.Utf8));
        decryptedWallet.value = decrypted;
        decryptionError.value = '';
      } catch (error) {
        console.error('Decryption failed:', error);
        decryptionError.value = 'Decryption failed. Please check your password.';
      }
    };

    const deleteWallet = () => {
      const index = wallets.value.findIndex(w => w.name === selectedWallet.value.name);
      if (index !== -1) {
        wallets.value.splice(index, 1);
        localStorage.setItem('wallets', JSON.stringify(wallets.value));
      }
      deleteDialogVisible.value = false;
      selectedWallet.value = null;
    };

    const closeDialog = () => {
      dialogVisible.value = false;
      selectedWallet.value = null;
      password.value = '';
      decryptedWallet.value = null;
      decryptionError.value = '';
    };

    return {
      wallets,
      dialogVisible,
      deleteDialogVisible,
      password,
      decryptedWallet,
      decryptionError,
      selectedWallet,
      openDecryptDialog,
      openDeleteDialog,
      decryptWallet,
      deleteWallet,
      closeDialog
    };
  }
};
</script>

<style scoped>
.wallet-manager {
  font-family: Arial, sans-serif;
}

.notice {
  border-radius: 4px;
}

.wallet-name {
  font-weight: bold;
}

.decrypt-dialog {
  max-width: 90vw;
}

.decrypted-info pre {
  white-space: pre-wrap;
  word-wrap: break-word;
}

:deep(.p-datatable) {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

:deep(.p-dialog-content) {
  padding: 1.5rem;
}

:deep(.p-password) {
  width: 100%;
}

.wallet-detail {
  margin-bottom: 1rem;
}

.wallet-detail ul {
  margin: 0;
  padding-left: 1.5rem;
}

.wallet-detail li {
  margin-bottom: 0.5rem;
}

.p-error {
  color: #ef4444;
  font-size: 0.875rem;
}

.confirmation-content {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>