import Image from 'next/image'
import classNames from 'classnames'

import InputWithLabel from '@/components/inputWithLabel'

import styles from './styles.module.scss'

const Login = () => {
  return (
    <div className={styles.loginWrapper}>
      <div className={styles.formContainer}>
        <h1>Welcome Back 👋</h1>
        <span className={styles.subHeader}>Today is a new day. It's your day. You shape it. Sign in to start managing your projects.</span>
        <InputWithLabel key="email" label="Email" placeholder="Example@gmail.com" type="email" />
        <InputWithLabel key="password" label="Password" placeholder="Atleast 8 characters" type="password" />
        <span className={styles.forgot}>Forgot Password?</span>
        <div className={styles.signInBtn}>Sign In</div>
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
          Don't you have an account? <span>Sign up</span>
        </div>
        <div className={classNames(styles.copyright, 'absolute bottom-0')}>© 2023 ALL RIGHTS RESERVED</div>
      </div>
      <div className={styles.imgWrapper}>
        <Image src={'/assets/login_cover.webp'} fill quality={100} priority alt="login_cover" />
      </div>
    </div>
  )
}

export default Login
