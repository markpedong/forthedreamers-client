'use server'

import { revalidateTag } from 'next/cache'
import { get } from '@/api/http'
import { TProductItem, TTestimonials, TWebsiteItem } from '@/api/types'

import { API_TAGS } from '@/app/(main)/constants/enums'

export const revalidate = (tag?: string) => revalidateTag(tag || '')

// /public/products
export const getProducts = async params =>
  (await get<TProductItem[]>({ url: '/public/products', data: params, tags: API_TAGS.PRODUCTS }))?.data

// /public/website
export const getWebsiteData = async () => (await get<TWebsiteItem>({ url: '/public/website', tags: API_TAGS.WEBSITE }))?.data

// /public/testimonials
export const getTestimonials = async () => (await get<TTestimonials[]>({ url: '/public/testimonials', tags: API_TAGS.TESTIMONIALS }))?.data

// /address/get
export const getAddress = async () => (await get({ url: '/address/get', tags: API_TAGS.ADDRESS }))?.data