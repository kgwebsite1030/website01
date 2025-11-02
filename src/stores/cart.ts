import { acceptHMRUpdate, defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => {
    return {
      totalItems: 10,
    }
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore as any, import.meta.hot))
