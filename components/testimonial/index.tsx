import { TTestimonials } from '@/api/types'
import classNames from 'classnames'
import { FC } from 'react'

import { SF_PRO_DISPLAY } from 'public/fonts'
import styles from './styles.module.scss'

const Testimonial: FC<{ className?: string; data: TTestimonials }> = ({ data, className }) => {
  return (
    <div className={classNames(styles.testimonialContainer, SF_PRO_DISPLAY.className, className)} key={data?.id}>
      <h1>{data?.title}</h1>
      <span>- {data?.author}</span>
    </div>
  )
}

export default Testimonial
