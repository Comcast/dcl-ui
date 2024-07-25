<template>
    <div class="layout-topbar">
        <button class="p-link layout-menu-button layout-topbar-button" @click="onMenuToggle">
            <i class="pi pi-bars"></i>
        </button>
        <router-link to="/" class="layout-topbar-logo">
            <img alt="Logo" src="/images/logo-transparent.png" />
            <span></span>
        </router-link>

        <button class="p-link layout-topbar-menu-button layout-topbar-button" v-styleclass="{ selector: '@next', enterClass: 'hidden', enterActiveClass: 'scalein', leaveToClass: 'hidden', leaveActiveClass: 'fadeout', hideOnOutsideClick: true }">
            <i class="pi pi-ellipsis-v"></i>
        </button>
        <ul class="layout-topbar-menu hidden lg:flex origin-top">
            <li>
                <AppWallet></AppWallet>
            </li>
            <li>
                <ThemeToggle />
            </li>
        </ul>
    </div>
</template>

<script>
import AppWallet from './AppWallet.vue';
import ThemeToggle from './ThemeToggle.vue';
export default {
    methods: {
        onMenuToggle(event) {
            this.$emit('menu-toggle', event);
        },
        onTopbarMenuToggle(event) {
            this.$emit('topbar-menu-toggle', event);
        }
    },
    computed: {
        darkTheme() {
            return this.$appState.darkTheme;
        }
    },
    components: {
        AppWallet: AppWallet,
        ThemeToggle: ThemeToggle
    }
};
</script>

<style scoped>
.layout-topbar .layout-topbar-logo img {
    height: 12rem;
    margin-right: 0.5rem;
}
</style>
