<template>
    <div class="quick-actions-container">
        <div class="surface-section px-4 py-3 border-round">
            <div class="flex justify-content-between align-items-center mb-3">
                <h3 class="text-900 font-medium">
                    <i class="pi pi-bolt mr-2 text-orange-500"></i>
                    Quick Actions Needed
                </h3>
                <Badge :value="totalActions" severity="warning" class="text-lg"></Badge>
            </div>

            <div v-if="totalActions === 0" class="text-500 text-center py-4">
                <i class="pi pi-check-circle text-4xl text-green-500 mb-3"></i>
                <div>No pending actions at this time</div>
            </div>

            <div v-else class="grid">
                <!-- Pending Account Approvals -->
                <div v-if="pendingAccounts && pendingAccounts.length > 0" class="col-12 lg:col-6">
                    <div class="surface-card shadow-2 p-3 border-round h-full">
                        <div class="flex justify-content-between align-items-start mb-3">
                            <div>
                                <div class="text-900 font-medium text-lg mb-2">
                                    <i class="pi pi-user-plus mr-2 text-blue-500"></i>
                                    Pending Account Approvals
                                </div>
                                <div class="text-500 text-sm">{{ pendingAccounts.length }} account(s) waiting for approval</div>
                            </div>
                            <Button
                                label="Review"
                                icon="pi pi-arrow-right"
                                class="p-button-sm p-button-outlined"
                                @click="navigateToAccounts"
                            />
                        </div>
                        <div class="border-top-1 surface-border pt-2">
                            <div v-for="(account, index) in pendingAccounts.slice(0, 3)" :key="index" class="flex align-items-center py-2">
                                <i class="pi pi-user mr-2 text-400"></i>
                                <div class="flex-1 min-w-0">
                                    <div class="text-900 font-medium text-truncate">{{ shortenAddress(account?.account?.address) }}</div>
                                    <div class="text-500 text-sm text-truncate">
                                        Roles: {{ account?.account?.roles?.join(', ') || 'N/A' }}
                                        <span v-if="account?.account?.vendorID"> | VID: {{ account.account.vendorID }}</span>
                                    </div>
                                </div>
                                <Badge :value="`${account?.approvals?.length || 0} approvals`" severity="info" class="ml-2 flex-shrink-0"></Badge>
                            </div>
                            <div v-if="pendingAccounts.length > 3" class="text-500 text-sm mt-2">
                                ... and {{ pendingAccounts.length - 3 }} more
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Pending Account Revocations -->
                <div v-if="pendingRevocations && pendingRevocations.length > 0" class="col-12 lg:col-6">
                    <div class="surface-card shadow-2 p-3 border-round h-full">
                        <div class="flex justify-content-between align-items-start mb-3">
                            <div>
                                <div class="text-900 font-medium text-lg mb-2">
                                    <i class="pi pi-user-minus mr-2 text-red-500"></i>
                                    Pending Account Revocations
                                </div>
                                <div class="text-500 text-sm">{{ pendingRevocations.length }} revocation(s) waiting for approval</div>
                            </div>
                            <Button
                                label="Review"
                                icon="pi pi-arrow-right"
                                class="p-button-sm p-button-outlined p-button-danger"
                                @click="navigateToAccountRevocations"
                            />
                        </div>
                        <div class="border-top-1 surface-border pt-2">
                            <div v-for="(revocation, index) in pendingRevocations.slice(0, 3)" :key="index" class="flex align-items-center py-2">
                                <i class="pi pi-user-minus mr-2 text-400"></i>
                                <div class="flex-1 min-w-0">
                                    <div class="text-900 font-medium text-truncate">{{ shortenAddress(revocation?.address) }}</div>
                                    <div class="text-500 text-sm text-truncate">Reason: {{ revocation?.reason || 'Not specified' }}</div>
                                </div>
                                <Badge :value="`${revocation?.approvals?.length || 0} approvals`" severity="danger" class="ml-2 flex-shrink-0"></Badge>
                            </div>
                            <div v-if="pendingRevocations.length > 3" class="text-500 text-sm mt-2">
                                ... and {{ pendingRevocations.length - 3 }} more
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Proposed PKI Certificates -->
                <div v-if="proposedCertificates && proposedCertificates.length > 0" class="col-12 lg:col-6">
                    <div class="surface-card shadow-2 p-3 border-round h-full">
                        <div class="flex justify-content-between align-items-start mb-3">
                            <div>
                                <div class="text-900 font-medium text-lg mb-2">
                                    <i class="pi pi-lock mr-2 text-yellow-500"></i>
                                    Proposed PKI Certificates
                                </div>
                                <div class="text-500 text-sm">{{ proposedCertificates.length }} certificate(s) waiting for approval</div>
                            </div>
                            <Button
                                label="Review"
                                icon="pi pi-arrow-right"
                                class="p-button-sm p-button-outlined p-button-warning"
                                @click="navigateToPKI"
                            />
                        </div>
                        <div class="border-top-1 surface-border pt-2">
                            <div v-for="(cert, index) in proposedCertificates.slice(0, 3)" :key="index" class="flex align-items-center py-2">
                                <i class="pi pi-shield mr-2 text-400"></i>
                                <div class="flex-1 min-w-0">
                                    <div class="text-900 font-medium text-truncate" :title="getCertificateSubjectText(cert)">
                                        {{ getCertificateSubjectText(cert) }}
                                    </div>
                                    <div class="text-500 text-sm text-truncate">
                                        Serial: {{ cert?.serialNumber || 'N/A' }}
                                        <span v-if="cert?.vid"> | VID: {{ cert.vid }}</span>
                                    </div>
                                </div>
                                <Badge :value="`${cert?.approvals?.length || 0} approvals`" severity="warning" class="ml-2 flex-shrink-0"></Badge>
                            </div>
                            <div v-if="proposedCertificates.length > 3" class="text-500 text-sm mt-2">
                                ... and {{ proposedCertificates.length - 3 }} more
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Proposed Certificate Revocations -->
                <div v-if="proposedCertRevocations && proposedCertRevocations.length > 0" class="col-12 lg:col-6">
                    <div class="surface-card shadow-2 p-3 border-round h-full">
                        <div class="flex justify-content-between align-items-start mb-3">
                            <div>
                                <div class="text-900 font-medium text-lg mb-2">
                                    <i class="pi pi-lock-open mr-2 text-orange-500"></i>
                                    Proposed Certificate Revocations
                                </div>
                                <div class="text-500 text-sm">{{ proposedCertRevocations.length }} revocation(s) waiting for approval</div>
                            </div>
                            <Button
                                label="Review"
                                icon="pi pi-arrow-right"
                                class="p-button-sm p-button-outlined p-button-danger"
                                @click="navigateToPKIRevocations"
                            />
                        </div>
                        <div class="border-top-1 surface-border pt-2">
                            <div v-for="(revocation, index) in proposedCertRevocations.slice(0, 3)" :key="index" class="flex align-items-center py-2">
                                <i class="pi pi-times-circle mr-2 text-400"></i>
                                <div class="flex-1 min-w-0">
                                    <div class="text-900 font-medium text-truncate" :title="revocation?.subjectAsText || revocation?.subject || 'Unknown'">
                                        {{ revocation?.subjectAsText || revocation?.subject || 'Unknown' }}
                                    </div>
                                    <div class="text-500 text-sm text-truncate">
                                        Serial: {{ revocation?.serialNumber || 'N/A' }}
                                        <span v-if="revocation?.reason"> | Reason: {{ revocation.reason }}</span>
                                    </div>
                                </div>
                                <Badge :value="`${revocation?.approvals?.length || 0} approvals`" severity="danger" class="ml-2 flex-shrink-0"></Badge>
                            </div>
                            <div v-if="proposedCertRevocations.length > 3" class="text-500 text-sm mt-2">
                                ... and {{ proposedCertRevocations.length - 3 }} more
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Button from 'primevue/button';
import Badge from 'primevue/badge';

export default {
    name: 'QuickActions',
    components: {
        Button,
        Badge
    },
    computed: {
        pendingAccounts() {
            const pendingAccountsArray = this.$store.getters['zigbeealliance.distributedcomplianceledger.dclauth/getPendingAccountAll']();
            return pendingAccountsArray?.pendingAccount || [];
        },

        pendingRevocations() {
            const pendingRevocationArray = this.$store.getters['zigbeealliance.distributedcomplianceledger.dclauth/getPendingAccountRevocationAll']();
            return pendingRevocationArray?.pendingAccountRevocation || [];
        },

        proposedCertificates() {
            const proposedCertArray = this.$store.getters['zigbeealliance.distributedcomplianceledger.pki/getProposedCertificateAll']();
            return proposedCertArray?.proposedCertificate || [];
        },

        proposedCertRevocations() {
            const proposedRevocationArray = this.$store.getters['zigbeealliance.distributedcomplianceledger.pki/getProposedCertificateRevocationAll']();
            return proposedRevocationArray?.proposedCertificateRevocation || [];
        },

        totalActions() {
            return this.pendingAccounts.length +
                   this.pendingRevocations.length +
                   this.proposedCertificates.length +
                   this.proposedCertRevocations.length;
        }
    },

    created() {
        // Subscribe to pending account approvals
        this.$store.dispatch('zigbeealliance.distributedcomplianceledger.dclauth/QueryPendingAccountAll', {
            options: {
                subscribe: true,
                all: true
            }
        });

        // Subscribe to pending account revocations
        this.$store.dispatch('zigbeealliance.distributedcomplianceledger.dclauth/QueryPendingAccountRevocationAll', {
            options: {
                subscribe: true,
                all: true
            }
        });

        // Subscribe to proposed certificates
        this.$store.dispatch('zigbeealliance.distributedcomplianceledger.pki/QueryProposedCertificateAll', {
            options: {
                subscribe: true,
                all: true
            }
        });

        // Subscribe to proposed certificate revocations
        this.$store.dispatch('zigbeealliance.distributedcomplianceledger.pki/QueryProposedCertificateRevocationAll', {
            options: {
                subscribe: true,
                all: true
            }
        });
    },

    methods: {
        shortenAddress(address) {
            if (!address) return '';
            if (address.length <= 16) return address;
            return address.substring(0, 10) + '...' + address.substring(address.length - 4);
        },

        getCertificateSubjectText(cert) {
            // Check if cert has subjectAsText property (human-readable)
            if (cert?.subjectAsText) {
                return cert.subjectAsText;
            }

            // If subject is base64 encoded, try to decode it
            if (cert?.subject) {
                try {
                    // Check if it's base64
                    if (/^[A-Za-z0-9+/]+=*$/.test(cert.subject)) {
                        const decoded = atob(cert.subject);
                        // Extract readable text from decoded string (it might contain binary data)
                        const readable = decoded.replace(/[\x00-\x1F\x7F-\xFF]/g, ' ').trim();
                        if (readable) {
                            return readable;
                        }
                    }
                    // If not base64 or decoding fails, return as is
                    return cert.subject;
                } catch (e) {
                    // If decoding fails, return the original
                    return cert.subject;
                }
            }

            // Fallback
            return 'Unknown Certificate';
        },


        navigateToAccounts() {
            // Navigate to the Proposed Accounts tab (index 1)
            this.$router.push({
                path: '/accounts',
                query: { tab: '1' }
            });
        },

        navigateToAccountRevocations() {
            // Navigate to the Active Accounts - Pending Revocation tab (index 2)
            this.$router.push({
                path: '/accounts',
                query: { tab: '2' }
            });
        },

        navigateToPKI() {
            // Navigate to the Proposed Attestation Certificates tab (index 3)
            this.$router.push({
                path: '/pki',
                query: { tab: '3' }
            });
        },

        navigateToPKIRevocations() {
            // Navigate to the Proposed Revoked Attestation Certificates tab (index 4)
            this.$router.push({
                path: '/pki',
                query: { tab: '4' }
            });
        }
    }
};
</script>

<style scoped>
.quick-actions-container {
    margin-bottom: 1.5rem;
}

.surface-card {
    transition: all 0.3s;
    height: 100%;
    display: flex;
    flex-direction: column;
}

.surface-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.text-truncate {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.min-w-0 {
    min-width: 0;
}

.flex-shrink-0 {
    flex-shrink: 0;
}
</style>