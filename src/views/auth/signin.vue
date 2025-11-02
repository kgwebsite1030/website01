<script setup lang="ts">
import type { FormInstance, FormItemRule } from 'element-plus'
import { useRequest } from 'alova/client'
import { emailLogin, login, sendEmailCode } from '~/api/user'
import { generateCaptcha, renderCaptchaToDataURL } from '~/utils/captcha'

const userSotore = useUserStore()
const router = useRouter()
const isEmailCaptcha = ref(false)
const _loading = ref(false)

const form = reactive({
  email: '',
  password: '',
  captcha: '',
  emailCaptcha: '',
})
const captchaImg = ref(renderCaptchaToDataURL(generateCaptcha()))

const formRef = useTemplateRef<FormInstance>('formRef')
const rules: Record<string, FormItemRule[]> = {
  email: [
    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
    { type: 'email', message: '邮箱格式不正确', trigger: ['blur', 'change'] },
  ],
  password: [
    { required: !isEmailCaptcha.value, message: '请输入邮箱地址', trigger: 'blur' },
  ],
  emailCaptcha: [
    { required: true, message: '请输入邮箱验证码', trigger: 'blur' },
  ],
  captcha: [
    { required: !isEmailCaptcha.value, message: '请输入验证码', trigger: 'blur' },
  ],
}

function refreshCaptcha() {
  captchaImg.value = renderCaptchaToDataURL(generateCaptcha())
  form.captcha = ''
}

function handleEmailLogin() {
  const { error, data, loading } = useRequest(() => emailLogin(form.email, form.emailCaptcha))
  watchEffect(() => _loading.value = loading.value)
  if (error) {
    return ElMessage.error(error.value?.message)
  }
  loginSuccess(data)
}

function handlePasswordLogin() {
  const { error, data, loading } = useRequest(() => login(form))
  watchEffect(() => _loading.value = loading.value)
  if (error) {
    return ElMessage.error(error.value?.message)
  }
  loginSuccess(data)
}

function handleSubmit() {
  formRef.value?.validate((valid: boolean) => {
    if (valid) {
      if (isEmailCaptcha.value) {
        handleEmailLogin()
      }
      else {
        handlePasswordLogin()
      }
    }
  })
}

function loginSuccess(data: any) {
  // 设置响应信息
  userSotore.setUserInfo(data.user)
  userSotore.setToken(data.token)
  router.push('/')
}

const countdown = ref(60)
const senEmailCodeFlag = ref(false)
let timer: ReturnType<typeof setInterval>

function stopCountdown() {
  clearInterval(timer)
  countdown.value = 60
  senEmailCodeFlag.value = false
}

function startCountdown() {
  timer = setInterval(() => {
    countdown.value--
    if (countdown.value === 0) {
      stopCountdown()
    }
  }, 1000)
}

function senEmailCode() {
  if (form.email === '') {
    formRef.value?.validateField('email')
    return
  }
  if (timer)
    return
  senEmailCodeFlag.value = true
  startCountdown()

  // 发送验证码到邮箱
  sendEmailCode(form.email).then(() => {
    ElMessage.success('验证码发送成功')
  }).catch((err: any) => {
    stopCountdown()
    ElMessage.error(err.data.message)
  })
}

function gotoForget() {
  router.push('/auth/forgot-password')
}
function gotoSignup() {
  router.push('/auth/signup')
}
</script>

<template>
  <div class="login_bg flex flex-1 items-center justify-center">
    <div class="m-4 p-4 rounded bg-white opacity-90 shadow md:w-sm">
      <h2 class="text-xl font-bold my-8 text-center">
        登录
      </h2>
      <el-form ref="formRef" :model="form" :rules="rules" label-position="top">
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" placeholder="请输入邮箱" autocomplete="email" />
        </el-form-item>
        <el-form-item v-if="!isEmailCaptcha" label="密码" prop="password">
          <el-input v-model="form.password" type="password" placeholder="请输入密码" autocomplete="current-password" />
        </el-form-item>
        <el-form-item v-if="isEmailCaptcha" label="邮箱验证码" prop="emailCaptcha">
          <el-input v-model="form.emailCaptcha" placeholder="请输入邮箱验证码" autocomplete="off">
            <template #append>
              <span v-if="!senEmailCodeFlag" @click="senEmailCode">发送邮箱验证码</span>
              <span v-if="senEmailCodeFlag">{{ countdown }} s</span>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item v-if="!isEmailCaptcha" label="验证码" prop="captcha">
          <div style="display: flex; gap: 8px; align-items: center">
            <img
              class="captchaImg" :src="captchaImg" style="min-width:90px;cursor:pointer;" title="点击更换验证码"
              @click="refreshCaptcha"
            >
            <el-input v-model="form.captcha" maxlength="6" placeholder="请输入验证码" autocomplete="off" style="flex:1" />
          </div>
        </el-form-item>
        <el-form-item>
          <el-button :loading="_loading" style="width:100%" @click="handleSubmit">
            登录
          </el-button>
        </el-form-item>
      </el-form>
      <div class="text-s mt-6 flex items-center justify-end">
        <a
          href="javascript:void(0)" class="hover:text-primary-600 underline"
          @click="() => isEmailCaptcha = !isEmailCaptcha"
        >{{ isEmailCaptcha ? '密码登录' : '邮箱验证码登录' }}</a>
      </div>
      <div class="text-sm mt-6 flex items-center justify-between">
        <a href="javascript:void(0)" class="hover:text-primary-600 underline" @click.prevent="gotoForget">忘记密码？</a>
        <a href="javascript:void(0)" class="hover:text-primary-600 underline" @click.prevent="gotoSignup">注册</a>
      </div>
    </div>
  </div>
</template>
