<script setup lang='ts'>
interface OrderItem {
  id: string
  name: string
  quantity: number
  price: number
}

interface Order {
  id: string
  createdAt: string
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled'
  total: number
  items: OrderItem[]
}

const orders: Order[] = [
  {
    id: 'ORD-20251001-0001',
    createdAt: '2025-10-01 13:20',
    status: 'delivered',
    total: 299.0,
    items: [
      { id: 'SKU-1001', name: '无线蓝牙耳机', quantity: 1, price: 199 },
      { id: 'SKU-1002', name: 'Type-C 充电线', quantity: 2, price: 50 },
    ],
  },
  {
    id: 'ORD-20250920-0007',
    createdAt: '2025-09-20 09:05',
    status: 'shipped',
    total: 1299.0,
    items: [
      { id: 'SKU-2001', name: '机械键盘', quantity: 1, price: 699 },
      { id: 'SKU-2002', name: '人体工学鼠标', quantity: 1, price: 600 },
    ],
  },
  {
    id: 'ORD-20250905-0010',
    createdAt: '2025-09-05 18:42',
    status: 'processing',
    total: 89.0,
    items: [
      { id: 'SKU-3001', name: '钢化膜（两片装）', quantity: 1, price: 89 },
    ],
  },
]

function formatCurrency(value: number) {
  return new Intl.NumberFormat('zh-CN', { style: 'currency', currency: 'CNY' }).format(value)
}
</script>

<template>
  <section>
    <div class="mx-auto px-4 py-8 max-w-7xl lg:px-8 sm:px-6 sm:py-12">
      <div class="flex items-baseline justify-between">
        <h1 class="text-2xl tracking-tight font-semibold">
          订单跟踪
        </h1>
        <p class="text-sm">
          共 {{ orders.length }} 笔订单
        </p>
      </div>

      <div class="mt-6">
        <div class="gap-6 grid grid-cols-1 md:gap-8">
          <article
            v-for="order in orders"
            :key="order.id"
            class="p-5 border rounded-xl md:p-6"
          >
            <header class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <div class="flex flex-wrap gap-3 items-center">
                  <h2 class="text-lg font-medium">
                    {{ order.id }}
                  </h2>
                  <span class="text-xs tracking-wide px-2 py-0.5 border rounded-md inline-flex uppercase items-center">
                    {{ order.status }}
                  </span>
                </div>
                <p class="text-sm mt-1">
                  下单时间：{{ order.createdAt }}
                </p>
              </div>
              <div class="flex gap-4 items-center md:gap-6">
                <div class="text-right">
                  <p class="text-sm">
                    订单金额
                  </p>
                  <p class="text-base font-semibold">
                    {{ formatCurrency(order.total) }}
                  </p>
                </div>
                <button type="button" class="text-sm px-3 py-2 border rounded-lg inline-flex items-center justify-center">
                  查看详情
                </button>
              </div>
            </header>

            <div class="mt-4 divide-y">
              <div
                v-for="item in order.items"
                :key="item.id"
                class="py-3 flex gap-4 items-start justify-between"
              >
                <div class="min-w-0">
                  <p class="font-medium truncate">
                    {{ item.name }}
                  </p>
                  <p class="text-sm mt-0.5">
                    数量 × {{ item.quantity }}
                  </p>
                </div>
                <div class="text-right shrink-0">
                  <p class="text-sm">
                    单价
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
