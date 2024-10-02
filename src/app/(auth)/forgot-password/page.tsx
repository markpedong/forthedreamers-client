'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import classNames from 'classnames'
import { motion } from 'framer-motion'

import { useFormSchemas } from '@/hooks/useFormSchemas'
import useValidate from '@/hooks/useFormValidate'
import { Form } from '@/components/ui/form'
import InputWithLabel from '@/components/inputWithLabel'

import styles from '../styles.module.scss'

const Login = () => {
  const router = useRouter()
  const { forgotPassEmailDefaults, forgotPassEmailSchema, setSteps, steps } = useFormSchemas()
  const { form, handleSubmit, register, errors, setValue } = useValidate({
    schema: forgotPassEmailSchema[steps],
    defaultValues: forgotPassEmailDefaults[steps],
  })

  const onVerifyEmailForm = data => {
    console.log(data)
    setSteps(2)
  }

  const onVerifyOTP = data => {
    console.log(data)
    setSteps(3)
  }

  const onSubmitNewPass = data => {
    console.log(data)
  }

  const onError = (errors: any) => {
    console.log(errors)
  }

  return (
    <div className={styles.forgotPassWrapper}>
      <div className={styles.formContainer}>
        <h1>Forgotten your Password? 👋</h1>
        <span className={styles.subHeader}>Don't worry, we're here to help!</span>
        <Form {...form}>
          {steps === 1 && (
            <form className={styles.forgotPasswordForm} onSubmit={handleSubmit(onVerifyEmailForm, onError)}>
              <InputWithLabel
                key="email"
                label="Email"
                placeholder="Example@gmail.com"
                type="email"
                form={form}
                err={errors?.email?.message as string}
                {...register('email')}
              />
              <motion.button type="submit" whileTap={{ scale: 0.97 }} className={styles.signInBtn}>
                Send OTP
              </motion.button>
            </form>
          )}
          {steps === 2 && (
            <form className={styles.forgotPasswordForm} onSubmit={handleSubmit(onVerifyOTP, onError)}>
              <InputWithLabel
                form={form}
                err={errors?.otp?.message as string}
                key="otp"
                label="OTP Code"
                placeholder="182373"
                type="text"
                {...register('otp', {
                  onChange: e => setValue('otp', e.target.value.replace(/\D/g, '')),
                })}
                name="otp"
              />
              <motion.button type="submit" whileTap={{ scale: 0.97 }} className={styles.signInBtn}>
                Verify OTP
              </motion.button>
            </form>
          )}
          {steps === 3 && (
            <form className={styles.forgotPasswordForm} onSubmit={handleSubmit(onSubmitNewPass, onError)}>
              <InputWithLabel
                form={form}
                err={errors?.otp?.message as string}
                key="password"
                label="Password"
                placeholder="********"
                type="password"
                {...register('password')}
                name="password"
              />
              <InputWithLabel
                form={form}
                err={errors?.otp?.message as string}
                key="confirm_password"
                label="Confirm Password"
                placeholder="********"
                type="password"
                {...register('confirm_password')}
                name="confirm_password"
              />
              <motion.button type="submit" whileTap={{ scale: 0.97 }} className={styles.signInBtn}>
                Verify OTP
              </motion.button>
            </form>
          )}
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
          Don't you have an account?
          <span className="cursor-pointer" onClick={() => router.push('/signup')}>
            Sign up
          </span>
        </div>
        <div className={classNames(styles.copyright, 'absolute bottom-0')}>© 2023 ALL RIGHTS RESERVED</div>
      </div>
    </div>
  )
}

export default Login
