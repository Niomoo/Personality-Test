<template>
  <div class="flex flex-col items-center justify-center h-svh bg-gray-100">
    <div class="flex justify-between items-center p-4">
      <select v-model="selectedLanguage" @change="changeLanguage" class="border border-gray-300 rounded-md px-3 py-2">
        <option value="en">English</option>
        <option value="zh">中文</option>
        <option value="ja">日本語</option>
        <option value="ko">한국어</option>
      </select>
    </div>
    <div class="w-full max-w-md min-w-md p-6 m-4 space-y-8 bg-white shadow-md rounded-lg">
      <h1 class="text-3xl font-bold text-center mb-12">測測你是哪種食物？</h1>
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
</template>

<script>
import QuestionComponent from '@/components/QuestionComponent.vue';
import ResultComponent from '@/components/ResultComponent.vue';
export default {
  components: { 
    QuestionComponent,
    ResultComponent
  },
  data() {
    return {
      questions: [
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
      ],
      userAnswers: {
        0: 0,
        1: 0,
        2: 0,
        3: 0,
      },
      personalityType: {
        "ESTJ": {
          name: "烤雞",
          context: "像烤雞一樣傳統經典，實在可靠。注重事實和效率，是踏實負責的領導者。",
          secret: "表面嚴肅，私底下也愛偷吃零食，放鬆一下"
        },
        "ESFJ": {
          name: "家常便當",
          context: "溫馨貼心如同媽媽的家常便當，注重人情世故，是出色的照顧者。",
          secret: "雖然人見人愛，但私底下也會偶爾任性妥協。"
        },
        "ENTJ": {
          name: "麻辣火鍋",
          context: "像火鍋那樣熱情洋溢，雄心壯志，是天生的領袖和決策者。",
          secret: "外表理性冷靜，但在某些小事上也會較計較。"
        },
        "ENFJ": {
          name: "主廚新創意料理",
          context: "像大廚創意料理般富想像力，熱心善於溝通，是出色的教練和引路人。",
          secret: "雖然看似總是友善，但有自己的原則和底線。"
        },
        "ISTP": {
          name: "生魚片",
          context: "簡單樸素如生魚片，喜歡用實在的解決問題，是冷靜沉著的實幹家。",
          secret: "表面冷淡，私底下也會為美食而動容。"
        },
        "ISFP": {
          name: "手工 Pizza",
          context: "像手工 Pizza 般用心製作，注重體驗感受，是富有同理心的藝術家。",
          secret: "外表柔順隨性，但也會為重要事物而堅持。"
        },
        "INTP": {
          name: "藍帶素食",
          context: "如同創新的藍帶素食，富有獨立思考的理性，是熱衷於探索的學者。",
          secret: "看似高深莫測，其實私底下也會做些小錯誤。"
        },
        "INFP": {
          name: "手工甜點",
          context: "如同賞心悅目的手工甜點，富有同情心和想像力，是充滿理想主義的調停者。",
          secret: "外表柔弱多情，但內心也有堅韌不拔的一面。"
        },
        "ESTP": {
          name: "美式漢堡餐",
          context: "像熱情洋溢的漢堡餐般活潑熱鬧，是善於體驗刺激的遊戲玩家。",
          secret: "看似瀟灑不羈，私底下也會為人著想。"
        },
        "ESFP": {
          name: "七彩鬆餅",
          context: "如同繽紛的七彩鬆餅般活潑奔放，是熱愛生活和歡笑的娛樂家。",
          secret: "外表熱情如火，但也需要適當的獨處時間。"
        },
        "ENTP": {
          name: "東南亞異國風味餐",
          context: "像東南亞風味餐般新鮮獨特，善於創新，是充滿幽默和想像力的改革家。",
          secret: "口無遺餘善於辯論，私下也會對某些事物三思而行。"
        },
        "ENFP": {
          name: "自助百匯餐",
          context: "如同豐富的自助百匯餐般熱情包羅萬象，是富有同理心的大使。",
          secret: "看似不拘小節，但也會為理想而堅持己見。"
        },
        "ISTJ": {
          name: "家鄉鹹湯圓",
          context: "如飽含家鄉風味的鹹湯圓般值得信賴，是實事求是的管家。",
          secret: "外表嚴肅認真，私下也會放鬆一下。"
        },
        "ISFJ": {
          name: "媽媽手路菜",
          context: "溫暖如同媽媽的手路菜，是體貼入微的工作者和守護者。",
          secret: "雖然謙遜內向，但也渴望被人理解和認同。"
        },
        "INTJ": {
          name: "創新素食料理",
          context: "像創新素食餐般獨樹一幟，遠見卓識，是有獨到理念的策士。",
          secret: "表面理性冷靜，私下也會為特定興趣而著迷。"
        },
        "INFJ": {
          name: "酸辣手工湯麵",
          context: "如酸辣手工湯麵般獨特複雜，有獨到見解，是富有洞察力的諮詢顧問。",
          secret: "雖然神秘高深，但也需要被人理解和包容。"
        }
      },
      currentQuestionIndex: 0,
      selectedLanguage: this.$i18n.locale
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
    saveAnswer(answer) {
      this.userAnswers[answer.category] += answer.type
      this.currentQuestionIndex += 1
    },
    resetTest() {
      for(let i = 0; i < 3; i++) {
        this.userAnswers[i] = 0
      }
      this.currentQuestionIndex = 0
    },
    changeLanguage(locale) {
      this.$i18n.locale = locale
      this.selectedLanguage = locale
    }
  }
};
</script>