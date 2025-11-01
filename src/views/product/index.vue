<script setup lang='ts'>
import type { Category } from '~/components/CategoryTreeSelector/types'
import { useRequest } from 'alova/client'
import { getgoodlist } from '~/api/good'

const selectedCategoryId = ref<string | number | null>(null)

const categories: Category[] = [
  {
    id: 1,
    name: '电子产品',
    children: [
      { id: 9, name: 'iphone12' },
      { id: 10, name: 'iphone16' },
    ],
  },
  {
    id: 6,
    name: '服装',
    children: [
      { id: 7, name: '男装' },
      { id: 8, name: '女装' },
    ],
  },
]

const products = [
  {
    id: 1,
    title: '限量版运动训练器',
    price: 189.99,
    cover: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1450&amp;q=80',
  },
]

const router = useRouter()

const pageSize = reactive({
  page: 1,
  size: 20,
})

const { data } = useRequest(() => getgoodlist(pageSize))

console.log(data)

// 处理商品列表点击事件
function handleProductListClick(event: MouseEvent) {
  // 获取事件源元素
  const target = event.target as HTMLElement

  // 查找最近的商品卡片元素
  const productCard = target.closest('[data-product-id]')

  if (productCard) {
    // 获取商品ID
    const productId = productCard.getAttribute('data-product-id')

    // 处理商品点击事件
    if (productId) {
      router.push({ path: `/product/detail`, query: { id: productId } })
    }
  }
}
</script>

<template>
  <div class="mx-auto px-4 py-6 max-w-7xl sm:px-6">
    <h1 class="font-bold mb-6 md:text-3xl sm:text-2xl">
      Products
    </h1>

    <div class="flex flex-col gap-6 lg:flex-row">
      <!-- 左侧分类选择器 -->
      <div class="mb-6 flex-shrink-0 w-full lg:mb-0 lg:w-[250px]">
        <!-- 当前选中分类id === selectedCategoryId -->
        <CategoryTreeSelector v-model="selectedCategoryId" :data="categories" />
      </div>

      <!-- 右侧商品列表 -->
      <div class="flex-1">
        <div
          class="gap-4 grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2"
          @click="handleProductListClick"
        >
          <template v-for="_d in products" :key="_d">
            <ProductCard :product-id="_d.id" v-bind="_d" />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
