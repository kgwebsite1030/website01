<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { generateCaptcha } from '../../utils/captcha'

const router = useRouter()
const loading = ref(false)
const isEmailCaptcha = ref(false)

const form = reactive({
  email: '',
  password: '',
  captcha: '',
  emailCaptcha: '',
})
const errors = reactive({
  email: '',
  password: '',
  captcha: '',
  emailCaptcha: '',
})
const captchaImg = ref(generateCaptcha())

function refreshCaptcha() {
  captchaImg.value = generateCaptcha()
  form.captcha = ''
}

function handleSubmit() {
  // 重置错误
  errors.email = ''
  errors.password = ''
  errors.captcha = ''
  errors.emailCaptcha = ''

  if (!form.email) {
    errors.email = '请输入邮箱地址'
    return
  }
  if (!form.password && !isEmailCaptcha.value) {
    errors.password = '请输入密码'
    return
  }
  if (!form.captcha && !isEmailCaptcha.value) {
    errors.captcha = '请输入验证码'
    return
  }
  if (!isEmailCaptcha.value) {
    if (form.captcha.toLowerCase() !== captchaImg.value.toLowerCase()) {
      errors.captcha = '验证码错误'
      refreshCaptcha()
      return
    }
  }
  else {
    if (!form.emailCaptcha) {
      errors.emailCaptcha = '请输入邮箱验证码'
      return
    }
  }
  loading.value = true
  // 伪登录逻辑：1秒后跳转首页
  setTimeout(() => {
    loading.value = false
    router.push('/')
  }, 1000)
}

function gotoForget() {
  router.push('/auth/forgot-password')
}
function gotoSignup() {
  router.push('/auth/signup')
}
</script>

<template>
  <div class="mt-10 p-2 flex items-center justify-center md:mt-30">
    <div class="px-8 py-10 rounded-lg max-w-sm w-full">
      <form class="space-y-6" @submit.prevent="handleSubmit">
        <div>
          <label class="mb-1 block" for="email">邮箱</label>
          <input
            id="email" v-model="form.email" type="email" placeholder="请输入邮箱" autocomplete="email" required
            class="input input-bordered focus:ring-primary-500 px-3 py-2 border rounded w-full focus:outline-none focus:ring-2"
          >
          <div v-if="errors.email" class="text-sm text-red-500 mt-1">
            {{ errors.email }}
          </div>
        </div>
        <div v-if="!isEmailCaptcha">
          <label class="mb-1 block" for="password">密码</label>
          <input
            id="password" v-model="form.password" type="password" placeholder="请输入密码"
            autocomplete="current-password" required
            class="input input-bordered focus:ring-primary-500 px-3 py-2 border rounded w-full focus:outline-none focus:ring-2"
          >
          <div v-if="errors.password" class="text-sm text-red-500 mt-1">
            {{ errors.password }}
          </div>
        </div>
        <div v-if="isEmailCaptcha">
          <label class="mb-1 block" for="emailCaptcha">邮箱验证码</label>
          <input
            id="emailCaptcha" v-model="form.emailCaptcha" type="text" placeholder="请输入邮箱验证码"
            autocomplete="current-emailCaptcha" required
            class="input input-bordered focus:ring-primary-500 px-3 py-2 border rounded w-full focus:outline-none focus:ring-2"
          >
          <div v-if="errors.emailCaptcha" class="text-sm text-red-500 mt-1">
            {{ errors.emailCaptcha }}
          </div>
        </div>
        <div v-if="!isEmailCaptcha">
          <label class="mb-1 block" for="captcha">验证码</label>
          <div class="flex gap-3 items-center">
            <div
              class="text-lg tracking-widest font-mono px-2 py-1 rounded flex h-10 min-w-[90px] cursor-pointer select-none items-center justify-center"
              title="点击更换验证码" @click="refreshCaptcha"
            >
              {{ captchaImg }}
            </div>
            <input
              id="captcha" v-model="form.captcha" type="text" maxlength="6" placeholder="请输入验证码" autocomplete="off"
              required
              class="input input-bordered focus:ring-primary-500 px-3 py-2 border rounded flex-1 dark:text-white focus:outline-none focus:ring-2"
            >
          </div>
          <div v-if="errors.captcha" class="text-sm text-red-500 mt-1">
            {{ errors.captcha }}
          </div>
        </div>
        <button
          type="submit" :disabled="loading"
          class="bg-primary-600 dark:bg-primary-500 hover:bg-primary-700 dark:hover:bg-primary-600 focus:ring-primary-500 font-medium px-4 py-2 border rounded flex w-full transition justify-center focus:outline-none disabled:opacity-60 focus:ring-2 focus:ring-offset-2"
        >
          <span v-if="!loading">登录</span>
          <span v-else>登录中...</span>
        </button>
      </form>
      <div class="text-s mt-6 flex items-center justify-end">
        <a
          href="javascript:void(0)" class="hover:text-primary-600 underline"
          @click="() => isEmailCaptcha = !isEmailCaptcha"
        >{{ isEmailCaptcha ? '邮箱验证码登录' : '密码登录' }}</a>
      </div>
      <div class="text-sm mt-6 flex items-center justify-between">
        <a href="javascript:void(0)" class="hover:text-primary-600 underline" @click.prevent="gotoForget">忘记密码？</a>
        <a href="javascript:void(0)" class="hover:text-primary-600 underline" @click.prevent="gotoSignup">注册</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.input {
  @apply border-gray-300 dark:border-gray-600;
}
</style>
