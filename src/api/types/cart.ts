export interface Cart {
  id: number
  productId: number
  productName: string
  price: number
  quantity: number
  imageUrl: string
  productList: any[] | null
}

export interface CartList {
  items: Cart[]
  totalPrice: number
}
