import type { App } from 'vue'
import type { Router } from 'vue-router'

export type UserModule = (ctx: App, router: Router) => void

export interface Product {
  id: number
  categoryId: number
  name: string
  description: string
  price: number
  originalPrice: number
  imageUrl: string
  images?: string[] | null
  featured: boolean
  freeShipping: boolean
  rating: number
  reviewCount: number
  features?: string[] | null
  specifications?: Record<string, any> | null
}
