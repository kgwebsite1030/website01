import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'
import AuthLayout from '~/layouts/AuthLayout.vue'
import DefaultLayout from '~/layouts/DefaultLayout.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/index',
  },
  {
    path: '/index',
    name: 'index',
    component: DefaultLayout,
    children: [
      {
        path: '',
        name: 'IndexPage',
        component: () => import('~/views/index.vue'),
      },
      {
        path: '/about-us',
        name: 'AboutUsPage',
        component: () => import('~/views/about-us.vue'),
      },
      {
        path: '/cart',
        name: 'CartPage',
        component: () => import('~/views/cart.vue'),
      },
      {
        path: '/favorite',
        name: 'FavoritePage',
        component: () => import('~/views/favorite.vue'),
      },
      {
        path: '/checkout',
        name: 'Checkout',
        component: () => import('~/views/checkout/index.vue'),
      },
    ],
  },
  {
    path: '/product',
    name: 'product',
    component: DefaultLayout,
    children: [
      {
        path: '',
        name: 'ProductPage',
        component: () => import('~/views/product/index.vue'),
      },
      {
        path: 'detail',
        name: 'ProductDetailPage',
        component: () => import('~/views/product/detail.vue'),
      },
      {
        path: 'popular',
        name: 'ProductPopularPage',
        component: () => import('~/views/product/popular.vue'),
      },
    ],
  },
  {
    path: '/auth',
    name: 'auth',
    component: AuthLayout,
    children: [
      {
        path: '/auth/signin',
        name: 'Signin',
        component: () => import('~/views/auth/signin.vue'),
      },
      {
        path: '/auth/signup',
        name: 'Signup',
        component: () => import('~/views/auth/signup.vue'),
      },
      {
        path: '/auth/forgot-password',
        name: 'ForgotPassword',
        component: () => import('~/views/auth/forgot-password.vue'),
      },
    ],
  },

]

const router = createRouter({
  routes,
  history: createWebHashHistory(),
})

export default router
