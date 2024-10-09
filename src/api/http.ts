import throttle from 'lodash/throttle'
import { stringify } from 'qs'

import { unauthorized } from '@/lib/helper'
import { getCookie, setCookie } from '@/lib/server'
import { getLocalStorage, setLocalStorage } from '@/lib/xLocalStorage'

import { ApiResponse, errorRootResponse, RequestParams } from './types'

export const throttleAlert = (msg: string) => throttle(() => console.error(msg), 1500, { trailing: false, leading: true })

const handleResponse = async <T>(response: Response): Promise<ApiResponse<T>> => {
  if (!response.ok) return errorRootResponse as ApiResponse<T>

  const data: ApiResponse<T> = await response.json()

  if (['/public/login', '/public/signup'].includes(response.url)) {
    const token = (data.data as { token: string }).token

    setCookie('token', token)
    setLocalStorage('token', token)
  }

  if (data.status !== 200) {
    throttleAlert(data.message)
    if (data.status === 401 && typeof window !== 'undefined') {
      unauthorized()
    }
    return data
  }

  return data
}

const fetchWithToken = async (url: string, options: RequestInit, passCookies = true) => {
  const token = typeof window !== 'undefined' ? getLocalStorage('token') : passCookies && (await getCookie('token'))
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      token: String(token).replace(/"/g, ''),
    },
  })
}

const upload = async <T>(url: string, file: File): Promise<ApiResponse<T>> => {
  const form = new FormData()
  form.append('file', file)

  const response = await fetchWithToken(`${process.env.NEXT_PUBLIC_DOMAIN}${url}`, {
    method: 'POST',
    body: form,
  })

  return handleResponse<T>(response)
}

const post = async <T>({ url, data = {}, tags }: RequestParams): Promise<ApiResponse<T>> => {
  const response = await fetchWithToken(`${process.env.NEXT_PUBLIC_DOMAIN}${url}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    ...(tags && { next: { tags: [tags] } }),
  })

  return handleResponse<T>(response)
}

const get = async <T>({ url, data, tags, passCookies = true }: RequestParams): Promise<ApiResponse<T>> => {
  const response = await fetchWithToken(
    `${process.env.NEXT_PUBLIC_DOMAIN}${url}${stringify(data) ? '?' + stringify(data) : ''}`,
    {
      method: 'GET',
      next: { tags: [tags || ''] },
    },
    passCookies,
  )

  return handleResponse<T>(response)
}

export { get, post, upload }
