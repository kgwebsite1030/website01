<script setup lang='ts'>
import type { Cart } from '~/api/types/cart'

const props = defineProps<{
  orders: Cart[]
  loading?: boolean
}>()

const subtotal = computed(() => {
  return props.orders.reduce((sum, item) => sum + item.price * item.quantity, 0)
})
const shipping = 0
const tax = 0
const total = computed(() => subtotal.value + shipping + tax)
</script>

<template>
  <!-- 右侧内容：订单摘要 -->
  <div class="flex-shrink-0 w-full lg:w-1/3">
    <div class="p-6">
      <h4 class="text-lg font-semibold mb-4">
        Order Summary
      </h4>
      <div v-loading="loading" class="mb-4 divide-gray-200 divide-y">
        <div v-if="orders.length === 0 && !loading" class="text-gray-500 py-4 text-center">
          购物车为空
        </div>
        <div v-for="item in orders" :key="item.id" class="py-3 flex gap-3 items-center">
          <!-- 若有图片可放此 src，否则展示灰色占位 -->
          <div class="rounded bg-gray-100 flex h-14 w-14 items-center justify-center overflow-hidden">
            <img v-if="item.imageUrl" :src="item.imageUrl" :alt="item.productName" class="h-full w-full object-cover">
            <span v-else class="text-gray-300">IMG</span>
          </div>
          <div class="flex-1">
            <div class="font-medium">
              {{ item.productName }}
            </div>
            <div class="text-xs text-gray-500">
              Quantity: {{ item.quantity }}
            </div>
          </div>
          <div class="font-semibold">
            ${{ (item.price * item.quantity).toFixed(2) }}
          </div>
        </div>
      </div>
      <div class="text-sm mb-6 space-y-1">
        <div class="flex justify-between">
          <span>Subtotal</span><span>${{ subtotal.toFixed(2) }}</span>
        </div>
        <div class="flex justify-between">
          <span>Shipping</span><span class="text-green-600">Free</span>
        </div>
        <div class="flex justify-between">
          <span>Tax</span><span>$0.00</span>
        </div>
        <div class="text-base font-bold mt-2 flex justify-between">
          <span>Total</span><span>${{ total.toFixed(2) }}</span>
        </div>
      </div>
      <div class="text-xs text-gray-500 mb-2">
        By clicking "Place Order" you agree to our <a href="#" class="underline">Terms of Service</a> and <a
          href="#" class="underline"
        >Privacy Policy</a>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
