<script setup lang='ts'>
import { nextTick, ref, watch } from 'vue'

withDefaults(defineProps<{
    images: string[]
}>(), {
    images: () => []
})

// 产品图片数组
const images = [
    'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1450&q=80',
    'https://images.unsplash.com/photo-1491553895911-0055eca6402d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1450&q=80',
    'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1450&q=80',
    'https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1450&q=80',
    'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1450&q=80',
    'https://images.unsplash.com/photo-1491553895911-0055eca6402d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1450&q=80',
    'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1450&q=80',
    'https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1450&q=80',
]

// 当前显示的图片索引
const currentImageIndex = ref(0)

// 图片轮播控制
function nextImage() {
    currentImageIndex.value = (currentImageIndex.value + 1) % images.length
}

function prevImage() {
    currentImageIndex.value = (currentImageIndex.value - 1 + images.length) % images.length
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
                    <img :src="images[currentImageIndex]" alt="productName"
                        class="h-full w-full transition-opacity duration-300 object-cover">
                </slot>

                <!-- 左右箭头导航 -->
                <slot name="prev">
                    <button
                        class="p-2 rounded-full bg-white/70 shadow-md left-2 top-1/2 absolute hover:bg-white/90 -translate-y-1/2"
                        @click="prevImage">
                        <span class="i-carbon-chevron-left text-xl" />
                    </button>
                </slot>

                <slot name="next">
                    <button
                        class="p-2 rounded-full bg-white/70 shadow-md right-2 top-1/2 absolute hover:bg-white/90 -translate-y-1/2"
                        @click="nextImage">
                        <span class="i-carbon-chevron-right text-xl" />
                    </button>
                </slot>
            </div>

            <!-- 缩略图预览 -->
            <div ref="thumbnailsContainer" class="mt-6 p-2 flex gap-2 overflow-x-auto scrollbar-hide">
                <div v-for="(img, index) in images" :key="index"
                    :ref="(el) => setThumbnailRef(el as HTMLDivElement, index)"
                    class="rounded-md flex-shrink-0 h-20 w-20 cursor-pointer overflow-hidden"
                    :class="{ 'ring-2 ring-indigo-500': currentImageIndex === index }"
                    @click="currentImageIndex = index">
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
