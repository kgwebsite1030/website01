<script setup lang="ts">

</script>

<template>
  <div class="my-16 rounded-lg w-full relative overflow-hidden">
    <div class="bg-gary-100 flex flex-col gap-4 lg:flex-row lg:justify-between">
      <div class="relative lg:w-1/2">
        <slot name="left">
          1
        </slot>
      </div>
      <div class="relative lg:w-1/2">
        <slot name="right">
          2
        </slot>
      </div>
    </div>
  </div>
</template>
