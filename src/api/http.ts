import { stringify } from 'qs'
import throttle from 'lodash/throttle'
import { redirect } from 'next/navigation'
import { getLocalStorage } from '@/lib/xLocalStorage'
import { clearUserData } from '@/constants/helper'

type ApiResponse<T> = {
	data?: T
	message: string
	success: boolean
	status: number
}

export const throttleAlert = (msg: string) =>
	throttle(() => console.error(msg), 1500, { trailing: false, leading: true })

const upload = async <T>(url: string, data: File): Promise<ApiResponse<T>> => {
	const token = getLocalStorage('token')
	const form = new FormData()

	form.append('file', data)

	const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}${url}`, {
		method: 'POST',
		headers: {
			...(token ? { token: String(token)?.replaceAll(`"`, '') } : {})
		},
		body: form
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
	const apiResponse = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}${url}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			...(token ? { 'Authorization': `Bearer ${String(token).replace(/"/g, '')}` } : {})
		},
		body: JSON.stringify(data) || '{}'
	})
	//prettier-ignore
	const response = await apiResponse.json() as ApiResponse<T>

	if (response?.status !== 200) {
		throttleAlert(response.message)
		if (response?.status === 401) {
			window.location.replace('/unauthorized')
		}
		return response
	}

	return response as ApiResponse<T>
}

const get = async <T>(url: string, data = {}): Promise<ApiResponse<T>> => {
	const token = getLocalStorage('token')
	const apiResponse = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}${url}${stringify(data) ? '?' + stringify(data) : ''}`, {
		method: 'GET',
		headers: {
			...(token ? { token: String(token)?.replaceAll(`"`, '') } : {})
		},
		next: { revalidate: 0 }
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
