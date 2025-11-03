<script setup lang="ts">
import { useRequest } from 'alova/client'
import { getOrderDetail } from '~/api/order'
import { formatCurrency } from '~/utils/currency'

const rid = useRoute().query.id as unknown as number

// 获取订单详情
const { data: order } = useRequest(() => getOrderDetail(rid))
</script>

<template>
  <section>
    <div class="mx-auto px-4 py-8 max-w-7xl lg:px-8 sm:px-6 sm:py-12">
      <header class="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 class="text-2xl tracking-tight font-semibold">
            Order Detail
          </h1>
          <p class="text-sm mt-1">
            Order No.: {{ order.orderId }} · Ordered at: {{ order.createTime }}
          </p>
        </div>
        <div class="flex gap-3 items-center">
          <span class="text-xs tracking-wide px-2 py-0.5 border rounded-md inline-flex uppercase items-center">
            {{ order.status }}
          </span>
          <button type="button" class="text-sm px-3 py-2 border rounded-lg inline-flex items-center justify-center">
            Download Invoice
          </button>
        </div>
      </header>

      <div class="mt-8 gap-6 grid grid-cols-1 md:grid-cols-2">
        <section class="p-5 border rounded-xl md:p-6">
          <h2 class="text-lg font-medium">
            Shipping Address
          </h2>
          <div class="text-sm mt-3 space-y-1">
            <p>{{ order.cc_name }}（{{ order.contactPhone }}）</p>
            <p>
              {{ order.shippingCountry }} {{ order.shippingCity }} {{ order.shippingZipCode }}
            </p>
            <p>{{ order.shippingAddress }}</p>
          </div>
        </section>

        <section class="p-5 border rounded-xl md:p-6">
          <h2 class="text-lg font-medium">
            Payment Information
          </h2>
          <div class="text-sm mt-3 space-y-1">
            <p>Payment Method: {{ order.paymentMethod }}</p>
            <p>Transaction ID: {{ order.orderId }}</p>
            <p v-if="order.updateTime">
              Paid At: {{ order.updateTime }}
            </p>
          </div>
        </section>
      </div>

      <section class="mt-8 border rounded-xl">
        <div class="px-5 py-4 md:px-6">
          <h2 class="text-lg font-medium">
            Items
          </h2>
        </div>
        <div class="divide-y">
          <div class="text-sm px-5 py-3 gap-4 grid grid-cols-12">
            <div class="font-medium col-span-6 md:col-span-6">
              Item
            </div>
            <div class="font-medium text-right col-span-2 md:col-span-2">
              Qty
            </div>
            <div class="font-medium text-right col-span-2 md:col-span-2">
              Unit Price
            </div>
            <div class="font-medium text-right col-span-2 md:col-span-2">
              Subtotal
            </div>
          </div>
          <div
            v-for="item in order.items"
            :key="item.id"
            class="px-5 py-4 gap-4 grid grid-cols-12 items-start"
          >
            <div class="col-span-6 min-w-0 md:col-span-6">
              <p class="font-medium truncate">
                {{ item.name }}
              </p>
              <p class="text-sm mt-0.5">
                SKU: {{ item.sku }}
              </p>
            </div>
            <div class="text-right col-span-2 md:col-span-2">
              × {{ item.quantity }}
            </div>
            <div class="text-right col-span-2 md:col-span-2">
              {{ formatCurrency(item.price) }}
            </div>
            <div class="text-right col-span-2 md:col-span-2">
              {{ formatCurrency(item.price * item.quantity) }}
            </div>
          </div>
        </div>
        <div class="px-5 py-5 border-t md:px-6">
          <div class="ml-auto w-full space-y-2 md:w-80">
            <div class="text-sm flex items-center justify-between">
              <span>Subtotal</span>
              <span class="font-medium">{{ formatCurrency(order.items[0].price) }}</span>
            </div>
            <!--            <div class="text-sm flex items-center justify-between"> -->
            <!--              <span>Shipping Fee</span> -->
            <!--              <span class="font-medium">{{ formatCurrency(order.shippingFee) }}</span> -->
            <!--            </div> -->
            <!--            <div class="text-sm flex items-center justify-between"> -->
            <!--              <span>Discount</span> -->
            <!--              <span class="font-medium">-{{ formatCurrency(order.discount) }}</span> -->
            <!--            </div> -->
            <div class="pt-2 flex items-center justify-between">
              <span class="text-base">Total Due</span>
              <span class="text-base font-semibold">{{ formatCurrency(order.totalPrice) }}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  </section>
</template>

<style scoped></style>
