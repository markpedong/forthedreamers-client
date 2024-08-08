'use client'

import React, { FC, memo } from 'react'
import { Roboto_Condensed } from 'next/font/google'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { TCollectionItem } from '@/api/types'

import styles from './styles.module.scss'

const roboto = Roboto_Condensed({ weight: '300', subsets: ['latin'] })

const Category: FC<{ data: TCollectionItem }> = ({ data }) => {
  const router = useRouter()

  return (
    <div className={styles.categoryContainer}>
      <div className={styles.imgContainer} onClick={() => router.push(`/collection/${data?.id}`)}>
        {data?.images.map(img => <Image src={img ?? ''} key={img} alt="" height={100} width={100} />)}
      </div>
      <span className={roboto.className} onClick={() => router.push(`/collection/${data?.id}`)}>
        {data?.name}
      </span>
    </div>
  )
}

export default memo(Category)
