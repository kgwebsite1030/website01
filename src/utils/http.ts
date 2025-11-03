import { xhrRequestAdapter } from '@alova/adapter-xhr'
import { createAlova } from 'alova'
import VueHook from 'alova/vue'

// 创建 alova 实例
export const alovaInstance = createAlova({
  statesHook: VueHook,
  requestAdapter: xhrRequestAdapter(),
  baseURL: import.meta.env.VITE_BASE_URL, // 设置基础 URL
  timeout: 10000, // 设置超时时间
  // 请求拦截器
  beforeRequest: (method) => {
    const userStore = useUserStore()
    // 添加认证 token
    const token = userStore.getToken()

    if (token) {
      method.config.headers = {
        ...method.config.headers,
        satoken: `${token}`,
      }
    }
  },
  // 响应拦截器
  responded: {
    onSuccess: async (response) => {
      const { message, data, code } = response.data

      const userStore = useUserStore()

      // satoken 登录失效的状态码有多个，需要后端统一返回401
      if (code === 401) {
        ElNotification({
          title: 'Error',
          message,
          type: 'error',
        })

        userStore.setToken('')
        location.href = '/auth/signin'
        return
      }

      // 异常捕获、参数效验、服务错误等等，给前端一个提示
      if (code !== 200) {
        ElNotification({
          title: 'Error',
          message,
          type: 'error',
        })
      }

      return data
    },
    onError: (error) => {
      console.error('请求错误:', error.message)

      const message = error.message

      ElNotification({
        title: 'Error',
        message,
        type: 'error',
      })

      throw error
    },
  },
})

// 通用请求方法
export const http = {
  get: <T>(url: string, params?: Record<string, any>) =>
    alovaInstance.Get<T>(url, { params }),

  post: <T>(url: string, data?: any) =>
    alovaInstance.Post<T>(url, data),

  put: <T>(url: string, data?: any) =>
    alovaInstance.Put<T>(url, data),

  delete: <T>(url: string) =>
    alovaInstance.Delete<T>(url),
}
