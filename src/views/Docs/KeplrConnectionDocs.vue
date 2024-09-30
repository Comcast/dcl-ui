<template>
  <div class="keplr-docs">
    <Card>
      <template #title>
        Connecting and Using Keplr Wallet with DCL WebApp
      </template>
      <template #content>

        <h3>Initial Connection Process</h3>
        
        <Timeline :value="connectionSteps" align="alternate" class="p-mb-5">
          <template #content="slotProps">
            <Card>
              <template #title>
                {{ slotProps.item.title }}
              </template>
              <template #content>
                <p>{{ slotProps.item.description }}</p>
              </template>
            </Card>
          </template>
        </Timeline>

        <Divider />

        <h2>Account Management in Keplr</h2>
        <Card>
          <template #content>
            <h3>Creating a New Account</h3>
            <ol>
              <li>Open the Keplr extension in your browser.</li>
              <li>Click on the account name at the top to open the account menu.</li>
              <li>Select "Add Account" and follow the prompts to create a new account.</li>
            </ol>

            <h3>Selecting Different Accounts</h3>
            <ol>
              <li>Open the Keplr extension.</li>
              <li>Click on the account name to see all your accounts.</li>
              <li>Select the account you want to use.</li>
              <li>Important: After switching accounts in Keplr, you must disconnect and reconnect from the DCL WebApp for the changes to take effect.</li>
            </ol>

            <h3>Migrating from Legacy Wallet</h3>
            <ol>
              <li>Go to the Legacy Wallet page in the DCL WebApp.</li>
              <li>Extract your mnemonic phrase (seed words) from the Legacy Wallet.</li>
              <li>In Keplr, create a new account using the "Import existing account" option.</li>
              <li>Enter your mnemonic phrase to recreate your Legacy Wallet account in Keplr.</li>
            </ol>
          </template>
        </Card>

        <Divider />

        <h2>Transaction Signing Process</h2>
        <Card>
          <template #content>
            <p>Once your Keplr wallet is connected to the DCL WebApp, here's how transactions work:</p>
            <ol>
              <li>Initiate a transaction in the DCL WebApp.</li>
              <li>A Keplr window will automatically open, displaying the transaction details.</li>
              <li>Review the transaction information carefully in the Keplr window.</li>
              <li>If everything looks correct, approve and sign the transaction in Keplr.</li>
              <li>Once submitted, close the Keplr window.</li>
              <li>A success message will appear in the DCL WebApp confirming the transaction.</li>
            </ol>
          </template>
        </Card>

        <Divider />

        <h2>Known Issues</h2>
        <Card>
          <template #content>
            <h3>Hardware Wallet Signing Limitation</h3>
            <p>Currently, there is a known issue with hardware wallet signing (e.g., Ledger Nano) when using Protobuf-based SIGN_MODE_DIRECT for transaction encoding:</p>
            <ul>
              <li>The DCL WebApp uses Protobuf-based SIGN_MODE_DIRECT for efficient transaction encoding, as introduced in ADR-020.</li>
              <li>However, Ledger hardware wallets still use SIGN_MODE_LEGACY_AMINO_JSON for displaying transaction details to users.</li>
              <li>As a result, hardware signing with Ledger Nano devices is not currently supported in our application.</li>
            </ul>
            <h4>Reasons for This Limitation</h4>
            <p>Hardware wallets cannot transition to SIGN_MODE_DIRECT because:</p>
            <ul>
              <li>SIGN_MODE_DIRECT is binary-based and not suitable for display to end-users. Displaying raw binary data would be considered blind signing, which is a security concern.</li>
              <li>Hardware devices cannot decode the Protobuf sign bytes due to memory constraints, as the Protobuf definitions would need to be embedded on the device.</li>
            </ul>
            <h4>Future Developments</h4>
            <p>The Cosmos ecosystem is actively working on a solution to this issue:</p>
            <ul>
              <li>A new sign mode, tentatively called SIGN_MODE_TEXTUAL, is being developed for hardware devices.</li>
              <li>This new mode will be text-based, allowing for easy display and verification on hardware wallet screens.</li>
              <li>It aims to replace SIGN_MODE_LEGACY_AMINO_JSON while maintaining compatibility with Protobuf-based transactions.</li>
            </ul>
            <p>For detailed information on this development, please refer to:</p>
            <p><a href="https://docs.cosmos.network/v0.50/build/architecture/adr-050-sign-mode-textual" target="_blank" rel="noopener noreferrer">Cosmos SDK ADR-050: SIGN_MODE_TEXTUAL</a></p>
            <p>We recommend using the Keplr browser extension for signing transactions until hardware wallet support is fully implemented with the new sign mode.</p>
          </template>
        </Card>
        
        <Divider />

        <h2>Troubleshooting</h2>
        <Accordion :activeIndex="0">
          <AccordionTab v-for="(item, index) in troubleshootingItems" :key="index" :header="item.question">
            <p>{{ item.answer }}</p>
          </AccordionTab>
        </Accordion>

        <Divider />

        <h2>Additional Resources</h2>
        <ul>
          <li v-for="(resource, index) in additionalResources" :key="index">
            <a :href="resource.link" target="_blank" rel="noopener noreferrer">{{ resource.title }}</a>
          </li>
        </ul>
      </template>
    </Card>
  </div>
</template>

<script>
import Card from 'primevue/card';
import Timeline from 'primevue/timeline';
import Divider from 'primevue/divider';
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';

export default {
  name: 'KeplrConnectionDocs',
  components: {
    Card,
    Timeline,
    Divider,
    Accordion,
    AccordionTab
  },
  data() {
    return {
      connectionSteps: [
        {
          title: 'Install Keplr Wallet',
          description: 'If you haven\'t already, install the Keplr wallet extension for your browser. Keplr extension is available for Chrome, Firefox, and Edge browsers. Please refer to the official Keplr documentation for installation instructions.',
        },
        {
          title: 'Click "Connect Keplr"',
          description: 'Look for and click the "Connect Keplr" button on DCL WebApp.',
        },
        {
          title: 'Keplr Popup Appears',
          description: 'A Keplr popup will appear. It will attempt to suggest the DCL chain since it\'s not a standard chain recognized by Keplr.',
        },
        {
          title: 'Review Chain Suggestion',
          description: 'You will see a message stating "This chain\'s info is not available on Keplr Chain Registry." This is normal for custom chains like DCL. You can safely ignore the "Click here to update chain info on Github" link.',
        },
        {
          title: 'Approve Chain Suggestion',
          description: 'After reviewing the DCL chain details, click "Approve" to add the DCL chain to your Keplr wallet. Don\'t worry about the warning message; this is expected for custom chains.',
        },
        {
          title: 'Approve Connection',
          description: 'After approving the chain suggestion, you\'ll be prompted to approve the connection between DCL WebApp and your Keplr wallet. Review the connection details and approve it.',
        },
        {
          title: 'Connection Complete',
          description: 'Once approved, you\'ll see your wallet address displayed in the DCL WebApp, indicating a successful connection.',
        }
      ],
      troubleshootingItems: [
        {
          question: 'Keplr extension not found',
          answer: 'Ensure that you have installed the Keplr wallet extension and that it\'s enabled in your browser.'
        },
        {
          question: 'Chain suggestion fails',
          answer: 'If chain suggestion fails, try refreshing the page and attempting the connection again.'
        },
        {
          question: 'Connection rejected',
          answer: 'If you accidentally reject the connection request, simply click the "Connect Keplr" button again to restart the process.'
        },
        {
          question: 'Wallet shows as connected, but DCL WebApp doesn\'t recognize it',
          answer: 'Try disconnecting your wallet from the DCL WebApp, refreshing the page, and connecting again.'
        },
        {
          question: 'Changed account in Keplr but DCL WebApp shows old account',
          answer: 'After switching accounts in Keplr, you need to disconnect and reconnect from the DCL WebApp for the changes to take effect.'
        },
        {
          question: 'Transaction window doesn\'t appear',
          answer: 'Ensure pop-ups are allowed for the DCL WebApp in your browser settings. If the issue persists, try refreshing the page or reconnecting your wallet.'
        }
      ],
      additionalResources: [
        {
          title: 'Keplr Wallet Official Documentation',
          link: 'https://docs.keplr.app/'
        },
        {
          title: 'Cosmos SDK Documentation',
          link: 'https://docs.cosmos.network/'
        }
      ]
    }
  }
}
</script>

<style scoped>
.keplr-docs {
  max-width: 800px;
  margin: 0 auto;
}

.p-card {
  margin-bottom: 2rem;
}

.p-timeline-event-content,
.p-timeline-event-opposite {
  line-height: 1.5;
}
</style>