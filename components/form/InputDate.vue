<template>
    <div class="flex flex-col">
        <label v-if="showLabel" class="block mb-1">{{ label }}</label>
        <date-picker @clear="clear" :data-testid="getUniqueId" :lang="lang" class="datePicker flex w-full" :value="defaultValue"
            v-bind="$attrs" @change="handleChange" :disabled-date="disableDate" />
    </div>
</template>

<script>
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import 'vue2-datepicker/locale/en';
import 'vue2-datepicker/locale/pt-br';
import 'vue2-datepicker/locale/de';

export default {
    name: 'InputDate',
    components: { DatePicker },
    props: {
        showLabel: {
            type: Boolean,
            default: false
        },
        label: {
            type: String,
            default: false
        },
        disableDate: {
            type: Function,
            default: () => false
        },
        clear: {
            type: Function,
            default: () => ({})
        },
        defaultValue: {
            type: Date,
            default: null
        },
        uniqueId: {
            type: String,
            default: ''
        },
    },
    mounted() {
        if (this.$i18n.locale === 'br') {
            this.lang = 'pt-br'
        } else {
            this.lang = this.$i18n.locale
        }
    },
    data() {
        return {
            lang: 'en'
        }
    },
    methods: {
        handleChange(event) {
            this.$emit('change', event)
        }
    },
    computed: {
        getUniqueId() {
            return `input-${this.$props.uniqueId}`
        },
    }
}
</script>

<style scoped>
:deep() .datePicker input {
    padding: 0.5rem;
    border-radius: 0px;
    border: 1px solid #e5e7eb;
}

:deep() .datePicker i {
    cursor: pointer;
}

:deep() .datePicker {
    width: 100%;
}
</style>