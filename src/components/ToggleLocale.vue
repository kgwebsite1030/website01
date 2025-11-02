<script setup lang="ts">
import { availableLocales, loadLanguageAsync } from '~/modules/i18n'

const currentLocale = ref(navigator.language)

onMounted(async () => {
  const savedLocale = localStorage.getItem('locale')
  if (savedLocale && availableLocales.includes(savedLocale)) {
    currentLocale.value = savedLocale
    await loadLanguageAsync(currentLocale.value)
  }
})

async function onChange(locale: string) {
  if (currentLocale.value === locale)
    return
  currentLocale.value = locale
  await loadLanguageAsync(locale)
  localStorage.setItem('locale', locale)
}
</script>

<template>
  <div class="group relative">
    <!-- 触发器 -->
    <button type="button" class="flex gap-1.5 items-center sm:text-sm focus:outline-none" aria-label="Switch language">
      <Icon icon="carbon-language" class="text-base" />
      <span>{{ currentLocale }}</span>
      <div class="i-heroicons-chevron-down-20-solid text-xs opacity-60" />
    </button>

    <!-- 下拉菜单 -->
    <div
      class="text-sm text-gray-700 mt-1 py-1 rounded-md bg-white opacity-0 w-24 invisible shadow-lg origin-top transition-opacity duration-200 ease-in-out absolute z-10 dark:text-gray-200 dark:bg-gray-800 group-hover:opacity-100 group-hover:visible"
      role="menu"
    >
      <button
        v-for="locale in availableLocales" :key="locale"
        class="px-3 py-1.5 text-left w-full focus:bg-gray-100 hover:bg-gray-100 dark:focus:bg-gray-700 dark:hover:bg-gray-700"
        :class="[
          { 'font-medium bg-gray-100 dark:bg-gray-700': currentLocale === locale },
        ]" @click="onChange(locale)"
      >
        {{ locale }}
      </button>
    </div>
  </div>
</template>
