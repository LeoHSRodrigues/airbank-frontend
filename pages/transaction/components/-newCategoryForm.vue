<template>
    <div class="flex flex-col justify-between items-center grow rounded-lg border border-gray-200 shadow-md">
        <div class="flex w-full justify-end pt-4 flex-row-reverse">
            <span class="close-icon">
                <fa icon="xmark" />
            </span>
            <div class="flex w-full justify-center">
                <span>Criar nova categoria</span>
            </div>
        </div>
        <div class="flex w-full justify-center">
            <FormInput label="Categoria" showLabel />
        </div>
        <div class="flex w-6/12 pb-4">
            <button class="bg-black p-4 rounded-lg text-white submit-button w-full" type="button">Cadastrar</button>
        </div>
    </div>
</template>

<script>
import Input from '~/components/form/Input.vue';

export default {
    name: "NewCategoryForm",
    components: { Input }
}
</script>

<style scoped>
.close-icon {
    position: absolute;
    right: 20px;
    cursor: pointer;
}
</style>