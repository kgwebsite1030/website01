<script setup lang="ts">
import type { FormInstance, FormItemRule } from 'element-plus'

const router = useRouter()
const loading = ref(false)

const form = reactive({
  email: '',
  captcha: '',
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
}
function handleSubmit() {
  formRef.value!.validate((valid) => {
    if (valid) {
      loading.value = true
      setTimeout(() => {
        loading.value = false
        gotoSignin()
      }, 1000)
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
          <el-input v-model="form.captcha" placeholder="请输入验证码" />
        </el-form-item>
        <el-form-item>
          <el-button :loading="loading" style="width:100%" @click="handleSubmit">
            重置密码
          </el-button>
        </el-form-item>
      </el-form>
      <div class="text-sm mt-6 flex items-center justify-end">
        <a href="javascript:void(0)" class="hover:text-primary-600 underline" @click.prevent="gotoSignin">已有账号？返回登录页</a>
      </div>
    </div>
  </div>
</template>
