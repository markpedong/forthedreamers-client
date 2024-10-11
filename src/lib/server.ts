'use server'

import { get, post } from '@/api/http'
import { TAddressItem, TCollectionItem, TProductItem, TTestimonials, TWebsiteItem } from '@/api/types'
import { revalidateTag } from 'next/cache'
import { cookies } from 'next/headers'

import { API_TAGS } from '@/app/(main)/constants/enums'

export const revalidate = (tag?: string) => revalidateTag(tag || '')

export const setCookie = (name: string, value: string) => {
  const date = new Date()
  const hours = 12
  date.setTime(date.getTime() + hours * 60 * 60 * 1000)

  cookies().set(name, value, {
    expires: date,
    path: '/',
    sameSite: 'lax',
    secure: false,
    httpOnly: false,
    maxAge: hours * 60 * 60,
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

// /public/collections
export const getCollections = async params =>
  (await get<TCollectionItem[]>({ url: '/public/collections', tags: API_TAGS.COLLECTIONS, passCookies: params.passCookies }))?.data

// carts/addQuantity
export const addQuantity = params => post({ url: '/carts/addQuantity', tags: API_TAGS.CART_QTY, data: params })

// /carts/add
export const addToCart = params => post({ url: '/carts/add', data: params })
