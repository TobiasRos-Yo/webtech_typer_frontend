import { createRouter, createWebHistory } from 'vue-router'
import ScoresView from '@/views/ScoresView.vue'
import WordsView from '@/views/WordsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'words',
      component: WordsView
    },
    {
      path: '/scores',
      name: 'scores',
      component: ScoresView
    }
  ]
})

export default router
