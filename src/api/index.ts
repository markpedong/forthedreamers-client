import { get, post } from './http'
import { LoginResponse, TLoginPayload, TProductDetails, TUserInfo, TVariationItem } from './types'

// /public/login
export const login = (params: TLoginPayload) => post<LoginResponse>({ url: '/public/login', data: params })

// /products/details
export const getProductDetails = params => get<TProductDetails>({ url: '/public/products/details', data: params })

// /products/variations
export const getVariations = params => get<TVariationItem[]>({ url: '/public/products/variations', data: params })

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
