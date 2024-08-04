'use client'

import 'keen-slider/keen-slider.min.css'

import React, { FC } from 'react'
import { TProductItem } from '@/api/types'
import { useKeenSlider } from 'keen-slider/react'

import Product from '@/components/product'

const CityProduct: FC<{ products: TProductItem[] }> = ({ products }) => {
  const [ref] = useKeenSlider<HTMLDivElement>({
    loop: true,
    breakpoints: {
      '(min-width: 976px)': {
        slides: { perView: 2, spacing: 150 }
      },
      '(max-width: 976px)': {
        slides: { perView: 1, spacing: 150 }
      }
    }
  })

  return (
    <div className="keen-slider" ref={ref}>
      <Product className="keen-slider__slide" product={products?.[0]} />
      <Product className="keen-slider__slide" product={products?.[1]} />
    </div>
  )
}

export default CityProduct
