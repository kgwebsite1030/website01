<script setup lang='ts'>
import { ref } from 'vue'
import OrderSummary from './components/OrderSummary.vue'
import CreditOrDebitCard from './components/payment-method/CreditOrDebitCard.vue'

const countries = [
  'United States',
  'China',
  'Japan',
  'Canada',
  'Australia',
  'Germany',
  'France',
]
const shippingInfo = ref({
  name: '',
  email: '',
  phone: '',
  country: 'United States',
  address: '',
  city: '',
  zip: '',
})
const paymentMethod = ref('card')
const cardInfo = ref({ number: '', month: '', year: '', cvc: '', holder: '' })

const orderItems = [
  { img: '', name: 'Oversized Cardigan', price: 240, qty: 3 },
  { img: '', name: 'Padded Jacket', price: 280, qty: 2 },
]

watchEffect(() => {
  // eslint-disable-next-line no-console
  console.log('cardInfo: ', cardInfo.value)
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
          <form class="space-y-4">
            <div class="gap-4 grid md:grid-cols-2">
              <div>
                <label class="text-sm font-medium">Full Name <span class="text-red-500">*</span></label>
                <input
                  v-model="shippingInfo.name" type="text" placeholder="John Doe"
                  class="text-sm mt-1 px-4 py-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  required
                >
              </div>
              <div>
                <label class="text-sm font-medium">Email <span class="text-red-500">*</span></label>
                <input
                  v-model="shippingInfo.email" type="email" placeholder="john@example.com"
                  class="text-sm mt-1 px-4 py-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  required
                >
              </div>
              <div>
                <label class="text-sm font-medium">Phone <span class="text-red-500">*</span></label>
                <input
                  v-model="shippingInfo.phone" type="tel" placeholder="+1 (555) 123-4567"
                  class="text-sm mt-1 px-4 py-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  required
                >
              </div>
              <div>
                <label class="text-sm font-medium">Country <span class="text-red-500">*</span></label>
                <select
                  v-model="shippingInfo.country"
                  class="text-sm mt-1 px-4 py-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
                >
                  <option v-for="c in countries" :key="c" :value="c">
                    {{ c }}
                  </option>
                </select>
              </div>
            </div>
            <div>
              <label class="text-sm font-medium">Address <span class="text-red-500">*</span></label>
              <input
                v-model="shippingInfo.address" type="text" placeholder="Enter detailed shipping address"
                class="text-sm mt-1 px-4 py-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
                required
              >
            </div>
            <div class="gap-4 grid md:grid-cols-2">
              <div>
                <label class="text-sm font-medium">City <span class="text-red-500">*</span></label>
                <input
                  v-model="shippingInfo.city" type="text" placeholder="New York"
                  class="text-sm mt-1 px-4 py-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  required
                >
              </div>
              <div>
                <label class="text-sm font-medium">ZIP Code <span class="text-red-500">*</span></label>
                <input
                  v-model="shippingInfo.zip" type="text" placeholder="10001"
                  class="text-sm mt-1 px-4 py-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  required
                >
              </div>
            </div>
          </form>
        </section>

        <!-- 支付方式 -->
        <section>
          <h3 class="text-lg font-semibold mb-4">
            Payment Method
          </h3>
          <div class="space-y-4">
            <div
              class="px-4 py-2 border rounded flex cursor-pointer items-center"
              :class="paymentMethod === 'card' ? 'border-indigo-500' : 'border-gray-300'"
              @click="paymentMethod = 'card'"
            >
              <input v-model="paymentMethod" type="radio" class="mr-3" value="card">
              <div class="flex flex-wrap gap-2 items-center">
                <img
                  src="https://static.thenounproject.com/png/3309235-200.png" class="h-6 w-8 object-contain"
                  alt="visa"
                >
                <img
                  src="https://static.thenounproject.com/png/3309237-200.png" class="h-6 w-8 object-contain"
                  alt="mastercard"
                >
                <img
                  src="https://static.thenounproject.com/png/3309236-200.png" class="h-6 w-8 object-contain"
                  alt="amex"
                >
                <span class="text-sm ml-2">Credit / Debit Card</span>
              </div>
            </div>
            <div
              class="px-4 py-2 border rounded flex cursor-pointer items-center"
              :class="paymentMethod === 'paypal' ? 'border-indigo-500' : 'border-gray-300'"
              @click="paymentMethod = 'paypal'"
            >
              <input v-model="paymentMethod" type="radio" class="mr-3" value="paypal">
              <img src="https://www.svgrepo.com/show/349380/paypal.svg" class="h-6 w-8 object-contain" alt="paypal">
              <span class="text-sm ml-2">PayPal</span>
            </div>
          </div>

          <!-- 卡支付表单，仅选中卡时显示 -->
          <CreditOrDebitCard v-if="paymentMethod === 'card'" v-model="cardInfo" />
        </section>
      </div>

      <!-- 右侧内容：订单摘要 -->
      <OrderSummary :orders="orderItems" />
    </div>

    <div class="mt-10 w-full md:pr-10 md:w-2/3">
      <button class="text-lg text-white tracking-wide font-semibold py-3 rounded bg-gray-900 w-full transition hover:bg-gray-700">
        Place Order
      </button>
    </div>
  </div>
</template>

<style scoped></style>
