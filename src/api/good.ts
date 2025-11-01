import { http } from '~/utils/http'

interface pageSizeType {
  page: number
  size: number
}
export function getgoodlist(data: pageSizeType = ({ page: 1, size: 20 })) {
  return http.get('/products/list', data)
}
