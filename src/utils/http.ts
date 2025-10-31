import { xhrRequestAdapter } from '@alova/adapter-xhr'
import { createAlova } from 'alova'
import VueHook from 'alova/vue'

// 创建 alova 实例
export const alovaInstance = createAlova({
  statesHook: VueHook,
  requestAdapter: xhrRequestAdapter(),
  baseURL: '/api', // 设置基础 URL
  timeout: 10000, // 设置超时时间
  // 请求拦截器
  beforeRequest: (method) => {
    // 添加认证 token
    const token = localStorage.getItem('token')
    if (token) {
      method.config.headers = {
        ...method.config.headers,
        Authorization: `Bearer ${token}`,
      }
    }
  },
  // 响应拦截器
  responded: {
    onSuccess: async (response) => {
      if (response.status >= 200 && response.status < 300) {
        return response.data
      }
      throw new Error(response.statusText)
    },
    onError: (error) => {
      console.error('请求错误:', error.message)
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
