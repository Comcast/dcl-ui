<template>
    <div :class="containerClass" @click="onWrapperClick">
        <AppTopBar @menu-toggle="onMenuToggle" />
        <div class="layout-sidebar" @click="onSidebarClick">
            <AppMenu :model="menu" @menuitem-click="onMenuItemClick" />
        </div>
        <div class="layout-main-container">
            <div class="layout-main">
                <Toast />
                <router-view />
            </div>
        </div>
    </div>
</template>

<script>
import AppTopBar from './AppTopbar.vue';
import AppMenu from './AppMenu.vue';
import storeInitializer from '@/store/initializer';

export default {
    emits: ['change-theme'],
    data() {
        return {
            initialized: false,
            layoutMode: 'static',
            staticMenuInactive: false,
            overlayMenuActive: false,
            mobileMenuActive: false,
            apiNode: import.meta.env.DCL_API_NODE,
            menu: [
                {
                    label: 'Home',
                    items: [
                        {
                            label: 'Dashboard',
                            icon: 'pi pi-fw pi-home',
                            to: '/'
                        }
                    ]
                },
                {
                    label: 'DCL Transactions',
                    icon: 'pi pi-fw pi-sitemap',
                    items: [
                        { label: 'Accounts', icon: 'pi pi-fw pi-id-card', to: '/accounts' },
                        { label: 'Vendor Info', icon: 'pi pi-fw pi-briefcase', to: '/vendors' },
                        { label: 'Model', icon: 'pi pi-fw pi-database', to: '/models' },
                        { label: 'Compliance', icon: 'pi pi-fw pi-check-circle', to: '/compliance' },
                        { label: 'PKI', icon: 'pi pi-fw pi-lock', to: '/pki' },
                        { label: 'Validators', icon: 'pi pi-fw pi-server', to: '/validators' },
                        { label: 'Upgrades', icon: 'pi pi-fw pi-history', to: '/upgrades' },
                        { label: 'Legacy Wallet', icon: 'pi pi-fw pi-wallet', to: '/legacy-wallet' },
                        { label: 'Keplr Wallet - Guide', icon: 'pi pi-fw pi-book', to: '/keplr-wallet' }

                    ]
                }
            ]
        };
    },
    watch: {
        $route() {
            this.menuActive = false;
            this.$toast.removeAllGroups();
        }
    },
    methods: {
        onWrapperClick() {
            if (!this.menuClick) {
                this.overlayMenuActive = false;
                this.mobileMenuActive = false;
            }

            this.menuClick = false;
        },
        onMenuToggle() {
            this.menuClick = true;

            if (this.isDesktop()) {
                if (this.layoutMode === 'overlay') {
                    if (this.mobileMenuActive === true) {
                        this.overlayMenuActive = true;
                    }

                    this.overlayMenuActive = !this.overlayMenuActive;
                    this.mobileMenuActive = false;
                } else if (this.layoutMode === 'static') {
                    this.staticMenuInactive = !this.staticMenuInactive;
                }
            } else {
                this.mobileMenuActive = !this.mobileMenuActive;
            }

            event.preventDefault();
        },
        onSidebarClick() {
            this.menuClick = true;
        },
        onMenuItemClick(event) {
            if (event.item && !event.item.items) {
                this.overlayMenuActive = false;
                this.mobileMenuActive = false;
            }
        },
        onLayoutChange(layoutMode) {
            this.layoutMode = layoutMode;
        },
        addClass(element, className) {
            if (element.classList) element.classList.add(className);
            else element.className += ' ' + className;
        },
        removeClass(element, className) {
            if (element.classList) element.classList.remove(className);
            else element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        },
        isDesktop() {
            return window.innerWidth >= 992;
        },
        isSidebarVisible() {
            if (this.isDesktop()) {
                if (this.layoutMode === 'static') return !this.staticMenuInactive;
                else if (this.layoutMode === 'overlay') return this.overlayMenuActive;
            }

            return true;
        },
        changeTheme(event) {
            this.$emit('change-theme', event);
        }
    },
    computed: {
        hasWallet() {
            return this.$store.hasModule(['common', 'wallet']);
        },

        containerClass() {
            return [
                'layout-wrapper',
                {
                    'layout-overlay': this.layoutMode === 'overlay',
                    'layout-static': this.layoutMode === 'static',
                    'layout-static-inactive': this.staticMenuInactive && this.layoutMode === 'static',
                    'layout-overlay-sidebar-active': this.overlayMenuActive && this.layoutMode === 'overlay',
                    'layout-mobile-sidebar-active': this.mobileMenuActive,
                    'p-input-filled': this.$primevue.config.inputStyle === 'filled',
                    'p-ripple-disabled': this.$primevue.config.ripple === false
                }
            ];
        },
        logo() {
            return this.$appState.darkTheme ? 'images/logo-white.svg' : 'images/logo.svg';
        }
    },
    beforeUpdate() {
        if (this.mobileMenuActive) this.addClass(document.body, 'body-overflow-hidden');
        else this.removeClass(document.body, 'body-overflow-hidden');
    },
    components: {
        AppTopBar: AppTopBar,
        AppMenu: AppMenu
    },

    async created() {
        console.log('App created');
        console.log('Initializing DCL UI with values as below:');
        console.log('API Node:', import.meta.env.VITE_APP_DCL_API_NODE);
        console.log('RPC Node:', import.meta.env.VITE_APP_DCL_RPC_NODE);
        console.log('WebSocket Node:', import.meta.env.VITE_APP_DCL_WEBSOCKET_NODE);
        console.log('Chain ID:', import.meta.env.VITE_APP_DCL_CHAIN_ID);
        console.log('Address Prefix:', import.meta.env.VITE_APP_DCL_ADDR_PREFIX);
        console.log('SDK Version:', import.meta.env.VITE_APP_DCL_SDK_VERSION);
        console.log('TX API:', import.meta.env.VITE_APP_DCL_TX_API);
        console.log('Refresh:', import.meta.env.VITE_APP_DCL_REFRESH);
        await this.$store.dispatch('common/env/init', {
            apiNode: import.meta.env.VITE_APP_DCL_API_NODE,
            rpcNode: import.meta.env.VITE_APP_DCL_RPC_NODE,
            wsNode: import.meta.env.VITE_APP_DCL_WEBSOCKET_NODE,
            chainId: import.meta.env.VITE_APP_DCL_CHAIN_ID,
            addrPrefix: import.meta.env.VITE_APP_DCL_ADDR_PREFIX,
            sdkVersion: import.meta.env.VITE_APP_DCL_SDK_VERSION,
            getTXApi: import.meta.env.VITE_APP_DCL_TX_API,
            refresh: import.meta.env.VITE_APP_DCL_REFRESH
        });

        // Then initialize all stores once
        await storeInitializer.initializeAllStores(this.$store);
        this.initialized = true;
    }
};
</script>

<style lang="scss">
.p-toast.p-toast--right {
    z-index: 1000;
    top: 7rem;
}
.sp-key-area {
    -webkit-text-security: circle;
}
.required {
    color: #e24c4c;
}
/* Apply the disabled styles to the read-only fields */
input:read-only {
    background-color: #f9f9f9;
    cursor: not-allowed;
    color: #777;
}
</style>

