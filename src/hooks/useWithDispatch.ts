import { useRouter } from 'next/navigation'
import { addToCart, getCart, getNewUserInfo } from '@/api'
import { TAddCartPayload } from '@/api/types'
import { setWebsiteData } from '@/redux/features/appData'
import { setCartData, setUserData } from '@/redux/features/userData'
import { useAppDispatch } from '@/redux/store'
import { toast } from 'sonner'

import { getWebsiteData } from '@/lib/server'
import { clearUserData } from '@/lib/helper'

export const useWithDispatch = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()

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

  const storeUserInfo = async (event: any) => {
    dispatch(setUserData(event?.data?.data))
    toast(event?.data?.message, {
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
  }
}
