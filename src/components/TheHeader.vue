<script setup lang="ts">
import { settings } from '~/settings'
import { useCartStore } from '~/stores/cart'

const cartStore = useCartStore()

const openMenu = ref(false)
function toggleMenu() {
  openMenu.value = !openMenu.value
}
</script>

<template>
  <header class="inset-x-0 top-0 z-50">
    <!-- 桌面端菜单 -->
    <nav aria-label="Global" class="p-6 flex items-center justify-between lg:px-8">
      <div class="flex lg:flex-1">
        <RouterLink to="/" class="p-1.5 -m-1.5">
          <span class="sr-only">Your Company</span>
          <img :src="settings.companyLogo" alt="company log" class="w-auto h-8!">
        </RouterLink>
      </div>
      <div class="flex lg:hidden">
        <button
          type="button" class="p-2.5 rounded-md inline-flex items-center justify-center -m-2.5"
          @click="toggleMenu"
        >
          <span class="sr-only">Open main menu</span>
          <svg
            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-slot="icon"
            aria-hidden="true" class="size-6"
          >
            <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
      </div>
      <div class="hidden lg:flex lg:gap-x-12">
        <template v-for="item in settings.navList" :key="item.path">
          <RouterLink :to="item.path" class="text-sm/6 font-semibold">
            {{ item.name }}
          </RouterLink>
        </template>
      </div>
      <div class="gap-6 hidden lg:flex lg:flex-1 lg:justify-end">
        <RouterLink to="/favorite">
          <Icon icon="carbon-favorite" />
        </RouterLink>
        <RouterLink to="/cart" class="relative">
          <Icon icon="carbon-shopping-cart" />
          <span
            v-if="cartStore.totalItems > 0"
            class="text-[8px] text-white rounded-full bg-red-500 flex h-4 w-4 items-center justify-center absolute -right-2 -top-2"
          >
            {{ cartStore.totalItems }}
          </span>
        </RouterLink>
        <ToggleLocale />
        <!-- <ToggleTheme /> -->
        <RouterLink to="/auth/signin" class="text-sm/6 font-semibold">
          Log in <span aria-hidden="true">&rarr;</span>
        </RouterLink>
      </div>
    </nav>
    <!-- 移动端菜单 -->
    <dialog :open="openMenu" class="backdrop:bg-transparent">
      <div tabindex="0" class="inset-0 fixed focus:outline-none">
        <div class="p-6 bg-white w-full inset-y-0 right-0 fixed z-50 overflow-y-auto sm:max-w-sm sm:ring-1">
          <div class="flex items-center justify-between">
            <a href="#" class="p-1.5 -m-1.5">
              <span class="sr-only">Your Company</span>
              <img
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500" alt=""
                class="h-8 w-auto"
              >
            </a>
            <button type="button" class="p-2.5 rounded-md -m-2.5" @click="toggleMenu">
              <span class="sr-only">Close menu</span>
              <svg
                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-slot="icon"
                aria-hidden="true" class="size-6"
              >
                <path d="M6 18 18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>
          </div>
          <div class="mt-6 flow-root">
            <div class="divide-white/10 divide-y -my-6">
              <div class="py-6 space-y-2">
                <template v-for="item in settings.navList" :key="item.path">
                  <RouterLink
                    :to="item.path" class="text-base/7 font-semibold px-3 py-2 rounded-lg block -mx-3"
                    @click="toggleMenu"
                  >
                    {{ item.name }}
                  </RouterLink>
                </template>
                <ToggleLocale class="text-base/7 font-semibold px-3 py-2 rounded-lg block -mx-3" />
              </div>
              <div class="py-6">
                <RouterLink to="/auth/signin" class="text-base/7 font-semibold px-3 py-2.5 rounded-lg block -mx-3">
                  Log
                  in
                </RouterLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  </header>
</template>
