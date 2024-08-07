'use client'

import React, { FC } from 'react'
import { Roboto_Condensed } from 'next/font/google'
import Image from 'next/image'
import { TCollectionItem } from '@/api/types'

import styles from './styles.module.scss'

const roboto = Roboto_Condensed({ weight: '300', subsets: ['latin'] })

const Category: FC<{ data: TCollectionItem }> = ({ data }) => {
  return (
    <div className={styles.categoryContainer}>
      <div className={styles.imgContainer}>
        {data?.images.map(img => <Image src={img ?? ''} key={img} alt="" height={100} width={100} />)}
      </div>
      <span className={roboto.className}>{data?.name}</span>
    </div>
  )
}

export default Category
