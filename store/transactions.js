export const state = () => ({
    transactionOptions: {
        limit: 10,
        offset: 0
    },
    transactions: {},
    transaction: {},
})

export const getters = {
    getTransactions(state) {
        return state.transactions
    },
    getTransasctionDetails(state) {
        return state.transaction
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
}