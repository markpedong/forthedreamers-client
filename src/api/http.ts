import throttle from 'lodash/throttle'
import { stringify } from 'qs'
import { toast } from 'sonner'

import { clearUserData, invalidUser } from '@/lib/helper'
import { getCookie, setCookie } from '@/lib/server'
import { getLocalStorage, setLocalStorage } from '@/lib/xLocalStorage'

import { ApiResponse, errorRootResponse } from './types'

export const throttleAlert = (msg: string) => throttle(() => console.error(msg), 1500, { trailing: false, leading: true })

const upload = async <T>(url: string, data: File): Promise<ApiResponse<T>> => {
  const form = new FormData()

  form.append('file', data)

  const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}${url}`, {
    method: 'POST',
    headers: {
      Token: getLocalStorage('token') || '',
    },
    body: form,
  })
  //prettier-ignore
  const result = await response.json() as ApiResponse<T>

  if (result?.status !== 200) {
    if (response?.status === 401) {
      clearUserData()
    }

    throttleAlert(result?.message)
    return result
  }

  return result as ApiResponse<T>
}

const post = async <T>(url: string, data = {}): Promise<ApiResponse<T>> => {
  const apiResponse = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Token: String(getLocalStorage('token')).replaceAll(`"`, ''),
    },
    body: JSON.stringify(data) || '{}',
  })

  if (!apiResponse.ok) return errorRootResponse as ApiResponse<T>
  const response = (await apiResponse.json()) as ApiResponse<T>

  if (response?.status !== 200) {
    throttleAlert(response.message)

    if (response?.status === 401) {
      invalidUser()
      return response
    }
    toast(response?.message, {
      description: 'Please try again!',
    })

    return response
  }

  if (['/public/login', '/public/signup'].includes(url)) {
    setCookie('token', (response.data as { token: string }).token)
    setLocalStorage('token', (response.data as { token: string }).token)
  }

  return response as ApiResponse<T>
}

type Params = {
  url: string
  data?: any
  tags?: string
  passCookies?: boolean
}
const get = async <T>({ url, data, tags, passCookies = true }: Params): Promise<ApiResponse<T>> => {
  const token = typeof window !== 'undefined' ? getLocalStorage('token') : passCookies && (await getCookie('token'))
  const apiResponse = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}${url}${stringify(data) ? '?' + stringify(data) : ''}`, {
    method: 'GET',
    headers: {
      token: String(token).replace(/"/g, ''),
    },
    next: { tags: [tags || ''] },
  })

  if (!apiResponse.ok) return errorRootResponse as ApiResponse<T>

  const response = (await apiResponse.json()) as ApiResponse<T>

  console.log(response?.status, url)

  if (response?.status !== 200) {
    throttleAlert(response.message)

    if (response?.status === 401 && typeof window !== 'undefined') {
      invalidUser()
    }

    return response
  }

  return response
}

export { get, post, upload }
