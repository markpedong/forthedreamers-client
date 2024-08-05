'use client'

import React, { FC, memo, useMemo, useState } from 'react'
import { Roboto_Condensed } from 'next/font/google'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { TProductDetails, TProductItem, TVariationItem } from '@/api/types'
import classNames from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import { BsBox } from 'react-icons/bs'
import { FaMinus, FaPlus } from 'react-icons/fa6'
import { IoIosReturnLeft } from 'react-icons/io'
import { MdLocalLaundryService } from 'react-icons/md'

import Header from '@/components/header'
import { ListAnswers } from '@/components/page-components'
import { CARE_GUIDE } from '@/app/(main)/constants/enums'

import CareGuide from './components/care-guide'
import styles from './styles.module.scss'

const roboto = Roboto_Condensed({ weight: ['300', '400', '500', '800'], subsets: ['latin'] })

const getUniqueVariations = (variations, type) => {
  const uniqueValues = new Set()
  return variations.filter((item) => {
    const value = type === 'size' ? item.size : item.color
    if (uniqueValues.has(value)) return false
    uniqueValues.add(value)
    return true
  })
}

const Variations = ({ variations, selectedId, setSelectedId, type, size, color }) => {
  return (
    <div className={styles.variations}>
      {variations.map((item) => {
        const isDisabled =
          type === 'size' ? color && item.color !== color && selectedId !== item.id : size && item.size !== size && selectedId !== item.id

        const handleClick = () => {
          if (selectedId === item.id) {
            setSelectedId(null)
          } else if (!isDisabled) {
            setSelectedId(item.id)
          }
        }
        return (
          <span
            key={item.id}
            role="button"
            aria-selected={selectedId === item.id}
            className={classNames(styles.variationItem, {
              [styles.selected]: selectedId === item.id,
              [isDisabled]: styles.disabled
            })}
            onClick={handleClick}
          >
            {type === 'size' ? item.size : item.color}
          </span>
        )
      })}
    </div>
  )
}

const Product: FC<{ product: TProductDetails; variations: TVariationItem[] }> = ({ product, variations }) => {
  const { push } = useRouter()
  const [size, setSize] = useState('')
  const [color, setColor] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [openCareGuide, setOpenCareGuide] = useState(false)
  const [selectedCare, setSelectedCare] = useState<CARE_GUIDE>(CARE_GUIDE.CARE_GUIDE)
  const uniqueSizes = useMemo(() => getUniqueVariations(variations, 'size'), [variations])
  const uniqueColors = useMemo(() => getUniqueVariations(variations, 'color'), [variations])

  const selectedSize = variations.find((i) => i.id === size)?.size
  const selectedColor = variations.find((i) => i.id === color)?.color
  const selectedVariation = variations.find((item) => item.size === selectedSize && item.color === selectedColor)

  return (
    <div className={styles.mainWrapper}>
      <Header arr={['HOME', 'SHOP', 'PRODUCTS']} />
      <div className={styles.productWrapper}>
        <div className={styles.productImgContainer}>
          <Image src={product?.images?.[0]} alt="product" width={500} height={500} draggable={false} />
        </div>
        <div className={classNames(styles.descriptionContainer, roboto.className)}>
          <h1>{product?.name}</h1>
          <span className={styles.price}>{selectedVariation?.id && <>₱{selectedVariation?.price}.00</>}</span>
          <p className={styles.shipping}>
            <span onClick={() => push('/support/shipping')}>Shipping</span> calculated at checkout.
          </p>
          <span className={styles.description}>{product?.description}</span>
          <div className={styles.features}>
            <ListAnswers answers={product?.features} />
          </div>
          <div className={styles.sizeContainer}>
            <span>SIZE:</span>
            <span>{selectedSize}</span>
          </div>
          <Variations
            variations={uniqueSizes}
            selectedId={size}
            setSelectedId={setSize}
            type="size"
            size={selectedSize}
            color={selectedColor}
          />

          <div className={styles.sizeContainer}>
            <span>COLOR:</span>
            <span>{selectedColor}</span>
          </div>
          <Variations
            variations={uniqueColors}
            selectedId={color}
            setSelectedId={setColor}
            type="color"
            size={selectedSize}
            color={selectedColor}
          />
          <div className={styles.quantityContainer}>
            <div className={styles.addMinusContainer}>
              <FaMinus onClick={() => setQuantity((qty) => (qty > 1 ? qty - 1 : qty))} />
              {quantity}
              <FaPlus onClick={() => setQuantity((qty) => (qty < 10 ? (qty += 1) : qty))} />
            </div>
            <motion.div
              className={styles.addToCart}
              whileHover={{
                background: 'black',
                color: 'white'
              }}
            >
              add to cart
            </motion.div>
          </div>
          <div className={classNames(styles.guideContainer, roboto.className)}>
            <div>
              <MdLocalLaundryService />
              <motion.span
                onClick={() => {
                  setSelectedCare(CARE_GUIDE.CARE_GUIDE)
                  setOpenCareGuide(true)
                }}
                whileHover={{ scale: 1.2 }}
              >
                CARE GUIDE
              </motion.span>
            </div>
            <div>
              <BsBox />
              <motion.span
                onClick={() => {
                  setSelectedCare(CARE_GUIDE.SHIPPING)
                  setOpenCareGuide(true)
                }}
                whileHover={{ scale: 1.2 }}
              >
                SHIPPING
              </motion.span>
            </div>
            <div>
              <IoIosReturnLeft />
              <motion.span
                onClick={() => {
                  setSelectedCare(CARE_GUIDE.RETURNS)
                  setOpenCareGuide(true)
                }}
                whileHover={{ scale: 1.2 }}
              >
                RETURNS
              </motion.span>
            </div>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {openCareGuide && <CareGuide setOpenCareGuide={() => setOpenCareGuide(false)} activeTab={selectedCare} />}
      </AnimatePresence>
    </div>
  )
}

export default memo(Product)
