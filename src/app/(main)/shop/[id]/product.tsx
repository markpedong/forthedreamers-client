'use client'

import { FC, memo, useMemo, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { TProductDetails, TVariationItem } from '@/api/types'
import classNames from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import { SF_PRO_DISPLAY } from 'public/fonts'
import { BsBox } from 'react-icons/bs'
import { FaMinus, FaPlus } from 'react-icons/fa6'
import { IoIosReturnLeft } from 'react-icons/io'
import { MdLocalLaundryService } from 'react-icons/md'

import { useWithDispatch } from '@/hooks/useWithDispatch'
import { DynamicCareGuide, DynamicListAnswers } from '@/components/dynamic-import'
import Header from '@/components/header'
import { CARE_GUIDE } from '@/app/(main)/constants/enums'

import styles from './styles.module.scss'

const getUniqueVariations = (variations, type) => {
  const uniqueValues = new Set()
  return variations?.filter(item => {
    const value = type === 'size' ? item.size : item.color
    if (uniqueValues.has(value)) return false
    uniqueValues.add(value)
    return true
  })
}

const Variations = ({ variations, selectedId, setSelectedId, type, size, color }) => {
  return (
    <div className={styles.variations}>
      {variations?.map(item => {
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
            className={classNames(styles.variationItem, `${isDisabled && styles.disabled}`, {
              [styles.selected]: selectedId === item.id,
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
  const { addItemToCart } = useWithDispatch()

  const [size, setSize] = useState('')
  const [color, setColor] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [openCareGuide, setOpenCareGuide] = useState(false)
  const [selectedCare, setSelectedCare] = useState<CARE_GUIDE>(CARE_GUIDE.CARE_GUIDE)
  const uniqueSizes = useMemo(() => getUniqueVariations(variations, 'size'), [variations])
  const uniqueColors = useMemo(() => getUniqueVariations(variations, 'color'), [variations])

  const selectedSize = variations?.find(i => i.id === size)?.size
  const selectedColor = variations?.find(i => i.id === color)?.color
  const selectedVariation = variations?.find(item => item.size === selectedSize && item.color === selectedColor)

  return (
    <div className={styles.mainWrapper}>
      <Header arr={['HOME', 'SHOP', 'PRODUCTS']} />
      <div className={styles.productWrapper}>
        <div className={styles.productImgContainer}>
          <Image src={product?.images?.[0]} alt="product" width={500} height={500} draggable={false} />
        </div>
        <div className={classNames(styles.descriptionContainer, SF_PRO_DISPLAY.className)}>
          <h1>{product?.name}</h1>
          <span className={styles.price}>{selectedVariation?.id && <>₱{selectedVariation?.price}.00</>}</span>
          <p className={styles.shipping}>
            <span onClick={() => push('/support/shipping')}>Shipping</span> calculated at checkout.
          </p>
          <span className={styles.description}>{product?.description}</span>
          <div className={styles.features}>
            <DynamicListAnswers answers={product?.features} />
          </div>
          {variations?.length && (
            <>
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
            </>
          )}
          {variations?.length && (
            <>
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
            </>
          )}
          <div className={styles.quantityContainer}>
            <div className={styles.addMinusContainer}>
              <FaMinus onClick={() => setQuantity(qty => (qty > 1 ? qty - 1 : qty))} />
              {quantity}
              <FaPlus onClick={() => setQuantity(qty => (qty < 10 ? (qty += 1) : qty))} />
            </div>
            <motion.div
              className={styles.addToCart}
              whileHover={{
                background: 'black',
                color: 'white',
              }}
              onClick={() => {
                addItemToCart({
                  product_id: product?.id,
                  quantity,
                  ...(selectedVariation ? { variation_id: selectedVariation?.id } : {}),
                })
              }}
            >
              add to cart
            </motion.div>
          </div>
          <div className={classNames(styles.guideContainer, SF_PRO_DISPLAY.className)}>
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
        {openCareGuide && <DynamicCareGuide setOpenCareGuide={() => setOpenCareGuide(false)} activeTab={selectedCare} />}
      </AnimatePresence>
    </div>
  )
}

export default memo(Product)
