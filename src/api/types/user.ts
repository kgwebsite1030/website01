export interface User {
  id: number | undefined
  email: string
}

export interface LoginSuccess {
  user: User
  token: string
}
