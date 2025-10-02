# DCL UI - Backend REST API Endpoint Comparison

## Model Module
**Status: ✅ FULLY ALIGNED - No changes needed**

| Endpoint | UI | Backend | Status |
|----------|------|---------|--------|
| GET /dcl/model/models | ✅ | ✅ | Match |
| GET /dcl/model/models/{vid} | ✅ | ✅ | Match |
| GET /dcl/model/models/{vid}/{pid} | ✅ | ✅ | Match |
| GET /dcl/model/versions/{vid}/{pid} | ✅ | ✅ | Match |
| GET /dcl/model/versions/{vid}/{pid}/{softwareVersion} | ✅ | ✅ | Match |

## PKI Module
**Status: ⚠️ MISSING NEW ENDPOINTS - Updates required**

### Existing Endpoints (Working)
| Endpoint | UI | Backend | Status |
|----------|------|---------|--------|
| GET /dcl/pki/certificates | ✅ | ✅ | Match |
| GET /dcl/pki/certificates/{subject} | ✅ | ✅ | Match |
| GET /dcl/pki/certificates/{subject}/{subjectKeyId} | ✅ | ✅ | Match |
| GET /dcl/pki/child-certificates/{issuer}/{authorityKeyId} | ✅ | ✅ | Match |
| GET /dcl/pki/proposed-certificates | ✅ | ✅ | Match |
| GET /dcl/pki/proposed-certificates/{subject}/{subjectKeyId} | ✅ | ✅ | Match |
| GET /dcl/pki/proposed-revocation-certificates | ✅ | ✅ | Match |
| GET /dcl/pki/proposed-revocation-certificates/{subject}/{subjectKeyId} | ✅ | ✅ | Match |
| GET /dcl/pki/rejected-certificates | ✅ | ✅ | Match |
| GET /dcl/pki/rejected-certificates/{subject}/{subjectKeyId} | ✅ | ✅ | Match |
| GET /dcl/pki/revocation-points | ✅ | ✅ | Match |
| GET /dcl/pki/revocation-points/{issuerSubjectKeyID} | ✅ | ✅ | Match |
| GET /dcl/pki/revocation-points/{issuerSubjectKeyID}/{vid}/{label} | ✅ | ✅ | Match |
| GET /dcl/pki/revoked-certificates | ✅ | ✅ | Match |
| GET /dcl/pki/revoked-certificates/{subject}/{subjectKeyId} | ✅ | ✅ | Match |
| GET /dcl/pki/root-certificates | ✅ | ✅ | Match |
| GET /dcl/pki/revoked-root-certificates | ✅ | ✅ | Match |

### Existing NOC Endpoints in UI (Need verification)
| Endpoint | UI | Backend | Status |
|----------|------|---------|--------|
| GET /dcl/pki/noc-ica-certificates | ✅ | ✅ | Match |
| GET /dcl/pki/noc-vid-ica-certificates/{vid} | ✅ | ✅ | Match |
| GET /dcl/pki/noc-root-certificates | ✅ | ✅ | Match |
| GET /dcl/pki/noc-vid-root-certificates/{vid} | ✅ | ✅ | Match |
| GET /dcl/pki/noc-vid-root-certificates/{vid}/{subjectKeyId} | ✅ | ❌ | **UI has wrong endpoint** |
| GET /dcl/pki/revoked-noc-root-certificates | ✅ | ✅ | Match |
| GET /dcl/pki/revoked-noc-root-certificates/{subject}/{subjectKeyId} | ✅ | ✅ | Match |

### NEW Endpoints Missing in UI
| Endpoint | UI | Backend | Description |
|----------|------|---------|-------------|
| GET /dcl/pki/all-certificates | ❌ | ✅ | Get all certificates (PAA, PAI, RCAC, ICAC) |
| GET /dcl/pki/all-certificates/{subject} | ❌ | ✅ | Get all certs by subject |
| GET /dcl/pki/all-certificates/{subject}/{subjectKeyId} | ❌ | ✅ | Get specific cert |
| GET /dcl/pki/all-noc-certificates | ❌ | ✅ | Get all NOC certificates |
| GET /dcl/pki/all-noc-certificates/{subject} | ❌ | ✅ | Get NOC certs by subject |
| GET /dcl/pki/all-noc-certificates/{subject}/{subjectKeyId} | ❌ | ✅ | Get specific NOC cert |
| GET /dcl/pki/noc-vid-certificates/{vid}/{subjectKeyId} | ❌ | ✅ | Get NOC cert by VID and SKID |
| GET /dcl/pki/revoked-noc-ica-certificates | ❌ | ✅ | Get all revoked NOC ICA |
| GET /dcl/pki/revoked-noc-ica-certificates/{subject}/{subjectKeyId} | ❌ | ✅ | Get revoked NOC ICA |

### Endpoint Corrections Needed
1. **UI has**: `/dcl/pki/noc-vid-root-certificates/{vid}/{subjectKeyId}`
   **Should be**: `/dcl/pki/noc-vid-certificates/{vid}/{subjectKeyId}` (different path)

## Summary of Required Changes

### Priority 1: Fix Incorrect Endpoints
1. Update PKI REST client:
   - Change `noc-vid-root-certificates/{vid}/{subjectKeyId}` to `noc-vid-certificates/{vid}/{subjectKeyId}`

### Priority 2: Add Missing "All Certificates" Endpoints
These are critical for displaying comprehensive certificate lists:
1. `/dcl/pki/all-certificates` - Unified view of all certificate types
2. `/dcl/pki/all-certificates/{subject}`
3. `/dcl/pki/all-certificates/{subject}/{subjectKeyId}`

### Priority 3: Add Missing NOC Endpoints
Complete NOC certificate support:
1. `/dcl/pki/all-noc-certificates`
2. `/dcl/pki/all-noc-certificates/{subject}`
3. `/dcl/pki/all-noc-certificates/{subject}/{subjectKeyId}`
4. `/dcl/pki/noc-vid-certificates/{vid}/{subjectKeyId}` (correct path)
5. `/dcl/pki/revoked-noc-ica-certificates`
6. `/dcl/pki/revoked-noc-ica-certificates/{subject}/{subjectKeyId}`

## Migration Impact Assessment

### Low Risk (No Code Changes)
- Model module: All endpoints match perfectly
- PKI module: Most existing endpoints work as-is

### Medium Risk (Minor Updates)
- Fix incorrect NOC endpoint path
- Add new query methods to PKI store module

### Features Not Available Until Update
- Cannot view unified certificate lists (all-certificates)
- Cannot query NOC certificates by subject
- Cannot view revoked NOC ICA certificates

## Next Steps
1. Regenerate PKI REST client from latest proto files
2. Update Vuex store actions for new endpoints
3. Add UI components for new certificate views
4. Test all endpoints against backend