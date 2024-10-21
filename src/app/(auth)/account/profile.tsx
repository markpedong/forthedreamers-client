import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Form } from '@/components/ui/form'
import InputWithLabel from '@/components/inputWithLabel'

import styles from '../styles.module.scss'

type FormSchema = z.infer<typeof profileSchema>

const profileSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string({ message: 'Password is required' }).min(8, 'Password should be at least 8 characters'),
  confirm_password: z.string({ message: 'Confirm Password is required' }).min(8, 'Confirm Password should be at least 8 characters'),
  phone: z.string({ message: 'Phone is required' }),
  first_name: z.string({ message: 'First Name is required' }),
  last_name: z.string({ message: 'Last Name is required' }),
})

const Profile = () => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(profileSchema),
    defaultValues: { email: '', password: '', phone: '', confirm_password: '', first_name: '', last_name: '' },
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
            <InputWithLabel
              key="phone"
              label="Phone"
              placeholder="(+63)9123456789"
              type="text"
              form={form}
              err={errors?.phone?.message}
              {...register('phone')}
            />
            <InputWithLabel
              key="email"
              label="Email"
              placeholder="Example@gmail.com"
              type="email"
              form={form}
              err={errors?.email?.message}
              {...register('email')}
            />
          </div>
          <div className="flex gap-2">
            <InputWithLabel
              key="username"
              label="Username"
              placeholder="Atleast 8 characters"
              type="password"
              form={form}
              err={errors?.password?.message}
              {...register('password')}
            />
            <InputWithLabel
              key="password"
              label="Password"
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
            <motion.button whileTap={{ scale: 0.95 }} type="submit">
              Submit
            </motion.button>
          </div>
        </form>
      </Form>
    </>
  )
}

export default Profile
