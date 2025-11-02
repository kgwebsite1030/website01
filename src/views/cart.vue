<script setup lang='ts'>
import type { Cart } from '~/api/types/cart'
import { useRequest } from 'alova/client'
import { getCartList, removeCart, updateCart } from '~/api/cart'
import { formatCurrency } from '~/utils/currency'

const router = useRouter()

const carts = ref<Cart[]>([])

const total = ref(0)

const { data: cartList } = useRequest(() => getCartList())

watchEffect(() => {
  if (cartList.value) {
    carts.value = cartList.value.items
    total.value = cartList.value.totalPrice
  }
})

/**
 * 商品数量被改变
 */
function handleChangeQty(_item: any) {
  const { id, productId, quantity } = _item
  updateCart(id, productId, quantity)
}

/**
 * 移除商品
 */
function handleRemove(_item: any) {
  const { id } = _item
  removeCart(id)
}

/**
 * 结算
 */
function checkout() {
  // 1、生成选中的商品id集合
  // 2、发送后端生成订单信息
  // 3、携带订单id跳转至结算页
  router.push({ path: '/checkout' })
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
            <li v-for="item in carts" :key="item.id" class="flex flex-col gap-3 sm:flex-row sm:gap-4 sm:items-center">
              <img :src="item.imageUrl" alt="" class="rounded-sm size-14 object-cover sm:size-16">

              <div class="flex-1 w-full">
                <h3 class="text-sm sm:text-base">
                  {{ item.productName }}
                </h3>

                <span class="text-sm text-red">
                  {{ formatCurrency(item.price) }}
                </span>
              </div>

              <div class="flex gap-2 w-full items-center justify-between sm:flex-1 sm:w-auto sm:justify-end">
                <form class="flex items-center">
                  <label for="Line1Qty" class="sr-only"> Quantity </label>
                  <el-input-number
                    id="Line1Qty" v-model="item.quantity" type="number" :min="1" :max="99" size="small"
                    class="text-xs p-0 text-center rounded-sm h-9 w-16 [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-outer-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none focus:outline-hidden sm:h-8 sm:w-12"
                    @change="handleChangeQty(item)"
                  />
                </form>

                <button class="transition hover:text-red-600" @click="handleRemove(item)">
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
            <div class="font-medium flex gap-8 justify-between !text-base">
              <span>Total</span>
              <span class="text-red">{{ formatCurrency(total) }}</span>
            </div>
          </div>

          <div class="mt-6 flex justify-end">
            <el-button type="primary" plain :disabled="carts.length === 0" @click="checkout">
              Checkout
            </el-button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
