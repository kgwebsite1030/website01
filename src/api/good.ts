import { http } from '~/utils/http'

interface pageSizeType {
  page: number
  size: number
}

interface hotGoodType {
  limit: number
}

interface newGoodType {
  limit: number
}

interface subGoodType {
  page: number
  size: number
  subId: number
}

interface parentGoodType {
  parentId: number
  page: number
  size: number
}
// 获取商品列表

export function getGoodList(data: pageSizeType = ({ page: 1, size: 20 })) {
  return http.get('/products/list', data)
}

// 获取商品的完整详情信息，包含分类、评论、规格等
export function getGoodDetail(id: number = 1) {
  return http.get(`/products/${id}`)
}

// 获取爆火产品列表，根据评分和评论数排序
export function getHotGoodList(data: hotGoodType = { limit: 10 }) {
  return http.get('/products/hot', data)
}

// 获取最新产品列表，根据评分和评论数排序
export function getNewGoodList(data: newGoodType = { limit: 10 }) {
  return http.get('/products/new', data)
}

// 点击子级分类标签时，返回该子级下的所有商品和父分类信息
export function getSubGoods(data: subGoodType) {
  return http.get(`/products/sub-category/${data.subId}`, data)
}

// 点击父级分类标签时，返回该子级下的所有商品和父分类信息

export function getParentGoods(data: parentGoodType) {
  return http.get(`/products/parent-category/${data.parentId}`, data)
}
