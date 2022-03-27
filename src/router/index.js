import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/MainPage.vue';
import Shop from '../views/ShopPage.vue';
import Autorization from '../views/AutorizationPage.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/login',
    name: 'login',
    component: Autorization,
  },
  {
    path: '/shop',
    name: 'shop',
    component: Shop,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
