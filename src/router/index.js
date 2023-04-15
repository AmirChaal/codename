import { createRouter, createWebHistory } from 'vue-router'
import JeuView from '../views/JeuView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/jeu/:idpartie/:iduser',
      name: 'JeuView',
      component: JeuView
    }
  ]
})

export default router
