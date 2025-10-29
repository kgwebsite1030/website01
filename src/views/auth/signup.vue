<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
    <AuthCard title="创建账户" subtitle="注册一个新账户开始购物">
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            id="firstName"
            label="名"
            type="text"
            v-model="form.firstName"
            placeholder="请输入您的名"
            required
            :error="errors.firstName"
          />
          
          <FormInput
            id="lastName"
            label="姓"
            type="text"
            v-model="form.lastName"
            placeholder="请输入您的姓"
            required
            :error="errors.lastName"
          />
        </div>
        
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
          placeholder="请输入密码"
          required
          :error="errors.password"
        />
        
        <FormInput
          id="confirmPassword"
          label="确认密码"
          type="password"
          v-model="form.confirmPassword"
          placeholder="请再次输入密码"
          required
          :error="errors.confirmPassword"
        />
        
        <div class="flex items-center">
          <input
            id="agree-terms"
            name="agree-terms"
            type="checkbox"
            v-model="form.agreeTerms"
            class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            required
          />
          <label for="agree-terms" class="ml-2 block text-sm text-gray-700 dark:text-gray-300">
            我同意
            <a href="#" class="text-primary-600 hover:text-primary-500">服务条款</a>
            和
            <a href="#" class="text-primary-600 hover:text-primary-500">隐私政策</a>
          </label>
        </div>
        
        <div>
          <AuthButton :loading="loading">
            注册
          </AuthButton>
        </div>
      </form>
      
      <div class="mt-6 text-center">
        <p class="text-sm text-gray-600 dark:text-gray-400">
          已有账户?
          <RouterLink to="/auth/signin" class="font-medium text-primary-600 hover:text-primary-500">
            登录
          </RouterLink>
        </p>
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
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  agreeTerms: false
})

const errors = reactive({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: ''
})

function handleSubmit() {
  // 重置错误
  Object.keys(errors).forEach(key => {
    errors[key as keyof typeof errors] = ''
  })
  
  // 简单验证
  if (!form.firstName) {
    errors.firstName = '请输入名'
    return
  }
  
  if (!form.lastName) {
    errors.lastName = '请输入姓'
    return
  }
  
  if (!form.email) {
    errors.email = '请输入邮箱地址'
    return
  }
  
  if (!form.password) {
    errors.password = '请输入密码'
    return
  }
  
  if (form.password.length < 6) {
    errors.password = '密码长度至少为6位'
    return
  }
  
  if (form.password !== form.confirmPassword) {
    errors.confirmPassword = '两次输入的密码不一致'
    return
  }
  
  if (!form.agreeTerms) {
    // 使用错误提示替代alert
    errors.firstName = '请同意服务条款和隐私政策'
    return
  }
  
  try {
    loading.value = true
    
    // 这里添加实际的注册逻辑
    // 例如: await userStore.register(form)
    
    // 模拟注册延迟
    setTimeout(() => {
      // 注册成功后跳转到登录页
      router.push('/auth/signin')
      loading.value = false
    }, 1000)
  } catch (error) {
    console.error('注册失败:', error)
    // 处理注册错误
    loading.value = false
  }
}
</script>
