<template>
    <div class="navbar-content h-full">
        <div class="flex">
            <AirbankLogo />
        </div>
        <div class="flex navbar-language-select">
            <select v-model="selectedLanguage" @change="handleLanguageChange(selectedLanguage)">
                <option selected>{{ $t('navbar.selectLanguage') }}</option>
                <option v-for="locale in availableLocales" :key="locale.code" :value="locale.code">{{
                $t(`navbar.${locale.code}Language`) }}</option>
            </select>
        </div>
    </div>
</template>

<script>

import AirbankLogo from "~/static/icons/airbank.svg?inline";

export default {
    name: 'Navbar',
    components: {
        AirbankLogo,
    },
    data() {
        return {
            selectedLanguage: ""
        }
    },
    mounted() {
        this.selectedLanguage = this.$i18n.locale;
    },
    methods: {
        handleLanguageChange(event) {
            this.$router.replace(this.switchLocalePath(event));
        }
    },
    computed: {
        availableLocales() {
            return this.$i18n.locales
        }
    }
}
</script>

<style scoped>
.navbar-content {
    padding: 0 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.navbar-language-select {
    cursor: pointer;
}
</style>