<template>
    <div class="text-xl mb-6">
        <p>{{ $t('introduction') }}</p>
    </div>
    <button class="bg-amber-500 hover:bg-amber-600 shadow-md text-xl text-white py-2 px-4 rounded" @click="$emit('start')">Let's Go!!!</button>
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