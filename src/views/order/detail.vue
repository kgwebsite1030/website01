<script setup lang="ts">
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
    { id: 'SKU-1001', name: '无线蓝牙耳机', sku: 'WH-1001', quantity: 1, price: 199 },
    { id: 'SKU-1002', name: 'Type-C 充电线', sku: 'CB-1002', quantity: 2, price: 50 },
  ],
  subtotal: 299,
  shippingFee: 12,
  discount: 10,
  address: {
    name: '张三',
    phone: '13800000000',
    province: '江苏省',
    city: '苏州市',
    district: '工业园区',
    detail: '独墅湖大道 88 号科创中心 3 楼',
  },
  payment: {
    method: '信用卡',
    transactionId: 'TRA-20251001-8899',
    paidAt: '2025-10-01 13:21',
  },
  logistics: {
    company: '顺丰速运',
    trackingNo: 'SF123456789CN',
  },
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat('zh-CN', { style: 'currency', currency: 'CNY' }).format(value)
}

const total = order.subtotal + order.shippingFee - order.discount
</script>

<template>
  <section>
    <div class="mx-auto px-4 py-8 max-w-7xl lg:px-8 sm:px-6 sm:py-12">
      <header class="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 class="text-2xl tracking-tight font-semibold">
            订单详情
          </h1>
          <p class="text-sm mt-1">
            订单号：{{ order.id }} · 下单时间：{{ order.createdAt }}
          </p>
        </div>
        <div class="flex gap-3 items-center">
          <span class="text-xs tracking-wide px-2 py-0.5 border rounded-md inline-flex uppercase items-center">
            {{ order.status }}
          </span>
          <button type="button" class="text-sm px-3 py-2 border rounded-lg inline-flex items-center justify-center">
            下载发票
          </button>
        </div>
      </header>

      <div class="mt-8 gap-6 grid grid-cols-1 md:grid-cols-3">
        <section class="p-5 border rounded-xl md:p-6">
          <h2 class="text-lg font-medium">
            收货信息
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
            支付信息
          </h2>
          <div class="text-sm mt-3 space-y-1">
            <p>支付方式：{{ order.payment.method }}</p>
            <p>交易号：{{ order.payment.transactionId }}</p>
            <p v-if="order.payment.paidAt">
              支付时间：{{ order.payment.paidAt }}
            </p>
          </div>
        </section>

        <section class="p-5 border rounded-xl md:p-6">
          <h2 class="text-lg font-medium">
            物流信息
          </h2>
          <div v-if="order.logistics" class="text-sm mt-3 space-y-1">
            <p>承运方：{{ order.logistics.company }}</p>
            <p>运单号：{{ order.logistics.trackingNo }}</p>
          </div>
          <p v-else class="text-sm mt-3">
            暂无物流信息
          </p>
        </section>
      </div>

      <section class="mt-8 border rounded-xl">
        <div class="px-5 py-4 md:px-6">
          <h2 class="text-lg font-medium">
            商品明细
          </h2>
        </div>
        <div class="divide-y">
          <div class="text-sm px-5 py-3 gap-4 grid grid-cols-12">
            <div class="font-medium col-span-6 md:col-span-6">
              商品
            </div>
            <div class="font-medium text-right col-span-2 md:col-span-2">
              数量
            </div>
            <div class="font-medium text-right col-span-2 md:col-span-2">
              单价
            </div>
            <div class="font-medium text-right col-span-2 md:col-span-2">
              小计
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
                SKU：{{ item.sku }}
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
              <span>商品小计</span>
              <span class="font-medium">{{ formatCurrency(order.subtotal) }}</span>
            </div>
            <div class="text-sm flex items-center justify-between">
              <span>运费</span>
              <span class="font-medium">{{ formatCurrency(order.shippingFee) }}</span>
            </div>
            <div class="text-sm flex items-center justify-between">
              <span>优惠</span>
              <span class="font-medium">-{{ formatCurrency(order.discount) }}</span>
            </div>
            <div class="pt-2 flex items-center justify-between">
              <span class="text-base">应付总计</span>
              <span class="text-base font-semibold">{{ formatCurrency(total) }}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  </section>
</template>

<style scoped></style>
