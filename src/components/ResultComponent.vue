<script setup>
function setImg(path) {
    return new URL('/images' + path, import.meta.url).href
}
</script>
<template>
    <div class="my-4">
        <h2 class="text-xl mb-4">{{ $t('results') }} {{ $t(personalityType.name) }}</h2>
        <img :src="setImg(personalityType.path)" >
        <p class="text-lg mb-4">{{ $t(personalityType.context) }}</p>
        <p class="text-md">{{ $t('secret') }}{{ $t(personalityType.secret) }}</p>
    </div>
    <div class="grid grid-cols-2 justify-center gap-4">
        <button 
            class="bg-primary-500 hover:bg-primary-600 text-lg text-white py-2 px-4 rounded"
            @click="$emit('retake')"
        >{{ $t('restart') }}
        </button>
        <button 
            class="bg-secondary-500 hover:bg-secondary-600 text-lg text-white py-2 px-4 rounded"
            @click="$emit('share')"
        >{{ $t('share') }}
        </button>
        <button
            class="col-span-2 bg-accent-500 hover:bg-accent-600 text-lg text-white py-2 px-4 rounded"
            @click="$emit('jump')"
        >{{ $t('jump') }}
        </button>
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
    emits: ['retake', 'share', 'jump']
}
</script>