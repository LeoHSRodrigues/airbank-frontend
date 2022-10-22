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
            <FormInputDate :label="$t('home.filters.startingMonth')" showLabel type="month" />
          </div>
          <div class="w-full lg:w-2/12 header-input mr-4 mb-4 header-input-date">
            <FormInputDate :label="$t('home.filters.endingMonth')" showLabel type="month" />
          </div>
        </div>
        <div v-if="shouldLoadPage" class="table-div">
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
                <th scope="col" class="py-3 px-6">
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
              <tr v-for="transaction in allTransactions" :key="transaction.id" @click="handleInvoiceClick(1)" class="">
                <td scope="row" class="py-4 px-6 text-left">
                  <span :class="transaction.reference ? '' : 'text-muted'">
                    {{ transaction.reference || $t('home.table.invalidReference')}}
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
      </div>
    </div>
  </div>
</template>

<script>
import ChevronDown from "~/static/icons/chevron-down.svg?inline";
import allTransactions from '~/services/allTransaction'
import allAccounts from '~/services/allAccounts'

export default {
  name: 'index',
  apollo: {
    allTransactions: {
      query: allTransactions,
      variables() {
        return { search: this.search, offset: this.transactionOffset, limit: this.transactionLimit, initialDate: this.initialDate, endingDate: this.endingDate, accountId: this.selectedAccount, bankName: this.rawBankName }
      }
    },
    allAccounts: {
      query: allAccounts,
      variables() {
        return { offset: this.accountOffset, limit: this.accountLimit }
      }
    }
  },
  components: { ChevronDown },
  data() {
    return {
      search: '',
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
    }
  },
  methods: {
    handleInvoiceClick(event) {
      console.log()
    },
    handleSearch(search) {
      this.search = search
    },
    handleBankChange(bank) {
      if (bank === this.$i18n.t('components.select.all')) {
        this.selectedAccount = null
        this.selectedBank = this.$i18n.t('components.select.all')
        this.rawBankName = null
        return
      }

      this.selectedBank = bank
      this.rawBankName = bank
    },
    handleAccountChange(account) {
      this.selectedAccount = account
    }
  },
  computed: {
    shouldLoadPage() {
      const canLoad = this.allAccounts && this.allAccounts.length && this.allTransactions && this.allTransactions.length

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
    },
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
</style>