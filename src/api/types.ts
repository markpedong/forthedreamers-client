

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

export type TVariationItem = {
  color: string
  id: string
  price: number
  quantity: number
  size: string
}
