<script setup lang='ts'>
import { formatUSDCurrency } from '~/utils/currency'

function formatCurrency(value: number) {
  return formatUSDCurrency('en', value)
}
</script>

<template>
  <section>
    <div class="mx-auto px-4 py-8 max-w-7xl lg:px-8 sm:px-6 sm:py-18">
      <header class="text-center">
        <h2 class="text-xl font-bold sm:text-3xl">
          <i dir="auto" style="vertical-align: inherit;">
            <i dir="auto" style="vertical-align: inherit;">Popular Products</i>
          </i>
        </h2>

        <p class="text-gray-500 mx-auto mt-4 max-w-md dark:text-gray-300">
          <i dir="auto" style="vertical-align: inherit;">
            <i dir="auto" style="vertical-align: inherit;">
              Lorem ipsum，dolor sat amet consectetur adipisicing elit。 Itaque praesentium cumque iure dicta incidunt
              est ipsam, official dolor fugit natus?
            </i>
          </i>
        </p>
      </header>

      <ul class="mt-8 gap-4 grid lg:grid-cols-4 sm:grid-cols-2">
        <li v-for="value in 10" :key="value">
          <a href="#" class="group rounded-sm block shadow-sm overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1770&amp;q=80"
              alt="" class="h-[250px] w-full transition duration-500 object-cover sm:h-[250px] group-hover:scale-105"
            >

            <div class="pt-3 bg-white relative">
              <h3 class="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4">
                <i dir="auto" style="vertical-align: inherit;">
                  <i dir="auto" style="vertical-align: inherit;">
                    T-shirt
                  </i>
                </i>
              </h3>

              <p class="mt-2">

                <span class="text-gray-900 tracking-wider">
                  <i dir="auto" style="vertical-align: inherit;">
                    <i dir="auto" style="vertical-align: inherit;">{{ formatCurrency(24) }}</i>
                  </i>
                </span>
              </p>
            </div>
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped></style>
