<script setup lang='ts'>
import { formatCurrency } from '~/utils/currency'

defineProps<{
  productId: number
  title: string
  cover: string
  price: number
}>()
</script>

<template>
  <div
    class="group rounded-md w-full block cursor-pointer shadow-sm transition-shadow duration-300 overflow-hidden lg:w-[220px] md:w-[200px] sm:w-[180px] hover:shadow-md"
    :data-product-id="productId"
  >
    <div class="h-[200px] relative">
      <img
        :src="cover"
        alt="product png" class="h-full w-full object-cover"
      >
    </div>

    <div class="p-3 bg-white relative sm:p-4">
      <h3
        class="text-xs text-gray-700 truncate md:text-base sm:text-sm group-hover:underline group-hover:underline-offset-4"
      >
        {{ title }}
      </h3>

      <div class="text-red mt-1.5 flex items-center justify-between">
        <p class="text-sm tracking-wide font-medium md:text-base">
          {{ formatCurrency(price) }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
