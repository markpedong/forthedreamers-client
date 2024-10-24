'use client'

import classNames from 'classnames'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import InputWithLabel from '@/components/inputWithLabel'
import { Form } from '@/components/ui/form'

import styles from '../styles.module.scss'
import { useSignupSchema } from '@/hooks/useUserSchema'
import { useState } from 'react'
import { signup } from '@/api'
import { useWithDispatch } from '@/hooks/useWithDispatch'

const Signup = () => {
	const { storeUserInfo } = useWithDispatch()
	const router = useRouter()
	const [isSubmitting, setIsSubmitting] = useState(false)
	const { form, handleSubmit, register, errors } = useSignupSchema({
		username: '',
		confirm_password: '',
		password: '',
		email: '',
		first_name: '',
		last_name: ''
	})

	const onSubmitForm = async data => {
		setIsSubmitting(true)

		try {
			const res = await signup(data)

			if (res?.status === 200) {
				storeUserInfo(res)
			}
		} finally {
			setTimeout(() => {
				setIsSubmitting(false)
			}, 500)
		}
	}

	const onError = (errors: any) => {
		console.log(errors)
	}

	return (
		<div className={styles.registerWrapper}>
			<div className={styles.imgWrapper}>
				<Image src={'/assets/login_cover-2.webp'} fill quality={100} priority alt="login_cover" />
			</div>
			<div className={styles.formContainer}>
				<h1>Create New Account 👋</h1>
				<span className={styles.subHeader}>
					Today is a new day. It's your day. You shape it. Sign in to start managing your projects.
				</span>
				<Form {...form}>
					<form className="w-full" onSubmit={handleSubmit(onSubmitForm, onError)}>
						<div className="flex w-full gap-2">
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
						<div className="flex w-full gap-2">
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
						<div className="flex w-full gap-2">
							<InputWithLabel
								key="password"
								label="Password"
								placeholder="Atleast 8 characters"
								type="password"
								form={form}
								err={errors?.password?.message as string}
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

						<div className={styles.forgot}>
							<span onClick={() => router.push('/forgot-password')}>Forgot Password?</span>
						</div>
						<button
							type="submit"
							className={classNames(styles.signInBtn, 'btn', { ['pointer-events-none']: isSubmitting })}
						>
							Sign Up
						</button>
					</form>
				</Form>
				{/* <OrDivider /> */}
				{/* <GoogleButton />
        <FacebookButton /> */}
				<div className={styles.dontHaveAccount}>
					Already have an account?
					<span className="cursor-pointer" onClick={() => router.push('/login')}>
						Login
					</span>
				</div>
			</div>
			<div className={classNames(styles.copyright, 'absolute bottom-0')}>© 2023 ALL RIGHTS RESERVED</div>
		</div>
	)
}

export default Signup
