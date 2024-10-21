'use client'

import { login } from '@/api'
import { zodResolver } from '@hookform/resolvers/zod'
import classNames from 'classnames'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import InputWithLabel from '@/components/inputWithLabel'
import { FacebookButton, GoogleButton, OrDivider } from '@/components/page-components/button'
import { Form } from '@/components/ui/form'
import { useWithDispatch } from '@/hooks/useWithDispatch'

import styles from '../styles.module.scss'

type FormSchema = z.infer<typeof loginSchema>

const loginSchema = z.object({
  username: z.string().min(6, 'Username should be at least 6 characters'),
  password: z.string({ message: 'Password is required' }).min(6, 'Password should be at least 6 characters'),
})

const Login = () => {
  const { storeUserInfo } = useWithDispatch()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<FormSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: '', password: '' },
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form

  const onSubmitForm = async (data: FormSchema) => {
    setIsLoading(true)

    try {
      const res = await login(data)

      if (res?.status === 200) {
        storeUserInfo(res)
      }
    } finally {
      setTimeout(() => {
        setIsLoading(false)
      }, 500)
    }
  }

  const onError = (errors: any) => {
    console.log(errors)
  }

  return (
    <div className={styles.loginWrapper}>
      <div className={styles.formContainer}>
        <h1>Welcome Back 👋</h1>
        <span className={styles.subHeader}>
          Today is a new day. It's your day. You shape it. Sign in to start managing your projects.
        </span>
        <Form {...form}>
          <form className={styles.loginForm} onSubmit={handleSubmit(onSubmitForm, onError)}>
            <InputWithLabel
              key="username"
              label="Username"
              placeholder="johnmayer"
              type="text"
              form={form}
              err={errors?.username?.message}
              {...register('username')}
            />
            <InputWithLabel
              label="Password"
              placeholder="Atleast 8 characters"
              type="password"
              form={form}
              err={errors?.password?.message}
              {...register('password')}
              name="password"
            />
            <div className={styles.forgot}>
              <span onClick={() => router.push('/forgot-password')}>Forgot Password?</span>
            </div>
            <button
              type="submit"
              className={classNames(styles.signInBtn, 'btn', { ['pointer-events-none']: isLoading })}
            >
              Sign In
            </button>
          </form>
        </Form>
        <OrDivider />
        <GoogleButton />
        <FacebookButton />
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
