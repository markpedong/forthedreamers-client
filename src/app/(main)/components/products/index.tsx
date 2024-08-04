'use client'

import React, { FC, memo } from 'react'
import { useKeenSlider } from 'keen-slider/react'

import 'keen-slider/keen-slider.min.css'

import { TProductItem } from '@/api/types'

import Product from '@/components/product'

const Products: FC<{ products: TProductItem[] }> = ({ products }) => {
  const [ref] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: 'snap',
    breakpoints: {
      '(min-width: 976px)': {
        slides: { perView: products?.length < 4 ? products?.length : 4, spacing: 150 }
      },
      '(max-width: 976px)': {
        slides: { perView: 2, spacing: 150 }
      },
      '(max-width: 576px)': {
        slides: { perView: 1, spacing: 100 }
      }
    }
  })

  return (
    <div className="keen-slider" ref={ref}>
      {products?.map((product) => <Product className="keen-slider__slide" product={product} key={product?.id} />)}
    </div>
  )
}

export default memo(Products)
