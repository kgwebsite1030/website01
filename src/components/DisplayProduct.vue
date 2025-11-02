<script setup lang='ts'>
import type { Product } from '~/types'
import { formatCurrency } from '~/utils/currency'

const props = withDefaults(defineProps<{
  /**
   * 标题
   */
  title: string
  /**
   * 产品列表 todo 添加类型
   */
  products: Product[]
}>(), {
  products: () => [],
  title: 'Products',
})

console.log(props.products)
</script>

<template>
  <section class="mb-16">
    <h2 class="text-xl font-bold sm:text-3xl">
      <i dir="auto" style="vertical-align: inherit;">
        <i dir="auto" style="vertical-align: inherit;">{{ title }}</i>
      </i>
    </h2>

    <ul class="mt-8 gap-4 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
      <li v-for="product in products" :key="product.id">
        <!-- todo 跳转到详情附上产品id -->
        <RouterLink to="#" class="group rounded-sm block shadow-sm overflow-hidden">
          <img
            :src="product.imageUrl"
            alt="" class="h-[250px] w-full transition duration-500 object-cover sm:h-[250px] group-hover:scale-105"
          >

          <div class="p-4 bg-white relative">
            <h3 class="text-gray-700 group-hover:underline group-hover:underline-offset-4">
              <i dir="auto" style="vertical-align: inherit;">
                <i dir="auto" style="vertical-align: inherit;">
                  {{ product.name }}
                </i>
              </i>
            </h3>

            <p class="mt-2">
              <span class="text-red tracking-wider">
                <i dir="auto" style="vertical-align: inherit;">
                  <i dir="auto" style="vertical-align: inherit;">{{ formatCurrency(product.price) }}</i>
                </i>
              </span>
            </p>
          </div>
        </RouterLink>
      </li>
    </ul>

    <!-- 查看更多商品 -->
    <p class="text-center">
      <RouterLink
        to="/product"
        class="text-gray-800 mt-4 px-6 py-3 text-center border border-gray-300 inline-block cursor-pointer transition-colors hover:bg-gray-50"
      >
        View All Products
      </RouterLink>
    </p>
  </section>
</template>

<style scoped></style>
