<script setup>
function setImg(path) {
    return new URL('/personality-test/images' + path, import.meta.url).href
}
</script>
<template>
    <div class="my-4">
        <h2 class="text-xl mb-4">{{ $t('results') }} {{ $t(personalityType.name) }}</h2>
        <img :src="setImg(personalityType.path)" >
        <p class="text-lg mb-4">{{ $t(personalityType.context) }}</p>
        <p class="text-md">{{ $t('secret') }}{{ $t(personalityType.secret) }}</p>
    </div>
    <div class="flex justify-center gap-4">
        <button 
            class="bg-blue-500 hover:bg-blue-600 text-lg text-white py-2 px-4 rounded"
            @click="$emit('retake')">{{ $t('restart') }}
        </button>
        <button class="bg-amber-500 hover:bg-amber-600 text-lg text-white py-2 px-4 rounded">{{ $t('share') }}</button>
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