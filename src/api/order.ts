import { http } from '~/utils/http'

interface orderListType {

  status: string
}

// 获取订单列表
export function getOrderList(data: orderListType = { status: 'PENDING' }) {
  return http.get('/order/list', data)
}

// 获取订单详情
export function getOrderDetail(id: number = 0) {
  return http.get(`order/${id}`)
}
