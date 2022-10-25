<template>
  <div class="home h-full w-full font-sans">
    <div class="home-content flex grow h-full w-full justify-center py-4">
      <div class="card p-6 bg-white rounded-lg border border-gray-200 shadow-md">
        <div>
          <h3 class="font-bold text-lg mb-4">{{ $t('home.transactions') }}</h3>
        </div>
        <div class="flex flex-col lg:flex-row">
          <div class="w-full lg:w-6/12 header-input mr-4 mb-4">
            <FormInputWithIcon :value="this.search" :debounceTime="debounceTime" @inputChange="handleSearch"
              :label="$t('home.filters.search')" showLabel :placeholder="$t('home.filters.searchLabel')">
              <template v-slot:icon>
                <fa icon="magnifying-glass" />
              </template>
            </FormInputWithIcon>
          </div>
          <div class="w-full lg:w-2/12 header-input mr-4 mb-4">
            <FormSelect @change="handleBankChange" :selected="selectedBank" :options="getBanks"
              :label="$t('home.filters.bank')" showLabel />
          </div>
          <div class="w-full lg:w-2/12 header-input mr-4 mb-4">
            <FormSelect :disabled="selectedBank === $t('components.select.all')" @change="handleAccountChange"
              :selected="selectedAccount" :options="getAccounts" :label="$t('home.filters.account')" showLabel />
          </div>
          <div class="w-full lg:w-2/12 header-input mr-4 mb-4 header-input-date">
            <FormInputDate @change="handleInitialDateChange" :defaultValue="initialDate"
              :label="$t('home.filters.startingMonth')" showLabel type="month" />
          </div>
          <div class="w-full lg:w-2/12 header-input mr-4 mb-4 header-input-date">
            <FormInputDate @change="handleEndingDateChange" :defaultValue="endingDate"
              :label="$t('home.filters.endingMonth')" showLabel type="month" :disableDate="disablePastDates" />
          </div>
        </div>
        <div v-if="shouldLoadPage" class="table-div" @scroll="handleTableScroll">
          <table class="w-full table-auto">
            <thead class="text-xs table-head">
              <tr>
                <th scope="col" class="py-3 px-6">
                  <div class="flex items-center">
                    <span class="table-head-content">
                      {{ $t('home.table.firstColumn') }}
                    </span>
                  </div>
                </th>
                <th scope="col" class="py-3 px-6">
                  <div class="flex items-center justify-start">
                    <span class="table-head-content">
                      {{ $t('home.table.secondColumn') }}
                    </span>
                  </div>
                </th>
                <th scope="col" class="py-3 px-6" @click="handleOrderChange">
                  <div class="flex items-center justify-center">
                    <span class="table-head-content">
                      {{ $t('home.table.thirdColumn') }}
                    </span>
                    <ChevronDown />
                  </div>
                </th>
                <th scope="col" class="py-3 px-6">
                  <div class="flex items-center justify-end">
                    <span class="table-head-content">
                      {{ $t('home.table.fourthColumn') }}
                    </span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody class="table-body overflow-y-scroll">
              <tr v-for="transaction in transactions" :key="transaction.id" @click="handleInvoiceClick(transaction)">
                <td scope="row" class="py-4 px-6 text-left">
                  <span :class="transaction.reference ? '' : 'text-muted'">
                    {{ transaction.reference || $t('home.table.invalidReference') }}
                  </span>
                </td>
                <td class="py-4 px-6 flex justify-start">
                  <DisplayBadge :text="transaction.category.name" :color="transaction.category.color || 'f2f2f2'" />
                </td>
                <td class="py-4 px-6 text-center">
                  <span>
                    {{ $d(new Date(transaction.date), 'short') }}
                  </span>
                </td>
                <td class="py-4 px-6 text-right">
                  <span>
                    {{ transaction.amount }}
                  </span>
                  <span class="text-muted">
                    {{ transaction.currency }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-else>
          <div v-if="!isLoading" class="flex flex-col justify-center items-center">
            <div class="not-found-img mb-4">
              <NoResults />
            </div>
            <div class="mb-2">
              <span>
                {{ $t('home.notFoundTitle') }}
              </span>
            </div>
            <div>
              <span>
                {{ $t('home.notFoundSubtitle') }}
              </span>
            </div>
          </div>
          <div v-else class="flex flex-col justify-center items-center">
            <div role="status">
              <svg aria-hidden="true" class="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-black"
                viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor" />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill" />
              </svg>
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import ChevronDown from "~/static/icons/chevron-down.svg?inline";
import allTransactions from '~/services/allTransaction'
import allAccounts from '~/services/allAccounts'
import NoResults from "~/static/icons/no-results.svg?inline";
import { mapMutations } from 'vuex'

export default {
  name: 'index',
  apollo: {
    allTransactions: {
      query: allTransactions,
      fetchPolicy: 'network-only',
      variables() {
        return { search: this.search, offset: this.transactionOffset, limit: this.transactionLimit, initialDate: this.initialDate, endingDate: this.endingDate, accountId: this.selectedAccount, bankName: this.rawBankName, order: this.order }
      }
    },
    allAccounts: {
      query: allAccounts,
      variables() {
        return { offset: this.accountOffset, limit: this.accountLimit }
      }
    }
  },
  components: { ChevronDown, NoResults },
  data() {
    return {
      transactions: ref([]),
      defaultTransactionOptions: {
        transactionOffset: 0,
        transactionLimit: 30,
      },
      search: '',
      order: 'desc',
      debounceTime: 1000,
      selectedBank: this.$i18n.t('components.select.all'),
      rawBankName: null,
      selectedAccount: null,
      transactionOffset: 0,
      transactionLimit: 30,
      accountOffset: 0,
      accountLimit: 30,
      initialDate: null,
      endingDate: null,
      isLoading: false,
    }
  },
  methods: {
    ...mapMutations({
      setTransaction: 'transactions/transaction'
    }),
    resetTransactionOptions() {
      this.isLoading = true
      this.transactions = []
      this.transactionOffset = this.defaultTransactionOptions.transactionOffset
      this.transactionLimit = this.defaultTransactionOptions.transactionLimit
    },
    handleInvoiceClick(transaction) {
      this.setTransaction(transaction)
      this.$router.push(this.localePath({ name: 'transaction' }));
    },
    handleSearch(search) {
      this.search = search
      this.resetTransactionOptions()
    },
    handleBankChange(bank) {
      if (bank === this.$i18n.t('components.select.all')) {
        this.selectedAccount = null
        this.selectedBank = this.$i18n.t('components.select.all')
        this.rawBankName = null
        this.resetTransactionOptions()
        return
      }

      this.selectedBank = bank
      this.rawBankName = bank
      this.selectedAccount = this.$i18n.t('components.select.all')
      this.resetTransactionOptions()
    },
    handleAccountChange(account) {
      this.selectedAccount = account
      this.resetTransactionOptions()
    },
    handleInitialDateChange(date) {
      if (this.endingDate && date > this.endingDate) {
        this.endingDate = null
      }
      this.initialDate = date
      this.resetTransactionOptions()
    },
    handleEndingDateChange(date) {
      this.endingDate = date
      this.resetTransactionOptions()
    },
    disablePastDates(date) {
      if (this.initialDate) {
        return date < this.initialDate
      }
      return false
    },
    handleTableScroll({ target: { scrollTop, clientHeight, scrollHeight } }) {
      if (scrollTop + clientHeight >= scrollHeight) {
        this.transactionOffset += this.transactionLimit
      }
    },
    handleOrderChange() {
      this.resetTransactionOptions()
      this.order = this.order === 'desc' ? 'asc' : 'desc'
    }
  },
  computed: {
    shouldLoadPage() {
      const canLoad = this.allAccounts && this.allAccounts.length && this.transactions && this.transactions.length

      return canLoad
    },
    getAccounts() {
      if (!this.allAccounts) return []

      const availableAccounts = []

      availableAccounts.push({
        id: '',
        name: this.$i18n.t('components.select.all')
      })

      availableAccounts.push(...this.allAccounts.filter(account => account.bank === this.selectedBank))

      return availableAccounts.map(account => {
        return {
          name: account.name,
          value: account.id
        }
      })
    },
    getBanks() {
      if (!this.allAccounts) return []

      let banks = []

      banks.push({
        id: '',
        bank: this.$i18n.t('components.select.all')
      })

      banks.push(...new Map(this.allAccounts.map(v => [v.bank, v])).values())

      return banks.map(account => {
        return {
          name: account.bank,
          value: account.bank
        }
      })
    }
  },
  watch: {
    allTransactions: {
      handler(newTransactions, oldTransactions) {
        if (newTransactions && newTransactions.length && oldTransactions && oldTransactions.length && newTransactions[0].id === oldTransactions[0].id) {
          this.isLoading = false
          return
        }
        this.transactions.push(...newTransactions)
        this.isLoading = false
      },
    }
  },
}
</script>

<style scoped>
.home {
  background-color: #fafaf8;
}

.card {
  width: 85vw;
}

:deep() .header-input {
  color: #c5c5c5;
}

:deep() .header-input input {
  color: black;
}

:deep() .header-input select {
  color: black;
}

:deep() .header-input option {
  color: black;
}

:deep() .header-input-date input {
  height: 41px;
}

.table-head {
  border-top: 1px solid #dcdcdc;
  border-bottom: 1px solid #dcdcdc;
}

.table-head th svg {
  margin-left: 4px;
  width: 8px;
  height: 8px;
}

.table-head th div {
  cursor: pointer;
}

.table-head-content {
  color: #c5c5c5;
}

.table-body tr {
  border-bottom: 1px solid #dcdcdc;
  color: #787878;
  font-weight: 500;
  cursor: pointer;
}

.text-muted {
  color: #979797;
}

.table-div {
  height: 70vh;
  overflow: auto;
}

/* width */
.table-div::-webkit-scrollbar {
  height: 4px;
  width: 4px;
}

/* Track */
.table-div::-webkit-scrollbar-track {
  background: #dcdcdc;
}

/* Handle */
.table-div::-webkit-scrollbar-thumb {
  background: #555;
}

/* Handle on hover */
.table-div::-webkit-scrollbar-thumb:hover {
  background: #888;
}

.not-found-img svg {
  width: 200px;
  height: 200px;
}
</style>