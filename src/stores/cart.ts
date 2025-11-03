import { acceptHMRUpdate, defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => {
    return {
      totalItems: 0,
    }
  },
  actions: {
    // 设置购物车商品总数
    setTotalItems(totalItems: number) {
      this.totalItems = totalItems
    },
    // 增加购物车商品数量
    addTotalItems(quantity: number) {
      this.totalItems += quantity
    },
    // 减少购物车商品数量
    subtractTotalItems(quantity: number) {
      this.totalItems -= quantity
    },
    // 清空购物车
    clearCart() {
      this.totalItems = 0
    },
  },
  persist: true,
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore as any, import.meta.hot))
