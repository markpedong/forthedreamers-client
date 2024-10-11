import { useRouter } from 'next/navigation'
import { getNewUserInfo } from '@/api'
import { LoginResponse, TAddCartPayload } from '@/api/types'
import { setWebsiteData } from '@/redux/features/appData'
import { setCartData, setUserData } from '@/redux/features/userData'
import { useAppDispatch } from '@/redux/store'
import { toast } from 'sonner'

import { clearUserData, isLoggedIn, unauthorized } from '@/lib/helper'
import { addQuantity, addToCart, getCart, getWebsiteData, revalidate } from '@/api'
import { API_TAGS } from '@/app/(main)/constants/enums'

export const useWithDispatch = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()

  const dispatchWebData = async () => {
    const res = await getWebsiteData()
    dispatch(setWebsiteData(res))
  }

  const addItemToCart = async ({ product_id, variation_id, quantity }: TAddCartPayload) => {
    if (!!!isLoggedIn()) {
      toast('Please login first')
      return
    }
    const res = await addToCart({
      product_id,
      quantity,
      ...(variation_id ? { variation_id } : {}),
    })
    if (res?.status === 200) {
      toast(res?.message)
      getNewCartData()
    }
  }

  const updateQty = async ({ id, quantity }: { id: string; quantity: number }) => {
    const res = await addQuantity({ cart_id: id, quantity })

    if (res?.status === 200) {
      getNewCartData()
      revalidate(API_TAGS.CART_QTY)
    }
  }

  const getNewCartData = async () => {
    const res = await getCart()

    if (res?.status === 200) {
      dispatch(setCartData(res?.data ?? []))
    } else if (res?.status === 401) {
      unauthorized()
    }
  }

  const getUserInfo = async () => {
    const res = await getNewUserInfo()
    if (res?.status === 200) {
      dispatch(setUserData(res?.data))
    }
  }

  const storeUserInfo = async (res: { data: LoginResponse; message: string }) => {
    dispatch(setUserData(res?.data?.userInfo))
    toast(res?.message, {
      description: 'Redirecting you to account page',
      action: {
        label: 'View Account',
        onClick: () => {
          router.push('/account')
        },
      },
      duration: 1500,
    })

    setTimeout(() => {
      router.push('/account')
    }, 1500)
  }

  const logoutUser = async () => {
    clearUserData()
    toast('Logout Successfully', {
      description: 'Redirecting you to login page',
      action: {
        label: 'Login',
        onClick: () => {
          router.push('/login')
        },
      },
      duration: 1500,
    })
    setTimeout(() => {
      router.push('/login')
    }, 1500)
  }

  return {
    getUserInfo,
    storeUserInfo,
    dispatchWebData,
    getNewCartData,
    addItemToCart,
    logoutUser,
    updateQty,
  }
}
