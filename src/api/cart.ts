import type { CartList } from './types/cart'
import { http } from '~/utils/http'

/**
 * 获取购物车列表
 */
export function getCartList() {
  return http.get<CartList>('/cart/list').then((res) => {
    useCartStore().setTotalItems(res.items.length)
    return res
  })
}

/**
 * 添加到购物车
 */
export function addToCart(productId: number, quantity: number) {
  return http.post('/cart/add', { productId, quantity })
}

/**
 * 更新购物车中某个商品数量
 */
export function updateCart(cartId: number, productId: number, quantity: number) {
  return http.put(`/cart/update/${cartId}`, { productId, quantity })
}

/**
 * 删除购物车
 */
export function removeCart(cartId: number) {
  return http.delete(`/cart/remove/${cartId}`)
}

/**
 * 清空购物车
 */
export function clearCart() {
  return http.delete('/cart/clear')
}
