<template>
  <div class="bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
    <AuthCard title="登录账户" subtitle="欢迎回来，请登录您的账户">
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <FormInput
          id="email"
          label="邮箱地址"
          type="email"
          v-model="form.email"
          placeholder="请输入您的邮箱"
          required
          :error="errors.email"
        />
        
        <FormInput
          id="password"
          label="密码"
          type="password"
          v-model="form.password"
          placeholder="请输入您的密码"
          required
          :error="errors.password"
        />
        
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              v-model="form.rememberMe"
              class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label for="remember-me" class="ml-2 block text-sm text-gray-700 dark:text-gray-300">
              记住我
            </label>
          </div>
          
          <div class="text-sm">
            <RouterLink to="/auth/forgot-password" class="font-medium text-primary-600 hover:text-primary-500">
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
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-300 dark:border-gray-600"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
              或者
            </span>
          </div>
        </div>
        
        <div class="mt-6">
          <div class="mt-6">
            <RouterLink
              to="/auth/signup"
              class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              创建新账户
            </RouterLink>
          </div>
        </div>
      </div>
    </AuthCard>
  </div>
</template>

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
  rememberMe: false
})

const errors = reactive({
  email: '',
  password: ''
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
  } catch (error) {
    console.error('登录失败:', error)
    // 处理登录错误
    loading.value = false
  }
}
</script>
