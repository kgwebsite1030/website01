<script setup lang='ts'>
import { useRequest } from 'alova/client'
import { ref } from 'vue'
import { getGoodDetail } from '~/api/good'
import { formatCurrency } from '~/utils/currency'

// 购买数量
const quantity = ref(1)

// 添加到购物车
function addToCart() {
  // 这里可以添加实际的购物车逻辑

}

// 获取商品详情
const { data }: any = useRequest(() => getGoodDetail(), { initialData: {}, immediate: true })

console.log(data)
</script>

<template>
  <div class="mx-auto px-6 py-8 max-w-7xl">
    <div class="flex flex-col gap-8 md:flex-row">
      <!-- 产品图片轮播区域 -->
      <!-- <Carousel :images /> -->
      <img :src="data?.product?.imageUrl || ''" alt="productName" class="h-[400px] w-full transition-opacity duration-300 object-cover">

      <!-- 产品信息区域 -->
      <div class="flex flex-col w-full md:w-1/2">
        <div class="mb-6">
          <h1 class="text-3xl font-bold mb-2">
            {{ data?.product?.name }}
          </h1>
          <p class="text-2xl text-red font-bold">
            {{ formatCurrency(data?.product?.price) }}
          </p>
        </div>

        <!-- 购买区域 -->
        <div class="mt-auto flex gap-4 items-center">
          <!-- 数量 -->
          <el-input-number v-model="quantity" :min="1" :max="99" />
          <!-- 添加购物车 -->
          <el-popover
            placement="bottom" title="Tip" :width="200" trigger="click"
            content="Already added to shopping cart."
          >
            <template #reference>
              <el-button
                class="text-white font-medium px-6 py-2 rounded-md bg-indigo-600 flex flex-1 gap-2 transition-colors hover:bg-indigo-700"
                @click="addToCart"
              >
                <div class="i-carbon-shopping-cart mr-2" />
                Add Cart
              </el-button>
            </template>
          </el-popover>
          <!-- 收藏 -->
          <div class="p-2 cursor-pointer hover:text-red">
            <div class="i-carbon-favorite text-xl" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
