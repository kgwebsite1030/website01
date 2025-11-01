<script setup lang="ts">
import type { FormInstance, FormItemRule } from 'element-plus'
import { register, sendEmailCode } from '~/api/user'

const router = useRouter()
const loading = ref(false)

const form = reactive({
  email: '',
  captcha: '',
  code: '',
  password: '',
  confirmPassword: '',
})

const formRef = useTemplateRef<FormInstance>('formRef')
const rules: Record<string, FormItemRule[]> = {
  email: [
    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
    { type: 'email', message: '邮箱格式不正确', trigger: ['blur', 'change'] },
  ],
  captcha: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
  ],
  confirmPassword: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== form.password)
          callback(new Error('两次秘密不一致'))
        else callback()
      },
      trigger: 'blur',
    },
  ],
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
  sendEmailCode(form.email).then((res) => {
    ElMessage.success('验证码发送成功')
    form.captcha = res.code
    form.code = res.code
  }).catch((err: any) => {
    stopCountdown()
    ElMessage.error(err.data.message)
  })
}

function handleSubmit() {
  formRef.value!.validate((valid) => {
    if (valid) {
      loading.value = true
      register(form).then(() => {
        router.push('/')
      }).catch((err: any) => {
        ElMessage.error(err.data.message)
      }).finally(() => {
        loading.value = false
      })
    }
    else {
      ElMessage.warning('表单有误，请检查输入项')
    }
  })
}

function gotoSignin() {
  router.push('/auth/signin')
}
</script>

<template>
  <div class="mx-auto mt-10 md:flex md:max-w-7xl md:items-center md:justify-center">
    <div class="m-4 p-4 rounded shadow md:w-sm">
      <el-form ref="formRef" :model="form" :rules="rules" label-position="top">
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" placeholder="请输入邮箱" autocomplete="email" />
        </el-form-item>
        <el-form-item label="验证码" prop="captcha">
          <el-input v-model="form.captcha" placeholder="请输入验证码">
            <template #append>
              <span v-if="!senEmailCodeFlag" @click="senEmailCode">发送邮箱验证码</span>
              <span v-if="senEmailCodeFlag">{{ countdown }} s</span>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" placeholder="请输入密码" type="password" />
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input v-model="form.confirmPassword" placeholder="请确认密码" type="password" />
        </el-form-item>
        <el-form-item>
          <el-button :loading="loading" style="width:100%" @click="handleSubmit">
            注册
          </el-button>
        </el-form-item>
      </el-form>
      <div class="text-sm mt-6 flex items-center justify-end">
        <a href="javascript:void(0)" class="hover:text-primary-600 underline" @click.prevent="gotoSignin">已有账号？返回登录页</a>
      </div>
    </div>
  </div>
</template>
