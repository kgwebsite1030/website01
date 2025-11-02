export interface Category {
  id: number | string
  name: string
  slug?: string
  description?: string
  icon?: string | null
  image?: string | null
  sortOrder?: number
  isActive?: boolean
  isShow?: boolean
  productCount?: number
  subCategories?: Category[]
}
