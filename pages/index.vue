<template>
  <div class="home h-full w-full bg-gray-100">
    <div class="home-content flex grow h-full w-full justify-center py-4">
      <div class="card p-6 bg-white rounded-lg border border-gray-200 shadow-md">
        <div>
          <h3 class="font-bold text-lg mb-4">{{ $t('home.transactions') }}</h3>
        </div>
        <div class="flex flex-col lg:flex-row">
          <div class="w-full lg:w-6/12 header-input mr-4 mb-4">
            <FormInputWithIcon :label="$t('home.filters.search')" showLabel :placeholder="$t('home.filters.searchLabel')">
              <template v-slot:icon>
                <fa icon="magnifying-glass" />
              </template>
            </FormInputWithIcon>
          </div>
          <div class="w-full lg:w-2/12 header-input mr-4 mb-4">
            <FormSelect :options="defaultSelect" :label="$t('home.filters.bank')" showLabel />
          </div>
          <div class="w-full lg:w-2/12 header-input mr-4 mb-4">
            <FormSelect :options="defaultSelect" :label="$t('home.filters.account')" showLabel />
          </div>
          <div class="w-full lg:w-2/12 header-input mr-4 mb-4">
            <FormInputDate :label="$t('home.filters.startingMonth')" showLabel type="month"/>
          </div>
          <div class="w-full lg:w-2/12 header-input mr-4 mb-4">
            <FormInputDate :label="$t('home.filters.endingMonth')" showLabel type="month"/>
          </div>
        </div>
        <div class="overflow-x-auto relative">
          <table class="w-full">
            <thead class="text-xs table-head">
              <tr>
                <th scope="col" class="py-3 px-6">
                  <div class="flex items-center">
                    <span class="table-head-content">
                      {{ $t('home.table.firstColumn') }}
                    </span>
                    <ChevronDown />
                  </div>
                </th>
                <th scope="col" class="py-3 px-6">
                  <div class="flex items-center">
                    <span class="table-head-content">
                      {{ $t('home.table.secondColumn') }}
                    </span>
                    <ChevronDown />
                  </div>
                </th>
                <th scope="col" class="py-3 px-6">
                  <div class="flex items-center">
                    <span class="table-head-content">
                      {{ $t('home.table.thirdColumn') }}
                    </span>
                    <ChevronDown />
                  </div>
                </th>
                <th scope="col" class="py-3 px-6">
                  <div class="flex items-center">
                    <span class="table-head-content">
                      {{ $t('home.table.fourthColumn') }}
                    </span>
                    <ChevronDown />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody class="table-body">
              <tr @click="handleInvoiceClick(1)" class="">
                <td scope="row" class="py-4 px-6 text-left">
                  Apple MacBook Pro 17"
                </td>
                <td class="py-4 px-6 text-left">
                  Sliver
                </td>
                <td class="py-4 px-6 text-left">
                  Laptop
                </td>
                <td class="py-4 px-6 text-left">
                  $2999
                </td>
              </tr>
              <tr class="">
                <td scope="row" class="py-4 px-6 text-left">
                  Microsoft Surface Pro
                </td>
                <td class="py-4 px-6 text-left">
                  White
                </td>
                <td class="py-4 px-6 text-left">
                  Laptop PC
                </td>
                <td class="py-4 px-6 text-left">
                  $1999
                </td>
              </tr>
              <tr class="">
                <td scope="row" class="py-4 px-6 text-left">
                  Magic Mouse 2
                </td>
                <td class="py-4 px-6 text-left">
                  Black
                </td>
                <td class="py-4 px-6 text-left">
                  Accessories
                </td>
                <td class="py-4 px-6 text-left">
                  $99
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
import 'vue2-datepicker/locale/pt-br';

export default {
  components: { ChevronDown },
  data() {
    return {
      defaultSelect: [
        {
          name: 'United States',
          value: 'US'
        },
        {
          name: 'Canada',
          value: 'CA'
        },
        {
          name: 'France',
          value: 'FR'
        },
        {
          name: 'Germany',
          value: 'DE'
        },
      ]
    }
  },
  methods: {
    handleInvoiceClick(event) {
      console.log(event)
    }
  },
}
</script>

<style scoped>
.card {
  width: 85vw;
}

:deep() .header-input {
  color: #c5c5c5;
}

:deep() .header-input input {
  color: black;
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

.table-body tr .muted {
  color: #979797;
}
</style>