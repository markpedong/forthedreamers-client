'use client'

import { TCollectionItem } from '@/api/types'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { FC, memo } from 'react'

import { SF_PRO_DISPLAY } from 'public/fonts'
import styles from './styles.module.scss'

const Category: FC<{ data: TCollectionItem }> = ({ data }) => {
  const router = useRouter()

  return (
    <div key={data?.id}>
      <motion.div className={styles.categoryContainer} whileHover={{ scale: 1.1 }}>
        <div className={styles.imgContainer} onClick={() => router.push(`/collection/${data?.id}`)}>
          {data?.images.map(img => <Image src={img ?? ''} key={img} alt="" height={100} width={100} />)}
        </div>
        <span className={SF_PRO_DISPLAY.className} onClick={() => router.push(`/collection/${data?.id}`)}>
          {data?.name}
        </span>
      </motion.div>
    </div>
  )
}

export default memo(Category)
