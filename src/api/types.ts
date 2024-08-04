export type TProductItem = {
  id: string
  name: string
  description: string
  collection_id: string
  images: string[]
  features: string[]
  variations: TVariationItem[]
}

export type TVariationItem = {
  color: string
  id: string
  price: number
  quantity: number
  size: string
}
