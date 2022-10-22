<template>
    <div class="flex flex-col">
        <label v-if="showLabel" class="block mb-1">{{ label }}</label>
        <select :value="defaultSelected" class="border border-gray-300 flex p-2" @change="handleChange" v-bind="$attrs">
            <option v-for="option in options" :key="option.value" :value="option.value">{{
            option.name }}</option>
        </select>
    </div>
</template>

<script>
export default {
    name: 'Select',
    props: {
        showLabel: {
            type: Boolean,
            default: false
        },
        label: {
            type: String,
            default: ''
        },
        options: {
            default: []
        },
        selected: {
            type: String,
            default: ''
        },
    },
    computed: {
        defaultSelected() {
            return this.$props.selected
        }
    },
    methods: {
        handleChange(event) {
            this.$emit('change', event.target.value)
        }
    },
}
</script>

<style scoped>

</style>