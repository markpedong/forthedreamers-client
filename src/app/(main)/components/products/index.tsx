'use client'

import React, { FC } from 'react'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import Product from '@/components/product'
import { TProductItem } from '../../../../../api/types'

const Products: FC<{ products: TProductItem[] }> = ({ products }) => {
	const [ref] = useKeenSlider<HTMLDivElement>({
		loop: true,
		mode: 'free',
		breakpoints: {
			'(min-width: 976px)': {
				slides: { perView: 4, spacing: 150 }
			},
			'(max-width: 976px)': {
				slides: { perView: 2, spacing: 150 }
			},
			'(max-width: 576px)': {
				slides: { perView: 1, spacing: 100 }
			}
		}
	})

	console.log(products)
	return (
		<div className="keen-slider" ref={ref}>
			{products?.map(product => (
				<Product className="keen-slider__slide" product={product} key={product?.id} />
			))}
		</div>
	)
}

export default Products
