<!-- components/CategoryNode.vue -->
<script setup lang="ts">
import type { Category } from './types'

const props = defineProps<{
  node: Category
  selectedId: string | number | null
}>()

const emit = defineEmits<{
  (e: 'select', id: string | number): void
}>()

const isExpanded = ref(false)
const hasChildren = computed(() => !!props.node.children?.length)
const isSelected = computed(() => props.node.id === props.selectedId)

function toggleOrSelect() {
  if (hasChildren.value) {
    isExpanded.value = !isExpanded.value
  }
  else {
    emit('select', props.node.id)
  }
}

function handleSelect(id: string | number) {
  emit('select', id)
}
</script>

<template>
  <div class="border-b border-gray-100 last:border-b-0">
    <button
      class="px-3 py-2 text-left flex w-full transition-colors items-center justify-between sm:px-4 sm:py-3 focus:outline-none"
      @click="toggleOrSelect"
    >
      <span class="text-xs font-medium truncate md:text-base sm:text-sm">{{ node.name }}</span>
      <div class="flex flex-shrink-0 items-center space-x-2">
        <!-- 子项图标 -->
        <svg
          v-if="hasChildren"
          :class="{
            'rotate-90': !isExpanded,
            'rotate-0': isExpanded,
          }"
          class="h-3 w-3 transition-transform duration-200 sm:h-4 sm:w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
        <!-- 选中标识 -->
        <div
          v-if="isSelected"
          class="rounded-full bg-blue-500 h-2 w-2 sm:h-3 sm:w-3"
        />
      </div>
    </button>

    <!-- 子分类递归渲染 -->
    <div
      v-show="isExpanded && hasChildren"
      class="pl-2 sm:pl-4"
    >
      <CategoryNode
        v-for="child in node.children"
        :key="child.id"
        :node="child"
        :selected-id="selectedId"
        @select="handleSelect"
      />
    </div>
  </div>
</template>
