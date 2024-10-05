import { redirect } from 'next/navigation'
import throttle from 'lodash/throttle'
import { stringify } from 'qs'
import { toast } from 'sonner'

import { clearUserData } from '@/lib/helper'
import { getCookie, setCookie } from '@/lib/server'
import { getLocalStorage, setLocalStorage } from '@/lib/xLocalStorage'

type ApiResponse<T> = {
  data: T
  message: string
  success: boolean
  status: number
}

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
      Token: getLocalStorage('token') || '',
    },
    body: JSON.stringify(data) || '{}',
  })

  if (!apiResponse.ok) {
    throw new Error(`HTTP error! status: ${apiResponse.status}, URL: ${url}`)
  }

  //prettier-ignore
  const response = await apiResponse.json() as ApiResponse<T>

  if (response?.status !== 200) {
    throttleAlert(response.message)
    if (response?.status === 401) {
      toast(response?.message, {
        description: 'Redirecting you to login page',
        action: {
          label: response?.message,
          onClick: () => {
            window.location.href = '/login'
          },
        },
      })

      setTimeout(() => {
        window.location.href = '/login'
      }, 4000)

      return response
    }

    toast(response?.message + ' ⚠️', {
      description: 'Please try again',
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
      token: String(token).replaceAll(`"`, ''),
    },
    next: {
      tags: [tags || ''],
      revalidate: 60 * 60,
    },
  })

  //prettier-ignore
  const response = await apiResponse.json() as ApiResponse<T>
  console.log(response?.status, url)
  if (response?.status !== 200) {
    throttleAlert(response.message)

    if (response?.status === 401) {
      redirect('/unauthorized')
    }
  }

  return response as ApiResponse<T>
}

export { get, post, upload }
