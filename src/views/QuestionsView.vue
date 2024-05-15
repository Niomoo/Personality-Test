<template>
  <div>
    <h2>測測你是哪種食物？</h2>
    <div v-if="!allQuestionsAnswered">
      <question-component 
        :key="currentQuestionIndex"
        :question="currentQuestion"
        @answer="saveAnswer($event)"
      />
    </div>
    <result-component
      v-if="allQuestionsAnswered"
      :personalityType="calculatePersonalityType"
      @retake="resetTest"
    />
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
          content: 'Q1: 你和朋友去旅行，來到一個陌生的城市，你們想找一家餐廳吃晚餐，你會選擇',
          options: [
            {
              text: '嘗試當地最有名的特色小吃',
              category: 0,
              type: 1       // E
            },
            {
              text: '選擇一間熟悉了國際連鎖餐廳',
              category: 0,
              type: -1      // I
            }
          ]
        },
        {
          content: 'Q2: 週末下午，你想做頓豐盛的午餐，你會選擇',
          options: [
            {
              text: '自己動作手做飯，享受烹飪的過程，並嘗試新的菜單',
              category: 1,
              type: 1       // S 
            },
            {
              text: '叫外賣或去餐廳吃飯，因為你不想花時間做飯',
              category: 1,
              type: -1      // N
            }
          ]
        },
        {
          content: 'Q3: 你正在參加一個重要的會議，需要保持清醒和專注，你更傾向',
          options: [
            {
              text: '一份營養均衡的沙拉，提供你所需的能量和營養',
              category: 2,
              type: 1       // T
            },
            {
              text: '一份美味的漢堡，讓你感到滿足和快樂',
              category: 2,
              type: -1      // F
            }
          ]
        },
        {
          content: 'Q4: 情人節想找間餐廳約會，你會選擇',
          options: [
            {
              text: '環境優雅、餐點精緻的法式餐廳，享受浪漫的氛圍',
              category: 3,
              type: 1       // J
            },
            {
              text: '溫馨舒適、餐點簡單的家庭餐廳，享受輕鬆的氛圍',
              category: 3,
              type: -1      // P
            }
          ]
        },
        {
          content: 'Q5: 和家人一起慶祝節日，想準備一道菜餚，你會選擇',
          options: [
            {
              text: '媽媽拿手的紅燒肉，因為是節日必備的料理',
              category: 1,
              type: 1       // S
            },
            {
              text: '最近網路上很紅的創意料理，因為你想嘗試新的烹飪方法',
              category: 1,
              type: -1      // N
            }
          ]
        },
        {
          content: 'Q6: 準備在家人面前大展身手的你正苦惱如何製作這道菜餚，你會',
          options: [
            {
              text: '仔細閱讀食譜，了解每一步的烹飪步驟',
              category: 2,
              type: 1       // T
            },
            {
              text: '觀看美食節目，學習廚師的烹飪技巧',
              category: 2,
              type: -1      // F
            }
          ]
        },
        {
          content: 'Q7: 和很久沒見面的朋友一起去野餐，你更傾向',
          options: [
            {
              text: '和朋友一起分享美食，談天說地',
              category: 0,
              type: 1       // E
            },
            {
              text: '帶一份自己做的料理，與朋友分享你的廚藝',
              category: 0,
              type: -1      // I
            }
          ]
        },
        {
          content: 'Q8: 你正在學習新的烹飪技巧，此時會選擇',
          options: [
            {
              text: '嘗試精緻的甜點',
              category: 3,
              type: 1       // J
            },
            {
              text: '從簡單的菜餚開始',
              category: 3,
              type: -1      // P
            }
          ]
        },
        {
          content: 'Q9: 在旅行途中發現了新的食材，你更傾向',
          options: [
            {
              text: '深入了解食材的特性',
              category: 2,
              type: 1       // T
            },
            {
              text: '直接嘗試用來做菜',
              category: 2,
              type: -1      // F
            }
          ]
        },
        {
          content: 'Q10: 發現最近有點胖了...想保持身材的你會選擇',
          options: [
            {
              text: '清淡健康的蔬菜沙拉，幫助控制卡路里',
              category: 1,
              type: -1      // N
            },
            {
              text: '營養均衡的便當，提供所需的熱量',
              category: 1,
              type: 1       // S
            }
          ]
        },
        {
          content: 'Q11: 準備規劃一場異國旅行，你會傾向',
          options: [
            {
              text: '尋找當地特色美食',
              category: 0,
              type: 1       // E
            },
            {
              text: '比較在外國的台灣美食',
              category: 0,
              type: -1      // I
            }
          ]
        },
        {
          content: 'Q12: 臨時決定晚餐的去處，你會',
          options: [
            {
              text: '立刻上網查資料，做好附近餐廳的比較',
              category: 3,
              type: 1       // J
            },
            {
              text: '隨性去哪裡就去哪裡，看當下狀況',
              category: 3,
              type: -1      // P
            }
          ]
        }
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
          context: "溫暖賅意如同媽媽的手路菜，是體貼入微的工作者和守護者。",
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
    }
  }
};
</script>