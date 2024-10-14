import { getNewUserInfo } from '@/api'
import { LoginResponse, TAddCartPayload } from '@/api/types'
import { setWebsiteData } from '@/redux/features/appData'
import { setCartData, setUserData } from '@/redux/features/userData'
import { useAppDispatch } from '@/redux/store'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { API_TAGS } from '@/app/constants/enums'
import { clearUserData, isLoggedIn } from '@/lib/helper'
import { addToCart, getCart, getWebsiteData, revalidate } from '@/lib/server'

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
			revalidate(API_TAGS.CART)
		}
	}

	const getUserInfo = async () => {
		const res = await getNewUserInfo()
		if (res?.status === 200) {
			dispatch(setUserData(res?.data))
		}
	}

	const getCartData = async () => {
		const cart = await getCart()
		dispatch(setCartData(cart))
	}

	const storeUserInfo = async (res: { data: LoginResponse; message: string }) => {
		dispatch(setUserData(res?.data?.userInfo))
		getCartData()
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
		addItemToCart,
		logoutUser,
		getCartData,
	}
}
