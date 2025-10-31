<!-- components/CategoryTreeSelector.vue -->
<script setup lang="ts">
import type { Category } from './types'
import CategoryNode from './CategoryNode.vue'

// 接收分类数据
defineProps<{
  data: Category[]
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', id: string | number | null): void
}>()

const selectedId = ref<string | number | null>(null)

function handleSelect(id: string | number) {
  selectedId.value = id
  emit('update:modelValue', id)
}
</script>

<template>
  <div class="mx-auto w-full">
    <div class="border rounded-lg shadow-sm overflow-hidden">
      <div class="max-h-[300px] overflow-y-auto md:max-h-[500px] sm:max-h-[400px]">
        <CategoryNode
          v-for="node in data"
          :key="node.id"
          :node="node"
          :selected-id="selectedId"
          @select="handleSelect"
        />
      </div>
    </div>
  </div>
</template>
