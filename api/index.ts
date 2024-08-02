import { get, post } from './http'
import { TProductItem } from './types'

export const getProducts = () => get<TProductItem[]>('/public/products')

// /products/details
export const getProductDetails = params => post<TProductItem>('/public/products/details', params)
