<script setup lang="ts">
import { useRequest } from 'alova/client'
import { getOrderDetail } from '~/api/order'
import { formatCurrency } from '~/utils/currency'

interface OrderItem {
  id: string
  name: string
  sku: string
  quantity: number
  price: number
}

interface Address {
  name: string
  phone: string
  province: string
  city: string
  district: string
  detail: string
}

interface PaymentInfo {
  method: string
  transactionId: string
  paidAt?: string
}

interface LogisticsInfo {
  company: string
  trackingNo: string
}

interface OrderDetail {
  id: string
  createdAt: string
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled'
  items: OrderItem[]
  subtotal: number
  shippingFee: number
  discount: number
  address: Address
  payment: PaymentInfo
  logistics?: LogisticsInfo
}

const order: OrderDetail = {
  id: 'ORD-20251001-0001',
  createdAt: '2025-10-01 13:20',
  status: 'shipped',
  items: [
    { id: 'SKU-1001', name: 'Wireless Bluetooth Earbuds', sku: 'WH-1001', quantity: 1, price: 199 },
    { id: 'SKU-1002', name: 'Type-C Charging Cable', sku: 'CB-1002', quantity: 2, price: 50 },
  ],
  subtotal: 299,
  shippingFee: 12,
  discount: 10,
  address: {
    name: 'Zhang San',
    phone: '13800000000',
    province: 'Jiangsu Province',
    city: 'Suzhou City',
    district: 'Industrial Park',
    detail: '3F, Kechuang Center, No. 88 Dushu Lake Ave',
  },
  payment: {
    method: 'Credit Card',
    transactionId: 'TRA-20251001-8899',
    paidAt: '2025-10-01 13:21',
  },
  logistics: {
    company: 'SF Express',
    trackingNo: 'SF123456789CN',
  },
}

const total = order.subtotal + order.shippingFee - order.discount

// 获取订单详情
const { data } = useRequest(() => getOrderDetail())

console.log(data)
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
            Order No.: {{ order.id }} · Ordered at: {{ order.createdAt }}
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
            <p>{{ order.address.name }}（{{ order.address.phone }}）</p>
            <p>
              {{ order.address.province }} {{ order.address.city }} {{ order.address.district }}
            </p>
            <p>{{ order.address.detail }}</p>
          </div>
        </section>

        <section class="p-5 border rounded-xl md:p-6">
          <h2 class="text-lg font-medium">
            Payment Information
          </h2>
          <div class="text-sm mt-3 space-y-1">
            <p>Payment Method: {{ order.payment.method }}</p>
            <p>Transaction ID: {{ order.payment.transactionId }}</p>
            <p v-if="order.payment.paidAt">
              Paid At: {{ order.payment.paidAt }}
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
              <span class="font-medium">{{ formatCurrency(order.subtotal) }}</span>
            </div>
            <div class="text-sm flex items-center justify-between">
              <span>Shipping Fee</span>
              <span class="font-medium">{{ formatCurrency(order.shippingFee) }}</span>
            </div>
            <div class="text-sm flex items-center justify-between">
              <span>Discount</span>
              <span class="font-medium">-{{ formatCurrency(order.discount) }}</span>
            </div>
            <div class="pt-2 flex items-center justify-between">
              <span class="text-base">Total Due</span>
              <span class="text-base font-semibold">{{ formatCurrency(total) }}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  </section>
</template>

<style scoped></style>
