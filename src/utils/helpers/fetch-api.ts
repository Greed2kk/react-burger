import { baseApiUrl } from '../constants'

import { ApiResources } from '../types'

export const fetchApi = async <T>(resource: ApiResources): Promise<T> => {
  const response = await fetch(`${baseApiUrl}/${resource}`)
  if (!response.ok) {
    throw new Error(`Ошибка: ${response.status} ${response.statusText}`)
  }

  const { data } = await response.json()

  return data
}
