import { post } from './http'
import { TCollectionItem, TProductDetails, TProductItem, TVariationItem, TWebsiteItem } from './types'

export const getProducts = params => post<TProductItem[]>('/public/products', params)

// /products/details
export const getProductDetails = params => post<TProductDetails>('/public/products/details', params)

// /products/variations
export const getVariations = params => post<TVariationItem[]>('/public/products/variations', params)

// /public/website
export const getWebsiteData = params => post<TWebsiteItem>('/public/website', params)

// /public/collections
export const getCollections = params => post<TCollectionItem[]>('/public/collections', params)
