<script setup lang="ts">
defineProps({
  id: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  modelValue: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
  placeholder: {
    type: String,
    default: '',
  },
  required: {
    type: Boolean,
    default: false,
  },
  error: {
    type: String,
    default: '',
  },
  maxlength: {
    type: Number,
    default: 99,
  },
})

defineEmits(['update:modelValue'])
</script>

<template>
  <div class="mb-4">
    <label :for="id" class="text-sm text-gray-700 font-medium mb-1 block dark:text-gray-300">{{ label }}</label>
    <input
      :id="id"
      :type="type"
      :value="modelValue"
      class="focus:ring-primary-500 focus:border-primary-500 px-3 py-2 border border-gray-300 rounded-md w-full shadow-sm dark:text-white focus:outline-none dark:border-gray-600 dark:bg-gray-700"
      :placeholder="placeholder"
      :required="required"
      :maxlength="maxlength"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    >
    <p v-if="error" class="text-sm text-red-600 mt-1 dark:text-red-400">
      {{ error }}
    </p>
  </div>
</template>
