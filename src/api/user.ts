import { http } from '~/utils/http'

interface RegisterReques {
  email: string
  password: string
  code: string
}

interface LoginRequest {
  email: string
  password: string
}

/**
 * 发送验证码到邮箱
 * @param email 邮箱地址
 */
export function sendEmailCode(email: string) {
  return http.post('/auth/sendCode', { email })
}

/**
 * 登录
 */
export function login(data: LoginRequest) {
  return http.post('/auth/login', data)
}

/**
 * 重置密码
 */
export function resetPassword(email: string, code: string) {
  return http.post('/auth/resetPassword', {
    email,
    code,
  })
}

/**
 * 邮箱验证码登录
 */
export function emailLogin(email: string, code: string) {
  return http.post('/auth/login/emailCode', { email, code })
}
/**
 * 注册
 */
export function register(data: RegisterReques) {
  return http.post('/auth/register', data)
}

/**
 * 退出登录
 */
export function logout() {
  return http.post('/auth/logout')
}
