import { addToCart, getCart, getWebsiteData } from '@/api'
import { TAddCartPayload } from '@/api/types'
import { setWebsiteData } from '@/redux/features/appData'
import { setCartData } from '@/redux/features/userData'
import { useAppDispatch } from '@/redux/store'

export const useWithDispatch = () => {
  const dispatch = useAppDispatch()

  const dispatchWebData = async () => {
    const res = await getWebsiteData({})
    dispatch(setWebsiteData(res?.data!))
  }

  const addItemToCart = async ({ product_id, variation_id, quantity }: TAddCartPayload) => {
    const res = await addToCart({
      product_id,
      quantity,
      ...(variation_id ? { variation_id } : {}),
    })
    if (res?.status === 200) {
      getNewCartData()
    }
  }

  const getNewCartData = async () => {
    const res = await getCart({})
    if (res?.status === 200) {
      dispatch(setCartData(res?.data ?? []))
    }
  }
  return {
    dispatchWebData,
    getNewCartData,
    addItemToCart,
  }
}
