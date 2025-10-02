<script>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import Button from 'primevue/button';
import ButtonGroup from 'primevue/buttongroup';
import SplitButton from 'primevue/splitbutton';
import Dialog from 'primevue/dialog';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import InputText from 'primevue/inputtext';
import ProposeRootCertificate from './ProposeRootCertificate.vue';
import AddRootNocCertificate from './AddRootNocCertificate.vue';
import GrantActionRootCertificate from './GrantActionRootCertificate.vue';
import PkiRevocationDistributionPoint from './PkiRevocationDistributionPoint.vue';
import AddLeafCertificate from './AddLeafCertificate.vue';
import AddNocIcaCertificate from './AddNocIcaCertificate.vue';
import LeafCertificates from './LeafCertificates.vue';
import NocLeafCertificates from './NocLeafCertificates.vue';
import ApprovalDisplay from './ApprovalDisplay.vue';

import { FilterMatchMode } from 'primevue/api';

export default {
    name: 'PKI',
    data() {
        return {
            showGrantActionRootCert: false,
            showProposeRootCert: false,
            showAddNocRootCert: false,
            showPkiRevocationDistributionPoint: false,
            selectedPkiRevocationDistributionPoint: null,
            viewOnly: false,
            showAddLeafCert: false,
            showAddNocLeafCert: false,
            action: null,
            expandedRows: [],
            filters: {
                global: { value: null, matchMode: FilterMatchMode.CONTAINS }
            },
            selectedCertificate: null,
            activeTabIndex: 0,
            downloadDropdownItems: [
                {
                    label: 'Certificate Chain',
                    icon: 'pi pi-angle-double-down',
                    command: () => {
                        this.$toast.add({
                            severity: 'success',
                            summary: 'Updated',
                            detail: 'Data Updated',
                            life: 3000
                        });
                    }
                },
                {
                    label: 'Certificate',
                    icon: 'pi pi-angle-down',
                    command: () => {
                        this.$toast.add({
                            severity: 'warn',
                            summary: 'Delete',
                            detail: 'Data Deleted',
                            life: 3000
                        });
                    }
                }
            ]
        };
    },

    components: {
        DataTable,
        Column,
        TabView,
        TabPanel,
        Button,
        ButtonGroup,
        SplitButton,
        Dialog,
        IconField,
        InputIcon,
        InputText,
        GrantActionRootCertificate,
        ProposeRootCertificate,
        AddRootNocCertificate,
        AddLeafCertificate,
        AddNocIcaCertificate,
        LeafCertificates,
        NocLeafCertificates,
        PkiRevocationDistributionPoint,
        ApprovalDisplay
    },

    computed: {
        allApprovedRootCertificates() {
            // Use optimized getter with memoization
            return this.$store.getters['pkiOptimized/getProcessedApprovedRootCertificates']();
        },

        allNocRootCertificates() {
            // Use optimized getter with memoization
            return this.$store.getters['pkiOptimized/getProcessedNocRootCertificates']();
        },

        allPkiRevocationDistributionPoints() {
            const pkiRevocationDistributionPointArray = this.$store.getters['zigbeealliance.distributedcomplianceledger.pki/getPkiRevocationDistributionPointAll']();
            return pkiRevocationDistributionPointArray?.PkiRevocationDistributionPoint;
        },

        allApprovedCertificates() {
            let allCerts = [];
            const approvedCertificatesArray = this.$store.getters['zigbeealliance.distributedcomplianceledger.pki/getApprovedCertificatesAll']();
            if (approvedCertificatesArray.approvedCertificates) {
                allCerts = approvedCertificatesArray.approvedCertificates;

                allCerts = allCerts.map((item) => {
                    item.approvals = item.certs[0].approvals;
                    item.serialNumber = item.certs[0].serialNumber;
                    item.subjectAsText = item.certs[0].subjectAsText;
                    item.authorityKeyId = item.certs[0].authorityKeyId;
                    item.rootSubjectKeyId = item.certs[0].rootSubjectKeyId;
                    item.issuer = item.certs[0].issuer;
                    item.pemCert = item.certs[0].pemCert;
                    return item;
                });
            }
            return allCerts;
        },

        allProposedCertificates() {
            const proposedCertificatesArray = this.$store.getters['zigbeealliance.distributedcomplianceledger.pki/getProposedCertificateAll']();
            return proposedCertificatesArray?.proposedCertificate;
        },

        allProposedCertificateRevocation() {
            // Use optimized getter with indexed lookups
            return this.$store.getters['pkiOptimized/getProcessedProposedCertificateRevocation']();
        },

        allRevokedCertificates() {
            let revokedCertificates = [];
            const revokedCertificatesArray = this.$store.getters['zigbeealliance.distributedcomplianceledger.pki/getRevokedCertificatesAll']();

            if (revokedCertificatesArray.revokedCertificates) {
                let allCerts = revokedCertificatesArray.revokedCertificates;
                revokedCertificates = allCerts.map((item) => {
                    item.approvals = item.certs[0].approvals;
                    item.serialNumber = item.certs[0].serialNumber;
                    item.subjectAsText = item.certs[0].subjectAsText;
                    item.isNoc = item.certs[0].isNoc;
                    item.isRoot = item.certs[0].isRoot;
                    return item;
                });
            }
            return revokedCertificates;
        },

        isSignedIn() {
            return this.$store.getters['loggedIn'];
        }
    },

    created: function () {
        // Update certificate indexes for optimized lookups
        this.$store.dispatch('pkiOptimized/updateCertificateIndexes');

        // Check if tab query parameter is present
        if (this.$route.query.tab) {
            this.activeTabIndex = parseInt(this.$route.query.tab);
        }
    },

    watch: {
        '$route.query.tab': function(newTab) {
            if (newTab !== undefined) {
                this.activeTabIndex = parseInt(newTab);
            }
        },
        // Watch for changes in the certificate data and update indexes
        'allApprovedCertificates': {
            handler() {
                this.$store.dispatch('pkiOptimized/updateCertificateIndexes');
            },
            deep: false
        }
    },

    methods: {

        showCertificateDialog(type) {
            switch(type) {
                case 'propose-root':
                this.showProposeRootCertificateDialog();
                break;
                case 'add-noc-root':
                this.showAddNocRootCertificateDialog();
                break;
                case 'add-leaf':
                this.showAddLeafCertificateDialog();
                break;
                case 'add-noc-ica':
                this.showAddNocIcaCertificateDialog();
                break;
            }
        },        
        dismissPkiRevocationDistributionPointDialog() {
            this.showPkiRevocationDistributionPoint = false;
        },
        showPkiRevocationDistributionPointDialog(pkiRevocationDistributionPoint, viewOnly) {
            this.showPkiRevocationDistributionPoint = true;
            this.selectedPkiRevocationDistributionPoint = pkiRevocationDistributionPoint;
            this.viewOnly = viewOnly;
        },
        showNewPkiRevocationDistributionPoint() {
            this.showPkiRevocationDistributionPoint = true;
            this.selectedPkiRevocationDistributionPoint = null;
            this.viewOnly = false;
        },

        selectCertificate(certificate) {
            alert(certificate);
            this.selectedCertificate = certificate;
        },
        trimAddress(address) {
            // Return first 6 and last 4 characters
            if (address && address.length > 16) {
                return address.substring(0, 10) + '...' + address.substring(address.length - 4);
            } else {
                return address;
            }
        },
        breakLongSubject(subject) {
            // If subject is 30 characters long and has no line breaks, break the subject and insert a line break at every 15 charactacters
            if (subject && subject.length > 30 && subject.indexOf('\n') == -1) {
                let newSubject = '';
                let i = 0;
                while (i < subject.length) {
                    newSubject += subject.substring(i, i + 15) + '\n';
                    i += 15;
                }
                return newSubject;
            } else {
                return subject;
            }
        },
        showProposeRootCertificateDialog() {
            this.showProposeRootCert = true;
        },

        dismissProposeRootCertificateDialog() {
            this.showProposeRootCert = false;
        },

        showAddNocRootCertificateDialog() {
            this.showAddNocRootCert = true;
        },

        dismissAddNocRootCertificateDialog() {
            this.showAddNocRootCert = false;
        },

        showAddLeafCertificateDialog() {
            this.showAddLeafCert = true;
        },
        dismissAddLeafCertificateDialog() {
            this.showAddLeafCert = false;
        },

        showAddNocIcaCertificateDialog() {
            this.showAddNocLeafCert = true;
        },
        dismissAddNocIcaCertificateDialog() {
            this.showAddNocLeafCert = false;
        },

        showGrantActionRootCertificateDialog(certificate, action) {
            this.showGrantActionRootCert = true;
            this.action = action;
            this.selectedCertificate = certificate;
        },

        dismissGrantActionRootCertificateDialog() {
            this.showGrantActionRootCert = false;
        },

        grantActionHeader() {
            switch (this.action) {
                case 'ProposeAddX509RootCert':
                    return 'Propose Add X509 Root Certificate';
                case 'ProposeRevokeX509RootCert':
                    return 'Propose Revoke X509 Root Certificate';
                case 'ApproveAddX509RootCert':
                    return 'Approve Add X509 Root Certificate';
                case 'RejectAddX509RootCert':
                    return 'Reject Add X509 Root Certificate';
                case 'ApproveRevokeX509RootCert':
                    return 'Approve Revoke X509 Root Certificate';
                case 'RevokeX509Cert':
                    return 'Revoke a X509 Certificate';
                case 'AssignVid':
                    return 'Assign Vendor ID to X509 Root Certificate';
                case 'RevokeNocX509IcaCert':
                    return 'Revoke NOC X509 ICA Certificate';
                case 'RemoveNocX509IcaCert':
                    return 'Remove NOC X509 ICA Certificate';
                case 'RevokeNocX509RootCert':
                    return 'Revoke NOC X509 Root Certificate';
                case 'RemoveNocX509RootCert':
                    return 'Remove NOC X509 Root Certificate';

                default:
                    return 'Grant Action Failed';
            }
        },

        pkiRevocationDistributionPointHeader() {
            if (this.viewOnly) {
                return 'View PKI Revocation Distribution Point';
            } else {
                return 'Add / Update PKI Revocation Distribution Point';
            }
        },

        // Download the certificate in PEM format
        downloadCertificate(certificates) {
            let filename = 'certificate.pem';
            const certificate = certificates.certs ? certificates.certs[0] : certificates;
            let element = document.createElement('a');
            let pemCert = 'Subject: ' + certificate.subjectAsText + '\n' + certificate.pemCert;
            element.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(pemCert));
            element.setAttribute('download', filename);
            element.style.display = 'none';
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
        },

        getChildCertificates(rootSubjectKeyId) {
            certificates = this.allApprovedCertificates();
            let childCertificates = [];
            for (let i = 0; i < certificates.length; i++) {
                if (certificates[i].subjectKeyId == rootSubjectKeyId) {
                    childCertificates.push(certificates[i]);
                }
            }
            return childCertificates;
        },

        getNocChildCertificates(parentCertificate) {
            const allCerts = this.$store.getters['zigbeealliance.distributedcomplianceledger.pki/getApprovedCertificatesAll']();
            if (!allCerts?.approvedCertificates) return [];

            const nocIcaCerts = this.$store.getters['zigbeealliance.distributedcomplianceledger.pki/getNocIcaCertificatesAll']();
            
            return allCerts.approvedCertificates
                .filter(cert => {
                    const certData = cert.certs[0];
                    return certData.authorityKeyId === parentCertificate.subjectKeyId;
                })
                .map(cert => ({
                    ...cert.certs[0],
                    certificateType: cert.certs[0].isRoot ? 'Root' : 'OperationalPKI',
                    isNoc: cert.certs[0].isNoc || false
                }));
        },

        confirmDeletePkiRevocationDistributionPoint(pkiRevocationDistributionPoint) {
            this.$confirm.require({
                message: `Are you sure you want to delete the PkiRevocationDistributionPoint with Label : ${pkiRevocationDistributionPoint.label} ?`,
                header: 'Delete Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.deletePkiRevocationDistributionPoint(pkiRevocationDistributionPoint);
                },
                reject: () => {
                    //callback to execute when user rejects the action
                }
            });
        },
        deletePkiRevocationDistributionPoint(pkiRevocationDistributionPoint) {
            const account = this.$store.state.selectedKeplrAccount;
            const creatorAddress = account.address;
            let loader = this.$loading.show();
            this.$store
                .dispatch(`zigbeealliance.distributedcomplianceledger.pki/sendMsgDeletePkiRevocationDistributionPoint`, {
                    value: {
                        signer: creatorAddress,
                        vid: pkiRevocationDistributionPoint.vid,
                        label: pkiRevocationDistributionPoint.label,
                        issuerSubjectKeyID: pkiRevocationDistributionPoint.issuerSubjectKeyID
                    }
                })
                .then(
                    (response) => {
                        loader.hide();
                        if (response.code == 0) {
                            this.error = null;
                            this.$toast.add({
                                severity: 'success',
                                summary: 'Successful Tx',
                                detail: 'Delete PkiRevocationDistributionPoint Tx sent successfully',
                                life: 3000
                            });
                        } else {
                            this.error = response;
                            this.$toast.add({
                                severity: 'error',
                                summary: 'Error while processing Tx',
                                detail: 'Delete PkiRevocationDistributionPoint Tx failed',
                                life: 3000
                            });
                        }
                    },
                    (error) => {
                        loader.hide();
                        this.$toast.add({
                            severity: 'error',
                            summary: 'Error while processing Tx',
                            detail: 'Delete PkiRevocationDistributionPoint Tx failed',
                            life: 3000
                        });
                        this.error = error.message;
                    }
                );
        }
    }
};
</script>

<template>
    <div class="prime-vue-container pki-full-height">
        <div class="certificate-actions">
                    <Button @click="showCertificateDialog('propose-root')" 
                            :disabled="!isSignedIn"
                            icon="pi pi-plus-circle"
                            label="Propose Attestation Root CA"
                            class="mr-3 p-button-primary"
                            v-tooltip.top="'Propose a new Attestation Root CA'"
                    />
                    <Button @click="showCertificateDialog('add-leaf')"
                            :disabled="!isSignedIn"
                            icon="pi pi-file"
                            label="Add Attestation Leaf Certificate"
                            class="mr-3 p-button-primary"
                            v-tooltip.top="'Add a New Attestation Leaf Certificate'"
                    />
                    <Button @click="showCertificateDialog('add-noc-root')"
                            :disabled="!isSignedIn"
                            icon="pi pi-sitemap"
                            label="Add NOC Root CA (RCAC)"
                            class="mr-3 p-button-primary"
                            v-tooltip.top="'Add a new NOC Root CA (RCAC)'"
                    />
                    <Button @click="showCertificateDialog('add-noc-ica')"
                            :disabled="!isSignedIn"
                            icon="pi pi-server"
                            label="Add NOC Intermediate CA (ICAC)"
                            class="p-button-primary"
                            v-tooltip.top="'Add a new NOC Intermediate CA (ICAC)'"
                    />
        </div>        
        <ConfirmDialog></ConfirmDialog>
        <Message :closable="false" v-if="error" severity="error">{{ errorMessage() }}</Message>
        <TabView :scrollable="true" v-model:activeIndex="activeTabIndex">
            <TabPanel>
                <template #header>
                    <i class="pi pi-shield text-green-500 mr-2"></i>
                    <span class="font-semibold">Attestation Certificates</span>
                </template>
                <DataTable responsiveLayout="stack" :value="allApprovedRootCertificates" :auto-layout="true" :paginator="true" :rows="10" :rowsPerPageOptions="[10, 20, 50, 100]"
                    v-model:filters="filters" v-model:expandedRows="expandedRows" filterDisplay="row" showGridlines :tableStyle="{ minWidth: '50rem' }"
                    stripedRows>
                    <template #header>
                        <div class="flex justify-content-end">
                            <IconField>
                                <InputIcon>
                                    <i class="pi pi-search" />
                                </InputIcon>
                                <InputText v-model="filters['global'].value" placeholder="Search" />
                            </IconField>
                        </div>
                    </template>

                    <Column :expander="true" headerStyle="width: 3rem" />
                    <Column field="vid" header="Vendor ID" :sortable="true" />
                    <Column field="certificateType" header="Certificate Type" :sortable="true" />
                    <Column field="subjectAsText" header="Subject" :sortable="true" />
                    <Column field="subjectKeyId" header="Subject Key ID">
                        <template #body="slotProps">
                            <span style="word-break: break-all;">{{slotProps.data.subjectKeyId}}</span>
                        </template>
                    </Column>
                    <Column field="approvals" header="Approvals">
                        <template #body="row">
                            <ApprovalDisplay
                                :approvals="row.data.approvals || []"
                            />
                        </template>
                    </Column>
                    <Column headerStyle="width: 4rem; text-align: center"
                        bodyStyle="text-align: center; overflow: visible">
                        <template #body="{ data }">
                            <Button label="Assign Vendor ID" class="p-button-primary"
                                @click="showGrantActionRootCertificateDialog(data, 'AssignVid')" iconPos="left"
                                icon="pi pi-user" v-bind:class="{ 'p-disabled': !isSignedIn }"
                                v-if="data.vid == 'Not Set'">
                            </Button>
                            <br />
                            <Button label="Propose Revoke" class="p-button-danger mt-3"
                                @click="showGrantActionRootCertificateDialog(data, 'ProposeRevokeX509RootCert')"
                                iconPos="left" icon="pi pi-ban" v-bind:class="{ 'p-disabled': !isSignedIn }"
                                v-if="data.isNoc == 'No'">
                            </Button>

                            <Button label="Revoke NOC" class="p-button-warning mt-3"
                                @click="showGrantActionRootCertificateDialog(data, 'RevokeNocX509RootCert')"
                                iconPos="left" icon="pi pi-ban" v-bind:class="{ 'p-disabled': !isSignedIn }"
                                v-if="data.isNoc == 'Yes'">
                            </Button>
                            
                            <Button label="Remove NOC" class="p-button-danger mt-3"
                                @click="showGrantActionRootCertificateDialog(data, 'RemoveNocX509RootCert')"
                                iconPos="left" icon="pi pi-trash" v-bind:class="{ 'p-disabled': !isSignedIn }"
                                v-if="data.isNoc == 'Yes'">
                            </Button>


                            <br />
                            <Button label="Download" class="p-button-success mt-3" icon="pi pi-download"
                                @click="downloadCertificate(data)"></Button>
                        </template>
                    </Column>
                    <template #expansion="certificate">
                        <div>
                            <LeafCertificates :subject="certificate.data.subject"
                                :subjectKeyId="certificate.data.subjectKeyId"> </LeafCertificates>
                        </div>
                    </template>
                </DataTable>
            </TabPanel>

            <TabPanel>
                <template #header>
                    <i class="pi pi-sitemap text-blue-500 mr-2"></i>
                    <span class="font-semibold">NOC Certificates</span>
                </template>
                <DataTable responsiveLayout="stack" :value="allNocRootCertificates" :auto-layout="true" :paginator="true" :rows="10" :rowsPerPageOptions="[10, 20, 50, 100]"
                    v-model:filters="filters" v-model:expandedRows="expandedRows" filterDisplay="row" showGridlines :tableStyle="{ minWidth: '50rem' }"
                    stripedRows>
                    <template #header>
                        <div class="flex justify-content-end">
                            <IconField>
                                <InputIcon>
                                    <i class="pi pi-search" />
                                </InputIcon>
                                <InputText v-model="filters['global'].value" placeholder="Search" />
                            </IconField>
                        </div>
                    </template>

                    <Column :expander="true" headerStyle="width: 3rem" />
                    <Column field="vid" header="Vendor ID" :sortable="true" />
                    <Column field="certificateType" header="Certificate Type" :sortable="true" />
                    <Column field="subjectAsText" header="Subject" :sortable="true" />
                    <Column field="subjectKeyId" header="Subject Key ID">
                        <template #body="slotProps">
                            <span style="word-break: break-all;">{{slotProps.data.subjectKeyId}}</span>
                        </template>
                    </Column>
                    <Column field="approvals" header="Approvals">
                        <template #body="row">
                            <ApprovalDisplay
                                :approvals="row.data.approvals || []"
                            />
                        </template>
                    </Column>
                    <Column headerStyle="width: 4rem; text-align: center"
                        bodyStyle="text-align: center; overflow: visible">
                        <template #body="{ data }">
                            <Button label="Assign Vendor ID" class="p-button-primary"
                                @click="showGrantActionRootCertificateDialog(data, 'AssignVid')" iconPos="left"
                                icon="pi pi-user" v-bind:class="{ 'p-disabled': !isSignedIn }"
                                v-if="data.vid == 'Not Set'">
                            </Button>
                            <br />
                            <Button label="Revoke NOC" class="p-button-warning mt-3"
                                @click="showGrantActionRootCertificateDialog(data, 'RevokeNocX509RootCert')"
                                iconPos="left" icon="pi pi-ban" v-bind:class="{ 'p-disabled': !isSignedIn }">
                            </Button>
                            <Button label="Remove NOC" class="p-button-danger mt-3"
                                @click="showGrantActionRootCertificateDialog(data, 'RemoveNocX509RootCert')"
                                iconPos="left" icon="pi pi-trash" v-bind:class="{ 'p-disabled': !isSignedIn }">
                            </Button>
                            <br />
                            <Button label="Download" class="p-button-success mt-3" icon="pi pi-download"
                                @click="downloadCertificate(data)"></Button>
                        </template>
                    </Column>
                    <template #expansion="certificate">
                        <div>
                            <NocLeafCertificates 
                                :subject="certificate.data.subject"
                                :subjectKeyId="certificate.data.subjectKeyId">
                            </NocLeafCertificates>
                        </div>
                    </template>
                </DataTable>
            </TabPanel>

            <TabPanel>
                <template #header>
                    <i class="pi pi-server text-purple-500 mr-2"></i>
                    <span class="font-semibold">PKI Revocation Distribution Point</span>
                </template>
                <Button @click="showPkiRevocationDistributionPointDialog(null, false)"
                    class="p-button-primary mb-4 mr-4" v-bind:class="{ 'p-disabled': !isSignedIn }"
                    label="Add Revocation Distribution Point" />

                <DataTable :value="allPkiRevocationDistributionPoints" :auto-layout="true" :paginator="true" :rows="10" :rowsPerPageOptions="[10, 20, 50, 100]"
                    v-model:filters="filters" v-model:expandedRows="expandedRows" filterDisplay="row" showGridlines
                    stripedRows>
                    <template #header>
                        <div class="flex justify-content-end">
                            <IconField>
                                <InputIcon>
                                    <i class="pi pi-search" />
                                </InputIcon>
                                <InputText v-model="filters['global'].value" placeholder="Search" />
                            </IconField>
                        </div>
                    </template>
                    <Column field="vid" header="Vendor ID" :sortable="true" />
                    <Column field="label" header="Label"></Column>
                    <Column field="issuerSubjectKeyID" header="Issuer Subject KeyID"></Column>
                    <Column field="dataURL" header="Data URL"></Column>
                    <Column header="Action">
                        <template #body="{ data }">
                            <span style="margin-right: 0.1rem">
                                <Button label="" @click="showPkiRevocationDistributionPointDialog(data, true)"
                                    iconPos="left" icon="pi pi-info-circle"
                                    class="p-button-rounded p-button-primary p-button-text p-button-info"
                                    v-tooltip="'Show PKI Revocation Distribution Point'" />
                            </span>
                            <span style="margin-right: 0.1rem">
                                <Button label="" @click="showPkiRevocationDistributionPointDialog(data, false)"
                                    iconPos="left" icon="pi pi-pencil"
                                    class="p-button-rounded p-button-secondary p-button-text"
                                    v-bind:class="{ 'p-disabled': !isSignedIn }"
                                    v-tooltip="'Update PKI Revocation Distribution Point'" />
                            </span>
                            <span style="margin-right: 0.1rem">
                                <Button label="" @click="confirmDeletePkiRevocationDistributionPoint(data)"
                                    iconPos="left" icon="pi pi-trash"
                                    class="p-button-rounded p-button-danger p-button-text"
                                    v-bind:class="{ 'p-disabled': !isSignedIn }"
                                    v-tooltip="'Delete PKI Revocation Distribution Point'" />
                            </span>
                        </template>
                    </Column>
                </DataTable>
            </TabPanel>

            <TabPanel>
                <template #header>
                    <i class="pi pi-clock text-orange-500 mr-2"></i>
                    <span class="font-semibold">Proposed Attestation Certificates</span>
                </template>
                <DataTable :value="allProposedCertificates" :auto-layout="true" :paginator="true" :rows="10" :rowsPerPageOptions="[10, 20, 50, 100]"
                    v-model:filters="filters" filterDisplay="row" showGridlines stripedRows>
                    <template #header>
                        <div class="flex justify-content-end">
                            <IconField>
                                <InputIcon>
                                    <i class="pi pi-search" />
                                </InputIcon>
                                <InputText v-model="filters['global'].value" placeholder="Search" />
                            </IconField>
                        </div>
                    </template>

                    <Column field="subjectAsText" header="Subject" :sortable="true"></Column>

                    <Column field="subjectKeyId" header="Subject Key ID">
                        <template #body="slotProps">
                            <span style="word-break: break-all;">{{slotProps.data.subjectKeyId}}</span>
                        </template>
                    </Column>
                    <Column field="approvals" header="Approvals">
                        <template #body="row">
                            <ApprovalDisplay
                                :approvals="row.data.approvals || []"
                                :rejects="row.data.rejects || []"
                            />
                        </template>
                    </Column>
                    <Column headerStyle="width: 4rem; text-align: center"
                        bodyStyle="text-align: left; overflow: visible">
                        <template #body="{ data }">
                            <Button label="Approve" class="p-button-primary"
                                @click="showGrantActionRootCertificateDialog(data, 'ApproveAddX509RootCert')"
                                iconPos="left" icon="pi pi-check" v-bind:class="{ 'p-disabled': !isSignedIn }"></Button>
                            <br />

                            <Button label="Reject" class="mt-3 p-button-danger"
                                @click="showGrantActionRootCertificateDialog(data, 'RejectAddX509RootCert')"
                                iconPos="left" icon="pi pi-ban" v-bind:class="{ 'p-disabled': !isSignedIn }"></Button>
                            <br />

                            <Button label="Download" class="p-button-success mt-3" icon="pi pi-download"
                                @click="downloadCertificate(data)"></Button>
                        </template>
                    </Column>
                </DataTable>
            </TabPanel>

            <TabPanel>
                <template #header>
                    <i class="pi pi-exclamation-triangle text-yellow-500 mr-2"></i>
                    <span class="font-semibold">Proposed Revoked Attestation Certificates</span>
                </template>
                <DataTable :value="allProposedCertificateRevocation" :auto-layout="true" :paginator="true" :rows="10" :rowsPerPageOptions="[10, 20, 50, 100]"
                    v-model:filters="filters" filterDisplay="row" showGridlines stripedRows>
                    <template #header>
                        <div class="flex justify-content-end">
                            <IconField>
                                <InputIcon>
                                    <i class="pi pi-search" />
                                </InputIcon>
                                <InputText v-model="filters['global'].value" placeholder="Search" />
                            </IconField>
                        </div>
                    </template>
                    <Column field="subjectAsText" header="Subject" :sortable="true" />
                    <Column field="subjectKeyId" header="Subject Key ID">
                        <template #body="slotProps">
                            <span style="word-break: break-all;">{{slotProps.data.subjectKeyId}}</span>
                        </template>
                    </Column>
                    <Column field="approvals" header="Revokes">
                        <template #body="row">
                            <ApprovalDisplay
                                :approvals="row.data.approvals || []"
                            />
                        </template>
                    </Column>
                    <Column headerStyle="width: 4rem; text-align: center"
                        bodyStyle="text-align: center; overflow: visible">
                        <template #body="{ data }">
                            <Button label="Revoke" class="p-button-danger"
                                @click="showGrantActionRootCertificateDialog(data, 'ApproveRevokeX509RootCert')"
                                iconPos="left" icon="pi pi-ban" v-bind:class="{ 'p-disabled': !isSignedIn }" />
                        </template>
                    </Column>
                </DataTable>
            </TabPanel>

            <TabPanel>
                <template #header>
                    <i class="pi pi-ban text-red-500 mr-2"></i>
                    <span class="font-semibold">Revoked Attestation Certificates</span>
                </template>
                <DataTable :value="allRevokedCertificates" :auto-layout="true" :paginator="true" :rows="10" :rowsPerPageOptions="[10, 20, 50, 100]"
                    v-model:filters="filters" filterDisplay="row" showGridlines stripedRows>
                    <template #header>
                        <div class="flex justify-content-end">
                            <IconField>
                                <InputIcon>
                                    <i class="pi pi-search" />
                                </InputIcon>
                                <InputText v-model="filters['global'].value" placeholder="Search" />
                            </IconField>
                        </div>
                    </template>
                    <Column class="subject" field="subjectAsText" header="Subject" :sortable="true"></Column>
                    <Column field="subjectKeyId" header="Subject Key ID">
                        <template #body="slotProps">
                            <span style="word-break: break-all;">{{slotProps.data.subjectKeyId}}</span>
                        </template>
                    </Column>
                    <Column field="approvals" header="Revokes">
                        <template #body="row">
                            <ApprovalDisplay
                                :approvals="row.data.approvals || []"
                            />
                        </template>
                    </Column>
                    <Column headerStyle="width: 4rem; text-align: center"
                        bodyStyle="text-align: center; overflow: visible">
                        <template #body="{ data }">
                            <Button v-if="data.isNoc == true && data.isRoot == true" label="Remove" class="p-button-danger"
                                @click="showGrantActionRootCertificateDialog(data, 'RemoveNocX509RootCert')"
                                iconPos="left" icon="pi pi-ban" v-bind:class="{ 'p-disabled': !isSignedIn }" />

                            <Button v-if="data.isNoc == true && data.isRoot == false" label="Remove" class="p-button-danger"
                                @click="showGrantActionRootCertificateDialog(data, 'RemoveNocX509IcaCert')"
                                iconPos="left" icon="pi pi-ban" v-bind:class="{ 'p-disabled': !isSignedIn }" />

                        </template>
                    </Column>                    
                </DataTable>
            </TabPanel>
        </TabView>

        <Dialog header="Propose X-509 Root Certificate" @update:visible="dismissProposeRootCertificateDialog"
            :visible="showProposeRootCert" :style="{ width: '50vw' }" class="p-fluid" :modal="true">
            <ProposeRootCertificate :action="action" :certificate="selectedCertificate"
                @close-dialog="dismissProposeRootCertificateDialog"></ProposeRootCertificate>
        </Dialog>

        <Dialog header="Add NOC X-509 Root Certificate" @update:visible="dismissAddNocRootCertificateDialog"
            :visible="showAddNocRootCert" :style="{ width: '50vw' }" class="p-fluid" :modal="true">
            <AddRootNocCertificate :action="action" :certificate="selectedCertificate"
                @close-dialog="dismissAddNocRootCertificateDialog"></AddRootNocCertificate>
        </Dialog>

        <Dialog header="Add X-509 Certificate" @update:visible="dismissAddLeafCertificateDialog"
            :visible="showAddLeafCert" :style="{ width: '50vw' }" class="p-fluid" :modal="true">
            <AddLeafCertificate :action="action" :certificate="selectedCertificate"
                @close-dialog="dismissAddLeafCertificateDialog"></AddLeafCertificate>
        </Dialog>

        <Dialog header="Add Noc ICA Certificate" @update:visible="dismissAddNocIcaCertificateDialog"
            :visible="showAddNocLeafCert" :style="{ width: '50vw' }" class="p-fluid" :modal="true">
            <AddNocIcaCertificate :action="action" :certificate="selectedCertificate"
                @close-dialog="dismissAddNocIcaCertificateDialog"></AddNocIcaCertificate>
        </Dialog>

        <Dialog :header="grantActionHeader()" @update:visible="dismissGrantActionRootCertificateDialog"
            :visible="showGrantActionRootCert" :style="{ width: '50vw' }" class="p-fluid" :modal="true">
            <GrantActionRootCertificate :action="action" :certificate="selectedCertificate"
                @close-dialog="dismissGrantActionRootCertificateDialog"></GrantActionRootCertificate>
        </Dialog>

        <Dialog :header="pkiRevocationDistributionPointHeader()"
            @update:visible="dismissPkiRevocationDistributionPointDialog" :visible="showPkiRevocationDistributionPoint"
            :style="{ width: '50vw' }" class="p-fluid" :modal="true">
            <PkiRevocationDistributionPoint :action="action"
                :selectedPkiRevocationDistributionPoint="selectedPkiRevocationDistributionPoint" :viewOnly="viewOnly"
                @close-dialog="dismissPkiRevocationDistributionPointDialog"></PkiRevocationDistributionPoint>
        </Dialog>
    </div>
</template>

<style scoped>
.pki-full-height {
  height: calc(100vh - 80px); /* Adjust based on your header height */
  display: flex;
  flex-direction: column;
}

.pki-full-height ::v-deep(.p-tabview) {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.pki-full-height ::v-deep(.p-tabview-panels) {
  flex: 1;
  min-height: 0;
}

.pki-full-height ::v-deep(.p-tabview-panel) {
  height: 100%;
  display: flex;
  flex-direction: column;
}

td.subject {
    max-width: 400px;
    text-overflow: ellipsis;
    overflow: hidden;
}

.p-splitbutton {
    margin-right: 0.5rem;
}

.certificate-actions {
  margin-bottom: 1rem;
}

@media (max-width: 768px) {
  .certificate-actions .p-buttongroup {
    display: flex;
    flex-direction: column;
  }
  
  .certificate-actions .p-buttongroup .p-button {
    margin-bottom: 0.5rem;
  }
}

.truncate-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
}

@media screen and (max-width: 960px) {
  ::v-deep(.p-datatable-tbody > tr > td:last-child) {
    text-align: center;
  }
  
  ::v-deep(.p-datatable .p-datatable-tbody > tr > td .p-column-title) {
    display: inline-block;
    font-weight: bold;
  }
}
</style>
