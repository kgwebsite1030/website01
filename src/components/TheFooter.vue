<script setup lang="ts">
import { settings } from '~/settings'
</script>

<template>
  <footer aria-labelledby="footer-heading">
    <h2 id="footer-heading" class="sr-only">
      Footer
    </h2>
    <div class="mx-auto px-6 pb-8 pt-16 max-w-7xl lg:px-8 lg:pt-32 sm:pt-24">
      <div class="pt-16 border-t border-gray-300 dark:border-gray-700 xl:gap-8 xl:grid xl:grid-cols-3">
        <div class="space-y-8">
          <img class="h-20" :src="settings.companyLogo" alt="Company name">
          <p class="text-sm leading-6">
            {{ settings.description }}
          </p>
          <div class="mt-6 flex space-x-6">
            <ToggleLocale />
            <ToggleTheme />
          </div>
        </div>
        <div class="mt-16 gap-8 grid grid-cols-2 xl:mt-0 xl:col-span-2">

          <div class="md:gap-8 md:grid md:grid-cols-2">

            <div>
              <h3 class="text-sm leading-6 font-semibold">
                Company
              </h3>
              <ul role="list" class="mt-6 space-y-4">
                <li>
                  <a href="#" class="text-sm leading-6">About</a>
                </li>
              </ul>
            </div>

            <div class="mt-10 md:mt-0">
              <h3 class="text-sm leading-6 font-semibold">
                Legal
              </h3>
              <ul role="list" class="mt-6 space-y-4">
                <li>
                  <a href="#" class="text-sm leading-6">Claim</a>
                </li>
              </ul>
            </div>
          </div>

          <div class="md:gap-8 md:grid md:grid-cols-2">

            <div>
              <h3 class="text-sm leading-6 font-semibold">
                Company
              </h3>
              <ul role="list" class="mt-6 space-y-4">
                <li>
                  <a href="#" class="text-sm leading-6">About</a>
                </li>
              </ul>
            </div>

            <div class="mt-10 md:mt-0">
              <h3 class="text-sm leading-6 font-semibold">
                Legal
              </h3>
              <ul role="list" class="mt-6 space-y-4">
                <li>
                  <a href="#" class="text-sm leading-6">Claim</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-16 pt-8 border-t border-gray-300 lg:mt-24 sm:mt-20 dark:border-gray-700">
        <p class="text-xs leading-5">
          {{ settings.copyright }}
        </p>
      </div>
    </div>
  </footer>
</template>
