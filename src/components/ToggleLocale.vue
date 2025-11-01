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
  <div class="relative group">
    <!-- 触发器 -->
    <button type="button" class="flex items-center gap-1.5 sm:text-sm focus:outline-none" aria-label="Switch language">
      <Icon icon="carbon-language" class="text-base" />
      <span>{{ currentLocale }}</span>
      <div class=" i-heroicons-chevron-down-20-solid text-xs opacity-60" />
    </button>

    <!-- 下拉菜单 -->
    <div
      class="absolute z-10 mt-1 w-24 bg-white shadow-lg rounded-md py-1 text-sm opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-200 ease-in-out origin-top"
      role="menu"
    >
      <button
        v-for="locale in availableLocales" :key="locale"
        class="w-full text-left px-3 py-1.5 hover:bg-gray-100"
        :class="[
          { 'font-medium bg-gray-100 dark:bg-gray-700': currentLocale === locale },
        ]" @click="onChange(locale)"
      >
        {{ locale }}
      </button>
    </div>
  </div>
</template>
