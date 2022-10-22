<template>
    <div class="flex flex-col">
        <span class="flex badge" :style="{ backgroundColor: `#${this.color}` }" v-bind="$attrs">{{ text }}</span>
    </div>
</template>

<script>
export default {
    name: 'Badge',
    props: {
        text: {
            type: String,
            required: true
        },
        color: {
            type: String,
            default: 'f2f2f2'
        },
    },
    computed: {
        getBackgroundColor() {
            return `bg-[#${this.color}]`
        }
    },
}
</script>

<style scoped>
.badge {
    width: fit-content;
    padding: 5px 15px;
    border-radius: 4px;
    color: black;
}
</style>