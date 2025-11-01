<script setup lang="ts">
defineOptions({
  name: 'IndexPage',
})

// const params = reactive({
//   key: '513817480b6713e45eaa59c3037017db',
//   id: '9872ed9fc22fc182',
// })

// const { data } = useRequest(() => getIndexCases(params), { immediately: true })

const popularProducts = [{
  title: 'T-shirt',
  price: 24,
}]

const newProducts = [{
  title: 'T-shirt',
  price: 24,
}]
</script>

<template>
  <PageContainer>
    <!-- 两栏布局 -->
    <TowColContainer>
      <template #left>
        <div class="rounded-lg bg-gray-200 aspect-[4/3] overflow-hidden">
          <img
            src="https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Minimalist%20fashion%20collection%2C%20neutral%20colors&sign=c6cab4079bd135fae3ef26825f2b47fe"
            alt="Featured collection" class="h-full w-full object-cover"
          >
        </div>
      </template>
      <template #right>
        <h1 class="text-3xl text-gray-800 font-medium mb-4 md:text-4xl">
          Minimalist Essentials
        </h1>
        <p class="text-gray-600 mb-6">
          Discover our collection of simple, high-quality products for everyday use.
        </p>
        <div class="flex flex-wrap gap-4">
          <RouterLink to="/product" class="text-white px-6 py-3 bg-gray-800 transition-colors hover:bg-gray-900">
            Shop
            Now
          </RouterLink>
          <RouterLink to="#" class="text-gray-800 px-6 py-3 border border-gray-300 transition-colors hover:bg-gray-50">
            Learn More
          </RouterLink>
        </div>
      </template>
    </TowColContainer>
    <!-- 热门、爆款商品 -->
    <DisplayProduct title="PopularProduct" :products="popularProducts" />
    <!-- 新品 -->
    <DisplayProduct title="NewProduct" :products="newProducts" />
  </PageContainer>
</template>
