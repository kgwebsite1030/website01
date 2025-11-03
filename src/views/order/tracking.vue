<script setup lang='ts'>
import { useRequest } from 'alova/client'
import { getOrderList } from '~/api/order'
import { formatCurrency } from '~/utils/currency'

const router = useRouter()

// 获取订单列表
const { data: orders } = useRequest(() => getOrderList())

function gotoOrderDetail(id: string) {
  router.push({ path: '/order/detail', query: { id } })
}
</script>

<template>
  <section>
    <div class="mx-auto px-4 py-8 max-w-7xl lg:px-8 sm:px-6 sm:py-12">
      <div class="flex items-baseline justify-between">
        <h1 class="text-2xl tracking-tight font-semibold">
          Order Tracking
        </h1>
        <p class="text-sm">
          Total {{ orders?.length || 0 }} orders
        </p>
      </div>

      <div class="mt-6">
        <div class="gap-6 grid grid-cols-1 md:gap-8">
          <article v-for="order in orders" :key="order.id" class="p-5 border rounded-xl md:p-6">
            <header class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <div class="flex flex-wrap gap-3 items-center">
                  <h2 class="text-lg font-medium">
                    {{ order.orderId }}
                  </h2>
                  <span class="text-xs tracking-wide px-2 py-0.5 border rounded-md inline-flex uppercase items-center">
                    {{ order.status }}
                  </span>
                </div>
                <p class="text-sm mt-1">
                  Ordered at: {{ order.createTime }}
                </p>
              </div>
              <div class="flex gap-4 items-center md:gap-6">
                <div class="text-right">
                  <p class="text-sm">
                    Order Total
                  </p>
                  <p class="text-base font-semibold">
                    {{ formatCurrency(order.totalPrice) }}
                  </p>
                </div>
                <button
                  type="button"
                  class="text-sm px-3 py-2 border rounded-lg inline-flex items-center justify-center"
                  @click="gotoOrderDetail(order.id)"
                >
                  View Details
                </button>
              </div>
            </header>

            <div class="mt-4 divide-y">
              <div v-for="item in order.items" :key="item.productId" class="py-3 flex gap-4 items-start justify-between">
                <div class="min-w-0">
                  <p class="font-medium truncate">
                    {{ item.productName }}
                  </p>
                  <p class="text-sm mt-0.5">
                    Qty × {{ item.quantity }}
                  </p>
                </div>
                <div class="text-right shrink-0">
                  <p class="text-sm">
                    Unit Price
                  </p>
                  <p class="font-medium">
                    {{ formatCurrency(item.price) }}
                  </p>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
