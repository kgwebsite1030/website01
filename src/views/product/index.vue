<script setup lang='ts'>
import type { Category } from '~/components/CategoryTreeSelector/types'
import type { Product } from '~/types'
import { getGoodList, getParentGoods, getSubGoods } from '~/api/good'

const selectedCategoryId = ref<string | number | null>(null)

const categories = ref<Category[]>([])

const productList = ref<Product[]>([])

const router = useRouter()

const pageSize = reactive({
  page: 1,
  size: 20,
})

// 获取商品列表
getGoodList(pageSize).then((res) => {
  const { products, categoryTree, pagination } = res
  categories.value = categoryTree.parentCategories as Category[]
  productList.value = products
  pagination.value = pagination
})

function handleCategoryClick() {
  const ids = selectedCategoryId.value?.toString().split('/')

  if (ids?.length && ids.length < 2) {
    // 获取父级分类下的所有商品
    getParentGoods({ page: 1, size: 10, parentId: Number(ids[0]) }).then((res) => {
      const { products, pagination } = res
      productList.value = products
      pagination.value = pagination
    })
  }
  else {
    // 获取子级分类下的所有商品
    getSubGoods({ page: 1, size: 10, subId: Number(ids?.[1]) }).then((res) => {
      const { products, pagination } = res
      productList.value = products
      pagination.value = pagination
    })
  }
}

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
        <CategoryTreeSelector v-model="selectedCategoryId" :data="categories" @click="handleCategoryClick" />
      </div>

      <!-- 右侧商品列表 -->
      <div class="flex-1">
        <div
          class="gap-4 grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2"
          @click="handleProductListClick"
        >
          <template v-for="_d in productList" :key="_d">
            <ProductCard v-bind="_d" />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
