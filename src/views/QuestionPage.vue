<template>
  <div>
    <h2>{{ question.text }}</h2>
    <button @click="selectedOption(0)">{{ question.options[0] }}</button>
    <button @click="selectedOption(1)">{{ question.options[1] }}</button>
  </div>
</template>

<script>
export default {
  props: ['question'],
  methods: {
    selectedOption(index) {
      console.log(`selectedOption: ${index}`);
    }
  }
};
</script>