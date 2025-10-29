// types/category.ts
export interface Category {
  id: string | number
  name: string
  children?: Category[]
}
