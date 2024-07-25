<template>
    <div class="theme-toggle" @click="toggleTheme" v-tooltip.bottom="tooltipText">
        <i :class="iconClass" style="font-size: 2rem"></i>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isDarkMode: false
        };
    },
    computed: {
        iconClass() {
            return this.isDarkMode ? 'pi pi-sun' : 'pi pi-moon';
        },
        tooltipText() {
            return this.isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode';
        }
    },
    mounted() {
        this.isDarkMode = localStorage.getItem('theme') === 'dark';
        this.applyTheme();
    },
    methods: {
        toggleTheme() {
            this.isDarkMode = !this.isDarkMode;
            localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
            this.applyTheme();
        },
        applyTheme() {
            const themeLink = document.getElementById('theme-link');
            if (this.isDarkMode) {
                themeLink.href = '/themes/lara-dark-blue/theme.css';
            } else {
                themeLink.href = '/themes/lara-light-blue/theme.css';
            }
        }
    }
};
</script>

<style scoped>
.theme-toggle {
    cursor: pointer;
    font-size: 2rem; /* Increased size for larger icon */
    color: var(--primary-color);
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    margin-left: 20px;
    margin-right: 20px;
}
</style>
