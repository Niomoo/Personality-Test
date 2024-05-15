<template>
    <div class="question">
        <h2>{{ question.content }}</h2>
        <ul>
            <li v-for="option in question.options" :key="option" >
                <button @click="$emit('answer', option)">{{ option.text }}</button>
            </li>
        </ul>
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