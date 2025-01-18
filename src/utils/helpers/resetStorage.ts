import { accessTokenKey, refreshTokenKey } from '@/utils/api/constants'

const resetStorage = (): void => {
  localStorage.removeItem(accessTokenKey)
  localStorage.removeItem(refreshTokenKey)
}

export default resetStorage
