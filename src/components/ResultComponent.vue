<template>
    <div class="my-6">
        <h2 class="text-2xl mb-4">你是 {{ personalityType.name }}</h2>
        <p class="text-xl mb-4">{{ personalityType.context }}</p>
        <p class="text-lg">不為人知的小秘密：{{ personalityType.secret }}</p>
    </div>
    <div class="flex justify-center gap-4">
        <button 
            class="bg-blue-500 hover:bg-blue-600 text-xl text-white py-2 px-4 rounded"
            @click="$emit('retake')">重新測驗
        </button>
        <button class="bg-amber-500 hover:bg-amber-600 text-xl text-white py-2 px-4 rounded">分享測驗結果</button>
    </div>
</template>

<script>
export default {
    props: {
        personalityType: {
            type: Object,
            required: true,
        }
    },
    emits: ['retake']
}
</script>