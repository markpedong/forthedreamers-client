'use client'

import React, { FC, memo, useState } from 'react'
import { Roboto_Condensed } from 'next/font/google'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { TProductItem, TShortVar } from '@/api/types'
import classNames from 'classnames'

import styles from './styles.module.scss'

const roboto = Roboto_Condensed({ weight: ['300', '400', '600'], subsets: ['latin'] })

const Product: FC<{ className?: string; product?: TProductItem }> = ({ className, product }) => {
  const { push } = useRouter()
  const [curr, setCurr] = useState<TShortVar>()
  //remove duplicates
  const arr = product?.variations?.filter((obj1, i, arr) => arr.findIndex(obj2 => obj2.color === obj1.color) === i)

  return (
    <div className={classNames(styles.productContainer, className)}>
      <Image onClick={() => push(`/shop/${product?.id}`)} src={product?.images?.[0] ?? ''} alt="" height={150} width={150} />
      <div className={classNames(styles.textContainer, roboto.className)}>
        <span className={styles.title} onClick={() => push(`/shop/${product?.id}`)}>
          {product?.name}
        </span>
        {product?.variations?.length! > 0 && (
          <>
            <span>₱{curr?.price || product?.variations?.[0]?.price}.00</span>
            <span className={styles.avail}>Available Colors</span>
            <div className={styles.colors}>
              {arr?.map(item => <span style={{ background: item.color }} onMouseEnter={() => setCurr(item)} key={item?.id} />)}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default memo(Product)
