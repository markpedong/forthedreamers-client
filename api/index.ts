import { get } from './http'
import { TProductItem } from './types'

export const getProducts = () => get<TProductItem[]>('/public/products')
