import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

// Common fields shared between schemas
const commonFields = {
	email: z.string().email('Invalid email format'),
	confirm_password: z
		.string({ message: 'Confirm Password is required' })
		.min(6, 'Confirm Password should be at least 6 characters'),
	first_name: z.string({ message: 'First Name is required' }).min(3, 'First Name should be at least 3 characters'),
	last_name: z.string({ message: 'Last Name is required' }).min(3, 'Last Name should be at least 3 characters'),
	username: z.string({ message: 'Username is required' }).min(6, 'Username should be at least 6 characters')
}

// Common schema for shared validation
const commonSchema = z.object({
	...commonFields,
	phone: z.string({ message: 'Phone is required' })
})

// Signup schema
const signupSchema = z.object({
	...commonFields,
	password: z.string({ message: 'Password is required' }).min(6, 'Password should be at least 6 characters')
})

// Default values for the form
const defaultValues = {
	email: '',
	confirm_password: '',
	password: '',
	first_name: '',
	last_name: '',
	username: ''
}

// Types for form schemas
type FormSchema = z.infer<typeof commonSchema> & Record<string, any>
type SignupSchema = z.infer<typeof signupSchema> & Record<string, any>

// Custom form hook
const useCustomForm = (schema: z.ZodSchema<any>, defaultFormValues: Partial<FormSchema> = {}) => {
	const form = useForm<FormSchema>({
		resolver: zodResolver(schema),
		defaultValues: {
			...defaultValues,
			...defaultFormValues
		}
	})

	const {
		register,
		handleSubmit,
		clearErrors,
		reset,
		formState: { errors }
	} = form

	return {
		form,
		handleSubmit,
		register,
		errors,
		clearErrors,
		reset
	}
}

// Profile Form Hook
export const useProfileSchema = (defaultValues: Partial<FormSchema> = {}) => {
	const profileSchema = z.object({
		...commonFields,
		old_password: z
			.string({ message: 'Old Password is required' })
			.min(8, 'Old Password should be at least 8 characters'),
		new_password: z
			.string({ message: 'New Password is required' })
			.min(8, 'New Password should be at least 8 characters')
	})

	return useCustomForm(profileSchema, defaultValues)
}

// Signup Form Hook
export const useSignupSchema = (defaultValues: Partial<SignupSchema> = {}) => {
	return useCustomForm(signupSchema, defaultValues)
}
