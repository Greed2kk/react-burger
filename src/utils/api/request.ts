import { baseApiUrl } from './constants'

import type { ApiResources } from './types'

export interface CustomApi {
  get: <T>(slug: ApiResources, options?: RequestInit) => Promise<T>
  post: <T, B>(slug: ApiResources, body: B, options?: RequestInit) => Promise<T>
}

const customFetch = async <T>(
  slug: ApiResources,
  options: RequestInit = {},
): Promise<T> => {
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  }

  try {
    const response = await fetch(`${baseApiUrl}/${slug}`, {
      ...options,
      headers,
    })

    if (!response.ok) {
      const errorDetails = await response.text()

      throw new Error(
        `Request to ${slug} failed with status: ${response.status} - ${errorDetails}`,
      )
    }

    return await response.json()
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('API Error:', error.message)
      throw error
    }
    throw new Error('An unknown error occurred')
  }
}

export const get = async <T>(
  slug: ApiResources,
  options: RequestInit = {},
): Promise<T> => customFetch<T>(slug, { method: 'GET', ...options })

export const post = async <T, B>(
  slug: ApiResources,
  body: B,
  options: RequestInit = {},
): Promise<T> =>
  customFetch<T>(slug, {
    method: 'POST',
    body: JSON.stringify(body),
    ...options,
  })

export const api: CustomApi = {
  get,
  post,
}
