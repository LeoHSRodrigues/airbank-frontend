<template>
    <div class="flex flex-col">
        <label class="block mb-1">{{ label }}</label>
        <div class="relative mb-6">
            <div v-if="leftIcon" class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <slot name="icon"></slot>
            </div>
            <div v-else class="flex absolute inset-y-0 right-0 items-center pr-3 pointer-events-none">
                <slot name="icon"></slot>
            </div>
            <input :data-testid="getUniqueId" type="text" v-model="input" :class="leftIcon ? 'pl-10' : 'pr-10'" class="flex p-2 border w-full"
                v-bind="$attrs">
        </div>
    </div>
</template>

<script>
export default {
    name: "InputWithIcon",
    props: {
        showLabel: {
            type: Boolean,
            default: false
        },
        label: {
            type: String,
            default: ''
        },
        leftIcon: {
            type: Boolean,
            default: true
        },
        debounceTime: {
            type: Number,
            default: 300
        },
        value: {
            type: String,
            default: ''
        },
        uniqueId: {
            type: String,
            default: ''
        },
    },
    data() {
        return {
            timeout: null,
        }
    },
    computed: {
        input: {
            get() {
                return this.value
            },
            set(val) {
                if (this.timeout) clearTimeout(this.timeout)
                this.timeout = setTimeout(() => {
                    this.$emit('inputChange', val)
                }, this.debounceTime)
            }
        },
        getUniqueId () {
            return `input-icon-${this.$props.uniqueId}`
        },
    }
}
</script>

<style scoped>

</style>