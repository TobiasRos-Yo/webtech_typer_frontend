import { createRouter, createWebHistory } from 'vue-router'
import WordsView from '@/views/WordsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'words',
      component: WordsView
    }
  ]
})

export default router
