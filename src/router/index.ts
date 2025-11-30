import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import VerifyView from '@/views/VerifyView.vue'
import DashboardView from '@/views/DashboardView.vue'
import { useAuthStore } from '@/stores'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/verify',
      name: 'verify',
      component: VerifyView,
    },
    {
      path: '/',
      name: 'dashboard',
      component: DashboardView,
      meta: { requiresAuth: true },
    },
  ],
})

router.beforeEach((to, _, next) => {
  const authStore = useAuthStore()
  const isAuthenticated = authStore?.isAuthenticated

  if (to.meta.requiresAuth && !isAuthenticated) {
    return next('/login')
  }

  if ((to.name === 'login' || to.name === 'verify') && isAuthenticated) {
    return next('/')
  }

  next()
})

export default router
