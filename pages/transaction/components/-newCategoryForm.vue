<template>
    <div class="flex flex-col justify-between items-center grow rounded-lg border border-gray-200 shadow-md">
        <div class="flex w-full justify-end pt-4 flex-row-reverse">
            <span class="close-icon">
                <fa icon="xmark" />
            </span>
            <div class="flex w-full justify-center">
                <span>{{ $t('details.newCategory.header') }}</span>
            </div>
        </div>
        <div class="flex w-full justify-center">
            <FormInput uniqueId="category" :placeholder="$t('details.newCategory.inputCategoryPlaceholder')" :class="inputHasErrorClass"
                :debounceTime="0" :label="$t('details.newCategory.inputCategory')" @inputChange="handleCategoryChange"
                showLabel :value="category" :hasError="showErrorMessage"
                :errorMessage="$t('details.newCategory.selectErrorMessage')" />
        </div>
        <div class="flex w-full justify-center items-center flex-col">
            <div class="flex ">
                <span>{{ $t('details.newCategory.inputColor') }}</span>
            </div>
            <Chrome @input="handleColorChange" :value="color"></Chrome>
        </div>
        <div class="flex w-6/12 pb-4">
            <button data-testid="submit-new-category" :disabled="isButtonDisabled" @click="saveCategory"
                class="bg-black p-4 rounded-lg text-white submit-button w-full" type="button">{{
                        $t('details.newCategory.submitButton')
                }}</button>
        </div>
    </div>
</template>

<script>
import Input from '~/components/form/Input.vue';
import { Chrome } from 'vue-color'

export default {
    name: "NewCategoryForm",
    components: { Input, Chrome },
    data() {
        return {
            category: '',
            color: '#194d33',
            categoryHasError: true
        }
    },
    methods: {
        inputHasError(category) {
            const regex = /^[\-@&()$#*|\\//A-Za-z0-9\u00C0-\u017F ]+$/

            if (!regex.test(category)) {
                return true
            }
            return false
        },
        handleCategoryChange(category) {
            this.category = category

            const inputHasError = this.inputHasError(category)

            if (inputHasError) {
                this.categoryHasError = true
                return
            }
            this.categoryHasError = false
        },
        saveCategory() {
            const data = {
                color: this.color,
                name: this.category
            }
            this.$emit('saveCategory', data)
        },
        handleColorChange(event) {
            this.color = event.hex
        }
    },
    computed: {
        isButtonDisabled() {
            return this.inputHasError(this.category) || !this.color.trim()
        },
        inputHasErrorClass() {
            return this.categoryHasError ? 'invalid-input' : ''
        },
        showErrorMessage() {
            return this.categoryHasError
        },
    },
}
</script>

<style scoped>
.close-icon {
    position: absolute;
    right: 20px;
    cursor: pointer;
}

:deep() .vc-chrome {
    border: 1px solid #e5e7eb;
    box-shadow: none;
}

.submit-button:disabled {
    background-color: #979797;
}
</style>