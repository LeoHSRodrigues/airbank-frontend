<template>
    <div class="details h-full flex justify-center items-center mt-12 md:mt-0">
        <div v-if="canLoadPage"
            class="flex flex-col h-4/5 w-9/12 p-6 lg:w-6/12 bg-white rounded-lg border border-gray-200 shadow-md">
            <div class="flex flex-col">
                <h3 class="font-bold text-lg" data-testid="transaction-header">
                    {{ $t('details.transactionDetails') }} {{ transaction.reference ? `- ${transaction.reference}` : ''
                    }}
                </h3>
                <span class="text-muted">
                    {{ transaction.date ? $d(new Date(transaction.date), 'short') : '' }}
                </span>
            </div>
            <div class="flex flex-col grow">
                <div class="flex flex-col md:flex-row justify-around mb-4 mt-2 md:mt-12">
                    <div class="mb-4 md:mb-0">
                        <FormInput showLabel :label="$t('details.inputName')" disabled
                            :value="transaction.account.name" />
                    </div>
                    <div>
                        <FormInput showLabel :label="$t('details.inputBank')" disabled
                            :value="transaction.account.bank" />
                    </div>
                </div>
                <div class="flex justify-around flex-col md:flex-row ">
                    <div class="mb-4 md:mb-0">
                        <FormInput showLabel :label="$t('details.inputAmount')" disabled :value="transaction.amount" />
                    </div>
                    <div>
                        <FormInput showLabel :label="$t('details.inputCurrency')" disabled
                            :value="transaction.currency" />
                    </div>
                </div>
                <div class="flex justify-center items-center mt-4 mb-8 md:mb-0">
                    <FormSelect uniqueId="category" class="w-full md:w-6/12" @change="handleCategoryChange"
                        :selected="selectedCategory" :options="categories" :label="$t('details.inputCategory')"
                        showLabel />
                </div>
                <div class="flex justify-center items-end mt-4 grow">
                    <button data-testid="submit-transaction" @click="updateTransaction" :disabled="isButtonDisabled"
                        class="bg-black p-4 rounded-lg text-white submit-button" type="button">{{
                                $t('details.submitButton')
                        }}</button>
                </div>
            </div>
            <div data-testid="input-new-category" class="input-new-category w-full lg:w-1/5"
                v-if="selectedCategory === 'new'">
                <NewCategoryForm @saveCategory="handleNewCategory" />
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import { mapGetters } from 'vuex';
import allCategories from '~/services/allCategories'
import transaction from '~/services/transaction'
import newCategory from '~/services/newCategory'
import updateTransactionCategory from '~/services/updateTransactionCategory'
import NewCategoryForm from './components/-newCategoryForm.vue';

export default {
    name: "TransactionDetails",
    apollo: {
        allCategories: {
            query: allCategories,
            variables() {
                return { offset: this.offset, limit: this.limit };
            }
        },
        transaction: {
            query: transaction,
            variables() {
                return { id: this.transactionId };
            },
            skip() {
                return !this.transactionId;
            },
        }
    },
    data() {
        return {
            categories: ref([]),
            selectedCategory: "",
            transactionId: null,
            offset: 0,
            limit: 50
        };
    },
    beforeMount() {
        this.mountTransaction();
    },
    methods: {
        ...mapGetters({
            getTransaction: "transactions/getTransactionDetails"
        }),
        mountTransaction() {
            this.transactionId = this.getTransaction().id;
        },
        handleCategoryChange(category) {
            this.selectedCategory = category;
        },
        async updateTransaction() {
            await this.$apollo.mutate({
                mutation: updateTransactionCategory,
                variables: {
                    transactionId: this.transactionId,
                    categoryId: this.selectedCategory
                },
            });
            this.$router.push(this.localePath({ name: "index" }));
        },
        async handleNewCategory(data) {
            try {
                const newCategoryData = await this.$apollo.mutate({
                    mutation: newCategory,
                    variables: {
                        name: data.name,
                        color: data.color
                    },
                });

                this.categories.pop()

                this.categories.push({
                    name: newCategoryData.data.newCategory.name,
                    value: newCategoryData.data.newCategory.id
                });

                this.categories.push({
                    name: `--- ${this.$i18n.t("details.newCategorySelect")} ---`,
                    value: "new"
                });

                this.selectedCategory = newCategoryData.data.newCategory.id

            } catch (error) {
                console.log(error)
            }
        }
    },
    computed: {
        canLoadPage() {
            return this.transaction && this.categories.length;
        },
        isButtonDisabled() {
            return !this.selectedCategory || this.selectedCategory === "new";
        }
    },
    watch: {
        transaction: {
            handler(newValue, oldValues) {
                if (newValue && newValue.length && oldValues && oldValues.length && newValue[0].id === oldValues[0].id) {
                    return;
                }
                this.selectedCategory = this.transaction.categoryId
            },
        },
        allCategories: {
            handler(newValue, oldValues) {
                if (newValue && newValue.length && oldValues && oldValues.length && newValue[0].id === oldValues[0].id) {
                    return;
                }
                if (!this.allCategories)
                    return [];
                const categories = this.allCategories.map(category => {
                    return {
                        name: category.name,
                        value: category.id
                    };
                });
                categories.push({
                    name: `--- ${this.$i18n.t("details.newCategorySelect")} ---`,
                    value: "new"
                });

                this.categories = categories
            },
        }
    },
    components: { NewCategoryForm }
}
</script>

<style scoped>
.submit-button:disabled {
    background-color: #979797;
}

.input-new-category {
    display: flex;
    position: absolute;
    bottom: 0;
    right: 0;
    background: white;
    height: 60%;
}
</style>