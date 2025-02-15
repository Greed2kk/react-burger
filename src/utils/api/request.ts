import {
  accessTokenKey,
  baseApiUrl,
  refreshTokenKey,
  tokenPath,
} from '@/utils/api/constants'
import type { ApiResources } from '@/utils/api/types'
import resetStorage from '@/utils/helpers/resetStorage'

export interface CustomApi {
  get: <T>(
    slug: ApiResources,
    options?: RequestInit,
    params?: string,
  ) => Promise<T>
  post: <T, B>(slug: ApiResources, body: B, options?: RequestInit) => Promise<T>
  patch: <T, B>(
    slug: ApiResources,
    body: B,
    options?: RequestInit,
  ) => Promise<T>
}

const refreshAccessToken = async (): Promise<string> => {
  const refreshToken = localStorage.getItem(refreshTokenKey)

  if (!refreshToken) {
    throw new Error('Refresh token is missing')
  }

  const response = await fetch(`${baseApiUrl}/${tokenPath}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({ token: refreshToken }),
  })

  if (!response.ok) {
    throw new Error('Failed to refresh token')
  }

  const data = await response.json()

  localStorage.setItem(accessTokenKey, data.accessToken)
  localStorage.setItem(refreshTokenKey, data.refreshToken)

  return data.accessToken
}

const customFetch = async <T>(
  slug: ApiResources,
  options: RequestInit = {},
): Promise<T> => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json;charset=utf-8',
    ...(options.headers || {}),
  }

  const accessToken = localStorage.getItem(accessTokenKey)

  if (accessToken) {
    // @ts-ignore
    headers['Authorization'] = accessToken
  }

  const executeFetch = async <V>(): Promise<V> => {
    const response = await fetch(`${baseApiUrl}/${slug}`, {
      ...options,
      headers,
    })

    if (!response.ok) {
      const errorDetails = await response.json().catch(() => ({}))

      throw new Error(errorDetails.message || 'Request failed')
    }

    return response.json()
  }

  try {
    return await executeFetch<T>()
  } catch (error: any) {
    if (error.message === 'jwt expired') {
      try {
        // @ts-ignore
        headers['Authorization'] = await refreshAccessToken()

        return await executeFetch()
      } catch (refreshError) {
        resetStorage()
        window.location.href = '/login'
        throw new Error('Token refresh failed. Redirecting to login.')
      }
    }
    throw error
  }
}

export const get = async <T>(
  slug: ApiResources,
  options: RequestInit = {},
  params?: string,
): Promise<T> => {
  let url = slug

  if (params) {
    url = `${slug}/${params}` as ApiResources
  }

  return customFetch<T>(url, {
    method: 'GET',
    ...options,
  })
}

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

export const patch = async <T, B>(
  slug: ApiResources,
  body: B,
  options: RequestInit = {},
): Promise<T> =>
  customFetch<T>(slug, {
    method: 'PATCH',
    body: JSON.stringify(body),
    ...options,
  })

export const api: CustomApi = {
  get,
  post,
  patch,
}
