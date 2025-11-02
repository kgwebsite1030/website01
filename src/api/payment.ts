import type { PaymentRequest, PaymentResponse } from './types/payment'
import { v4 as uuidv4 } from 'uuid'
import { http } from '~/utils/http'

/**
 * 创建支付
 * @param data 支付请求数据
 * @returns 支付响应数据
 */
export function createPayment(data: PaymentRequest) {
  data.request_id = uuidv4()
  return http.post<PaymentResponse>('/payment/create', data)
}
