import { post } from './http'
import {
  LoginResponse,
  TCartItem,
  TCollectionDetails,
  TCollectionItem,
  TLoginPayload,
  TProductDetails,
  TUserInfo,
  TVariationItem,
} from './types'

// /public/login
export const login = (params: TLoginPayload) => post<LoginResponse>('/public/login', params)

// /products/details
export const getProductDetails = params => post<TProductDetails>('/public/products/details', params)

// /products/variations
export const getVariations = params => post<TVariationItem[]>('/public/products/variations', params)

// /public/collections
export const getCollections = params => post<TCollectionItem[]>('/public/collections', params)

// /public/collectionsByID
export const getCollectionsByID = params => post<TCollectionDetails>('/public/collectionsByID', params)

// /cart/add
export const addToCart = params => post('/carts/add', params)

// /cart/get
export const getCart = params => post<TCartItem[]>('/carts/get', params)

// /users/update
export const updateUser = params => post('/users/update', params)

// /users/info
export const getNewUserInfo = () => post<TUserInfo>('/users/info')
