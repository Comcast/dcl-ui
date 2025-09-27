// Optimized PKI store module with indexed lookups and memoization
const state = () => ({
  // Certificate indexes for O(1) lookups
  approvedCertificatesBySubjectKeyId: new Map(),
  nocRootCertificatesBySubjectKeyId: new Map(),
  nocIcaCertificatesBySubjectKeyId: new Map(),

  // Cached processed data
  processedApprovedRootCertificates: null,
  processedNocRootCertificates: null,
  processedProposedCertificateRevocation: null,
  lastUpdateTimestamp: 0
})

const mutations = {
  UPDATE_CERTIFICATE_INDEXES(state, { type, certificates }) {
    const indexMap = new Map()

    if (certificates && Array.isArray(certificates)) {
      certificates.forEach(cert => {
        const keyId = cert.subjectKeyId || (cert.certs && cert.certs[0]?.subjectKeyId)
        if (keyId) {
          indexMap.set(keyId, cert)
        }
      })
    }

    switch(type) {
      case 'approved':
        state.approvedCertificatesBySubjectKeyId = indexMap
        break
      case 'nocRoot':
        state.nocRootCertificatesBySubjectKeyId = indexMap
        break
      case 'nocIca':
        state.nocIcaCertificatesBySubjectKeyId = indexMap
        break
    }

    state.lastUpdateTimestamp = Date.now()
  },

  SET_PROCESSED_CERTIFICATES(state, { type, data }) {
    switch(type) {
      case 'approvedRoot':
        state.processedApprovedRootCertificates = data
        break
      case 'nocRoot':
        state.processedNocRootCertificates = data
        break
      case 'proposedRevocation':
        state.processedProposedCertificateRevocation = data
        break
    }
  },

  CLEAR_CACHE(state) {
    state.processedApprovedRootCertificates = null
    state.processedNocRootCertificates = null
    state.processedProposedCertificateRevocation = null
  }
}

const getters = {
  // Get certificate by subjectKeyId with O(1) lookup
  getCertificateBySubjectKeyId: (state) => (subjectKeyId, type = 'approved') => {
    switch(type) {
      case 'approved':
        return state.approvedCertificatesBySubjectKeyId.get(subjectKeyId)
      case 'nocRoot':
        return state.nocRootCertificatesBySubjectKeyId.get(subjectKeyId)
      case 'nocIca':
        return state.nocIcaCertificatesBySubjectKeyId.get(subjectKeyId)
      default:
        return null
    }
  },

  // Optimized getter for approved root certificates with memoization
  getProcessedApprovedRootCertificates: (state, getters, rootState, rootGetters) => () => {
    const rawData = rootGetters['zigbeealliance.distributedcomplianceledger.pki/getApprovedCertificatesAll']()

    // Check if we have cached data and it's still valid
    if (state.processedApprovedRootCertificates &&
        state.lastUpdateTimestamp > Date.now() - 1000) { // 1 second cache
      return state.processedApprovedRootCertificates
    }

    if (!rawData?.approvedCertificates) {
      return []
    }

    // Process only root certificates
    const rootCertificates = rawData.approvedCertificates
      .filter(cert => cert.certs[0].isRoot)
      .map(item => ({
        ...item,
        approvals: item.certs[0].approvals,
        serialNumber: item.certs[0].serialNumber,
        subjectAsText: item.certs[0].subjectAsText,
        certificateType: item.certs[0].certificateType,
        vid: item.certs[0].vid ?
          `${item.certs[0].vid} (0x${item.certs[0].vid.toString(16)})` :
          'Not Set',
        isNoc: item.certs[0].isNoc ? 'Yes' : 'No'
      }))

    // Cache the result
    state.processedApprovedRootCertificates = rootCertificates
    return rootCertificates
  },

  // Optimized getter for NOC root certificates with memoization
  getProcessedNocRootCertificates: (state, getters, rootState, rootGetters) => () => {
    const rawData = rootGetters['zigbeealliance.distributedcomplianceledger.pki/getNocRootCertificatesAll']()

    if (state.processedNocRootCertificates &&
        state.lastUpdateTimestamp > Date.now() - 1000) {
      return state.processedNocRootCertificates
    }

    if (!rawData?.nocRootCertificates) {
      return []
    }

    const nocRootCertificates = rawData.nocRootCertificates.map(item => ({
      ...item,
      vid: item.vid ?
        `${item.vid} (0x${item.vid.toString(16)})` :
        'Not Set',
      approvals: item.certs[0].approvals,
      serialNumber: item.certs[0].serialNumber,
      subjectAsText: item.certs[0].subjectAsText,
      certificateType: item.certs[0].certificateType,
      subject: item.certs[0].subject,
      subjectKeyId: item.certs[0].subjectKeyId,
      isNoc: 'Yes'
    }))

    state.processedNocRootCertificates = nocRootCertificates
    return nocRootCertificates
  },

  // Optimized getter for proposed certificate revocations using indexed lookups
  getProcessedProposedCertificateRevocation: (state, getters, rootState, rootGetters) => () => {
    const rawData = rootGetters['zigbeealliance.distributedcomplianceledger.pki/getProposedCertificateRevocationAll']()

    if (state.processedProposedCertificateRevocation &&
        state.lastUpdateTimestamp > Date.now() - 1000) {
      return state.processedProposedCertificateRevocation
    }

    if (!rawData?.proposedCertificateRevocation) {
      return []
    }

    // Use the index for O(1) lookups instead of O(n) find operations
    const proposedRevocations = rawData.proposedCertificateRevocation
      .map(item => {
        const cert = state.approvedCertificatesBySubjectKeyId.get(item.subjectKeyId)
        if (!cert) return null

        return {
          ...item,
          subjectAsText: cert.subjectAsText
        }
      })
      .filter(item => item !== null)

    state.processedProposedCertificateRevocation = proposedRevocations
    return proposedRevocations
  }
}

const actions = {
  // Update certificate indexes when data changes
  async updateCertificateIndexes({ commit, rootGetters }) {
    // Update approved certificates index
    const approvedData = rootGetters['zigbeealliance.distributedcomplianceledger.pki/getApprovedCertificatesAll']()
    if (approvedData?.approvedCertificates) {
      // Process and create indexed version
      const processedCerts = approvedData.approvedCertificates.map(cert => ({
        ...cert,
        subjectAsText: cert.certs[0].subjectAsText,
        subjectKeyId: cert.certs[0].subjectKeyId
      }))
      commit('UPDATE_CERTIFICATE_INDEXES', {
        type: 'approved',
        certificates: processedCerts
      })
    }

    // Update NOC root certificates index
    const nocRootData = rootGetters['zigbeealliance.distributedcomplianceledger.pki/getNocRootCertificatesAll']()
    if (nocRootData?.nocRootCertificates) {
      commit('UPDATE_CERTIFICATE_INDEXES', {
        type: 'nocRoot',
        certificates: nocRootData.nocRootCertificates
      })
    }

    // Update NOC ICA certificates index
    const nocIcaData = rootGetters['zigbeealliance.distributedcomplianceledger.pki/getNocIcaCertificatesAll']()
    if (nocIcaData?.nocIcaCertificates) {
      commit('UPDATE_CERTIFICATE_INDEXES', {
        type: 'nocIca',
        certificates: nocIcaData.nocIcaCertificates
      })
    }
  },

  // Clear cached data to force recomputation
  clearCache({ commit }) {
    commit('CLEAR_CACHE')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}