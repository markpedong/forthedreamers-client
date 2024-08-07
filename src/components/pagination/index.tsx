'use client'

import React, { FC } from 'react'
import { Roboto_Condensed } from 'next/font/google'
import { useAppSelector } from '@/redux/store'
import classNames from 'classnames'
import { FaArrowRight } from 'react-icons/fa'

import styles from './styles.module.scss'

const roboto = Roboto_Condensed({ weight: ['300', '800'], subsets: ['latin'] })

const Pagination: FC<{ type: 'collection' | 'products' }> = ({ type }) => {
  const { collection_length, product_length, default_pageSize } = useAppSelector(state => state.appData.website)
  const length = Math.round((type === 'collection' ? collection_length / default_pageSize : product_length / default_pageSize) + 1)

  return (
    <div className={classNames(styles.pagination, roboto.className)}>
      {Array.from(Array(length), (_, x) => (
        <span>{x + 1}</span>
      ))}
      <span>
        <FaArrowRight />
      </span>
    </div>
  )
}
export default Pagination
