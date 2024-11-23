import { baseApiUrl } from './constants'

import { ApiResources } from './types'

export interface CustomApi<T> {
  get: (slug: ApiResources, options?: RequestInit) => Promise<T>
}

const customFetch = async <T>(
  slug: ApiResources,
  options: RequestInit = {},
): Promise<T> => {
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  }

  const response = await fetch(`${baseApiUrl}/${slug}`, {
    ...options,
    headers,
  })

  if (!response.ok) {
    throw new Error(`Request failed with status: ${response.status}`)
  }

  const { data } = await response.json()

  return data
}

export const get = <T>(
  slug: ApiResources,
  options: RequestInit = {},
): Promise<T> => customFetch(slug, { method: 'GET', ...options })

export const $api: CustomApi<void> = {
  get,
}
