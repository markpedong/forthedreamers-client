import { Dispatch, SetStateAction } from 'react'

export type ApiResponse<T> = {
  data: T
  message: string
  success: boolean
  status: number
}

export const serverErr = {
  message: 'server error',
  data: {},
  status: 500,
  success: false,
} satisfies ApiResponse<any>

export type RequestParams = {
  url: string
  data?: any
  tags?: string
  passCookies?: boolean
}

export type TProductItem = {
  id: string
  name: string
  description: string
  collection_id: string
  images: string[]
  features: string[]
  variations: TShortVar[]
}

export type TShortVar = Omit<TVariationItem, 'quantity' | 'size'>

export type TProductDetails = Omit<TProductItem, 'variations'>

export type TCartItem = Omit<TProductItem, 'variations' | 'features' | 'collection_id'> & {
  id: string
  quantity: number
  name: string
  size: string
  color: string
  price: number
  images: string[]
  product_id: string
}

export type TVariationItem = {
  color: string
  id: string
  price: number
  quantity: number
  size: string
}

export type TWebsiteItem = {
  landing_image1: string
  landing_image2: string
  landing_image3: string
  marquee_text: string
  promo_text: string
  website_name: string
  product_length: number
  collection_length: number
  default_pageSize: number
}

export type TCollectionItem = {
  id: string
  images: string[]
  name: string
}

export type TCollectionDetails = TCollectionItem & {
  products: TProductItem[]
}

export type TTestimonials = {
  id: string
  author: string
  product_id: string
  title: string
}

export type TUserInfo = {
  email: string
  first_name: string
  id: string
  image: string
  last_name: string
  phone: string
  username: string
}

export type TUserDataState = {
  cart: TCartItem[]
  user: TUserInfo
}

export type TAddCartPayload = {
  product_id: string
  variation_id?: string
  quantity: number
}

export type InfoItem = {
  is_default: number
  first_name: string
  id: string
  last_name: string
  phone: string
  user_id: string
  address: string
}

export type TLoginPayload = {
  username: string
  password: string
}

export type TAddressItem = {
  address: string
  user_id: string
  first_name: string
  id: string
  last_name: string
  phone: string
  is_default: number
}

export type LoginResponse = { userInfo: TUserInfo; token: string }

export interface AddressProps extends React.HTMLAttributes<HTMLDivElement> {
  data?: TAddressItem
  refetch: () => void
  setCurrAddress: (address: TAddressItem) => void
}

export type TToastParams = {
  msg: string
  desc?: string
  act?: {
    lbl: string
    clicked: () => void
  }
  sec?: number
}

export type TSearchProduct = { product?: TProductItem; setSearch: () => void }

export type TCartProduct = { cart: TCartItem; setSearch: () => void; refetch: () => void }

export type CheckoutAddressProps = {
  address: TAddressItem
  setCurrAddress: Dispatch<SetStateAction<TAddressItem>>
  setIsModalOpen: Dispatch<SetStateAction<boolean>>
}
