<script setup>
function setImg(path) {
    return new URL('/personality-test/images' + path, import.meta.url).href
}
</script>
<template id="capture">
  <div class="container flex flex-col items-center justify-center p-8">
    <div class="w-full p-6 m-4 bg-white shadow-md rounded-lg overflow-y-auto font-cubic">
      <h1 class="text-2xl font-bold text-center">{{ $t('title') }}</h1>
      <div class="flex flex-col items-center">
        <div class="my-4">
            <h2 class="text-xl mb-4">{{ $t('results') }} {{ $t(personality.name) }}</h2>
            <img :src="setImg(personality.path)" >
            <p class="text-lg mb-4">{{ $t(personality.context) }}</p>
            <p class="text-md">{{ $t('secret') }}{{ $t(personality.secret) }}</p>
        </div>
      </div>  
    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      personalityType: {
        "ESTJ": {
          name: 'personality_1',
          context: 'personality_1_context',
          secret: "personality_1_secret",
          path: "/MBTI/ESTJ.jpg"
        },
        "ESFJ": {
          name: 'personality_2',
          context: 'personality_2_context',
          secret: "personality_2_secret",
          path: "/MBTI/ESFJ.jpg"
        },
        "ENTJ": {
          name: 'personality_3',
          context: 'personality_3_context',
          secret: "personality_3_secret",
          path: "/MBTI/ENTJ.jpg"
        },
        "ENFJ": {
          name: 'personality_4',
          context: 'personality_4_context',
          secret: "personality_4_secret",
          path: "/MBTI/ENFJ.jpg"
        },
        "ISTP": {
          name: 'personality_5',
          context: 'personality_5_context',
          secret: "personality_5_secret",
          path: "/MBTI/ISTP.jpg"
        },
        "ISFP": {
          name: 'personality_6',
          context: 'personality_6_context',
          secret: "personality_6_secret",
          path: "/MBTI/ISFP.jpg"
        },
        "INTP": {
          name: 'personality_7',
          context: 'personality_7_context',
          secret: "personality_7_secret",
          path: "/MBTI/INTP.jpg"
        },
        "INFP": {
          name: 'personality_8',
          context: 'personality_8_context',
          secret: "personality_8_secret",
          path: "/MBTI/INFP.jpg"
        },
        "ESTP": {
          name: 'personality_9',
          context: 'personality_9_context',
          secret: "personality_9_secret",
          path: "/MBTI/ESTP.jpg"
        },
        "ESFP": {
          name: 'personality_10',
          context: 'personality_10_context',
          secret: "personality_10_secret",
          path: "/MBTI/ESFP.jpg"
        },
        "ENTP": {
          name: 'personality_11',
          context: 'personality_11_context',
          secret: "personality_11_secret",
          path: "/MBTI/ENTP.jpg"
        },
        "ENFP": {
          name: 'personality_12',
          context: 'personality_12_context',
          secret: "personality_12_secret",
          path: "/MBTI/ENFP.jpg"
        },
        "ISTJ": {
          name: 'personality_13',
          context: 'personality_13_context',
          secret: "personality_13_secret",
          path: "/MBTI/ISTJ.jpg"
        },
        "ISFJ": {
          name: 'personality_14',
          context: 'personality_14_context',
          secret: "personality_14_secret",
          path: "/MBTI/ISFJ.jpg"
        },
        "INTJ": {
          name: 'personality_15',
          context: 'personality_15_context',
          secret: "personality_15_secret",
          path: "/MBTI/INTJ.jpg"
        },
        "INFJ": {
          name: 'personality_16',
          context: 'personality_16_context',
          secret: "personality_16_secret",
          path: "/MBTI/INFJ.jpg"
        }
      },
      selectedLanguage: this.$i18n.locale,
    }
  },
  computed: {
    personality() {
        return this.personalityType[this.$route.params.type];
    }
  }
};
</script>

<style scoped>
.container {
  background-image: url('/personality-test/images/bg.jpg');
  background-size: cover;
  background-position: center;
  opacity: 0.9;
  height: 100%;
}
</style>