<script setup lang='ts'>
defineProps<{
  productId?: string | number
}>()
</script>

<template>
  <div class="group cursor-pointer rounded-md w-full block shadow-sm transition-shadow duration-300 overflow-hidden lg:w-[220px] md:w-[200px] sm:w-[180px] hover:shadow-md" :data-product-id="productId">
    <div class="h-[200px] relative lg:h-[350px] md:h-[300px] sm:h-[250px]">
      <img
        src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1450&amp;q=80"
        alt="产品图片" class="opacity-100 h-full w-full transition-opacity duration-300 inset-0 absolute object-cover group-hover:opacity-0"
      >

      <img
        src="https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1450&amp;q=80"
        alt="产品图片" class="opacity-0 h-full w-full transition-opacity duration-300 inset-0 absolute object-cover group-hover:opacity-100"
      >
    </div>

    <div class="p-3 bg-white relative sm:p-4">
      <h3 class="text-xs text-gray-700 truncate md:text-base sm:text-sm group-hover:underline group-hover:underline-offset-4">
        限量版运动训练器
      </h3>

      <div class="text-gray-900 mt-1.5 flex items-center justify-between">
        <p class="text-sm tracking-wide font-medium md:text-base">
          189.99 美元
        </p>

        <p class="text-xs tracking-wide uppercase">
          6种颜色
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
