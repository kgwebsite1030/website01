import type { User } from '~/api/types/user'
import { acceptHMRUpdate, defineStore } from 'pinia'

const defaultUserInfo = {
  id: void 0,
  email: '',
} as User

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      userInfo: defaultUserInfo,
      token: '',
    }
  },
  getters: {
    isLogin(): boolean {
      return !!this.token
    },
  },
  actions: {
    setUserInfo(user: User) {
      this.userInfo = user
    },
    setToken(token: string) {
      this.token = token
    },
    getToken() {
      return this.token
    },
  },
  persist: true,
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore as any, import.meta.hot))
