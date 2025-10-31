import { http } from '~/utils/http'

export function getIndexCases(params = {}) {
  return http.get('https://apis.tianapi.com/ancbooks/index', params)
}
