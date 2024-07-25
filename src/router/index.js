import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '@/components/Dashboard.vue'
import Accounts from '@/views/Accounts/Accounts.vue'
import Vendors from '@/views/VendorInfo/Vendors.vue'
import Models from '@/views/Models/Models.vue'
import Compliance from '@/views/Compliance/Compliance.vue'
import PKI from '@/views/PKI/PKI.vue'
import Validators from '@/views/Validators/Validators.vue'
import Upgrades from '@/views/Upgrades/Upgrades.vue'
import LegacyWallet from '@/views/Tools/LegacyWallet.vue'
const routerHistory = createWebHistory()
const routes = [
    {
        path: '/',
        component: Dashboard
    },
    { path: '/accounts', component: Accounts },
    { path: '/vendors', component: Vendors },
    { path: '/models', component: Models },
    { path: '/compliance', component: Compliance },
    { path: '/pki', component: PKI },
    { path: '/validators', component: Validators },
    { path: '/upgrades', component: Upgrades },
    { path: "/legacy-wallet", component: LegacyWallet }
]

const router = createRouter({
    history: routerHistory,
    routes
})

export default router
