<template>
    <div class="navbar-content h-full">
        <div class="flex">
            <AirbankLogo />
        </div>
        <div class="flex navbar-language-select">
            <Select :options="availableLocales" @change="handleLanguageChange" :selected="selectedLanguage" />
        </div>
    </div>
</template>

<script>
import AirbankLogo from "~/static/icons/airbank.svg?inline";
import Select from "~/components/Form/Select.vue";

export default {
    name: 'Navbar',
    components: {
        AirbankLogo,
        Select
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

.navbar-language-select {
    cursor: pointer;
}
</style>