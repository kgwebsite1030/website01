<!-- components/CategoryNode.vue -->
<script setup lang="ts">
import type { Category } from './types'

const props = defineProps<{
  node: Category
  selectedId: string | number | null
  path: (string | number)[]
}>()

const emit = defineEmits<{
  (e: 'select', path: (string | number)[]): void
}>()

const isExpanded = ref(false)
const hasChildren = computed(() => !!props.node.subCategories?.length)
// 将路径转换为字符串进行比较
const currentPathId = computed(() => props.path.join('/'))
const isSelected = computed(() => currentPathId.value === props.selectedId)

function toggleOrSelect() {
  // 触发选中事件
  emit('select', props.path)

  // 如果有子节点，同时切换展开/收起状态
  if (hasChildren.value) {
    isExpanded.value = !isExpanded.value
  }
}

function handleSelect(path: (string | number)[]) {
  emit('select', path)
}
</script>

<template>
  <div class="border-b border-gray-100 last:border-b-0">
    <button
      class="px-3 py-2 text-left flex w-full transition-colors items-center justify-between sm:px-4 sm:py-3 focus:outline-none"
      @click="toggleOrSelect"
    >
      <div>
        <span class="text-xs font-medium truncate md:text-base sm:text-sm">{{ node.name }}</span>
        {{ node.productCount }}
      </div>

      <div class="flex flex-shrink-0 items-center space-x-2">
        <!-- 子项图标 -->
        <svg
          v-if="hasChildren" :class="{
            'rotate-90': !isExpanded,
            'rotate-0': isExpanded,
          }" class="h-3 w-3 transition-transform duration-200 sm:h-4 sm:w-4" fill="none" stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
        <!-- 选中标识 -->
        <div v-if="isSelected" class="rounded-full bg-blue-500 h-2 w-2 sm:h-3 sm:w-3" />
      </div>
    </button>

    <!-- 子分类递归渲染 -->
    <div v-show="isExpanded && hasChildren" class="pl-2 sm:pl-4">
      <template v-for="child in node.subCategories as Category[]" :key="child.id">
        <CategoryNode
          v-if="child.productCount && child.productCount > 0" :node="child"
          :selected-id="selectedId" :path="[...path, child.id]" @select="handleSelect"
        />
      </template>
    </div>
  </div>
</template>
