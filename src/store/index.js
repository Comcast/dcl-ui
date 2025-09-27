import { createStore } from 'vuex'
import init from './config'
import pkiOptimized from './pki-optimized'

const store = createStore({
	modules: {
		pkiOptimized
	},
	state() {
		return {
			packageVersion: APP_VERSION,
			keplrSigner: null,
			selectedKeplrAccount: null,
			selectedKeplrAccountName: null,
		};
	},
	mutations: {
		setKeplrSigner(state, signer) {
			state.keplrSigner = signer;
		},
		setSelectedKeplrAccount(state, account) {
			state.selectedKeplrAccount = account;
			state.selectedKeplrAccountName = account?.name;
		},
	},
	actions: {
		async setKeplrSigner({ commit, dispatch }) {
			const keplr = window.keplr;
			if (!keplr) {
				throw new Error("Please install the Keplr wallet extension");
			}
			const chainId = import.meta.env.VITE_APP_DCL_CHAIN_ID; // Replace with your chain ID
			await keplr.enable(chainId);
			const signer = keplr.getOfflineSigner(chainId);
			signer.key = await signer.keplr.getKey(signer.chainId);
			commit("setKeplrSigner", signer);

			const accounts = await signer.getAccounts();
			if (accounts.length > 1) {
				// Dispatch another action to show a UI for account selection
				dispatch("showAccountSelection", accounts);
			} else if (accounts.length === 1) {
				const account = accounts[0];
				commit("setSelectedKeplrAccount", { address: account.address, name: account.name });
			} else {
				throw new Error("No accounts found in the Keplr wallet");
			}
		},

		async disconnectKeplr({ commit }) {
			commit("setKeplrSigner", null);
			commit("setSelectedKeplrAccount", null);
		},

		showAccountSelection({ commit }, accounts) {
			// Show a UI for the user to select an account from the `accounts` array
			// ...
			// Once the user has selected an account, commit the selected account to the Vuex state:
			commit("setSelectedKeplrAccount", selectedAccount);
		},
	},
	getters: {
		appVersion: (state) => {
			return state.packageVersion;
		},
		loggedIn: (state) => {
			return state.selectedKeplrAccount !== null;
		},
		keplrSigner: (state) => {
			return state.keplrSigner;
		},
		selectedKeplrAccount: (state) => {
			return state.selectedKeplrAccount;
		}
	},
});

init(store);
export default store;
