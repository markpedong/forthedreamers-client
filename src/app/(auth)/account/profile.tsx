import { motion } from 'framer-motion'

import InputWithLabel from '@/components/inputWithLabel'
import { Form } from '@/components/ui/form'
import { useProfileSchema } from '@/hooks/useProfileSchema'

import styles from '../styles.module.scss'

const Profile = () => {
  const { form, handleSubmit, register, errors } = useProfileSchema({
    username: '',
    phone: '',
    confirm_password: '',
    password: '',
    email: '',
    first_name: '',
    last_name: '',
    
  })

  const onSubmitForm = data => {
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
            key="email"
            label="Email"
            placeholder="Example@gmail.com"
            type="email"
            form={form}
            err={errors?.email?.message}
            {...register('email')}
          />
          <div className="flex gap-2">
            <InputWithLabel
              key="password"
              label="Password"
              placeholder="Atleast 8 characters"
              type="password"
              form={form}
              err={errors?.password?.message}
              {...register('password')}
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
