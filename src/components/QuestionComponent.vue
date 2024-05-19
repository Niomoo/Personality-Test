<template>
    <div class="flex flex-col items-center mt-8">
        <h2 class="text-lg mb-8">{{ $t(question.content) }}</h2>
        <div class="grid grid-rows-2 justify-center gap-4">
            <button 
                v-for="option in question.options" 
                :key="option"
                class="cursor-pointer bg-green-500 hover:bg-green-600 text-lg text-white py-2 px-4 rounded text-left w-full"
                @click="$emit('answer', option)">{{ $t(option.text) }}
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