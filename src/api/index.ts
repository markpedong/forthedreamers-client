import { post } from './http'
import {
  LoginResponse,
  TCollectionDetails,
  TLoginPayload,
  TProductDetails,
  TUserInfo,
  TVariationItem
} from './types'

// /public/login
export const login = (params: TLoginPayload) => post<LoginResponse>('/public/login', params)

// /products/details
export const getProductDetails = params => post<TProductDetails>('/public/products/details', params)

// /products/variations
export const getVariations = params => post<TVariationItem[]>('/public/products/variations', params)

// /public/collectionsByID
export const getCollectionsByID = params => post<TCollectionDetails>('/public/collectionsByID', params)

// /cart/add
export const addToCart = params => post('/carts/add', params)

// /users/update
export const updateUser = params => post('/users/update', params)

// /users/info
export const getNewUserInfo = () => post<TUserInfo>('/users/info')

// /address/add
export const addNewAddress = params => post('/address/add', params)

// /address/delete
export const deleteAddress = params => post('/address/delete', params)

// /address/update
export const updateAddress = params => post('/address/update', params)
