import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const commonSchema = z.object({
  email: z.string().email('Invalid email format'),
  confirm_password: z.string({ message: 'Confirm Password is required' }).min(8, 'Confirm Password should be at least 8 characters'),
  phone: z.string({ message: 'Phone is required' }),
  first_name: z.string({ message: 'First Name is required' }).min(3, 'First Name should be at least 3 characters'),
  last_name: z.string({ message: 'Last Name is required' }).min(3, 'Last Name should be at least 3 characters'),
  username: z.string({ message: 'Username is required' }).min(6, 'Username should be at least 6 characters'),
})

const createSchema = (additionalFields: z.ZodObject<any>) => commonSchema.merge(additionalFields)

const defaultValues = {
  email: '',
  confirm_password: '',
  phone: '',
  first_name: '',
  last_name: '',
  username: '',
}

type FormSchema = z.infer<typeof commonSchema> & Record<string, any>

const useCustomForm = (schema: z.ZodSchema<any>, defaultFormValues: Partial<FormSchema> = {}) => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      ...defaultValues,
      ...defaultFormValues,
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

export const useProfileSchema = (defaultValues: Partial<FormSchema> = {}) => {
  const profileSchema = createSchema(
    z.object({
      old_password: z.string({ message: 'Password is required' }).min(8, 'Old Password should be at least 8 characters'),
      new_password: z.string({ message: 'Password is required' }).min(8, 'New Password should be at least 8 characters'),
    }),
  )

  return useCustomForm(profileSchema, defaultValues)
}

// Signup Form Hook
export const useSignupSchema = (defaultValues: Partial<FormSchema> = {}) => {
  const signupSchema = createSchema(
    z.object({
      password: z.string({ message: 'Password is required' }).min(8, 'Password should be at least 8 characters'),
    }),
  )

  return useCustomForm(signupSchema, defaultValues)
}
