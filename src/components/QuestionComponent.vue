<template>
    <div class="flex flex-col items-center mt-8">
        <h2 class="text-2xl mb-8">{{ question.content }}</h2>
        <div class="flex justify-center gap-4">
            <button 
                v-for="option in question.options" 
                :key="option"
                class="bg-green-500 hover:bg-green-600 text-xl text-white py-2 px-4 rounded w-1/2"
                @click="$emit('answer', option)">{{ option.text }}
            </button>
        </div>
    </div>
</template>

<script>

export default {
    props: {
        question: {
            type: Object,
            required: true
        },
    },
    emits: ['answer']
}
</script>