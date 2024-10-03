'use client'

import { forwardRef, LegacyRef, useState } from 'react'
import Image from 'next/image'
import classNames from 'classnames'
import { motion } from 'framer-motion'

import { Input } from '@/components/ui/input'

import { FormControl, FormField, FormItem, FormLabel } from '../ui/form'
import { Textarea } from '../ui/textarea'
import styles from './styles.module.scss'

type InputWithLabelProps = {
  className?: string
  label?: string
  placeholder?: string
  type?: string
  err?: string | undefined
  key?: string
  form: any
  name: string
  textarea?: boolean
}

const InputWithLabel = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputWithLabelProps>(
  ({ className, label, placeholder, type, err, form, name, textarea }, ref) => {
    const [isEyeOpen, setIsEyeOpen] = useState(false)
    const isPasswords = ['password', 'confirm_password', 'new_password', 'old_password'].includes(name)

    return (
      <div className={classNames(styles.container, className)}>
        <FormField
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem>
              {label && <FormLabel>{label}</FormLabel>}
              <FormControl>
                <>
                  {!textarea ? (
                    <Input
                      placeholder={placeholder}
                      type={isPasswords ? (isEyeOpen ? 'text' : 'password') : type}
                      {...field}
                      ref={ref as LegacyRef<HTMLInputElement>}
                      className={classNames({
                        [styles.errorInput]: err,
                        [styles.defaultInput]: !err,
                      })}
                    />
                  ) : (
                    <Textarea
                      placeholder={placeholder}
                      {...field}
                      ref={ref as LegacyRef<HTMLTextAreaElement>}
                      className={classNames({
                        [styles.errorInput]: err,
                        [styles.defaultInput]: !err,
                      })}
                    />
                  )}
                  {isPasswords && (
                    <Image
                      className="absolute right-1 top-1/2 cursor-pointer"
                      src={`/assets/images/eye-${isEyeOpen ? 'open' : 'hidden'}.webp`}
                      width={20}
                      height={20}
                      alt="eye"
                      onClick={() => setIsEyeOpen(!isEyeOpen)}
                    />
                  )}
                </>
              </FormControl>
              {err && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className="absolute bottom-[-0.9rem] left-0 mt-0 text-[0.7rem] leading-tight text-red-500"
                >
                  {err}
                </motion.span>
              )}
            </FormItem>
          )}
        />
      </div>
    )
  },
)

export default InputWithLabel
