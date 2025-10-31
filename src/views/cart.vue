<script setup lang='ts'>
import { formatUSDCurrency } from '~/utils/currency'

const count = ref(1)

function formatCurrency(value: number) {
  return formatUSDCurrency('en', value)
}
</script>

<template>
  <section>
    <div class="mx-auto px-4 py-8 max-w-7xl lg:px-8 sm:px-6 sm:py-12">
      <div class="mx-auto max-w-3xl">
        <header class="text-center">
          <h1 class="text-xl font-bold sm:text-3xl">
            Your Cart
          </h1>
        </header>

        <div class="mt-8">
          <ul class="space-y-4">
            <li class="flex flex-col gap-3 sm:flex-row sm:gap-4 sm:items-center">
              <img
                src="https://images.unsplash.com/photo-1618354691373-d851c5c3a990?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=830&amp;q=80"
                alt="" class="rounded-sm size-14 object-cover sm:size-16"
              >

              <div class="flex-1 w-full">
                <h3 class="text-sm sm:text-base">
                  Basic Tee 6-Pack
                </h3>

                <dl class="text-[11px] mt-0.5 space-y-px sm:text-[10px]">
                  <div>
                    <dt class="inline">
                      Size:
                    </dt>
                    <dd class="inline">
                      XXS
                    </dd>
                  </div>

                  <div>
                    <dt class="inline">
                      Color:
                    </dt>
                    <dd class="inline">
                      White
                    </dd>
                  </div>
                </dl>
              </div>

              <div class="flex gap-2 w-full items-center justify-between sm:flex-1 sm:w-auto sm:justify-end">
                <form class="flex items-center">
                  <label for="Line1Qty" class="sr-only"> Quantity </label>
                  <el-input-number
                    id="Line1Qty" type="number" :min="1" :model-value="count" :max="99" size="small"
                    class="text-xs p-0 text-center rounded-sm h-9 w-16 [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-outer-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none focus:outline-hidden sm:h-8 sm:w-12"
                  />
                </form>

                <button class="transition hover:text-red-600">
                  <span class="sr-only">Remove item</span>

                  <svg
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="size-5 sm:size-4"
                  >
                    <path
                      stroke-linecap="round" stroke-linejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </button>
              </div>
            </li>
          </ul>

          <div class="mt-8 pt-8 border-t border-gray-100 flex justify-end">
            <div class="max-w-lg w-screen space-y-4">
              <dl class="text-sm space-y-0.5">
                <div class="flex justify-between">
                  <dt>Subtotal</dt>
                  <dd>{{ formatCurrency(250) }}</dd>
                </div>

                <div class="flex justify-between">
                  <dt>VAT</dt>
                  <dd>{{ formatCurrency(25) }}</dd>
                </div>

                <div class="flex justify-between">
                  <dt>Discount</dt>
                  <dd>{{ formatCurrency(20) }}</dd>
                </div>

                <div class="font-medium flex justify-between !text-base">
                  <dt>Total</dt>
                  <dd>{{ formatCurrency(200) }}</dd>
                </div>
              </dl>

              <div class="flex justify-end">
                <el-button type="primary" plain>
                  <RouterLink to="/checkout" class="text-sm px-5 py-3 rounded-sm block transition">
                    Checkout
                  </RouterLink>
                </el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
