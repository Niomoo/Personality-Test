<template>
    <div class="question">
        <h2>{{ question }}</h2>
        <ul>
            <li v-for="option in options" :key="option" >
                <label>
                    <input type="radio" :value="option" v-model="selectedOption" />
                    {{ option }}
                </label>
            </li>
        </ul>
    </div>
</template>

<script>

export default {
    props: {
        question: String,
        options: Array<String>
    },
    data() {
        return {
            selectedOption: String,
        }
    }
}
</script>