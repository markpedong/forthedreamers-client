import { post } from './http'
import {
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

export const login = (params: TLoginPayload) => post<{ userInfo: TUserInfo }>('/public/login', params)

export const getProducts = params => post<TProductItem[]>('/public/products', params)

// /products/details
export const getProductDetails = params => post<TProductDetails>('/public/products/details', params)

// /products/variations
export const getVariations = params => post<TVariationItem[]>('/public/products/variations', params)

// /public/website
export const getWebsiteData = params => post<TWebsiteItem>('/public/website', params)

// /public/collections
export const getCollections = params => post<TCollectionItem[]>('/public/collections', params)

// /public/collectionsByID
export const getCollectionsByID = params => post<TCollectionDetails>('/public/collectionsByID', params)

// /public/testimonials
export const getTestimonials = params => post<TTestimonials[]>('/public/testimonials', params)

// /cart/add
export const addToCart = params => post('/carts/add', params)

// /cart/get
export const getCart = params => post<TCartItem[]>('/carts/get', params)

// /users/update
export const updateUser = params => post('/users/update', params)

// /users/info
export const getNewUserInfo = () => post<TUserInfo>('/users/info')
