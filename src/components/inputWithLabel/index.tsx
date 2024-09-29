import { FC } from 'react'
import classNames from 'classnames'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import styles from './stlyes.module.scss'

type InputWithLabelProps = {
  className?: string
  label?: string
  placeholder?: string
  type?: string
}
const InputWithLabel: FC<InputWithLabelProps> = ({ className, label, placeholder, type }) => {
  return (
    <div className={classNames(styles.container, className)}>
      <Label className={styles.label}>{label}</Label>
      <Input type={type} placeholder={placeholder} />
    </div>
  )
}

export default InputWithLabel
