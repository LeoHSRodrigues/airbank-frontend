<template>
    <div>
        <nuxt-link v-for="locale in availableLocales" :key="locale.code" :to="switchLocalePath(locale.code)">{{
        locale.name }}</nuxt-link>
    </div>
</template>

<script>
export default {
    name: 'Navbar',
    computed: {
        availableLocales() {
            return this.$i18n.locales
        }
    }
}
</script>

<style scoped>

</style>