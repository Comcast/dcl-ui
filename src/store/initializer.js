// src/store/initializer.js
export default {
  initialized: false,

  async initializeAllStores(store) {
    if (this.initialized) return;

    console.log('Initializing all DCL stores...');

    // Dispatching all DCL Queries
    await Promise.all([
      // Auth
      store.dispatch('zigbeealliance.distributedcomplianceledger.dclauth/QueryAccountAll', {
        options: { subscribe: true, all: true }
      }),
      store.dispatch('zigbeealliance.distributedcomplianceledger.dclauth/QueryPendingAccountAll', {
        options: { subscribe: true, all: true }
      }),
      store.dispatch('zigbeealliance.distributedcomplianceledger.dclauth/QueryPendingAccountRevocationAll', {
        options: { subscribe: true, all: true }
      }),

      // Models
      store.dispatch('zigbeealliance.distributedcomplianceledger.model/QueryModelAll', {
        options: { subscribe: true, all: true }
      }),

      // Compliance
      store.dispatch('zigbeealliance.distributedcomplianceledger.compliance/QueryComplianceInfoAll', {
        options: { subscribe: true, all: true }
      }),
      store.dispatch('zigbeealliance.distributedcomplianceledger.compliance/QueryCertifiedModelAll', {
        options: { subscribe: true, all: true }
      }),
      store.dispatch('zigbeealliance.distributedcomplianceledger.compliance/QueryRevokedModelAll', {
        options: { subscribe: true, all: true }
      }),
      store.dispatch('zigbeealliance.distributedcomplianceledger.compliance/QueryProvisionalModelAll', {
        options: { subscribe: true, all: true }
      }),

      // Vendor info
      store.dispatch('zigbeealliance.distributedcomplianceledger.vendorinfo/QueryVendorInfoAll', {
        options: { subscribe: true, all: true }
      }),

      // Upgrades
      store.dispatch('zigbeealliance.distributedcomplianceledger.dclupgrade/QueryApprovedUpgradeAll', {
        options: { subscribe: true, all: true }
      }),
      store.dispatch('zigbeealliance.distributedcomplianceledger.dclupgrade/QueryProposedUpgradeAll', {
        options: { subscribe: true, all: true }
      }),
      store.dispatch('zigbeealliance.distributedcomplianceledger.dclupgrade/QueryRejectedUpgradeAll', {
        options: { subscribe: true, all: true }
      }),

      // Validators
      store.dispatch('zigbeealliance.distributedcomplianceledger.validator/QueryValidatorAll', {
        options: { subscribe: true, all: true }
      }),
      store.dispatch('zigbeealliance.distributedcomplianceledger.validator/QueryProposedDisableValidatorAll', {
        options: { subscribe: true, all: true }
      }),

      // PKI
      store.dispatch('zigbeealliance.distributedcomplianceledger.pki/QueryApprovedCertificatesAll', {
        options: { subscribe: true, all: true }
      }),
      store.dispatch('zigbeealliance.distributedcomplianceledger.pki/QueryNocRootCertificatesAll', {
        options: { subscribe: true, all: true }
      }),
      store.dispatch('zigbeealliance.distributedcomplianceledger.pki/QueryNocIcaCertificatesAll', {
        options: { subscribe: true, all: true }
      }),
      store.dispatch('zigbeealliance.distributedcomplianceledger.pki/QueryPkiRevocationDistributionPointAll', {
        options: { subscribe: true, all: true }
      }),
      store.dispatch('zigbeealliance.distributedcomplianceledger.pki/QueryProposedCertificateAll', {
        options: { subscribe: true, all: true }
      }),
      store.dispatch('zigbeealliance.distributedcomplianceledger.pki/QueryRevokedCertificatesAll', {
        options: { subscribe: true, all: true }
      }),
      store.dispatch('zigbeealliance.distributedcomplianceledger.pki/QueryProposedCertificateRevocationAll', {
        options: { subscribe: true, all: true }
      })
    ]);

    // Update certificate indexes for optimized lookups
    await store.dispatch('pkiOptimized/updateCertificateIndexes');

    this.initialized = true;
    console.log('All DCL stores initialized');
  }
};