<script>
import { defineComponent } from 'vue';
import Tag from 'primevue/tag';

export default defineComponent({
    name: 'CreatorInfo',

    components: {
        Tag
    },

    props: {
        address: {
            type: [String, Object],
            required: true
        }
    },

    methods: {
        formatVendorId(vendorId) {
            if (!vendorId) return 'Not Set';
            return `${vendorId} (0x${vendorId.toString(16)})`;
        },

        getRoleConfig(role) {
            const configs = {
                'Trustee': {
                    icon: 'pi pi-shield',
                    severity: 'secondary',
                    textColor: 'text-purple-700'
                },
                'Vendor': {
                    icon: 'pi pi-user',
                    severity: 'success',
                    textColor: 'text-green-700'
                },
                'VendorAdmin': {
                    icon: 'pi pi-user-plus',
                    severity: 'warning',
                    textColor: 'text-orange-700'
                },
                'NodeAdmin': {
                    icon: 'pi pi-server',
                    severity: 'primary',
                    textColor: 'text-blue-700'
                },
                'CertificationCenter': {
                    icon: 'pi pi-flag-fill',
                    severity: 'danger',
                    textColor: 'text-red-700'
                }
            };
            return configs[role] || { icon: 'pi pi-user', severity: 'info', textColor: 'text-gray-700' };
        }
    },

    computed: {
        actualAddress() {
            return typeof this.address === 'object' ? this.address.address : this.address;
        },
        
        signerInfo() {
            return typeof this.address === 'object' ? this.address.info : null;
        },

        creatorAccount() {
            const accounts = this.$store.getters['zigbeealliance.distributedcomplianceledger.dclauth/getAccountAll']()?.account || [];
            return accounts.find(acc => acc.base_account.address === this.actualAddress);
        },

        creatorName() {
            if (this.signerInfo) {
                return this.signerInfo;
            }

            if (!this.creatorAccount?.approvals?.length) return '';
            
            const csaProposal = this.creatorAccount.approvals.find(
                approval => approval.info.includes('CSA proposal for')
            );
            
            if (csaProposal) {
                return csaProposal.info.replace('CSA proposal for ', '').trim();
            }
            
            if (this.creatorAccount.approvals[0]?.info) {
                return this.creatorAccount.approvals[0].info;
            }
            
            return '';
        }
    },


});
</script>

<template>
    <div class="creator-info p-2">
        <div class="mb-2">
            <div v-if="creatorName" class="text-sm text-secondary font-medium">{{ creatorName }}</div>
            <div class="text-xs text-500 truncate">{{ actualAddress }}</div>
        </div>
        
        <div v-if="creatorAccount" class="mt-2">
            <div v-if="creatorAccount.roles?.length" class="mb-2">
                <div class="flex flex-wrap gap-1">
                    <Tag 
                        v-for="role in creatorAccount.roles" 
                        :key="role"
                        :value="role"
                        :severity="getRoleConfig(role).severity"
                        class="text-xs p-2"
                    >
                        <template #icon>
                            <i :class="[getRoleConfig(role).icon, 'mr-1']"></i>
                        </template>
                        {{ role }}
                    </Tag>
                </div>
            </div>
            
            <div v-if="creatorAccount.vendorID" class="text-xs mt-2 surface-100 p-2 border-round">
                <i class="pi pi-id-card mr-1"></i>
                <span class="text-600">Vendor ID:</span>
                <span class="ml-1 font-medium">{{ formatVendorId(creatorAccount.vendorID) }}</span>
            </div>
        </div>
    </div>
</template>

<style scoped>
.creator-info {
    background-color: var(--surface-0);
    border-radius: var(--border-radius);
}

.creator-info :deep(.p-tag) {
    display: inline-flex;
    align-items: center;
}

.creator-info :deep(.p-tag-icon) {
    margin-right: 0.25rem;
}

.creator-info :deep(.p-tag.p-tag-secondary) { background: var(--purple-100); color: var(--purple-900); }
.creator-info :deep(.p-tag.p-tag-success) { background: var(--green-100); color: var(--green-900); }
.creator-info :deep(.p-tag.p-tag-warning) { background: var(--orange-100); color: var(--orange-900); }
.creator-info :deep(.p-tag.p-tag-primary) { background: var(--blue-100); color: var(--blue-900); }
.creator-info :deep(.p-tag.p-tag-danger) { background: var(--red-100); color: var(--red-900); }
</style>