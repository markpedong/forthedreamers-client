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