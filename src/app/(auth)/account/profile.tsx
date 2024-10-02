'use client'

import { useState } from 'react'
import { updateUser } from '@/api'
import { useAppSelector } from '@/redux/store'
import { motion } from 'framer-motion'
import { toast } from 'sonner'

import { useProfileSchema } from '@/hooks/useProfileSchema'
import { useWithDispatch } from '@/hooks/useWithDispatch'
import { Form } from '@/components/ui/form'
import InputWithLabel from '@/components/inputWithLabel'

import styles from '../styles.module.scss'

const Profile = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { email, first_name, last_name, phone, username } = useAppSelector(s => s.userData.user)
  const { form, handleSubmit, register, errors } = useProfileSchema({
    username,
    phone,
    confirm_password: '',
    new_password: '',
    old_password: '',
    email,
    first_name,
    last_name,
  })
  const { getUserInfo } = useWithDispatch()

  const onSubmitForm = async data => {
    try {
      setIsSubmitting(true)

      const { new_password, confirm_password } = data
      if (new_password !== confirm_password) {
        toast("New Password and Confirm Password don't match ⚠️", {
          duration: 1000,
          description: 'Please try again',
          action: {
            label: 'Error',
            onClick: () => {},
          },
        })
        return
      }

      const res = await updateUser(data)
      if (res?.status === 200) {
        toast(res?.message, {
          duration: 1000,
        })
        getUserInfo()
      }
    } finally {
      setTimeout(() => {
        setIsSubmitting(false)
      }, 1500)
    }
  }

  const onError = (errors: any) => {
    console.log(errors)
  }

  return (
    <>
      <Form {...form}>
        <form className={styles.profileWrapper} onSubmit={handleSubmit(onSubmitForm, onError)}>
          <div className="flex gap-2">
            <InputWithLabel
              key="first_name"
              label="First Name"
              placeholder="John"
              type="text"
              form={form}
              err={errors?.first_name?.message}
              {...register('first_name')}
            />
            <InputWithLabel
              key="last_name"
              label="Last Name"
              placeholder="Mayer"
              type="text"
              form={form}
              err={errors?.last_name?.message}
              {...register('last_name')}
            />
          </div>
          <div className="flex gap-2">
            {/* <InputWithLabel
              key="phone"
              label="Phone"
              placeholder="(+63)9123456789"
              type="text"
              form={form}
              err={errors?.phone?.message}
              {...register('phone')}
            /> */}
            <InputWithLabel
              key="email"
              label="Email"
              placeholder="Example@gmail.com"
              type="email"
              form={form}
              err={errors?.email?.message}
              {...register('email')}
            />
            <InputWithLabel
              key="username"
              label="Username"
              placeholder="johnmayer"
              type="text"
              form={form}
              err={errors?.username?.message}
              {...register('username')}
            />
          </div>
          <InputWithLabel
            key="old_password"
            label="Old Password"
            placeholder="Atleast 8 characters"
            type="password"
            form={form}
            err={errors?.old_password?.message}
            {...register('old_password')}
          />
          <div className="flex gap-2">
            <InputWithLabel
              key="new_password"
              label="New Password"
              placeholder="Atleast 8 characters"
              type="password"
              form={form}
              err={errors?.new_password?.message}
              {...register('new_password')}
            />
            <InputWithLabel
              key="confirm_password"
              label="Confirm Password"
              placeholder="Atleast 8 characters"
              type="password"
              form={form}
              err={errors?.confirm_password?.message}
              {...register('confirm_password')}
            />
          </div>
          <div className={styles.btnContainer}>
            <motion.button whileTap={{ scale: 0.95 }} type="reset">
              Reset
            </motion.button>
            <motion.button whileTap={{ scale: 0.95 }} type="submit" className={isSubmitting ? 'pointer-events-none' : ''}>
              Submit
            </motion.button>
          </div>
        </form>
      </Form>
    </>
  )
}

export default Profile
