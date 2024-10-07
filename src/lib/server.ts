'use server'

import { revalidateTag } from 'next/cache'
import { cookies } from 'next/headers'
import { get } from '@/api/http'
import { TAddressItem, TCartItem, TProductItem, TTestimonials, TWebsiteItem } from '@/api/types'

import { API_TAGS } from '@/app/(main)/constants/enums'

export const revalidate = (tag?: string) => revalidateTag(tag || '')

export const setCookie = (name: string, value: string) => {
  const date = new Date()
  const minutes = 60
  date.setTime(date.getTime() + minutes * 60 * 1000)

  cookies().set(name, value, {
    expires: date,
    path: '/',
    sameSite: 'lax',
    secure: true,
    httpOnly: true,
    maxAge: minutes * 60,
  })
}

export const getCookie = async name => cookies().get(name)?.value || ''

// /public/products
export const getProducts = async params =>
  (await get<TProductItem[]>({ url: '/public/products', data: params, tags: API_TAGS.PRODUCTS, passCookies: params.passCookies }))?.data

// /public/website
export const getWebsiteData = async () => (await get<TWebsiteItem>({ url: '/public/website', tags: API_TAGS.WEBSITE }))?.data

// /public/testimonials
export const getTestimonials = async () => (await get<TTestimonials[]>({ url: '/public/testimonials', tags: API_TAGS.TESTIMONIALS }))?.data

// /address/get
export const getAddress = async () => (await get<TAddressItem[]>({ url: '/address/get', tags: API_TAGS.ADDRESS }))?.data

// /cart/get
export const getCart = async () => (await get<TCartItem[]>({ url: '/carts/get', tags: API_TAGS.CART }))?.data ?? []
