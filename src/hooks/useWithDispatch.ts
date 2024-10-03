import { addToCart, getCart, getNewUserInfo } from '@/api'
import { TAddCartPayload } from '@/api/types'
import { getWebsiteData } from '@/lib/server'
import { setWebsiteData } from '@/redux/features/appData'
import { setCartData, setUserData } from '@/redux/features/userData'
import { useAppDispatch } from '@/redux/store'

export const useWithDispatch = () => {
  const dispatch = useAppDispatch()

  const dispatchWebData = async () => {
    const res = await getWebsiteData()
    dispatch(setWebsiteData(res))
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

  const getUserInfo = async () => {
    const res = await getNewUserInfo()
    if (res?.status === 200) {
      dispatch(setUserData(res?.data))
    }
  }

  return {
    getUserInfo,
    dispatchWebData,
    getNewCartData,
    addItemToCart,
  }
}
