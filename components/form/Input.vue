<template>
    <div class="flex flex-col">
        <label v-if="showLabel" class="block mb-1">{{ label }}</label>
        <input type="text" class="block p-2 border" v-bind="$attrs">
    </div>
</template>

<script>
export default {
    name: "Input",
    props: {
        showLabel: {
            type: Boolean,
            default: false
        },
        label: {
            type: String,
            default: false
        },
    },
}
</script>

<style scoped>
</style>