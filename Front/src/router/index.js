import { createRouter, createWebHistory } from 'vue-router'

import UserView from '../views/UserView.vue'
import LoginView from '../views/LoginView.vue'
import AdminView from '../views/AdminView.vue'


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
      {
        path: '/',
        name: 'login',
        component: LoginView
      },
      {
        path: '/user',
        name: 'user',
        component: UserView
      },
      {
        path: '/admin',
        name: 'admin',
        component: AdminView
      },
      {
        path: '/admin-archive',
        name: 'admin-archive',
        component: AdminView
      }
    ]

    })

    export default router