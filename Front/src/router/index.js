import { createRouter, createWebHistory } from 'vue-router'

import UserView from '../views/UserView.vue'
import LoginView from '../views/LoginView.vue'
import Account from '../views/Account.vue'


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
        path: '/konto/:id',
        name: "account",
        component: Account
      }
    ]

    })

    export default router