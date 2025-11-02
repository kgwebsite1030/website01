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
        path: '/contact-us',
        name: 'ContactUsPage',
        component: () => import('~/views/contact-us.vue'),
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
    ],
  },
  {
    path: '/account',
    name: 'Account',
    component: DefaultLayout,
    children: [
      {
        path: '',
        name: 'AccountPage',
        component: () => import('~/views/account/index.vue'),
      },
    ],
  },
  {
    path: '/order',
    name: 'Order',
    component: DefaultLayout,
    children: [
      {
        path: '/order/tracking',
        name: 'OrderTrackingPage',
        component: () => import('~/views/order/tracking.vue'),
      },
      {
        path: '/order/detail',
        name: 'OrderDetailPage',
        component: () => import('~/views/order/detail.vue'),
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

const whiteList = ['/auth/signin', '/auth/signup', '/auth/forgot-password', '/product/detail', '/product', '/contact-us', '/favorite', '/cart', '/index']

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()

  const isLogin = userStore.isLogin

  if (whiteList.includes(to.path)) {
    next()
  }
  else {
    if (isLogin) {
      next()
    }
    else {
      next('/auth/signin')
    }
  }
})

export default router
