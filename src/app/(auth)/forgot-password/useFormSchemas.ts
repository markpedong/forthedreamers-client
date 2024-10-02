import { useState } from 'react'
import { z } from 'zod'

const emailSchema = z.object({
  email: z.string().email('Invalid email format'),
})

const verifyCodeSchema = z.object({
  otp: z.string().length(6, 'Invalid OTP'),
})

const newPassEmailSchema = z.object({
  password: z.string({ message: 'Password is required' }).min(8, 'Password should be at least 8 characters'),
  confirm_password: z.string({ message: 'Confirm Password is required' }).min(8, 'Confirm Password should be at least 8 characters'),
})

export const useFormSchemas = () => {
  const [steps, setSteps] = useState(1)
  const forgotPassEmailDefaultValues = { email: '', code: '', newPassword: '', confirmPassword: '' }
  const forgotPassEmailDefaults: Record<number, Partial<typeof forgotPassEmailDefaultValues>> = {
    [1]: { email: '' },
    [2]: { code: '' },
    [3]: { newPassword: '', confirmPassword: '' },
  }
  const forgotPassEmailSchema: Record<number, z.Schema> = {
    [1]: emailSchema,
    [2]: verifyCodeSchema,
    [3]: newPassEmailSchema,
  }

  return { steps, setSteps, forgotPassEmailDefaults, forgotPassEmailSchema }
}
