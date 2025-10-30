<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  modelValue: {
    number: string
    month: string
    year: string
    cvc: string
    holder: string
  }
}>()
const emit = defineEmits(['update:modelValue'])

const localCardInfo = ref({ ...props.modelValue })

watch(() => props.modelValue, (val) => {
  if (
    val.number !== localCardInfo.value.number
    || val.month !== localCardInfo.value.month
    || val.year !== localCardInfo.value.year
    || val.cvc !== localCardInfo.value.cvc
    || val.holder !== localCardInfo.value.holder
  ) {
    localCardInfo.value = { ...val }
  }
}, { deep: true })

watch(() => localCardInfo.value, (val) => {
  emit('update:modelValue', { ...val })
}, { deep: true })
</script>

<template>
  <div text-lg tracking-wide font-semibold py-3 rounded w-full transition>
    <div>
      <label class="text-sm font-medium">Card Number</label>
      <input
        v-model="localCardInfo.number" type="text" placeholder="1234 5678 9012 3456"
        class="text-sm mt-1 px-4 py-2 border border-gray-300 rounded w-full" maxlength="19"
      >
    </div>
    <div class="gap-2 grid grid-cols-3">
      <div>
        <label class="text-sm font-medium">Expiry Month</label>
        <input
          v-model="localCardInfo.month" type="text" placeholder="MM"
          class="text-sm mt-1 px-4 py-2 border border-gray-300 rounded w-full" maxlength="2"
        >
      </div>
      <div>
        <label class="text-sm font-medium">Expiry Year</label>
        <input
          v-model="localCardInfo.year" type="text" placeholder="YY"
          class="text-sm mt-1 px-4 py-2 border border-gray-300 rounded w-full" maxlength="2"
        >
      </div>
      <div>
        <label class="text-sm font-medium">CVC</label>
        <input
          v-model="localCardInfo.cvc" type="text" placeholder="123"
          class="text-sm mt-1 px-4 py-2 border border-gray-300 rounded w-full" maxlength="4"
        >
      </div>
    </div>
    <div>
      <label class="text-sm font-medium">Card Holder Name</label>
      <input
        v-model="localCardInfo.holder" type="text" placeholder="John Doe"
        class="text-sm mt-1 px-4 py-2 border border-gray-300 rounded w-full"
      >
    </div>
  </div>
</template>
