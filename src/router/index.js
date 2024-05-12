import { createRouter, createWebHistory } from 'vue-router'
import QuestionPage from '@/views/QuestionPage.vue'
import ResultsPage from '@/views/ResultsPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: QuestionPage
    },
    {
      path: 'results',
      component: ResultsPage
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router
