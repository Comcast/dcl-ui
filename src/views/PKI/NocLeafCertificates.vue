<script>
// Previous imports remain the same
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import Message from 'primevue/message';
import GrantActionRootCertificate from './GrantActionRootCertificate.vue';

export default {
    name: 'NocLeafCertificates',
    props: ['subject', 'subjectKeyId'],

    data() {
        return {
            showRevokeCert: false,
            revokeCertificate: null,
            expandedRows: []
        };
    },

    methods: {
        // Previous methods remain the same
        showRevokeCertificateDialog(certificate) {
            this.showRevokeCert = true;
            this.revokeCertificate = certificate;
        },

        dismissRevokeCertificateDialog() {
            this.showRevokeCert = false;
        },

        downloadCertificateChain(certificate) {
            const filename = 'certificate-chain.pem';
            const element = document.createElement('a');
            const certificateChain = this.getCertificateChain(certificate);
            const pemCert = certificateChain.map(cert => 
                `Subject: ${cert.certs[0].subjectAsText || cert.certs[0].subject}\n${cert.pemCert || cert.certs[0].pemCert}\n\n`
            ).join('');
            
            element.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(pemCert));
            element.setAttribute('download', filename);
            element.style.display = 'none';
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
        },

        getCertificateChain(certificate) {
            let chain = [certificate];
            let parent = this.getCertificate(certificate.certs[0].authorityKeyId);
            while (parent) {
                chain.push(parent);
                parent = this.getCertificate(parent.certs[0].authorityKeyId);
            }
            return chain;
        },

        getCertificate(authorityKeyId) {
            return this.nocRootCertificates.find(cert => 
                cert.subjectKeyId === authorityKeyId || 
                (cert.certs && cert.certs[0] && cert.certs[0].subjectKeyId === authorityKeyId)
            );
        }
    },

    computed: {
        nocRootCertificates() {
            const certificatesArray = this.$store.getters['zigbeealliance.distributedcomplianceledger.pki/getNocRootCertificatesAll']();
            return certificatesArray.nocRootCertificates || [];
        },

        childCertificates() {
            const certificatesArray = this.$store.getters['zigbeealliance.distributedcomplianceledger.pki/getNocIcaCertificatesAll']();
            if (!certificatesArray?.nocIcaCertificates) return [];

            return certificatesArray.nocIcaCertificates
                .filter(cert => cert.certs[0].authorityKeyId === this.subjectKeyId)
                .map(cert => ({
                    ...cert,
                    displaySubject: cert.certs[0].subjectAsText || cert.certs[0].subject,
                    certificateType: cert.certs[0].certificateType,
                    authorityKeyId: cert.certs[0].authorityKeyId,
                    subject: cert.certs[0].subject
                }));
        },

        isSignedIn() {
            return this.$store.getters['loggedIn'];
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

    created() {
        this.$store.dispatch('zigbeealliance.distributedcomplianceledger.pki/QueryNocIcaCertificatesAll', {
            options: { subscribe: false, all: true }
        }).catch(error => console.error('Error fetching certificates:', error));
    }
};
</script>

<template>
    <div class="prime-vue-container">
        <div v-if="childCertificates.length > 0">
            <DataTable 
                v-model:expandedRows="expandedRows" 
                :value="childCertificates" 
                :auto-layout="true" 
                showGridlines 
                stripedRows
            >
                <Column :expander="true" headerStyle="width: 3rem" />
                <Column field="certificateType" header="Certificate Type" />
                <Column field="displaySubject" header="Subject" />
                <Column field="authorityKeyId" header="Authority Key ID" />
                <Column headerStyle="width: 4rem; text-align: center" bodyStyle="text-align: center; overflow: visible">
                    <template #body="{ data }">
                        <Button 
                            label="Revoke" 
                            class="p-button-danger" 
                            @click="showRevokeCertificateDialog(data)" 
                            iconPos="left" 
                            icon="pi pi-ban" 
                            :class="{ 'p-disabled': !isSignedIn }"
                        />
                        <Button 
                            label="Download" 
                            class="p-button-success mt-1" 
                            icon="pi pi-download" 
                            @click="downloadCertificateChain(data)"
                        />
                    </template>
                </Column>
                <template #expansion="slotProps">
                    <div>
                        <NocLeafCertificates 
                            :subject="slotProps.data.subject"
                            :subjectKeyId="slotProps.data.subjectKeyId"
                        />
                    </div>
                </template>
            </DataTable>

            <Dialog 
                header="Revoke X509 Certificate" 
                v-model:visible="showRevokeCert" 
                :style="{ width: '50vw' }" 
                class="p-fluid" 
                :modal="true"
            >
                <GrantActionRootCertificate 
                    action="RevokeX509Cert" 
                    :certificate="revokeCertificate" 
                    @close-dialog="dismissRevokeCertificateDialog"
                />
            </Dialog>
        </div>
        <div v-else>
            <h5>No Child Certificates present on ledger</h5>
        </div>
    </div>
</template>