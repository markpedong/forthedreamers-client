import { forwardRef } from 'react'
import classNames from 'classnames'
import { motion } from 'framer-motion'

import { Input } from '@/components/ui/input'

import { FormControl, FormField, FormItem, FormLabel } from '../ui/form'
import styles from './styles.module.scss'

type InputWithLabelProps = {
  className?: string
  label?: string
  placeholder?: string
  type?: string
  err?: string
  form: any
  name: string
}

const InputWithLabel = forwardRef<HTMLInputElement, InputWithLabelProps>(
  ({ className, label, placeholder, type, err, form, name }, ref) => {
    return (
      <div className={classNames(styles.container, className)}>
        <FormField
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem>
              {label && <FormLabel>{label}</FormLabel>}
              <FormControl>
                <Input
                  placeholder={placeholder}
                  type={type}
                  {...field}
                  ref={ref}
                  className={classNames({
                    [styles.errorInput]: err,
                    [styles.defaultInput]: !err,
                  })}
                />
              </FormControl>
              {err && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-0 bottom-[-1.2rem] mt-0 text-red-500"
                >
                  {err}
                </motion.p>
              )}
            </FormItem>
          )}
        />
      </div>
    )
  },
)

export default InputWithLabel
