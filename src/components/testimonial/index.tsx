import React, { FC } from 'react'
import { Roboto_Condensed } from 'next/font/google'
import { TTestimonials } from '@/api/types'
import classNames from 'classnames'

import styles from './styles.module.scss'

const roboto = Roboto_Condensed({ weight: ['500', '400', '600'], subsets: ['latin'] })

const Testimonial: FC<{ className?: string; data: TTestimonials }> = ({ data, className }) => {
  return (
    <div className={classNames(styles.testimonialContainer, roboto.className, className)} key={data?.id}>
      <h1>{data?.title}</h1>
      <span>- {data?.author}</span>
    </div>
  )
}

export default Testimonial
