import { STALE_TIME } from '@/constants'
import throttle from 'lodash/throttle'
import { stringify } from 'qs'
import { toast } from 'sonner'

import { unauthorized } from '@/lib/helper'
import { getCookie, setCookie } from '@/lib/server'
import { getLocalStorage, setLocalStorage } from '@/lib/xLocalStorage'

import { ApiResponse, RequestParams, serverErr } from './types'

export const throttleAlert = (msg: string) => throttle(() => console.error(msg), 1500, { trailing: false, leading: true })

const handleResponse = async <T>(response: Response, url?: string): Promise<ApiResponse<T>> => {
  if (!response.ok) return serverErr as ApiResponse<T>

  const isClient = typeof window !== 'undefined'
  const data: ApiResponse<T> = await response.json()

  if (!!url && ['/public/login', '/public/signup'].includes(url)) {
    const token = (data.data as { token: string })?.token

    setCookie('token', token)
    setLocalStorage('token', token)
  }

  if (data.status !== 200) {
    isClient && toast(data.message)

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

const post = async <T>({ url, data = {} }: RequestParams): Promise<ApiResponse<T>> => {
  const response = await fetchWithToken(`${process.env.NEXT_PUBLIC_DOMAIN}${url}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  return handleResponse<T>(response, url)
}

const get = async <T>({ url, data, tags, passCookies = true }: RequestParams): Promise<ApiResponse<T>> => {
  console.log('URL: ', url)
  const response = await fetchWithToken(
    `${process.env.NEXT_PUBLIC_DOMAIN}${url}${!!stringify(data) ? '?' + stringify(data) : ''}`,
    {
      method: 'GET',
      next: { tags: [tags || ''], revalidate: STALE_TIME },
    },
    passCookies,
  )

  return handleResponse<T>(response)
}

export { get, post, upload }
