import { baseApiUrl } from './constants'

import { ApiResources } from './types'

export interface CustomApi<T, B> {
  get: (slug: ApiResources, options?: RequestInit) => Promise<T>
  post: (
    slug: ApiResources,
    body: B,
    options?: RequestInit,
  ) => Promise<T>
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

  return await response.json()
}

export const get = <T>(
  slug: ApiResources,
  options: RequestInit = {},
): Promise<T> => customFetch(slug, { method: 'GET', ...options })

export const post = <T, B>(
  slug: ApiResources,
  body: B,
  options: RequestInit = {},
): Promise<T> =>
    customFetch(
      slug,
      {
        method: 'POST',
        body: JSON.stringify(body),

        ...options,
      },
    )

export const api: CustomApi<void, any> = {
  get,
  post,
}
