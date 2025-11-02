export interface CardInfo {
  number: string
  expMonth: string
  expYear: string
  cvc: string
  name: string
}

export interface PaymentRequest {
  request_id: string
  amount: number
  shippingAddress: string
  shippingCity: string
  shippingZipCode: string
  ShippingCountry: string
  contactPhone: string
  cardInfo: CardInfo
}

export interface PaymentResponse {
  success: boolean
  message: string
  request_id: string
  order_id: string
  product_action: string
  product_id: string
}
