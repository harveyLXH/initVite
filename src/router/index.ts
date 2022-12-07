import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/main' },
  { path: '/main', name: 'main', component: () => import('@/views/main/index.vue') },
  { path: '/login', name: 'login', component: () => import('@/views/login/index.vue') },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: () => import('@/views/not-found/index.vue')
  }
]

const router = createRouter({
  routes,
  history: createWebHistory()
})

export default router
