<script setup lang="ts">
import type { FormInstance, FormItemRule } from 'element-plus'

const props = defineProps<{
  modelValue: {
    number: string
    expMonth: string
    expYear: string
    cvc: string
    name: string
  }
}>()
const emit = defineEmits(['update:modelValue'])

const localCardInfo = ref({ ...props.modelValue })
const formRef = useTemplateRef<FormInstance>('formRef')

// 卡号校验（Luhn 算法）
function validateCardNumber(rule: any, value: string, callback: any) {
  if (!value) {
    callback(new Error('请输入卡号'))
    return
  }
  // 移除空格
  const cardNumber = value.replace(/\s+/g, '')
  // 检查是否为数字
  if (!/^\d+$/.test(cardNumber)) {
    callback(new Error('卡号只能包含数字'))
    return
  }
  // 检查长度（13-19位）
  if (cardNumber.length < 13 || cardNumber.length > 19) {
    callback(new Error('卡号长度应在13-19位之间'))
    return
  }
  // Luhn 算法验证
  let sum = 0
  let isEven = false
  for (let i = cardNumber.length - 1; i >= 0; i--) {
    let digit = Number.parseInt(cardNumber[i])
    if (isEven) {
      digit *= 2
      if (digit > 9) {
        digit -= 9
      }
    }
    sum += digit
    isEven = !isEven
  }
  if (sum % 10 !== 0) {
    callback(new Error('卡号格式不正确'))
    return
  }
  callback()
}

// 月份校验（01-12）
function validateMonth(rule: any, value: string, callback: any) {
  if (!value) {
    callback(new Error('请输入月份'))
    return
  }
  const month = Number.parseInt(value)
  if (Number.isNaN(month) || month < 1 || month > 12) {
    callback(new Error('月份应为01-12'))
    return
  }
  callback()
}

// 年份校验（当前年份及未来）
function validateYear(rule: any, value: string, callback: any) {
  if (!value) {
    callback(new Error('请输入年份'))
    return
  }
  const year = Number.parseInt(`20${value}`)
  const currentYear = new Date().getFullYear()
  if (Number.isNaN(year) || year < currentYear || year > currentYear + 50) {
    callback(new Error('年份格式不正确'))
    return
  }
  callback()
}

// CVC 校验（3-4位数字）
function validateCVC(rule: any, value: string, callback: any) {
  if (!value) {
    callback(new Error('请输入CVC'))
    return
  }
  if (!/^\d{3,4}$/.test(value)) {
    callback(new Error('CVC应为3-4位数字'))
    return
  }
  callback()
}

const rules: Record<string, FormItemRule[]> = {
  number: [
    { validator: validateCardNumber, trigger: ['blur', 'change'] },
  ],
  expMonth: [
    { validator: validateMonth, trigger: ['blur', 'change'] },
  ],
  expYear: [
    { validator: validateYear, trigger: ['blur', 'change'] },
  ],
  cvc: [
    { validator: validateCVC, trigger: ['blur', 'change'] },
  ],
  name: [
    { required: true, message: '请输入持卡人姓名', trigger: 'blur' },
  ],
}

watch(() => props.modelValue, (val) => {
  if (
    val.number !== localCardInfo.value.number
    || val.expMonth !== localCardInfo.value.expMonth
    || val.expYear !== localCardInfo.value.expYear
    || val.cvc !== localCardInfo.value.cvc
    || val.name !== localCardInfo.value.name
  ) {
    localCardInfo.value = { ...val }
  }
}, { deep: true })

watch(() => localCardInfo.value, (val) => {
  emit('update:modelValue', { ...val })
}, { deep: true })

// 格式化卡号（每4位添加空格）
function formatCardNumber(value: string) {
  const numbers = value.replace(/\s+/g, '')
  const formatted = numbers.match(/.{1,4}/g)?.join(' ') || numbers
  return formatted
}

function handleCardNumberInput(value: string) {
  const numbers = value.replace(/\s+/g, '')
  localCardInfo.value.number = formatCardNumber(numbers).slice(0, 19)
}

// 暴露验证方法
defineExpose({
  validate: async () => {
    if (!formRef.value)
      return Promise.reject(new Error('表单引用不存在'))
    return formRef.value.validate()
  },
  resetFields: () => formRef.value?.resetFields(),
})
</script>

<template>
  <div class="mt-4">
    <el-form ref="formRef" :model="localCardInfo" :rules="rules" label-position="top">
      <el-form-item label="Card Number" prop="number">
        <el-input
          :model-value="localCardInfo.number"
          placeholder="1234 5678 9012 3456"
          maxlength="19"
          @input="handleCardNumberInput"
        />
      </el-form-item>
      <div class="gap-2 grid grid-cols-3">
        <el-form-item label="Expiry Month" prop="expMonth">
          <el-input
            v-model="localCardInfo.expMonth"
            placeholder="MM"
            maxlength="2"
          />
        </el-form-item>
        <el-form-item label="Expiry Year" prop="expYear">
          <el-input
            v-model="localCardInfo.expYear"
            placeholder="YY"
            maxlength="2"
          />
        </el-form-item>
        <el-form-item label="CVC" prop="cvc">
          <el-input
            v-model="localCardInfo.cvc"
            placeholder="123"
            maxlength="4"
          />
        </el-form-item>
      </div>
      <el-form-item label="Card Holder Name" prop="name">
        <el-input
          v-model="localCardInfo.name"
          placeholder="John Doe"
        />
      </el-form-item>
    </el-form>
  </div>
</template>
