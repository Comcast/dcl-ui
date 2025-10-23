<template>
    <div>
        <!-- Wallet Connection Warning -->
        <div v-if="isSignedIn && !isAccountOnChain" class="surface-section px-4 py-3 border-round mb-3">
            <div class="flex align-items-center">
                <i class="pi pi-exclamation-triangle text-orange-500 text-2xl mr-3"></i>
                <div>
                    <div class="text-900 font-medium text-lg">Wallet Account Not Found on Chain</div>
                    <div class="text-500">The connected Keplr wallet account ({{ shortenAddress(currentAddress) }}) is not registered on this chain. You may be connected with a different account.</div>
                </div>
            </div>
        </div>

        <!-- Quick Actions Section - Only show for Trustees -->
        <QuickActions v-if="isSignedIn && isTrustee" />

        <!-- Dashboard Grid -->
        <div class="grid">
            <div class="col-12 lg:col-6 xl:col-3">
            <div class="card mb-0" style="min-height: 280px;">
                <div class="flex justify-content-between mb-3">
                    <div>
                        <span class="block text-500 text-lg mb-3">Accounts</span>
                        <div class="text-900 font-medium text-lg mb-3">
                            <i class="pi pi-users mr-1"></i>
                            Active
                            <Badge :value="allActiveAccounts.length || '0'" severity="success" class="ml-2"></Badge>
                        </div>
                        <div class="text-900 font-medium text-lg mb-3">
                            <i class="pi pi-user-plus mr-1 p-text-primary"></i>
                            Proposed
                            <Badge :value="allProposedAccounts.length || '0'" severity="info" class="ml-2"></Badge>
                        </div>
                        <div class="text-900 font-medium text-lg mb-3">
                            <i class="pi pi-user-minus mr-1 p-text-primary"></i>
                            Proposed Revokes
                            <Badge :value="allActiveRevocations.length || '0'" severity="danger" class="ml-2"></Badge>
                        </div>
                    </div>
                    <div class="flex align-items-center justify-content-center bg-blue-100 border-round" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-id-card text-blue-500 text-xl"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-12 lg:col-6 xl:col-3">
            <div class="card mb-0" style="min-height: 280px;">
                <div class="flex justify-content-between mb-3">
                    <div>
                        <span class="block text-500 font-medium text-lg mb-3">Roles</span>
                        <div class="text-900 font-medium text-lg mb-3">
                            <i class="pi pi-shield mr-1 text-grey-500"></i>
                            Trustee
                            <Badge :value="trusteeCount || '0'" class="ml-2 p-badge-secondary"></Badge>
                        </div>
                        <div class="text-900 font-medium text-lg mb-3">
                            <i class="pi pi-user mr-1"></i>
                            Vendor
                            <Badge :value="vendorCount || '0'" class="ml-2 p-badge-success"></Badge>
                        </div>
                        <div class="text-900 font-medium text-lg mb-3">
                            <i class="pi pi-user-plus mr-1"></i>
                            VendorAdmin
                            <Badge :value="vendorAdminCount || '0'" class="ml-2 p-badge-warning"></Badge>
                        </div>
                        <div class="text-900 font-medium text-lg mb-3">
                            <i class="pi pi-server mr-1 p-text-primary"></i>
                            NodeAdmin
                            <Badge :value="nodeAdminCount || '0'" class="ml-2 p-badge-primary"></Badge>
                        </div>
                        <div class="text-900 font-medium text-lg mb-3">
                            <i class="pi pi-flag-fill mr-1 p-text-primary"></i>
                            CertificationCenter<Badge :value="certificationCenterCount || '0'" class="ml-2 p-badge-danger"></Badge>
                        </div>
                    </div>
                    <div class="flex align-items-center justify-content-center bg-orange-100 border-round" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-users text-orange-500 text-xl"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-12 lg:col-6 xl:col-3">
            <div class="card mb-0" style="min-height: 280px;">
                <div class="flex justify-content-between mb-3">
                    <div>
                        <span class="block text-500 font-medium text-lg mb-3">Validator Nodes</span>
                        <div class="text-900 font-medium text-lg mb-3">
                            <i class="pi pi-users mr-1"></i>
                            <span>Total</span>
                            <Badge :value="validatorCount || '0'" class="ml-2 p-badge-secondary"></Badge>
                        </div>
                        <div class="text-900 font-medium text-lg mb-3">
                            <i class="pi pi-lock mr-1"></i>
                            <span>Jailed</span>
                            <Badge :value="jailedValidatorCount || '0'" class="ml-2 p-badge-warning"></Badge>
                        </div>
                        <div class="text-900 font-medium text-lg mb-3">
                            <i class="pi pi-check-circle mr-1"></i>
                            <span>Active</span>
                            <Badge :value="lastBlockParticipatingNodes.length || '0'" class="ml-2 p-badge-success"></Badge>
                        </div>
                        <div class="text-900 font-medium text-lg mb-3">
                            <i class="pi pi-times-circle mr-1 text-r"></i>
                            <span>Inactive</span>
                            <Badge :value="validatorCount - jailedValidatorCount - lastBlockParticipatingNodes.length || '0'" class="ml-2 p-badge-danger"></Badge>
                        </div>
                    </div>
                    <div class="flex align-items-center justify-content-center bg-cyan-100 border-round" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-database text-cyan-500 text-xl"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-12 lg:col-6 xl:col-3">
            <div class="card mb-0" style="min-height: 280px;">
                <div class="flex justify-content-between mb-3">
                    <div>
                        <span class="block text-500 font-medium text-lg mb-3">Data Summary</span>
                        <div class="text-900 font-medium text-lg mb-3">
                            <div class="text-900 font-medium text-lg mb-3">
                                <i class="pi pi-briefcase mr-1"></i>
                                <span>Vendor Info</span>
                                <Badge :value="vendorInfoCount || '0'" class="ml-2 p-badge-secondary"></Badge>
                            </div>
                            <div class="text-900 font-medium text-lg mb-3">
                                <i class="pi pi-database mr-1"></i>
                                <span>Device Models</span>
                                <Badge :value="modelCount || '0'" class="ml-2 badge-primary"></Badge>
                            </div>
                        </div>

                        <div class="text-900 font-medium text-lg mb-3">
                            <i class="pi pi-lock mr-1"></i>
                            <span>PKI Certificates</span>
                            <Badge :value="certificateCount || '0'" class="ml-2 p-badge-warning"></Badge>
                        </div>
                        <div class="text-900 font-medium text-lg mb-3">
                            <i class="pi pi-check-circle mr-1"></i>
                            <span>Compliance Devices</span>
                            <Badge :value="certifiedModelCount || '0'" class="ml-2 p-badge-success"></Badge>
                        </div>
                    </div>
                    <div class="flex align-items-center justify-content-center bg-cyan-100 border-round" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-chart-bar text-cyan-500 text-xl"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-12 lg:col-6 xl:col-3">
            <div class="card mb-0" style="min-height: 280px;">
                <div class="flex justify-content-between mb-3">
                    <div>
                        <span class="block text-500 font-medium text-lg mb-3">Block Height</span>

                        <span class="bold transition" :class="{ scaleBig: scaleClass }">
                            <vue3-autocounter
                                ref="counter"
                                :startAmount="previousBlockHeight"
                                :endAmount="currentBlockHeight"
                                :duration="1.2"
                                prefix=""
                                suffix=""
                                separator=","
                                decimalSeparator="."
                                :decimals="0"
                                :autoinit="true"
                                @finished="completed"
                            />
                        </span>
                    </div>
                    <div class="flex align-items-center justify-content-center bg-purple-100 border-round" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-table text-purple-500 text-xl"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-12 lg:col-6 xl:col-3">
            <div class="card mb-0" style="min-height: 280px;">
                <div class="flex justify-content-between mb-3">
                    <div>
                        <span class="block text-500 font-medium text-lg mb-3">Last Block Consensus %</span>

                        <span class="bold transition" :class="{ scaleBig: scaleClass }">
                            <vue3-autocounter
                                ref="counter"
                                :startAmount="0"
                                :endAmount="lastBlockParticipatingNodes == 0 ? 0 : (lastBlockParticipatingNodes.length / (validatorCount - jailedValidatorCount)) * 100"
                                :duration="1.2"
                                prefix=""
                                suffix=""
                                separator=","
                                decimalSeparator="."
                                :decimals="0"
                                :autoinit="true"
                                @finished="completed"
                            />
                        </span>
                    </div>
                    <div class="flex align-items-center justify-content-center bg-cyan-100 border-round" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-chart-pie text-cyan-500 text-xl"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-12 lg:col-6 xl:col-3">
            <div class="card mb-0" style="min-height: 280px;">
                <div class="flex justify-content-between mb-3">
                    <div>
                        <span class="block text-500 text-lg mb-3">Network Info</span>
                        <div class="text-900 font-medium text-lg mb-3">
                            <i class="pi pi-tag mr-1"></i>
                            DCL App Version
                            <Badge :value="nodeInfo.application_version?.version || 'N/A'" severity="success" class="ml-2"></Badge>
                        </div>
                        <div class="text-900 font-medium text-lg mb-3">
                            <i class="pi pi-code mr-1"></i>
                            Cosmos Version
                            <Badge :value="nodeInfo.application_version?.cosmos_sdk_version || 'N/A'" severity="info" class="ml-2"></Badge>
                        </div>

                        <div class="text-900 font-medium text-lg mb-3">
                            <i class="pi pi-globe mr-1"></i>
                            Network
                            <Badge :value="nodeInfo.default_node_info?.network || 'N/A'" severity="warning" class="ml-2"></Badge>
                        </div>
                    </div>
                    <div class="flex align-items-center justify-content-center bg-green-100 border-round" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-server text-green-500 text-xl"></i>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="isSignedIn" class="col-12 lg:col-6 xl:col-3">
            <div class="card mb-0" style="min-height: 280px;">
                <div class="flex justify-content-between mb-3">
                    <div>
                        <span class="block text-500 font-medium text-lg">Current User</span>
                        <div class="text-900 font-medium text-lg">
                            Public Key :
                            <span class="text-500 font-medium">{{ shortenKey(pubKey?.value) }}</span>
                            <button @click="copyToClipboard(pubKey?.value)" class="ml-1 p-button p-component p-button-icon-only p-button-rounded p-button-text" type="button">
                                <span class="mt-3 pi pi-copy p-button-copy"></span>
                            </button>
                        </div>
                        <div class="text-900 font-medium text-lg">
                            CLI Public Key :
                            <span class="text-500 font-medium">{{ shortenKey(cliFormatPubKey) }}</span>
                            <button
                                @click="copyToClipboard(cliFormatPubKey)"
                                class="ml-1 p-button p-component p-button-icon-only p-button-rounded p-button-text"
                                type="button"
                            >
                                <span class="mt-3 pi pi-copy p-button-copy"></span>
                            </button>
                        </div>
                        <div class="text-900 font-medium text-lg">
                            Address :
                            <span class="text-500 font-medium">{{ shortenAddress(currentAddress) }}</span>
                            <button @click="copyToClipboard(currentAddress)" class="ml-1 p-button p-component p-button-icon-only p-button-rounded p-button-text" type="button">
                                <span class="mt-3 pi pi-copy p-button-copy"></span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
import Vue3autocounter from 'vue3-autocounter';
import { decodePubkey } from '@cosmjs/proto-signing';
import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing';
import QuickActions from './QuickActions.vue';

export default {
    name: 'Dashboard',
    components: {
        'vue3-autocounter': Vue3autocounter,
        QuickActions
    },
    data() {
        return {
            blockHeightClass: 'no-highlight',
            scaleClass: false,
            pubKey: null,
            loadValues: {},
            nodeInfo: {},
            queries: [
                {
                    namespace: 'zigbeealliance.distributedcomplianceledger.model',
                    method: 'QueryModelAll'
                },
                {
                    namespace: 'zigbeealliance.distributedcomplianceledger.dclauth',
                    method: 'QueryAccountAll'
                },
                {
                    namespace: 'zigbeealliance.distributedcomplianceledger.dclauth',
                    method: 'QueryPendingAccountAll'
                },
                {
                    namespace: 'zigbeealliance.distributedcomplianceledger.dclauth',
                    method: 'QueryPendingAccountRevocationAll'
                },
                {
                    namespace: 'zigbeealliance.distributedcomplianceledger.validator',
                    method: 'QueryValidatorAll'
                },
                {
                    namespace: 'zigbeealliance.distributedcomplianceledger.compliance',
                    method: 'QueryCertifiedModelAll'
                },
                {
                    namespace: 'zigbeealliance.distributedcomplianceledger.pki',
                    method: 'QueryApprovedCertificatesAll'
                },
                {
                    namespace: 'zigbeealliance.distributedcomplianceledger.vendorinfo',
                    method: 'QueryVendorInfoAll'
                }
            ]
        };
    },
    watch: {},

    created() {
        // Get the initial values
        fetch(import.meta.env.VITE_APP_DCL_RPC_NODE + '/block')
            .then((response) => response.json())
            .then((data) => {
                this.loadValues = data;
            });
        // Fetch node info
        fetch(import.meta.env.VITE_APP_DCL_API_NODE + '/cosmos/base/tendermint/v1beta1/node_info')
            .then((response) => response.json())
            .then((data) => {
                this.nodeInfo = data;
            })
            .catch((error) => {
                console.error('Error fetching node info:', error);
            });            

        this.queries.forEach((query) => {
            this.$store.dispatch(`${query.namespace}/${query.method}`, {
                options: {
                    subscribe: true,
                    all: true
                }
            });
        });
    },
    computed: {
        isTestnetOrLocalhost() {
            const currentHref = window.location.href;
            return currentHref.includes('testnet.iotledger.io') || currentHref.includes('localhost');
        },

        currentKey: {
            get() {
                return this.pubKey;
            },
            set(value) {
                this.pubKey = value;
            }
        },
        isSignedIn() {
            const loggedIn = this.$store.getters['loggedIn'];
            if (loggedIn) {
                this.updatePubKey();
            }
            return loggedIn;
        },
        currentAddress() {
            if (this.$store.state.selectedKeplrAccount) {
                const account = this.$store.state.selectedKeplrAccount;
                return account.address;
            } else {
            return '';
            }
        },
        cliFormatPubKey() {
            if (this.pubKey) {
                return JSON.stringify({
                    '@type': '/cosmos.crypto.secp256k1.PubKey',
                    key: this.pubKey.value
                });
            }
            return '';
        },
        blockHeight: {
            get() {
                return this.blockHeightClass;
            },
            set(v) {
                this.blockHeightClass = v;
            }
        },

        modelCount() {
            const modelInfoArray = this.$store.getters['zigbeealliance.distributedcomplianceledger.model/getModelAll']();
            return modelInfoArray?.model?.length || 0;
        },

        certificateCount() {
            const approvedCertificates = this.$store.getters['zigbeealliance.distributedcomplianceledger.pki/getApprovedCertificatesAll']();

            return approvedCertificates?.approvedCertificates?.length || 0;
        },

        certifiedModelCount() {
            const certifiedModelInfoArray = this.$store.getters['zigbeealliance.distributedcomplianceledger.compliance/getCertifiedModelAll']();
            return certifiedModelInfoArray?.certifiedModel?.length || 0;
        },

        validatorCount() {
            const ValidatorInfoArray = this.$store.getters['zigbeealliance.distributedcomplianceledger.validator/getValidatorAll']();
            return ValidatorInfoArray?.validator?.length || 0;
        },

        jailedValidatorCount() {
            const ValidatorInfoArray = this.$store.getters['zigbeealliance.distributedcomplianceledger.validator/getValidatorAll']();
            return ValidatorInfoArray?.validator?.filter((e) => e.jailed).length || 0;
        },

        allProposedAccounts() {
            const pendingAccountsArray = this.$store.getters['zigbeealliance.distributedcomplianceledger.dclauth/getPendingAccountAll']();
            return pendingAccountsArray?.pendingAccount || 0;
        },

        allActiveRevocations() {
            const pendingAccountRevocationArray = this.$store.getters['zigbeealliance.distributedcomplianceledger.dclauth/getPendingAccountRevocationAll']();
            return pendingAccountRevocationArray?.pendingAccountRevocation || 0;
        },

        allActiveAccounts() {
            const allAccountsArray = this.$store.getters['zigbeealliance.distributedcomplianceledger.dclauth/getAccountAll']();
            return allAccountsArray?.account || 0;
        },

        vendorInfoCount() {
            const vendorInfoArray = this.$store.getters['zigbeealliance.distributedcomplianceledger.vendorinfo/getVendorInfoAll']();
            return vendorInfoArray?.vendorInfo?.length || 0;
        },

        trusteeCount() {
            if (!this.allActiveAccounts) return 0;
            return this.allActiveAccounts.filter((account) => account.roles.includes('Trustee')).length;
        },
        vendorCount() {
            if (!this.allActiveAccounts) return 0;
            return this.allActiveAccounts.filter((account) => account.roles.includes('Vendor')).length;
        },
        nodeAdminCount() {
            if (!this.allActiveAccounts) return 0;
            return this.allActiveAccounts.filter((account) => account.roles.includes('NodeAdmin')).length;
        },
        vendorAdminCount() {
            if (!this.allActiveAccounts) return 0;
            return this.allActiveAccounts.filter((account) => account.roles.includes('VendorAdmin')).length;
        },
        certificationCenterCount() {
            if (!this.allActiveAccounts) return 0;
            return this.allActiveAccounts.filter((account) => account.roles.includes('CertificationCenter')).length;
        },
        currentBlockHeight() {
            const blockArray = this.$store.state.common.blocks.blocks;
            if (!blockArray || blockArray.length === 0) {
                if (this.loadValues.result) return parseInt(this.loadValues.result.block.header.height);
            }
            const lastBlock = blockArray[blockArray.length - 1];
            this.scaleClass = true;
            if (lastBlock) return parseInt(lastBlock.height);
            else return 0;
        },

        lastBlockParticipatingNodes() {
            let blockArray = [];
            if (this.loadValues.result) {
                blockArray = [this.loadValues.result.block];
            } else {
                return [];
            }

            if (this.$store.state.common.blocks.blocks && this.$store.state.common.blocks.blocks.length > 0) {
                blockArray = this.$store.state.common.blocks.blocks;
            }

            const lastBlock = blockArray[blockArray.length - 1];
            const details = lastBlock.details || lastBlock;

            if (details) {
                return details.last_commit.signatures.filter((e) => e.signature);
            } else {
                return [];
            }
        },

        previousBlockHeight() {
            const blockArray = this.$store.state.common.blocks.blocks;
            if (!blockArray || blockArray.length < 2) {
                return 0;
            }
            const lastBlock = blockArray[blockArray.length - 2];
            return parseInt(lastBlock.height);
        },
        currentUser() {},

        currentUserAccount() {
            if (!this.isSignedIn || !this.currentAddress) return null;

            const allAccountsArray = this.$store.getters['zigbeealliance.distributedcomplianceledger.dclauth/getAccountAll']();
            const accounts = allAccountsArray?.account || [];

            return accounts.find(account => account.base_account.address === this.currentAddress);
        },

        isAccountOnChain() {
            return !!this.currentUserAccount;
        },

        isTrustee() {
            const account = this.currentUserAccount;
            if (!account) return false;

            return account.roles && account.roles.includes('Trustee');
        }
    },
    methods: {
        theFormat(number) {
            return number.toFixed(0);
        },
        completed() {
            this.scaleClass = false;
        },
        shortenKey(key) {
            if (!key) return '';
            return key.substr(0, 4) + '...' + key.slice(-4);
        },
        shortenAddress(addr) {
            if (!addr) return '';
            return addr.substr(0, 10) + '...' + addr.slice(-5);
        },
        copyToClipboard(value) {
            const el = document.createElement('textarea');
            el.value = value;
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);
        },
        updatePubKey() {
            if (this.$store.state.selectedKeplrAccount) {
                const account = this.$store.state.keplrSigner;
                const publicKey = account.key.pubKey;
                // convert publicKey (Uint8Array) to the protobuf format
                const defaultPubkeyProtoBytes = Uint8Array.from([0x0a, publicKey.length, ...publicKey]);
                const decodedPubKey = decodePubkey({
                    typeUrl: '/cosmos.crypto.secp256k1.PubKey',
                    value: defaultPubkeyProtoBytes
                });
                this.currentKey = decodedPubKey;
            } 
        }
    }
};
</script>

<style scoped>
.highlight {
    background-color: #a4ab47;
    transition: background-color 2s ease;
    padding: 0.2rem;
    border-radius: 2rem;
}
.no-highlight {
    background-color: none;
    transition: background-color 2s ease;
    padding: 0.2rem;
    border-radius: 2rem;
}

#blockNumber {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
.bold {
    font-weight: bold;
    font-size: 25px;
    color: #6a6666;
}
.transition {
    transition: all 0.3s ease-in;
}
label {
    width: 100px;
    display: inline-block;
}
.scaleBig {
    font-size: 2rem;
    color: #15c031;
}
#wrapper {
    width: 150px;
    display: inline-block;
    padding: 20px 0;
    border-radius: 15px;
    box-shadow: 0 3px 8px 0 rgba(0, 0, 0, 0.18);
}
</style>