<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import AuthButton from './components/AuthButton.vue'
import AuthCard from './components/AuthCard.vue'
import FormInput from './components/FormInput.vue'

const router = useRouter()
const loading = ref(false)

const form = reactive({
  email: '',
  password: '',
  rememberMe: false,
  verify: '',
})

const errors = reactive({
  email: '',
  password: '',
  verify: '',
})

function handleSubmit() {
  // 重置错误
  errors.email = ''
  errors.password = ''

  // 简单验证
  if (!form.email) {
    errors.email = '请输入邮箱地址'
    return
  }

  if (!form.password) {
    errors.password = '请输入密码'
    return
  }

  try {
    loading.value = true

    // 这里添加实际的登录逻辑
    // 例如: await userStore.login(form.email, form.password)

    // 模拟登录延迟
    setTimeout(() => {
      // 登录成功后跳转
      router.push('/')
      loading.value = false
    }, 1000)
  }
  catch (error) {
    console.error('登录失败:', error)
    // 处理登录错误
    loading.value = false
  }
}
</script>

<template>
  <div class="px-4 py-12 bg-gray-50 flex items-center justify-center lg:px-8 sm:px-6 dark:bg-gray-900">
    <AuthCard title="登录账户" subtitle="欢迎回来，请登录您的账户">
      <form class="space-y-6" @submit.prevent="handleSubmit">
        <FormInput
          id="email"
          v-model="form.email"
          label="邮箱地址"
          type="email"
          placeholder="请输入您的邮箱"
          required
          :error="errors.email"
        />

        <FormInput
          id="password"
          v-model="form.password"
          label="密码"
          type="password"
          placeholder="请输入您的密码"
          required
          :error="errors.password"
        />

        <FormInput
          id="verify"
          v-model="form.verify"
          label="邮箱地址"
          type="number"
          placeholder="请输入您的验证码"
          :maxlength="6"
          :error="errors.verify"
        />

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input
              id="remember-me"
              v-model="form.rememberMe"
              name="remember-me"
              type="checkbox"
              class="text-primary-600 focus:ring-primary-500 border-gray-300 rounded h-4 w-4"
            >
            <label for="remember-me" class="text-sm text-gray-700 ml-2 block dark:text-gray-300">
              记住我
            </label>
          </div>

          <div class="text-sm">
            <RouterLink to="/auth/forgot-password" class="text-primary-600 hover:text-primary-500 font-medium">
              忘记密码?
            </RouterLink>
          </div>
        </div>

        <div>
          <AuthButton :loading="loading">
            登录
          </AuthButton>
        </div>
      </form>

      <div class="mt-6">
        <div class="relative">
          <div class="flex items-center inset-0 absolute">
            <div class="border-t border-gray-300 w-full dark:border-gray-600" />
          </div>
          <div class="text-sm flex justify-center relative">
            <span class="text-gray-500 px-2 bg-white dark:text-gray-400 dark:bg-gray-800">
              或者
            </span>
          </div>
        </div>

        <div class="mt-6">
          <div class="mt-6">
            <RouterLink
              to="/auth/signup"
              class="text-sm text-gray-700 font-medium px-4 py-2 border border-gray-300 rounded-md bg-white inline-flex w-full shadow-sm justify-center dark:text-gray-200 dark:border-gray-600 dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              创建新账户
            </RouterLink>
          </div>
        </div>
      </div>
    </AuthCard>
  </div>
</template>

<style>
  input[type='number']::-webkit-outer-spin-button,
input[type='number']::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type='number'] {
  -moz-appearance: textfield;
}
</style>
