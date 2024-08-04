import { get, post } from './http'
import { TProductItem, TVariationItem } from './types'

export const getProducts = () => get<TProductItem[]>('/public/products')

// /products/details
export const getProductDetails = params => post<TProductItem>('/public/products/details', params)

// /products/variations
export const getVariations = params => post<TVariationItem[]>('/public/products/variations', params)