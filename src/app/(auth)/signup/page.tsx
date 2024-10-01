'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import classNames from 'classnames'

import InputWithLabel from '@/components/inputWithLabel'

import styles from '../styles.module.scss'

const Signup = () => {
  const router = useRouter()

  return (
    <div className={styles.registerWrapper}>
      <div className={styles.imgWrapper}>
        <Image src={'/assets/login_cover-2.webp'} fill quality={100} priority alt="login_cover" />
      </div>
      <div className={styles.formContainer}>
        <h1>Create New Account 👋</h1>
        <span className={styles.subHeader}>Today is a new day. It's your day. You shape it. Sign in to start managing your projects.</span>
        <div className="flex w-full gap-2">
          <InputWithLabel key="first_name" label="First Name" placeholder="John" type="text" />
          <InputWithLabel key="last_name" label="Last Name" placeholder="Mayer" type="text" />
        </div>
        <div className="flex w-full gap-2">
          <InputWithLabel key="username" label="Username" placeholder="johnmayer" type="text" />
          <InputWithLabel key="password" label="Password" placeholder="Atleast 8 characters" type="password" />
        </div>
        <InputWithLabel key="email" label="Email" placeholder="Example@gmail.com" type="email" />
        <span className={styles.forgot} onClick={() => router.push('/forgot-password')}>
          Forgot Password?
        </span>
        <div className={styles.signInBtn}>Sign Up</div>
        <div className="relative flex w-full items-center py-5">
          <div className="flex-grow border-t border-gray-400"></div>
          <span className="mx-4 flex-shrink text-gray-400">Or</span>
          <div className="flex-grow border-t border-gray-400"></div>
        </div>
        <div className="mb-2 flex w-full items-center justify-center bg-[#F3F9FA]">
          <button className="flex items-center gap-2 px-6 py-2 text-xs text-[#313957]">
            <Image src={'/assets/google.svg'} width={20} height={20} alt="google_logo" />
            <span>Sign in with Google</span>
          </button>
        </div>
        <div className="mb-2 flex w-full items-center justify-center bg-[#F3F9FA]">
          <button className="flex items-center gap-2 px-6 py-2 text-xs text-[#313957]">
            <Image src={'/assets/facebook.svg'} width={20} height={20} alt="google_logo" />
            <span>Sign in with Facebook</span>
          </button>
        </div>
        <div className={styles.dontHaveAccount}>
          Already have an account?
          <span className="cursor-pointer" onClick={() => router.push('/login')}>
            Login
          </span>
        </div>
        <div className={classNames(styles.copyright, 'absolute bottom-0')}>© 2023 ALL RIGHTS RESERVED</div>
      </div>
    </div>
  )
}

export default Signup
