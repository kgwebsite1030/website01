<script setup lang='ts'>
import type { FormInstance, FormItemRule } from 'element-plus'
import type { Cart } from '~/api/types/cart'
import type { PaymentRequest } from '~/api/types/payment'
import { getCartList } from '~/api/cart'
import { createPayment } from '~/api/payment'
import OrderSummary from './components/OrderSummary.vue'
import CreditOrDebitCard from './components/payment-method/CreditOrDebitCard.vue'
import countryCodeList from './country-code.json'

const router = useRouter()

const shippingInfo = ref<PaymentRequest>({
  request_id: '',
  amount: 0,
  shippingAddress: '',
  shippingCity: '',
  shippingZipCode: '',
  ShippingCountry: '',
  contactPhone: '',
  cardInfo: { number: '', expMonth: '', expYear: '', cvc: '', name: '' },
})

const shippingFormRef = useTemplateRef<FormInstance>('shippingFormRef')
const cardFormRef = ref<{ validate: () => Promise<void>, resetFields: () => void } | null>(null)

const orderItems = ref<Cart[]>([])
const loading = ref(false)
const cartLoading = ref(false)

// 表单校验规则
const shippingRules: Record<string, FormItemRule[]> = {
  'cardInfo.name': [
    { required: true, message: '请输入姓名', trigger: 'blur' },
  ],
  'shippingAddress': [
    { required: true, message: '请输入详细地址', trigger: 'blur' },
  ],
  'shippingCity': [
    { required: true, message: '请输入城市', trigger: 'blur' },
  ],
  'shippingZipCode': [
    { required: true, message: '请输入邮政编码', trigger: 'blur' },
    { pattern: /^\d+$/, message: '邮政编码只能包含数字', trigger: 'blur' },
  ],
  'ShippingCountry': [
    { required: true, message: '请选择国家', trigger: 'change' },
  ],
  'contactPhone': [
    { required: true, message: '请输入联系电话', trigger: 'blur' },
    { pattern: /^[\d\s\-+()]+$/, message: '联系电话格式不正确', trigger: 'blur' },
  ],
}

// 获取购物车列表
async function fetchCartList() {
  try {
    cartLoading.value = true
    const res = await getCartList()
    orderItems.value = res.items || []
    // 计算总金额
    shippingInfo.value.amount = res.totalPrice
  }
  catch (error) {
    ElMessage.error('获取购物车列表失败')
    console.error(error)
  }
  finally {
    cartLoading.value = false
  }
}

// 提交订单
async function handlePlaceOrder() {
  try {
    // 验证收货信息表单
    await shippingFormRef.value?.validate()

    // 验证卡片信息表单
    if (cardFormRef.value) {
      await cardFormRef.value.validate()
    }

    // 验证是否有订单项
    if (orderItems.value.length === 0) {
      ElMessage.warning('购物车为空，无法下单')
      return
    }

    // 移除卡号中的空格
    const cardNumber = shippingInfo.value.cardInfo.number.replace(/\s+/g, '')
    // 拷贝一份shippingInfo的值,api剔除ref响应式依赖
    const shippingInfoData = toRaw(shippingInfo.value)
    shippingInfoData.cardInfo.number = cardNumber

    loading.value = true
    createPayment(shippingInfoData).then((res) => {
      if (res.success) {
        ElMessage.success('订单提交成功')
        router.push({ path: '/order/detail', query: { id: res.order_id } })
      }
      else {
        ElMessage.error(res.message)
        router.push({ path: '/' })
      }
    })
  }
  finally {
    loading.value = false
  }
}

// 页面加载时获取购物车列表
onMounted(() => {
  fetchCartList()
})
</script>

<template>
  <div class="mx-auto px-6 py-10 max-w-7xl">
    <h2 class="text-2xl font-bold mb-8">
      Checkout
    </h2>
    <div class="flex flex-col gap-10 lg:flex-row">
      <!-- 左侧内容：收货信息和支付方式 -->
      <div class="flex-1 space-y-10">
        <!-- 收货信息 -->
        <section>
          <h3 class="text-lg font-semibold mb-4">
            Shipping Information
          </h3>
          <el-form ref="shippingFormRef" :model="shippingInfo" :rules="shippingRules" label-position="top">
            <div class="gap-4 grid md:grid-cols-2">
              <el-form-item label="Full Name" prop="cardInfo.name">
                <el-input v-model="shippingInfo.cardInfo.name" placeholder="John Doe" />
              </el-form-item>
              <el-form-item label="Phone" prop="contactPhone">
                <el-input v-model="shippingInfo.contactPhone" type="tel" placeholder="+1 (555) 123-4567" />
              </el-form-item>
            </div>
            <el-form-item label="Address" prop="shippingAddress">
              <el-input v-model="shippingInfo.shippingAddress" placeholder="Enter detailed shipping address" />
            </el-form-item>
            <div class="gap-4 grid md:grid-cols-2">
              <el-form-item label="City" prop="shippingCity">
                <el-input v-model="shippingInfo.shippingCity" placeholder="New York" />
              </el-form-item>
              <el-form-item label="ZIP Code" prop="shippingZipCode">
                <el-input v-model="shippingInfo.shippingZipCode" placeholder="10001" />
              </el-form-item>
            </div>
            <el-form-item label="Country" prop="ShippingCountry">
              <el-select v-model="shippingInfo.ShippingCountry" placeholder="请选择国家">
                <el-option label="United States" value="United States" />

                <el-option v-for="item in countryCodeList" :key="item.code" :label="item.en" :value="item.code" />
              </el-select>
            </el-form-item>
          </el-form>
        </section>

        <!-- 支付方式 -->
        <section>
          <h3 class="text-lg font-semibold mb-4">
            Payment Method
          </h3>
          <div class="space-y-4">
            <div class="px-4 py-2 border border-indigo-500 rounded flex cursor-pointer items-center">
              <span class="text-sm ml-2">Credit / Debit Card</span>
            </div>
          </div>

          <!-- 卡支付表单，仅选中卡时显示 -->
          <CreditOrDebitCard ref="cardFormRef" v-model="shippingInfo.cardInfo" />
        </section>
      </div>

      <!-- 右侧内容：订单摘要 -->
      <OrderSummary :orders="orderItems" :loading="cartLoading" />
    </div>

    <div class="mt-10 w-full md:pr-10 md:w-2/3">
      <el-button
        type="primary" :loading="loading"
        class="text-lg text-white tracking-wide font-semibold py-3 rounded bg-gray-900 w-full transition hover:bg-gray-700"
        @click="handlePlaceOrder"
      >
        Place Order
      </el-button>
    </div>
  </div>
</template>

<style scoped></style>
