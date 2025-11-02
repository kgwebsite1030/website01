<!-- components/CategoryTreeSelector.vue -->
<script setup lang="ts">
import type { Category } from './types'
import CategoryNode from './CategoryNode.vue'

// 接收分类数据
const props = defineProps<{
  data: Category[]
  modelValue?: string | number | null
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', id: string | number | null): void
}>()

const selectedId = ref<string | number | null>(props.modelValue ?? null)

// 监听外部传入的 modelValue 变化
watch(() => props.modelValue, (newValue) => {
  selectedId.value = newValue ?? null
})

function handleSelect(path: (string | number)[]) {
  // 使用完整的路径作为唯一标识
  const uniqueId = path.join('/')
  selectedId.value = uniqueId
  emit('update:modelValue', uniqueId)
}
</script>

<template>
  <div class="mx-auto w-full">
    <div class="border rounded-lg shadow-sm overflow-hidden">
      <div class="max-h-[300px] overflow-y-auto md:max-h-[500px] sm:max-h-[400px]">
        <template v-for="node in data as Category[]" :key="node.id">
          <CategoryNode
            v-if="node.productCount && node.productCount > 0" :node="node" :selected-id="selectedId"
            :path="[node.id]" @select="handleSelect"
          />
        </template>
      </div>
    </div>
  </div>
</template>
