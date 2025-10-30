<script setup lang="ts">
const router = useRouter()
const loading = ref(false)

const form = reactive({
  email: '',
  captcha: '',
  password: '',
  confirmPassword: '',
})
const errors = reactive({
  email: '',
  captcha: '',
  password: '',
  confirmPassword: '',
})

function handleSubmit() {
  // 重置错误
  errors.email = ''
  errors.captcha = ''
  errors.password = ''
  errors.confirmPassword = ''

  if (!form.email) {
    errors.email = '请输入邮箱地址'
    return
  }
  if (!form.captcha) {
    errors.captcha = '请输入验证码'
    return
  }
  if (!form.password) {
    errors.password = '请输入密码'
    return
  }
  if (!form.confirmPassword) {
    errors.confirmPassword = '请确认密码'
    return
  }
  if (form.confirmPassword && (form.confirmPassword !== form.password)) {
    errors.confirmPassword = '两次秘密不一致'
    return
  }
  loading.value = true
  // 伪登录逻辑：1秒后跳转首页
  setTimeout(() => {
    loading.value = false
    gotoSignin()
  }, 1000)
}

function gotoSignin() {
  router.push('/auth/signin')
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
        <div>
          <label class="mb-1 block" for="captcha">验证码</label>
          <input
            id="captcha" v-model="form.captcha" type="text" placeholder="请输入验证码" autocomplete="current-captcha"
            required
            class="input input-bordered focus:ring-primary-500 px-3 py-2 border rounded w-full focus:outline-none focus:ring-2"
          >
          <div v-if="errors.captcha" class="text-sm text-red-500 mt-1">
            {{ errors.captcha }}
          </div>
        </div>
        <div>
          <label class="mb-1 block" for="password">密码</label>
          <input
            id="password" v-model="form.password" type="password" placeholder="请输入密码" autocomplete="password"
            required
            class="input input-bordered focus:ring-primary-500 px-3 py-2 border rounded w-full focus:outline-none focus:ring-2"
          >
          <div v-if="errors.password" class="text-sm text-red-500 mt-1">
            {{ errors.password }}
          </div>
        </div>
        <div>
          <label class="mb-1 block" for="confirmPassword">确认新密码</label>
          <input
            id="confirmPassword" v-model="form.confirmPassword" type="password" placeholder="请确认秘密"
            autocomplete="password" required
            class="input input-bordered focus:ring-primary-500 px-3 py-2 border rounded w-full focus:outline-none focus:ring-2"
          >
          <div v-if="errors.confirmPassword" class="text-sm text-red-500 mt-1">
            {{ errors.confirmPassword }}
          </div>
        </div>
        <button
          type="submit" :disabled="loading"
          class="bg-primary-600 dark:bg-primary-500 hover:bg-primary-700 dark:hover:bg-primary-600 focus:ring-primary-500 font-medium px-4 py-2 border rounded flex w-full transition justify-center focus:outline-none disabled:opacity-60 focus:ring-2 focus:ring-offset-2"
        >
          <span v-if="!loading">重置密码</span>
          <span v-else>重置密码中...</span>
        </button>
      </form>

      <div class="text-sm mt-6 flex items-center justify-end">
        <a href="javascript:void(0)" class="hover:text-primary-600 underline" @click.prevent="gotoSignin">返回登录页</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.input {
  @apply border-gray-300 dark:border-gray-600;
}
</style>
