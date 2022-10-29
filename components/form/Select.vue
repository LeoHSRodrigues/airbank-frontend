<template>
    <div class="flex flex-col">
        <label v-if="showLabel" class="block mb-1">{{ label }}</label>
        <select :data-testid="getUniqueId" v-model="defaultSelected" class="border border-gray-300 flex p-2"
            v-bind="$attrs">
            <option v-for="option in options" :key="option.value" :value="option.value">{{
                    option.name
            }}</option>
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
        uniqueId: {
            type: String,
            default: ''
        },
    },
    computed: {
        defaultSelected: {
            get: function() {
                return this.$props.selected

            },
            set: function(value) {
                this.$emit('change', value)
            }
        },
        getUniqueId () {
            return `select-${this.$props.uniqueId}`
        },
    },
}
</script>

<style scoped>

</style>