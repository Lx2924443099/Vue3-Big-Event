import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores'

let userStore

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/views/Layout/LayoutContainer.vue'),
      redirect: '/article/manage',
      children: [
        {
          path: '/article/manage',
          name: 'manage',
          component: () => import('@/views/Article/ArticleManage.vue')
        },
        {
          path: '/article/channel',
          name: 'channel',
          component: () => import('@/views/Article/ArticleChannel.vue')
        },
        {
          path: '/user/profile',
          name: 'profile',
          component: () => import('@/views/User/UserProfile.vue')
        },
        {
          path: '/user/avatar',
          name: 'avatar',
          component: () => import('@/views/User/UserAvatar.vue')
        },
        {
          path: '/user/password',
          name: 'password',
          component: () => import('@/views/User/UserPassword.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login/LoginPage.vue')
    }
  ]
})

router.beforeEach((to) => {
  if (!userStore) {
    userStore = useUserStore()
  }
  if (to.name != 'login') {
    if (!userStore.token) {
      router.push('/login')
    }
  }
})

export default router
