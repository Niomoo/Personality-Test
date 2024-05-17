import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './index.css'
import { createI18n } from 'vue-i18n'

import zhLocale from './locales/zh.json'
import enLocale from './locales/en.json'
import jaLocale from './locales/ja.json'
import koLocale from './locales/ko.json'

const i18n = createI18n({
  locale: 'en',
  messages: {
    zh: zhLocale,
    en: enLocale,
    ja: jaLocale,
    ko: koLocale
  }
})

const app = createApp(App).use(store)

app.use(router)
app.use(i18n)
app.mount('#app')
