<template>
    <div class="flex flex-col" :class="inputHasErrorClass">
        <label v-if="showLabel" class="block mb-1">{{ label }}</label>
        <input v-model="input" type="text" class="block p-2 border" v-bind="$attrs">
        <p v-if="hasError">{{ errorMessage }}</p>
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
            default: ''
        },
        debounceTime: {
            type: Number,
            default: 300
        },
        value: {
            type: String,
            default: ''
        },
        errorMessage: {
            type: String,
            default: ''
        },
        hasError: {
            type: Boolean,
            default: false
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
        inputHasErrorClass() {
            return this.categoryHasError ? 'invalid-input' : ''
        },
    }
}
</script>

<style scoped>
.invalid-input label {
    color: #f05240;
}

.invalid-input input {
    border-color: #f05240;
}

.invalid-input input:focus-visible {
    outline: 1px solid #f05240;
}
.invalid-input input:placeholder-shown {
    outline: 1px solid #f05240;
}

.invalid-input p {
    color: #f05240;
    font-size: 14px;
}
</style>