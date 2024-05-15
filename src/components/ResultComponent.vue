<template>
    <div>
        <h2>你是 {{ personalityType.name }}</h2>
        <p>{{ personalityType.context }}</p>
        <p>{{ personalityType.secret }}</p>
    </div>
    <button @click="$emit('retake')">重新測驗</button>
    <button>分享測驗結果</button>
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