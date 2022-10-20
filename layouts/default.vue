<template>
    <div class="page md:h-full">
        <div class="navbar fixed z-10 w-full bg-white">
            <Navbar />
        </div>
        <div class="content h-full">
            <Nuxt />
        </div>
    </div>
</template>

<script>
import Navbar from '~/shared/Navbar/Navbar.vue';
export default {
    components: { Navbar }
}
</script>

<style scoped>
.navbar {
    height: 50px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
}

.content {
    padding-top: 50px;
}
</style>