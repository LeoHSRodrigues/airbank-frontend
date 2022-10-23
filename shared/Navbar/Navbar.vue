<template>
    <div class="navbar-content h-full">
        <div class="flex">
            <AirbankLogo @click="handleLogoClick" />
        </div>
        <div class="flex navbar-language-select">
            <FormSelect :options="availableLocales" @change="handleLanguageChange" :selected="selectedLanguage" />
        </div>
    </div>
</template>

<script>
import AirbankLogo from "~/static/icons/airbank.svg?inline";

export default {
    name: 'Navbar',
    components: {
        AirbankLogo
    },
    data() {
        return {
            selectedLanguage: ""
        }
    },
    beforeMount() {
        this.selectedLanguage = this.$i18n.locale;
    },
    methods: {
        handleLanguageChange(event) {
            this.selectedLanguage = event;
            this.$router.replace(this.switchLocalePath(event));
        },
        handleLogoClick() {
            this.$router.push(this.localePath({ name: 'index' }));
        }
    },
    computed: {
        availableLocales() {
            return this.$i18n.locales.map(locale => {
                return {
                    name: this.$i18n.t(`navbar.${locale.code}Language`),
                    value: locale.code
                }
            })
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

.navbar-content svg{
    cursor: pointer;
}

.navbar-language-select {
    cursor: pointer;
}
</style>