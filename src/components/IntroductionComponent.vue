<template>
    <div class="text-lg mb-6">
        <p>{{ $t('introduction') }}</p>
    </div>
    <button class="bg-accent-500 hover:bg-accent-600 shadow-md text-lg text-white py-2 px-4 rounded" @click="$emit('start')">{{ $t('start') }}</button>
</template>
<script>
export default {
    props: {
        locale: {
            type: String,
            required: true
        }
    },
    emits: ['start']
}
</script>