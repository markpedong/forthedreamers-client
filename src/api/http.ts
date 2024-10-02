import { redirect } from 'next/navigation'
import { clearUserData } from '@/constants/helper'
import throttle from 'lodash/throttle'
import { stringify } from 'qs'
import { toast } from 'sonner'

import { getLocalStorage, setLocalStorage } from '@/lib/xLocalStorage'

type ApiResponse<T> = {
  data?: T
  message: string
  success: boolean
  status: number
}

export const throttleAlert = (msg: string) => throttle(() => console.error(msg), 1500, { trailing: false, leading: true })

const upload = async <T>(url: string, data: File): Promise<ApiResponse<T>> => {
  const token = getLocalStorage('token')
  const form = new FormData()

  form.append('file', data)

  const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}${url}`, {
    method: 'POST',
    headers: {
      ...(token ? { token: String(token)?.replaceAll(`"`, '') } : {}),
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
  const token = getLocalStorage('token')
  console.log(process.env.NEXT_PUBLIC_DOMAIN)
  const apiResponse = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Token: token } : {}),
    },
    body: JSON.stringify(data) || '{}',
  })
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
    }
    return response
  }

  if (['/public/login', '/public/signup'].includes(url)) {
    setLocalStorage('token', (response.data as { token: string }).token)
  }

  return response as ApiResponse<T>
}

const get = async <T>(url: string, data = {}): Promise<ApiResponse<T>> => {
  const token = getLocalStorage('token')
  const apiResponse = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}${url}${stringify(data) ? '?' + stringify(data) : ''}`, {
    method: 'GET',
    headers: {
      ...(token ? { token: String(token)?.replaceAll(`"`, '') } : {}),
    },
    next: { revalidate: 0 },
  })
  //prettier-ignore
  const response = await apiResponse.json() as ApiResponse<T>

  if (response?.status !== 200) {
    throttleAlert(response.message)

    if (response?.status === 401) {
      redirect('/unauthorized')
    }
  }

  return response as ApiResponse<T>
}

export { get, post, upload }
