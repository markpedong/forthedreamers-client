'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import classNames from 'classnames'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Form } from '@/components/ui/form'
import InputWithLabel from '@/components/inputWithLabel'

import styles from '../styles.module.scss'

type FormSchema = z.infer<typeof loginSchema>

const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string({ message: 'Password is required' }).min(8, 'Password should be at least 8 characters'),
})

const Login = () => {
  const router = useRouter()
  const form = useForm<FormSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  })
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form

  const onSubmitForm = (data: FormSchema) => {
    console.log(data)
  }

  const onError = (errors: any) => {
    console.log(errors)
  }

  return (
    <div className={styles.loginWrapper}>
      <div className={styles.formContainer}>
        <h1>Welcome Back 👋</h1>
        <span className={styles.subHeader}>Today is a new day. It's your day. You shape it. Sign in to start managing your projects.</span>
        <Form {...form}>
          <form className={styles.loginForm} onSubmit={handleSubmit(onSubmitForm, onError)}>
            <InputWithLabel
              className={styles.input}
              key="email"
              label="Email"
              placeholder="Example@gmail.com"
              type="email"
              form={form}
              err={errors?.email?.message}
              {...register('email')}
            />
            <InputWithLabel
              className={styles.input}
              key="password"
              label="Password"
              placeholder="Atleast 8 characters"
              type="password"
              form={form}
              err={errors?.password?.message}
              {...register('password')}
            />
            <div className={styles.forgot}>
              <span onClick={() => router.push('/forgot-password')}>Forgot Password?</span>
            </div>
            <motion.button type="submit" whileTap={{ scale: 0.99 }} className={styles.signInBtn}>
              Sign In
            </motion.button>
          </form>
        </Form>
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
          Don't you have an account?{' '}
          <span className="cursor-pointer" onClick={() => router.push('/signup')}>
            Sign up
          </span>
        </div>
        <div className={classNames(styles.copyright, 'absolute bottom-0')}>© 2023 ALL RIGHTS RESERVED</div>
      </div>
      <div className={styles.imgWrapper}>
        <Image src={'/assets/login_cover.webp'} fill quality={100} priority alt="login_cover" sizes="(100vw, 100vh)" />
      </div>
    </div>
  )
}

export default Login
