<template>
    <div class="approval-display">
        <!-- Approvals List -->
        <div v-if="approvals && approvals.length > 0" class="approval-list">
            <div v-for="(approval, index) in approvals" :key="'approve-' + index"
                 class="approval-card approve">
                <div class="approval-card-header">
                    <div class="address-info">
                        <i class="pi pi-user text-green-500"></i>
                        <span class="address">{{ trimAddress(approval.address) }}</span>
                        <button
                            @click="copyToClipboard(approval.address)"
                            class="p-button p-component p-button-icon-only p-button-text p-button-xs copy-btn"
                            type="button"
                            v-tooltip.top="'Copy address'"
                        >
                            <span class="p-button-icon pi pi-copy"></span>
                            <span class="p-button-label">&nbsp;</span>
                        </button>
                    </div>
                    <div class="timestamp">
                        <i class="pi pi-calendar text-xs"></i>
                        <span style="white-space: pre-line;">{{ formatDate(approval.time) }}</span>
                    </div>
                </div>
                <div v-if="approval.info" class="approval-info">
                    {{ approval.info }}
                </div>
            </div>
        </div>

        <!-- Rejections List (if provided) -->
        <div v-if="rejects && rejects.length > 0" class="approval-list mt-2">
            <div v-for="(reject, index) in rejects" :key="'reject-' + index"
                 class="approval-card reject">
                <div class="approval-card-header">
                    <div class="address-info">
                        <i class="pi pi-user text-red-500"></i>
                        <span class="address">{{ trimAddress(reject.address) }}</span>
                        <button
                            @click="copyToClipboard(reject.address)"
                            class="p-button p-component p-button-icon-only p-button-text p-button-xs copy-btn"
                            type="button"
                            v-tooltip.top="'Copy address'"
                        >
                            <span class="p-button-icon pi pi-copy"></span>
                            <span class="p-button-label">&nbsp;</span>
                        </button>
                    </div>
                    <div class="timestamp">
                        <i class="pi pi-calendar text-xs"></i>
                        <span style="white-space: pre-line;">{{ formatDate(reject.time) }}</span>
                    </div>
                </div>
                <div v-if="reject.info" class="approval-info">
                    {{ reject.info }}
                </div>
            </div>
        </div>

        <!-- Empty State -->
        <div v-if="(!approvals || approvals.length === 0) && (!rejects || rejects.length === 0)"
             class="empty-state">
            <span class="text-500">No approvals</span>
        </div>
    </div>
</template>

<script>
import Tooltip from 'primevue/tooltip';

export default {
    name: 'ApprovalDisplay',
    directives: {
        tooltip: Tooltip
    },
    props: {
        approvals: {
            type: Array,
            default: () => []
        },
        rejects: {
            type: Array,
            default: () => []
        }
    },
    methods: {
        trimAddress(address) {
            if (address && address.length > 16) {
                return address.substring(0, 10) + '...' + address.substring(address.length - 4);
            }
            return address;
        },
        formatDate(timestamp) {
            const date = new Date(timestamp * 1000);
            const month = date.toLocaleDateString('en-US', { month: 'short' });
            const day = date.getDate();
            const year = date.getFullYear();

            // Add ordinal suffix
            const suffix = ['th', 'st', 'nd', 'rd'];
            const v = day % 100;
            const ordinal = suffix[(v - 20) % 10] || suffix[v] || suffix[0];

            // Get time and timezone
            const time = date.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            });
            const timezone = date.toLocaleTimeString('en-US', {
                timeZoneName: 'short'
            }).split(' ').pop();

            return `${day}${ordinal} ${month}, ${year}\n${time} ${timezone}`;
        },
        copyToClipboard(value) {
            navigator.clipboard.writeText(value);
        }
    }
};
</script>

<style scoped>
.approval-display {
    width: 100%;
    max-width: 400px;
}

.approval-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.approval-card {
    padding: 0.75rem;
    border-radius: 6px;
    background: var(--surface-50);
}

.approval-card.approve {
    background: linear-gradient(to right, rgba(34, 197, 94, 0.05), transparent);
}

.approval-card.reject {
    background: linear-gradient(to right, rgba(239, 68, 68, 0.05), transparent);
}

.approval-card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 0.5rem;
}

.address-info {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.address {
    font-family: monospace;
    font-size: 0.875rem;
    font-weight: 500;
}

.copy-btn {
    padding: 0 !important;
    width: 1.25rem;
    height: 1.25rem;
    opacity: 0.7;
}

.copy-btn:hover {
    opacity: 1;
}

.timestamp {
    font-size: 0.75rem;
    color: var(--text-color-secondary);
    display: flex;
    align-items: center;
    gap: 0.25rem;
}

.approval-info {
    font-size: 0.813rem;
    color: var(--text-color-secondary);
    padding-left: 1.75rem;
    line-height: 1.4;
}

.empty-state {
    text-align: center;
    padding: 1rem;
    color: var(--text-color-secondary);
}

.text-500 {
    color: var(--text-color-secondary);
}

.mt-2 {
    margin-top: 0.5rem;
}

/* Text utilities */
.text-xs {
    font-size: 0.75rem;
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .approval-display {
        max-width: 100%;
    }

    .approval-card-header {
        flex-direction: column;
        gap: 0.5rem;
    }
}
</style>