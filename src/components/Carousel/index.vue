<script setup lang='ts'>
import { nextTick, ref, watch } from 'vue'

const props = withDefaults(defineProps<{
  images?: string[]
}>(), {
  images: () => [],
})

// 当前显示的图片索引
const currentImageIndex = ref(0)

// 图片轮播控制
function nextImage() {
  currentImageIndex.value = (currentImageIndex.value + 1) % props.images.length
}

function prevImage() {
  currentImageIndex.value = (currentImageIndex.value - 1 + props.images.length) % props.images.length
}

// 缩略图容器与元素引用，使活动缩略图始终居中
const thumbnailsContainer = ref<HTMLDivElement | null>(null)
const thumbnailRefs = ref<Record<number, HTMLDivElement | null>>({})

function setThumbnailRef(el: HTMLDivElement | null, index: number) {
  if (el)
    thumbnailRefs.value[index] = el
}

function centerActiveThumbnail(index: number) {
  const container = thumbnailsContainer.value
  const thumb = thumbnailRefs.value[index]
  if (!container || !thumb)
    return

  const containerRect = container.getBoundingClientRect()
  const thumbRect = thumb.getBoundingClientRect()

  const currentScrollLeft = container.scrollLeft
  const thumbCenterX = thumbRect.left - containerRect.left + currentScrollLeft + (thumbRect.width / 2)
  const targetScrollLeft = Math.max(0, thumbCenterX - (containerRect.width / 2))

  container.scrollTo({ left: targetScrollLeft, behavior: 'smooth' })
}

watch(currentImageIndex, async (idx) => {
  await nextTick()
  centerActiveThumbnail(idx)
})
</script>

<template>
  <!-- 产品图片轮播区域 -->
  <div class="w-full md:w-1/2">
    <div class="rounded-lg shadow-lg relative overflow-hidden">
      <!-- 主图片展示 -->
      <div class="h-[400px] relative">
        <slot name="image" :image="images[currentImageIndex]">
          <img
            :src="images[currentImageIndex]" alt="productName"
            class="h-full w-full transition-opacity duration-300 object-cover"
          >
        </slot>

        <!-- 左右箭头导航 -->
        <slot name="prev">
          <button
            class="p-2 rounded-full bg-white/70 shadow-md left-2 top-1/2 absolute hover:bg-white/90 -translate-y-1/2"
            @click="prevImage"
          >
            <span class="i-carbon-chevron-left text-xl" />
          </button>
        </slot>

        <slot name="next">
          <button
            class="p-2 rounded-full bg-white/70 shadow-md right-2 top-1/2 absolute hover:bg-white/90 -translate-y-1/2"
            @click="nextImage"
          >
            <span class="i-carbon-chevron-right text-xl" />
          </button>
        </slot>
      </div>

      <!-- 缩略图预览 -->
      <div ref="thumbnailsContainer" class="scrollbar-hide mt-6 p-2 flex gap-2 overflow-x-auto">
        <div
          v-for="(img, index) in images" :key="index"
          :ref="(el) => setThumbnailRef(el as HTMLDivElement, index)"
          class="rounded-md flex-shrink-0 h-20 w-20 cursor-pointer overflow-hidden"
          :class="{ 'ring-2 ring-indigo-500': currentImageIndex === index }"
          @click="currentImageIndex = index"
        >
          <img :src="img" alt="productName" class="h-full w-full object-cover">
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
