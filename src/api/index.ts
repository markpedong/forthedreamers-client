'use server'

import { revalidateTag } from 'next/cache'
import { cookies } from 'next/headers'
import { API_TAGS } from '@/constants/enums'

import { get, post } from './http'
import {
  LoginResponse,
  TAddressItem,
  TCartItem,
  TCollectionDetails,
  TCollectionItem,
  TLoginPayload,
  TProductDetails,
  TProductItem,
  TTestimonials,
  TUserInfo,
  TVariationItem,
  TWebsiteItem,
} from './types'

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

// /public/login
export const login = (params: TLoginPayload) => post<LoginResponse>({ url: '/public/login', data: params })

// /products/details
export const getProductDetails = params =>
  get<TProductDetails>({ url: '/public/products/details', data: params, tags: API_TAGS.PRODUCT_VARIATIONS })

// /products/variations
export const getVariations = params =>
  get<TVariationItem[]>({ url: '/public/products/variations', data: params, tags: API_TAGS.PRODUCT_VARIATIONS })

// /public/collectionsByID
export const getCollectionsByID = params => post<TCollectionDetails>({ url: '/public/collectionsByID', data: params })

// /users/update
export const updateUser = params => post({ url: '/users/update', data: params })

// /users/info
export const getNewUserInfo = () => post<TUserInfo>({ url: '/users/info' })

// /address/add
export const addNewAddress = params => post({ url: '/address/add', data: params })

// /address/delete
export const deleteAddress = params => post({ url: '/address/delete', data: params })

// /address/update
export const updateAddress = params => post({ url: '/address/update', data: params })

// carts/delete
export const deleteCart = params => post({ url: '/carts/delete', data: params })

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
export const getCart = async () => await get<TCartItem[]>({ url: '/carts/get', tags: API_TAGS.CART })

// /public/collections
export const getCollections = async params =>
  (await get<TCollectionItem[]>({ url: '/public/collections', tags: API_TAGS.COLLECTIONS, passCookies: params.passCookies }))?.data

// carts/addQuantity
export const addQuantity = params => post({ url: '/carts/addQuantity', tags: API_TAGS.CART_QTY, data: params })

// /carts/add
export const addToCart = params => post({ url: '/carts/add', data: params })
