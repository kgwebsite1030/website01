<script setup lang='ts'>
import { toggleDark } from '~/composables/dark'
</script>

<template>
  <a class="cursor-pointer select-none" title="Toggle Color Scheme" @click="toggleDark">
    <div i-carbon-awake dark:i-carbon-asleep />
  </a>
</template>
