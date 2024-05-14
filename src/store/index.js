import { createStore } from 'vuex'

export default createStore({
  state: {
    currentQuestionIndex: 0,
    question: [
      {
        content: 'Q1: 今天是個好天氣，你和朋友準備外出聚餐，你會選擇',
        options: [
          {
            text: '探索一家新開的餐廳',
            category: 0,
            type: 1       // E
          },
          {
            text: '選擇一間熟悉的餐廳',
            category: 0,
            type: -1      // I
          }
        ]
      },
      {
        content: 'Q2: 今天工作繁忙，剛好有一小段時間可以喘息，你會選擇',
        options: [
          {
            text: '叫外賣',
            category: 1,
            type: 1       // S 
          },
          {
            text: '自己簡單做點吃的',
            category: 1,
            type: -1      // N
          }
        ]
      },
      {
        content: 'Q3: 你剛看完一本關於美食的書籍，你更傾向',
        options: [
          {
            text: '嘗試書中介紹的食譜',
            category: 0,
            type: 1       // T
          },
          {
            text: '繼續閱讀其他內容',
            category: 0,
            type: -1      // F
          }
        ]
      },
      {
        content: 'Q4: 久違地出國旅行，在旅行途中你會',
        options: [
          {
            text: '選擇熟悉的異國料理',
            category: 0,
            type: 1       // S
          },
          {
            text: '嘗試當地特色小吃',
            category: 0,
            type: -1      // N
          }
        ]
      },
      {
        content: 'Q5: 假日在家和家人一起吃飯，你通常會',
        options: [
          {
            text: '享用豐富的家常菜',
            category: 0,
            type: 1
          },
          {
            text: '選擇清淡健康的菜餚',
            category: 0,
            type: -1
          }
        ]
      },
      {
        content: 'Q6: 哇又胖了...決定減肥的你會',
        options: [
          {
            text: '嚴格控制飲食',
            category: 0,
            type: 1
          },
          {
            text: '偶爾放縱一下',
            category: 0,
            type: -1
          }
        ]
      },
      {
        content: 'Q7: 和很久沒見面的朋友一起去野餐，你更傾向',
        options: [
          {
            text: '購買現成的食物',
            category: 0,
            type: 1
          },
          {
            text: '自己準備食物',
            category: 0,
            type: -1
          }
        ]
      },
      {
        content: 'Q8: 你正在學習新的烹飪技巧，此時會選擇',
        options: [
          {
            text: '嘗試精緻的甜點',
            category: 0,
            type: 1
          },
          {
            text: '從簡單的菜餚開始',
            category: 0,
            type: -1
          }
        ]
      },
      {
        content: 'Q9: 在旅行途中發現了新的食材，你更傾向',
        options: [
          {
            text: '深入了解食菜的特性',
            category: 0,
            type: 1
          },
          {
            text: '直接嘗試用來做菜',
            category: 0,
            type: -1
          }
        ]
      },
      {
        content: 'Q10: 來到了一場高級重要的宴會，你會傾向',
        options: [
          {
            text: '選擇精緻的料理',
            category: 0,
            type: 1
          },
          {
            text: '選擇熟悉的排餐',
            category: 0,
            type: -1
          }
        ]
      },
      {
        content: 'Q11: 準備規劃一場異國旅行，你會傾向',
        options: [
          {
            text: '尋找當地特色美食',
            category: 0,
            type: 1
          },
          {
            text: '比較在外國的台灣美食',
            category: 0,
            type: -1
          }
        ]
      },
      {
        content: 'Q12: 你將主辦一個家庭聚會，會更傾向',
        options: [
          {
            text: '親自下廚',
            category: 0,
            type: 1
          },
          {
            text: '訂購外燴服務',
            category: 0,
            type: -1
          }
        ]
      }
    ],
    userCurrentPersonality: {
      0: 0,
      1: 0,
      2: 0,
      3: 0,
    },
    personalityType: [
      {
        "EN"
      }
    ],
    userPersonality: {}
  },
  getters: {},
  mutations: {
    setCurrentQuestionIndex(state, index) {
      state.currentQuestionIndex = index
    },
    updateUserPersonality(state, answer) {
      state.userCurrentPersonality[answer.category] += answer.type
    },
    setPersonalityType(state) {
      let type = '';
      if(state.userCurrentPersonality[0] > 0) {
        type += 'E'
      } else {
        type += 'I';
      }
      if(state.userCurrentPersonality[1] > 0) {
        type += 'N';
      } else {
        type += 'S';
      }
      if(state.userCurrentPersonality[2] > 0) {
        type += 'T';
      } else {
        type += 'F';
      }
      if(state.userCurrentPersonality[3] > 0) {
        type += 'P';
      } else {
        type += 'J';
      }
      state.personalityType
    }
  },
  actions: {
    selectOption({ commit }, answer) {
      if (this.state.currentQuestionIndex < this.state.question.length) {
        commit('updateUserPersonality', answer)
        commit('setCurrentQuestionIndex', this.state.currentQuestionIndex + 1)
      } else {
        commit('setPersonalityType')
      }
    }
  },
  modules: {}
})
