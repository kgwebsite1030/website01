<script setup lang="ts">
import { settings } from '~/settings'

const left = settings.footerNav.slice(0, 2)
const right = settings.footerNav.slice(2, 4)

function handleClick() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <footer aria-labelledby="footer-heading">
    <h2 id="footer-heading" class="sr-only">
      Footer
    </h2>
    <div class="mx-auto px-6 max-w-7xl lg:px-8 lg:pt-32 sm:pt-24">
      <div class="mt-16 pt-16 border-t border-gray-300 gap-8 grid grid-cols-2 xl:mt-0 dark:border-gray-700 xl:col-span-2">
        <!-- left -->
        <div class="md:gap-8 md:grid md:grid-cols-2">
          <div v-for="item in left" :key="item.title" class="py-6">
            <h3 class="text-lg leading-6">
              {{ item.title }}
            </h3>
            <ul role="list" class="mt-6 space-y-4">
              <li v-for="nav in item.links" :key="nav.path" class="hover:underline">
                <RouterLink :to="nav.path" class="text-sm leading-6" @click="handleClick">
                  {{ nav.name }}
                </RouterLink>
              </li>
            </ul>
          </div>
        </div>
        <!-- right -->
        <div class="md:gap-8 md:grid md:grid-cols-2">
          <div v-for="item in right" :key="item.title" class="py-6">
            <h3 class="text-lg leading-6">
              {{ item.title }}
            </h3>
            <ul role="list" class="mt-6 space-y-4">
              <li v-for="nav in item.links" :key="nav.path" class="hover:underline">
                <RouterLink :to="nav.path" class="text-sm leading-6" @click="handleClick">
                  {{ nav.name }}
                </RouterLink>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="mt-16 py-8 border-t border-gray-300 lg:mt-24 sm:mt-20 dark:border-gray-700">
        <p class="text-xs leading-5 text-center">
          {{ settings.copyright }}
        </p>
      </div>
    </div>
  </footer>
</template>
