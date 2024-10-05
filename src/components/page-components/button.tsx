import { useEffect } from 'react'
import Image from 'next/image'

import { setLocalStorage } from '@/lib/xLocalStorage'
import { useWithDispatch } from '@/hooks/useWithDispatch'
import { setCookie } from '@/lib/server'

export const GoogleButton = () => {
  const { storeUserInfo } = useWithDispatch()

  const handleLogin = () => {
    const popup = window.open(`${process.env.NEXT_PUBLIC_DOMAIN}/public/googleLogin`, 'Google Login', 'width=600,height=600')

    const timer = setInterval(() => {
      if (popup?.closed) {
        clearInterval(timer)
      }
    }, 1000)
  }

  useEffect(() => {
    const handleMessage = event => {
      if (event.origin === process.env.NEXT_PUBLIC_DOMAIN) {
        if (event?.data?.code === 200) {
          setLocalStorage('token', event?.data?.token)
          storeUserInfo(event)
          setCookie('token', event?.data?.token)

          window.opener?.postMessage({ action: 'closePopup' }, '*')
        }
      }
    }

    window.addEventListener('message', handleMessage)

    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [])

  return (
    <div className="mb-2 flex w-full items-center justify-center bg-[#F3F9FA]">
      <button className="flex items-center gap-2 px-6 py-2 text-xs text-[#313957]" onClick={handleLogin}>
        <Image src={'/assets/google.svg'} width={20} height={20} alt="google_logo" />
        <span>Sign in with Google</span>
      </button>
    </div>
  )
}

export const FacebookButton = () => {
  return (
    <div className="mb-2 flex w-full items-center justify-center bg-[#F3F9FA]">
      <button className="flex items-center gap-2 px-6 py-2 text-xs text-[#313957]">
        <Image src={'/assets/facebook.svg'} width={20} height={20} alt="google_logo" />
        <span>Sign in with Facebook</span>
      </button>
    </div>
  )
}

export const OrDivider = () => {
  return (
    <div className="relative flex w-full items-center py-5">
      <div className="flex-grow border-t border-gray-400"></div>
      <span className="mx-4 flex-shrink text-gray-400">Or</span>
      <div className="flex-grow border-t border-gray-400"></div>
    </div>
  )
}
