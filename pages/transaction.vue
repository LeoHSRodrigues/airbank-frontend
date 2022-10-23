<template>
    <div class="details h-full flex justify-center items-center">
        <div v-if="canLoadPage"
            class="flex flex-col h-4/5 w-6/12 p-6 bg-white rounded-lg border border-gray-200 shadow-md">
            <div class="flex flex-col">
                <h3 class="font-bold text-lg">
                    {{ $t('details.transactionDetails') }} - {{ transaction.reference }}
                </h3>
                <span class="text-muted">
                    {{ transaction.date ? $d(new Date(transaction.date), 'short') : '' }}
                </span>
            </div>
            <div class="flex flex-col grow">
                <div class="flex justify-around mb-4 mt-12">
                    <div>
                        <FormInput showLabel :label="$t('details.inputName')" disabled
                            :value="transaction.account.name" />
                    </div>
                    <div>
                        <FormInput showLabel :label="$t('details.inputBank')" disabled
                            :value="transaction.account.bank" />
                    </div>
                </div>
                <div class="flex justify-around">
                    <div>
                        <FormInput showLabel :label="$t('details.inputAmount')" disabled :value="transaction.amount" />
                    </div>
                    <div>
                        <FormInput showLabel :label="$t('details.inputCurrency')" disabled
                            :value="transaction.currency" />
                    </div>
                </div>
                <div class="flex justify-center items-center mt-4 ">
                    <FormSelect class="w-6/12" @change="handleCategoryChange" :selected="getSelectedCategory"
                        :options="getCategories" :label="$t('details.inputCategory')" showLabel />
                </div>
                <div class="flex justify-center items-end mt-4 grow">
                    <button :disabled="isButtonDisabled" class="bg-black p-4 rounded-lg text-white submit-button"
                        type="button">{{ $t('details.submitButton') }}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import { mapGetters } from 'vuex';
import allCategories from '~/services/allCategories'
import transaction from '~/services/transaction'

export default {
    name: 'TransactionDetails',
    apollo: {
        allCategories: {
            query: allCategories,
            variables() {
                return { offset: this.offset, limit: this.limit }
            }
        },
        transaction: {
            query: transaction,
            variables() {
                return { id: this.transactionId }
            },
            skip() {
                return !this.transactionId;
            },
        }
    },
    data() {
        return {
            categories: ref([]),
            selectedCategory: null,
            transactionId: null,
            offset: 0,
            limit: 30
        }
    },
    beforeMount() {
        this.mountTransaction();
    },
    methods: {
        ...mapGetters({
            getTransaction: 'transactions/getTransactionDetails'
        }),
        mountTransaction() {
            this.transactionId = this.getTransaction().id
        },
        handleCategoryChange(category) {
            this.selectedCategory = category
        },
    },
    computed: {
        getCategories() {
            if (!this.allCategories) return []

            const categories = this.allCategories.map(category => {
                return {
                    name: category.name,
                    value: category.id
                }
            })

            categories.push({
                name: `--- ${this.$i18n.t('details.newCategory')} ---`,
                value: "new"
            })

            return categories
        },
        getSelectedCategory() {
            return this.selectedCategory
        },
        canLoadPage() {
            return this.transaction
        },
        isButtonDisabled() {
            return !this.selectedCategory || this.selectedCategory === 'new'
        }
    },
    watch: {
        transaction: {
            handler(newValue, oldValues) {
                if (newValue && newValue.length && oldValues && oldValues.length && newValue[0].id === oldValues[0].id) {
                    return
                }
                this.selectedCategory = this.transaction.categoryId
            },
        }
    },
}
</script>

<style scoped>
.submit-button:disabled {
    background-color: #979797;
}
</style>