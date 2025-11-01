<script setup lang='ts'>
// 产品图片数组
const images = [
  'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1450&q=80',
  'https://images.unsplash.com/photo-1491553895911-0055eca6402d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1450&q=80',
  'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1450&q=80',
  'https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1450&q=80',
]

// 产品信息
const product = reactive({
  name: '限量版运动训练器',
  price: '$189.99',
  isCart: false,
  rating: 4,
  reviewCount: 128,
  availability: '有库存 - 2-3天内发货',
  description: '这款限量版运动训练器采用高级材料制成，专为专业运动员和健身爱好者设计。它具有人体工程学设计，可提供最佳的舒适度和支持，同时确保您在训练过程中获得最大的效果。',
  features: [
    '高级缓震技术，减少关节压力',
    '透气网面，保持双脚干爽舒适',
    '耐磨橡胶外底，提供卓越的抓地力',
    '轻量化设计，减少疲劳感',
    '可拆卸鞋垫，方便清洗和更换',
  ],
  colors: [
    { name: '经典黑', hex: '#000000' },
    { name: '纯白', hex: '#FFFFFF' },
    { name: '海军蓝', hex: '#000080' },
    { name: '赤红', hex: '#FF0000' },
    { name: '森林绿', hex: '#228B22' },
    { name: '亮黄', hex: '#FFFF00' },
  ],
  sizes: ['36', '37', '38', '39', '40', '41', '42', '43', '44', '45'],
  specifications: [
    { name: '材质', value: '合成纤维、天然橡胶' },
    { name: '重量', value: '280克（单只，42码）' },
    { name: '产地', value: '中国' },
    { name: '适用场景', value: '跑步、健身、日常穿着' },
    { name: '防水等级', value: '轻度防水' },
    { name: '包装内容', value: '鞋子一双、备用鞋带、收纳袋' },
  ],
  reviews: [
    { user: '张三', rating: 5, comment: '非常舒适的鞋子，穿着跑步感觉很轻盈，推荐购买！', date: '2023-05-15' },
    { user: '李四', rating: 4, comment: '质量不错，就是颜色比图片上的深一些，总体还是很满意的。', date: '2023-04-28' },
    { user: '王五', rating: 5, comment: '这是我买过的最舒服的一双运动鞋，值得这个价格！', date: '2023-04-10' },
  ],
})

// 购买数量
const quantity = ref(1)

// 标签页
const tabs = ['产品详情', '规格参数', '用户评价']
const activeTab = ref(0)

// 添加到购物车
function addToCart() {
  // 这里可以添加实际的购物车逻辑

}
</script>

<template>
  <div class="mx-auto px-6 py-8 max-w-7xl">
    <div class="flex flex-col gap-8 md:flex-row">
      <!-- 产品图片轮播区域 -->
      <!-- <Carousel :images /> -->
      <img
        :src="images[0]" alt="productName"
        class="h-[400px] w-full transition-opacity duration-300 object-cover"
      >

      <!-- 产品信息区域 -->
      <div class="flex flex-col w-full md:w-1/2">
        <div class="mb-6">
          <h1 class="text-2xl font-bold mb-2">
            {{ product.name }}
          </h1>
          <p class="text-3xl font-bold">
            {{ product.price }}
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

    <!-- 产品详情和规格参数 -->
    <div class="mt-12 pt-8 border-t">
      <div class="border-b flex">
        <button
          v-for="(tab, index) in tabs" :key="index" class="text-sm font-medium px-6 py-3"
          :class="activeTab === index ? '' : 'text-gray hover:text-gray-300'" @click="activeTab = index"
        >
          {{ tab }}
        </button>
      </div>
      <div class="py-6">
        <div v-if="activeTab === 0" class="max-w-none">
          <p>{{ product.description }}</p>
          <ul class="mt-4">
            <li v-for="(feature, index) in product.features" :key="index">
              {{ feature }}
            </li>
          </ul>
        </div>
        <div v-else-if="activeTab === 1">
          <div class="gap-4 grid grid-cols-1 md:grid-cols-2">
            <div
              v-for="(spec, index) in product.specifications" :key="index"
              class="py-2 border-b border-gray-200 flex"
            >
              <span class="font-medium w-1/3">{{ spec.name }}</span>
              <span class="w-2/3">{{ spec.value }}</span>
            </div>
          </div>
        </div>
        <div v-else-if="activeTab === 2">
          <div
            v-for="(review, index) in product.reviews" :key="index"
            class="py-4 border-b border-gray-200 last:border-b-0"
          >
            <div class="mb-2 flex items-center justify-between">
              <div class="flex gap-2 items-center">
                <div class="rounded-full bg-gray-200 flex h-8 w-8 items-center justify-center">
                  {{ review.user.charAt(0) }}
                </div>
                <span class="font-medium">{{ review.user }}</span>
              </div>
              <div class="flex">
                <span v-for="i in 5" :key="i" class="text-yellow-400">
                  <span v-if="i <= review.rating" class="i-carbon-star-filled" />
                  <span v-else class="i-carbon-star" />
                </span>
              </div>
            </div>
            <p class="">
              {{ review.comment }}
            </p>
            <p class="text-xs mt-1">
              {{ review.date }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 自定义滚动条样式 */
::-webkit-scrollbar {
  height: 4px;
  width: 4px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.scrollbar-hide {
  scrollbar-width: none;
  /* Firefox */
  -ms-overflow-style: none;
  /* Internet Explorer 10+ */
}

.scrollbar-hide::-webkit-scrollbar {
  /* WebKit */
  display: none;
}
</style>
