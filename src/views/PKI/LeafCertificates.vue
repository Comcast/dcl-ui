<script>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import Message from 'primevue/message';
import GrantActionRootCertificate from './GrantActionRootCertificate.vue';

export default {
    name: 'LeafCertificates',
    props: ['subject', 'subjectKeyId'],

    data() {
        return {
            showRevokeCert: false,
            revokeCertificate: null,
            expandedRows: []
        };
    },

    methods: {
        showRevokeCertificateDialog(certificate) {
            this.showRevokeCert = true;
            this.revokeCertificate = certificate;
        },

        dismissRevokeCertificateDialog() {
            this.showRevokeCert = false;
        },

        // Download the certificate in PEM format
        downloadCertificateChain(certificate) {
            let filename = 'certificate-chain.pem';
            let element = document.createElement('a');
            certificate = this.getCertificate(certificate.subjectKeyId);
            let certificateChain = this.getCertificateChain(certificate);
            let pemCert = '';
            certificateChain.forEach((certificate) => {
                pemCert = pemCert + 'Subject: ' + certificate.certs[0].subjectAsText + '\n' + certificate.certs[0].pemCert + '\n\n';
            });
            element.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(pemCert));
            element.setAttribute('download', filename);
            element.style.display = 'none';
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
        },

        getCertificateChain(certificate) {
            let chain = [];
            while (certificate != null) {
                chain.push(certificate);
                certificate = this.getCertificate(certificate.certs[0].authorityKeyId);
            }
            return chain;
        },

        getCertificate(subjectKeyId) {
            return this.allApprovedCertificates.find((cert) => {
                return cert.subjectKeyId === subjectKeyId;
            });
        }
    },
    components: {
        DataTable,
        Column,
        Button,
        Dialog,
        Message,
        GrantActionRootCertificate
    },

    computed: {
        allApprovedCertificates() {
            const approvedCertificatesArray = this.$store.getters['zigbeealliance.distributedcomplianceledger.pki/getApprovedCertificatesAll']();
            return approvedCertificatesArray.approvedCertificates;
        },

        allChildCertificates() {
            let nonRootCertificates = [];
            const approvedCertificatesArray = this.$store.getters['zigbeealliance.distributedcomplianceledger.pki/getApprovedCertificatesAll']();
            if (approvedCertificatesArray.approvedCertificates) {
                let allCerts = approvedCertificatesArray.approvedCertificates;
                nonRootCertificates = allCerts.filter((cert) => {
                    return !cert.certs[0].isRoot;
                });
                nonRootCertificates = nonRootCertificates.map((item) => {
                    item.approvals = item.certs[0].approvals;
                    item.serialNumber = item.certs[0].serialNumber;
                    item.subjectAsText = item.certs[0].subjectAsText;
                    return item;
                });
            }

            let childCerts = [];
            const certificatesArray = this.$store.getters['zigbeealliance.distributedcomplianceledger.pki/getChildCertificates']({
                params: {
                    issuer: this.subject,
                    authorityKeyId: this.subjectKeyId
                }
            });
            if (certificatesArray && certificatesArray.childCertificates) {
                childCerts = certificatesArray.childCertificates.certIds;

                childCerts = childCerts.map((childCert) => {
                    let cert = nonRootCertificates.find((item) => item.subjectKeyId == childCert.subjectKeyId);
                    childCert.subjectAsText = cert.certs[0].subjectAsText;
                    return childCert;
                });
            }

            return childCerts;
        },

        isSignedIn() {
            return this.$store.getters['loggedIn'];
        }
    },

    created: function () {
        // Get all the child certificates
        this.$store
            .dispatch('zigbeealliance.distributedcomplianceledger.pki/QueryChildCertificates', {
                options: {
                    subscribe: false,
                    all: true
                },
                params: {
                    issuer: this.subject,
                    authorityKeyId: this.subjectKeyId
                }
            })
            .then(
                (response) => {},
                (error) => {
                    this.error = error.message;
                }
            );
    }
};
</script>

<template>
    <div class="prime-vue-container">
        <div v-if="allChildCertificates.length > 0">
            <DataTable v-model:expandedRows="expandedRows" :value="allChildCertificates" :auto-layout="true" showGridlines stripedRows>
                <Column :expander="true" headerStyle="width: 3rem" />
                <Column field="subjectAsText" header="Subject"></Column>
                <Column field="subjectKeyId" header="Subject Key Id"></Column>
                <Column headerStyle="width: 4rem; text-align: center" bodyStyle="text-align: center; overflow: visible">
                    <template #body="{ data }">
                        <Button label="Revoke" class="p-button-danger" @click="showRevokeCertificateDialog(data)" iconPos="left" icon="pi pi-ban" v-bind:class="{ 'p-disabled': !isSignedIn }"></Button>

                        <Button label="Download" class="p-button-success mt-1" icon="pi pi-download" @click="downloadCertificateChain(data)"></Button>
                    </template>
                </Column>
                <template #expansion="certificate">
                    <div>
                        <LeafCertificates :subject="certificate.data.subject" :subjectKeyId="certificate.data.subjectKeyId"> </LeafCertificates>
                    </div>
                </template>
            </DataTable>

            <Dialog header="Revoke X509 Certificate" @update:visible="dismissRevokeCertificateDialog" :visible="showRevokeCert" :style="{ width: '50vw' }" class="p-fluid" :modal="true">
                <GrantActionRootCertificate action="RevokeX509Cert" :certificate="revokeCertificate" @close-dialog="dismissRevokeCertificateDialog"></GrantActionRootCertificate>
            </Dialog>
        </div>
        <div v-else>
            <h5>No Child Certificates present on ledger</h5>
        </div>
    </div>
</template>
