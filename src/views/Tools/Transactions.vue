<script>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import InputText from 'primevue/inputtext'
import Tag from 'primevue/tag'
import Message from 'primevue/message'
import CreatorInfo from './CreatorInfo.vue'

export default {
  name: 'TransactionViewer',
  
  components: {
    DataTable,
    Column,
    InputText,
    Tag,
    Message,
    CreatorInfo
  },

  setup() {
    const route = useRoute()
    const transactions = ref([])
    const loading = ref(true)
    const error = ref(null)
    const expandedRows = ref([])
    const searchHeight = ref('')
    const latestBlockHeight = ref(0)
    const latestTxBlockHeight = ref(0)
    const upgradeInfo = ref([])
    const hasMore = ref(true)
    const isLoadingMore = ref(false)
    const tableRef = ref(null)
    const searchText = ref('')
    const pageSize = 20
    const restEndpoint = import.meta.env.VITE_APP_DCL_API_NODE || 'http://localhost:8080/api'

    const filteredTransactions = computed(() => {
      if (!searchText.value) return transactions.value
      
      const search = searchText.value.toLowerCase()
      return transactions.value.filter(tx => {
        // Convert relevant transaction data to searchable string
        const searchableContent = [
          tx.height.toString(),
          tx.appVersion.toLowerCase(),
          tx.txhash.toLowerCase(),
          typeof tx.creator === 'string' ? tx.creator.toLowerCase() : tx.creator.address.toLowerCase(),
          getTransactionTypes(tx.messages).toLowerCase(),
          tx.raw_log.toLowerCase()
        ].join(' ')
        
        return searchableContent.includes(search)
      })
    })

    const fetchTransactionBlockHeights = async (endHeight, limit = pageSize) => {
      try {
        const response = await fetch(
          `${restEndpoint}/cosmos/tx/v1beta1/txs?events=tx.height<=${endHeight}&order_by=2&limit=${limit}`
        )
        if (!response.ok) throw new Error('Failed to fetch transaction blocks')
        const data = await response.json()
        return data.tx_responses.map(tx => parseInt(tx.height))
      } catch (err) {
        console.error('Error fetching transaction block heights:', err)
        return []
      }
    }

    const fetchLatestBlockHeight = async () => {
      try {
        const response = await fetch(
          `${restEndpoint}/cosmos/base/tendermint/v1beta1/blocks/latest`
        )
        if (!response.ok) throw new Error('Failed to fetch latest block')
        const data = await response.json()
        latestBlockHeight.value = parseInt(data.block.header.height)
        return latestBlockHeight.value
      } catch (err) {
        error.value = `Error: ${err.message}`
        return null
      }
    }

    const fetchLatestTxBlockHeight = async () => {
      try {
        const response = await fetch(
          `${restEndpoint}/cosmos/tx/v1beta1/txs?events=tx.height<=${latestBlockHeight.value}&order_by=2&limit=1`
        )
        if (!response.ok) throw new Error('Failed to fetch latest transaction block')
        const data = await response.json()
        if (data.tx_responses && data.tx_responses.length > 0) {
          latestTxBlockHeight.value = parseInt(data.tx_responses[0].height)
        }
        return latestTxBlockHeight.value
      } catch (err) {
        error.value = `Error: ${err.message}`
        return null
      }
    }

    const loadMoreTransactions = async () => {
      if (isLoadingMore.value || !hasMore.value) return

      try {
        isLoadingMore.value = true
        const lastTx = transactions.value[transactions.value.length - 1]
        const lastHeight = lastTx ? parseInt(lastTx.height) - 1 : latestTxBlockHeight.value

        const response = await fetch(
          `${restEndpoint}/cosmos/tx/v1beta1/txs?events=tx.height<=${lastHeight}&order_by=2&limit=${pageSize}`
        )
        if (!response.ok) throw new Error('Failed to fetch transactions')
        
        const data = await response.json()
        if (!data.tx_responses || data.tx_responses.length === 0) {
          hasMore.value = false
          return
        }

        const newTransactions = data.tx_responses.map(tx => ({
          height: tx.height,
          time: tx.timestamp,
          txhash: tx.txhash,
          code: tx.code,
          raw_log: tx.raw_log,
          gasUsed: tx.gas_used,
          gasWanted: tx.gas_wanted,
          messages: tx.tx.body.messages,
          creator: (() => {
            const firstMsg = tx.tx.body.messages[0];
            if (firstMsg?.creator) {
              return firstMsg.creator;
            }
            if (firstMsg?.signer) {
              return {
                address: firstMsg.signer,
                info: firstMsg.info
              };
            }
            return 'Unknown';
          })(),
          appVersion: getAppVersion(parseInt(tx.height))
        }))

        transactions.value = [...transactions.value, ...newTransactions]
        hasMore.value = newTransactions.length === pageSize

      } catch (err) {
        console.error('Error loading more transactions:', err)
        error.value = `Error: ${err.message}`
      } finally {
        isLoadingMore.value = false
      }
    }

    const handleScroll = async (event) => {
      // Check if we're near the bottom of the page
      const bottomOfWindow = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 100
      
      if (bottomOfWindow) {
        await loadMoreTransactions()
      }
    }

    const searchSpecificHeight = async () => {
      const height = parseInt(searchHeight.value)
      if (!isNaN(height) && height > 0 && height <= latestBlockHeight.value) {
        try {
          loading.value = true
          error.value = null
          transactions.value = []
          
          const response = await fetch(
            `${restEndpoint}/cosmos/tx/v1beta1/txs?events=tx.height<=${height}&order_by=2&limit=${pageSize}`
          )
          if (!response.ok) throw new Error('Failed to fetch transactions')
          const data = await response.json()

          if (!data.tx_responses || data.tx_responses.length === 0) {
            error.value = 'No transactions found at or before this height'
            return
          }

          transactions.value = data.tx_responses.map(tx => ({
            height: tx.height,
            time: tx.timestamp,
            txhash: tx.txhash,
            code: tx.code,
            raw_log: tx.raw_log,
            gasUsed: tx.gas_used,
            gasWanted: tx.gas_wanted,
            messages: tx.tx.body.messages,
            creator: (() => {
              const firstMsg = tx.tx.body.messages[0];
              if (firstMsg?.creator) {
                return firstMsg.creator;
              }
              if (firstMsg?.signer) {
                return {
                  address: firstMsg.signer,
                  info: firstMsg.info
                };
              }
              return 'Unknown';
            })(),
            appVersion: getAppVersion(parseInt(tx.height))
          }))

          hasMore.value = data.tx_responses.length === pageSize

        } catch (err) {
          console.error('Error searching transactions:', err)
          error.value = `Error: ${err.message}`
        } finally {
          loading.value = false
        }
      }
    }

    const formatTime = (timestamp) => {
      return new Date(timestamp).toLocaleString()
    }

    const formatTimeAgo = (timestamp) => {
      const now = new Date()
      const time = new Date(timestamp)
      const diff = Math.floor((now - time) / 1000)
      
      const formattedDate = time.toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: '2-digit'
      })
      
      const formattedTime = time.toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })

      let relativeTime
      if (diff < 60) {
        relativeTime = `${diff}s ago`
      } else if (diff < 3600) {
        relativeTime = `${Math.floor(diff / 60)}m ago`
      } else if (diff < 86400) {
        relativeTime = `${Math.floor(diff / 3600)}h ago`
      } else {
        relativeTime = `${Math.floor(diff / 86400)}d ago`
      }

      return `${relativeTime} (${formattedDate} ${formattedTime})`
    }

    const truncateHash = (hash) => {
      if (!hash) return ''
      return `${hash.slice(0, 8)}...${hash.slice(-8)}`
    }

    const getTransactionTypes = (messages) => {
      if (!messages?.length) return ''
      return messages
        .map(msg => getSimpleMessageType(msg['@type']))
        .join(', ')
    }

    const getSimpleMessageType = (type) => {
      return type.split('.').pop()
    }

    const getStatusText = (code) => {
      return code === 0 ? 'Success' : `Failed (${code})`
    }

    const formatKey = (key) => {
      return key
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, str => str.toUpperCase())
        .trim()
    }

    const getMessageContent = (msg) => {
      const content = {}
      for (const [key, value] of Object.entries(msg)) {
        if (
          key !== '@type' && 
          value !== '' && 
          value !== null &&
          !Array.isArray(value) && 
          typeof value !== 'object'
        ) {
          content[key] = value
        }
      }
      return content
    }

    const formatNumber = (number) => {
      return new Intl.NumberFormat('en-US').format(number)
    }

    const fetchUpgradeInfo = async () => {
      try {
        const response = await fetch(`${restEndpoint}/dcl/dclupgrade/approved-upgrades`)
        if (!response.ok) throw new Error('Failed to fetch upgrade info')
        const data = await response.json()
        upgradeInfo.value = data.approvedUpgrade.sort((a, b) => 
          parseInt(b.plan.height) - parseInt(a.plan.height)
        )
      } catch (err) {
        console.error('Error fetching upgrade info:', err)
      }
    }

    const getAppVersion = (blockHeight) => {
      const upgrade = upgradeInfo.value.find(u => 
        parseInt(u.plan.height) <= blockHeight
      )
      return upgrade ? upgrade.plan.name : 'unknown'
    }

    // Initialize
    const initialize = async () => {
      try {
        loading.value = true
        await fetchUpgradeInfo()
        const height = await fetchLatestBlockHeight()
        if (height) {
          await fetchLatestTxBlockHeight()
          
          // Instead of using searchSpecificHeight, directly fetch initial transactions
          const response = await fetch(
            `${restEndpoint}/cosmos/tx/v1beta1/txs?events=tx.height<=${latestTxBlockHeight.value}&order_by=2&limit=${pageSize}`
          )
          if (!response.ok) throw new Error('Failed to fetch transactions')
          const data = await response.json()

          if (data.tx_responses && data.tx_responses.length > 0) {
            transactions.value = data.tx_responses.map(tx => ({
              height: tx.height,
              time: tx.timestamp,
              txhash: tx.txhash,
              code: tx.code,
              raw_log: tx.raw_log,
              gasUsed: tx.gas_used,
              gasWanted: tx.gas_wanted,
              messages: tx.tx.body.messages,
              creator: (() => {
                const firstMsg = tx.tx.body.messages[0];
                if (firstMsg?.creator) {
                  return firstMsg.creator;
                }
                if (firstMsg?.signer) {
                  return {
                    address: firstMsg.signer,
                    info: firstMsg.info
                  };
                }
                return 'Unknown';
              })(),
              appVersion: getAppVersion(parseInt(tx.height))
            }))
            hasMore.value = data.tx_responses.length === pageSize
          }
        }
        // Add scroll listener to window instead of table
        window.addEventListener('scroll', handleScroll)
      } catch (err) {
        console.error('Error initializing:', err)
        error.value = `Error: ${err.message}`
      } finally {
        loading.value = false
      }
    }

    onMounted(() => {
      initialize()
      // Move the scroll listener setup to a nextTick to ensure the table is rendered
      nextTick(() => {
        if (tableRef.value) {
          const scrollContainer = tableRef.value.$el.querySelector('.p-datatable-wrapper')
          if (scrollContainer) {
            scrollContainer.addEventListener('scroll', handleScroll)
          }
        }
      })
    })

    onUnmounted(() => {
      // Remove scroll listener from window
      window.removeEventListener('scroll', handleScroll)
    })

    return {
      transactions,
      loading,
      error,
      expandedRows,
      searchHeight,
      latestBlockHeight,
      latestTxBlockHeight,
      hasMore,
      isLoadingMore,
      tableRef,
      searchSpecificHeight,
      formatTime,
      formatTimeAgo,
      truncateHash,
      getTransactionTypes,
      getSimpleMessageType,
      getStatusText,
      formatKey,
      getMessageContent,
      formatNumber,
      searchText,
      filteredTransactions
    }
  }
}
</script>

<template>
  <div class="prime-vue-container card">
    <!-- Responsive Header -->
<!-- Replace the existing header with this -->
    <div class="flex flex-column gap-4 mb-4">
      <!-- Title Section -->
      <div class="surface-section p-4 border-round">
        <div class="flex flex-column md:flex-row align-items-start justify-content-between">
          <!-- Left side with title and stats -->
          <div class="flex flex-column gap-2">
            <h2 class="text-2xl font-bold m-0 text-900">Recent Transaction Blocks</h2>
            <div class="flex align-items-center gap-2">
              <span class="inline-flex align-items-center gap-2 bg-primary-50 text-primary-900 px-3 py-1 border-round">
                <i class="pi pi-box text-sm"></i>
                <span class="font-medium">Latest Tx Block: #{{ formatNumber(latestTxBlockHeight) }}</span>
              </span>
              <span class="inline-flex align-items-center gap-2 bg-blue-50 text-blue-900 px-3 py-1 border-round">
                <i class="pi pi-database text-sm"></i>
                <span class="font-medium">Latest Block: #{{ formatNumber(latestBlockHeight) }}</span>
              </span>
            </div>
          </div>
          
          <!-- Right side with search controls -->
          <div class="flex flex-column sm:flex-row gap-5 mt-3 md:mt-0">
            <!-- Global filter -->
            <span class="p-input-icon-left">
              <InputText
                v-model="searchText"
                placeholder="Search in table..."
                class="p-inputtext-sm"
                style="width: 200px"
              />
            </span>
            
            
            <!-- Height search -->
            <div class="p-inputgroup">
              <InputText 
                v-model="searchHeight" 
                placeholder="Go to Height" 
                class="p-inputtext-sm"
                style="width: 200px"
                type="number"
                @keyup.enter="searchSpecificHeight"
              />
              <Button 
                icon="pi pi-search"
                class="p-button-primary p-button-sm"
                @click="searchSpecificHeight"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <DataTable 
      ref="tableRef"
      :value="filteredTransactions"
      :loading="loading"
      stripedRows
      showGridlines
      class="mt-3"
      v-model:expandedRows="expandedRows"
      dataKey="txhash"
      :rowHover="true"
      responsiveLayout="stack"
      breakpoint="960px"
    >
      <template #empty>
        <div class="text-center p-4">No transactions found</div>
      </template>
      <template #loading>
        <div class="text-center p-4">
          <i class="pi pi-spin pi-spinner" style="font-size: 2rem"></i>
          <div class="mt-2">Loading transactions...</div>
        </div>
      </template>

      <Column expander style="width: 3rem" />
      
      <Column field="height" header="Height" :sortable="true">
        <template #body="slotProps">
          <div class="flex flex-column">
            <div class="font-medium"># {{ formatNumber(slotProps.data.height) }}</div>
            <div class="text-500 text-sm">{{ formatTimeAgo(slotProps.data.time) }}</div>
          </div>
        </template>
      </Column>
      
      <Column field="appVersion" header="Version" :sortable="true">
        <template #body="slotProps">
          <div class="text-sm">{{ slotProps.data.appVersion }}</div>
        </template>
      </Column>
      
      <Column field="messages" header="Type">
        <template #body="slotProps">
          <div class="flex flex-column gap-1">
            <div class="text-primary font-medium">{{ getTransactionTypes(slotProps.data.messages) }}</div>
            <div class="text-500 text-sm break-all">{{ truncateHash(slotProps.data.txhash) }}</div>
          </div>
        </template>
      </Column>
      
      <Column field="creator" header="Creator">
        <template #body="slotProps">
          <CreatorInfo :address="slotProps.data.creator" />
        </template>
      </Column>

      <template #expansion="slotProps">
        <div class="p-2 sm:p-3">
          <div class="card mb-3">
            <div class="surface-50 border-round p-2 sm:p-3">
              <!-- Transaction Header -->
              <div class="flex flex-column sm:flex-row align-items-start sm:align-items-center justify-content-between gap-2 mb-3">
                <Tag :severity="slotProps.data.code === 0 ? 'success' : 'danger'" 
                     :value="getStatusText(slotProps.data.code)" />
                <span class="text-500 text-sm break-all">{{ slotProps.data.txhash }}</span>
              </div>

              <Message v-if="slotProps.data.code !== 0" 
                      severity="error" 
                      :closable="false" 
                      class="mb-3">
                {{ slotProps.data.raw_log }}
              </Message>

              <!-- Transaction Messages -->
              <div v-for="(msg, idx) in slotProps.data.messages" 
                   :key="idx"
                   class="p-2 sm:p-3 surface-ground border-round mb-3">
                <div class="text-lg font-medium mb-2">{{ getSimpleMessageType(msg['@type']) }}</div>
                <div class="grid">
                  <template v-for="(value, key) in getMessageContent(msg)" :key="key">
                    <div class="col-12 sm:col-6 lg:col-4 mb-2">
                      <div class="text-500 text-sm">{{ formatKey(key) }}</div>
                      <div class="text-900 break-all">{{ value }}</div>
                    </div>
                  </template>
                </div>
              </div>

              <!-- Transaction Footer -->
              <div class="flex flex-column sm:flex-row justify-content-between align-items-start sm:align-items-center text-500 text-sm border-top-1 surface-border pt-3 gap-2">
                <span>{{ formatTime(slotProps.data.time) }}</span>
                <div class="flex flex-column sm:flex-row gap-2 sm:gap-3">
                  <span>Gas Used: {{ formatNumber(slotProps.data.gasUsed) }}</span>
                  <!-- <span>Gas Wanted: {{ formatNumber(slotProps.data.gasWanted) }}</span> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>

      <!-- Loading indicator at the bottom -->
      <template #footer>
        <div v-if="isLoadingMore" class="text-center p-3">
          <i class="pi pi-spin pi-spinner mr-2"></i>
          Loading more transactions...
        </div>
        <div v-else-if="!hasMore" class="text-center p-3 text-500">
          No more transactions to load
        </div>
      </template>
    </DataTable>    
  </div>
</template>