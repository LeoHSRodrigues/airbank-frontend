export const state = () => ({
    transactionOptions: {
        limit: 10,
        offset: 0,
        shouldCacheResults: false
    },
    transactions: {},
    transaction: {},
})

export const getters = {
    getTransactions(state) {
        return state.transactions
    },
    getTransactionDetails(state) {
        return state.transaction
    },
    getTransactionCacheReset(state) {
        return state.transactionOptions.shouldCacheResults
    },
}

export const mutations = {
    transactions(state, transactions) {
        state.transactions = transactions
    },
    transaction(state, transaction) {
        state.transaction = transaction
    },
    transactionOptions(state, transactionOptions) {
        state.transactionOptions = transactionOptions
    },
    resetTransactionCache(state, shouldCache) {
        state.transactionOptions.shouldCacheResults = shouldCache
    },
}

export const actions = {
    async fetchTransactions({ state }) {
        // make request
        const res = { data: 10 };
        state.counter = res.data;
        return res.data;
    },
    async fetchTransaction({ state }) {
        // make request
        const res = { data: 10 };
        state.counter = res.data;
        return res.data;
    },
    async setTransactionCache({ state }, shouldCache) {
        commit("resetTransactionCache", shouldCache);
    },
}