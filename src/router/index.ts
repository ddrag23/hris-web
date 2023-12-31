import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AdminLayout from '@/layouts/AdminLayout.vue'
import master from './master'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { layout: AdminLayout, auth: true }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
      meta: { layout: AdminLayout, auth: true }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/auth/Login.vue')
    },
    {
      path: '/:catchAll(.*)',
      component: () => import('@/views/error/NotFoundView.vue')
    },
    ...master
  ]
})
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('access_token')
  if (to.name !== 'login' && !token) next({ name: 'login' })
  next()
})

export default router
