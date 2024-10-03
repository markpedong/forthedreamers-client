import Image from 'next/image'

export const GoogleButton = () => {
  return (
    <div className="mb-2 flex w-full items-center justify-center bg-[#F3F9FA]">
      <button className="flex items-center gap-2 px-6 py-2 text-xs text-[#313957]" onClick={() => window.open(`${process.env.NEXT_PUBLIC_DOMAIN}/public/googleLogin`)}>
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
