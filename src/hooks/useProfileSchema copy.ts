import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const profileSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string({ message: 'Password is required' }).min(8, 'Password should be at least 8 characters'),
  confirm_password: z.string({ message: 'Confirm Password is required' }).min(8, 'Confirm Password should be at least 8 characters'),
  phone: z.string({ message: 'Phone is required' }),
  first_name: z.string({ message: 'First Name is required' }).min(3, 'First Name should be at least 3 characters'),
  last_name: z.string({ message: 'Last Name is required' }).min(3, 'Last Name should be at least 3 characters'),
  username: z.string({ message: 'Username is required' }).min(6, 'Username should be at least 6 characters'),
})

type FormSchema = z.infer<typeof profileSchema>

export const useProfileSchema = (defaultValues: Partial<FormSchema> = {}) => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      email: '',
      password: '',
      confirm_password: '',
      phone: '',
      first_name: '',
      last_name: '',
      username: '',
      ...defaultValues,
    },
  })

  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = form

  return {
    form,
    handleSubmit,
    register,
    errors,
    clearErrors,
  }
}
