<template>
  <div class="container flex flex-col items-center justify-center p-8">
    <div class="w-full p-6 m-4 bg-white shadow-md rounded-lg overflow-y-auto font-cubic">
      <h1 class="text-2xl font-bold text-center">{{ $t('title') }}</h1>
      <div v-if="showIntro" class="flex flex-col items-center">
        <div class="flex justify-between items-center p-2">
          <select v-model="selectedLanguage" class="border text-gray-500 border-gray-300 rounded-md px-3 py-2">
            <option value="en">English</option>
            <option value="zh">中文</option>
            <option value="ja">日本語</option>
            <option value="ko">한국어</option>
          </select>
        </div>
        <introduction-component 
          :locale="selectedLanguage"
          @start="startTest" 
        />
      </div>
      <div v-else>
        <div v-if="!allQuestionsAnswered">
          <question-component 
            :key="currentQuestionIndex"
            :question="currentQuestion"
            @answer="saveAnswer($event)"
          />
        </div>
        <result-component
          v-else
          :personalityType="calculatePersonalityType"
          @retake="resetTest"
        />
      </div>  
    </div>
  </div>
</template>

<script>
import IntroductionComponent from "@/components/IntroductionComponent.vue";
import QuestionComponent from '@/components/QuestionComponent.vue';
import ResultComponent from '@/components/ResultComponent.vue';

export default {
  components: { 
    IntroductionComponent,
    QuestionComponent,
    ResultComponent
  },
  data() {
    return {
      questions: [],
      userAnswers: {
        0: 0,
        1: 0,
        2: 0,
        3: 0,
      },
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
      currentQuestionIndex: 0,
      selectedLanguage: this.$i18n.locale,
      showIntro: true,
    }
  },
  watch: {
    selectedLanguage(newVal) {
      this.changeLanguage(newVal);
    }
  },
  computed: {
    currentQuestion() {
      return this.questions[this.currentQuestionIndex];
    },
    allQuestionsAnswered() {
      return this.currentQuestionIndex === this.questions.length;
    },
    calculatePersonalityType() {
      let type = ''
      if(this.userAnswers[0] > 0) {
        type += 'E'
      } else {
        type += 'I'
      }
      if(this.userAnswers[1] > 0) {
        type += 'N'
      } else {
        type += 'S'
      }
      if(this.userAnswers[2] > 0) {
        type += 'T'
      } else {
        type += 'F'
      }
      if(this.userAnswers[3] > 0) {
        type += 'P'
      } else {
        type += 'J'
      }
      return this.personalityType[type]
    },
  },
  methods: {
    startTest() {
      this.showIntro = false
      this.getQuestions()
    },
    saveAnswer(answer) {
      this.userAnswers[answer.category] += answer.type
      this.currentQuestionIndex += 1
    },
    resetTest() {
      for(let i = 0; i < 3; i++) {
        this.userAnswers[i] = 0
      }
      this.currentQuestionIndex = 0
      this.showIntro = true
    },
    changeLanguage(locale) {
      this.$i18n.locale = locale
      this.getQuestions()
    },
    getQuestions() {
      this.questions = [
        {
          content: 'question1',
          options: [
            {
              text: 'options_1_0',
              category: 3,
              type: 1       
            },
            {
              text: 'options_1_1',
              category: 3,
              type: -1      
            }
          ]
        },
        {
          content: 'question2',
          options: [
            {
              text: 'options_2_0',
              category: 2,
              type: 1       
            },
            {
              text: 'options_2_1',
              category: 2,
              type: -1      
            }
          ]
        },
        {
          content: 'question3',
          options: [
            {
              text: 'options_3_0',
              category: 3,
              type: 1       
            },
            {
              text: 'options_3_1',
              category: 3,
              type: -1      
            }
          ]
        },
        {
          content: 'question4',
          options: [
            {
              text: 'options_4_0',
              category: 0,
              type: 1       
            },
            {
              text: 'options_4_1',
              category: 0,
              type: -1      
            }
          ]
        },
        {
          content: 'question5',
          options: [
            {
              text: 'options_5_0',
              category: 1,
              type: 1       
            },
            {
              text: 'options_5_1',
              category: 1,
              type: -1      
            }
          ]
        },
        {
          content: 'question6',
          options: [
            {
              text: 'options_6_0',
              category: 2,
              type: 1       
            },
            {
              text: 'options_6_1',
              category: 2,
              type: -1      
            }
          ]
        },
        {
          content: 'question7',
          options: [
            {
              text: 'options_7_0',
              category: 0,
              type: 1       
            },
            {
              text: 'options_7_1',
              category: 0,
              type: -1      
            }
          ]
        },
        {
          content: 'question8',
          options: [
            {
              text: 'options_8_0',
              category: 1,
              type: -1       
            },
            {
              text: 'options_8_1',
              category: 1,
              type: 1      
            }
          ]
        },
        {
          content: 'question9',
          options: [
            {
              text: 'options_9_0',
              category: 2,
              type: -1       
            },
            {
              text: 'options_9_1',
              category: 2,
              type: 1      
            }
          ]
        },
        {
          content: 'question10',
          options: [
            {
              text: 'options_10_0',
              category: 3,
              type: 1       
            },
            {
              text: 'options_10_1',
              category: 3,
              type: -1      
            }
          ]
        },
        {
          content: 'question11',
          options: [
            {
              text: 'options_11_0',
              category: 1,
              type: -1       
            },
            {
              text: 'options_11_1',
              category: 1,
              type: 1      
            }
          ]
        },
        {
          content: 'question12',
          options: [
            {
              text: 'options_12_0',
              category: 0,
              type: -1       
            },
            {
              text: 'options_12_1',
              category: 0,
              type: 1      
            }
          ]
        },
      ]
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