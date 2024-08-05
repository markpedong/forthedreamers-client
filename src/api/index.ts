import { post } from './http'
import { TProductDetails, TProductItem, TVariationItem } from './types'

export const getProducts = params => post<TProductItem[]>('/public/products', params)

// /products/details
export const getProductDetails = params => post<TProductDetails>('/public/products/details', params)

// /products/variations
export const getVariations = params => post<TVariationItem[]>('/public/products/variations', params)
