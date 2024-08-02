'use client'

import React, { FC, memo } from 'react'
import styles from './styles.module.scss'
import Image from 'next/image'
import { Roboto_Condensed } from 'next/font/google'
import classNames from 'classnames'
import { useRouter } from 'next/navigation'
import { TProductItem } from '../../../api/types'

const roboto = Roboto_Condensed({ weight: ['300', '400', '600'], subsets: ['latin'] })

const Product: FC<{ className?: string; product?: TProductItem }> = ({ className, product }) => {
	const { push } = useRouter()

	console.log(product)

	return (
		<div className={classNames(styles.productContainer, className)}>
			<Image
				onClick={() => push(`/shop/${product?.id}`)}
				src={product?.images?.[0] ?? ''}
				alt=""
				height={150}
				width={150}
			/>
			<div className={classNames(styles.textContainer, roboto.className)}>
				<span onClick={() => push(`/shop/${product?.id}`)}>{product?.name}</span>
				<span>₱2,290.00</span>
				<span>Available Colors</span>
			</div>
		</div>
	)
}

export default memo(Product)
