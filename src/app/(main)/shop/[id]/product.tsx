'use client'

import { CARE_GUIDE } from '@/app/(main)/constants/enums'
import classNames from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import { Roboto_Condensed } from 'next/font/google'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { FC, memo, useState } from 'react'
import { BsBox } from 'react-icons/bs'
import { FaPlus, FaMinus } from 'react-icons/fa6'
import { IoIosReturnLeft } from 'react-icons/io'
import { MdLocalLaundryService } from 'react-icons/md'
import Header from '@/components/header'
import { ListAnswers } from '@/components/page-components'
import { TProductItem } from '../../../../../api/types'
import CareGuide from './components/care-guide'
import styles from './styles.module.scss'

const roboto = Roboto_Condensed({ weight: ['300', '800'], subsets: ['latin'] })

const Product: FC<{ product: TProductItem }> = ({ product }) => {
  const { push } = useRouter()
  const [selectedVariation, setSelectedVariation] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [openCareGuide, setOpenCareGuide] = useState(false)
  const [selectedCare, setSelectedCare] = useState<CARE_GUIDE>(CARE_GUIDE.CARE_GUIDE)

  console.log(product)
  return (
    <div className={styles.mainWrapper}>
      <Header arr={['HOME', 'SHOP', 'PRODUCTS']} />
      <div className={styles.productWrapper}>
        <div className={styles.productImgContainer}>
          <Image src={'/assets/images/dog.jpg'} alt='product' width={500} height={500} draggable={false} />
        </div>
        <div className={classNames(styles.descriptionContainer, roboto.className)}>
          <h1>{product?.name}</h1>
          <span className={styles.price}>₱1,490.00</span>
          <p className={styles.shipping}>
            <span onClick={() => push('/support/shipping')}>Shipping</span> calculated at checkout.
          </p>
          <span className={styles.description}>{product?.description}</span>
          <div className={styles.features}>
            <ListAnswers answers={['60% Cotton 40% Polyester', 'Regular Fit', 'Unisex', 'Silkscreen Print']} />
          </div>
          <div className={styles.sizeContainer}>
            <span>SIZE:</span>
            <span>{selectedVariation}</span>
          </div>
          <div className={styles.variants}>
            {['Small', 'Medium', 'Large']?.map(q => {
              return (
                <span
                  key={q}
                  style={{
                    border: selectedVariation === q ? '0.1rem solid black' : ''
                  }}
                  onClick={() => setSelectedVariation(q)}
                >
                  {q}
                </span>
              )
            })}
          </div>
          <div className={styles.quantityContainer}>
            <div className={styles.addMinusContainer}>
              <FaMinus onClick={() => setQuantity(quantity - 1)} />
              {quantity}
              <FaPlus onClick={() => setQuantity(quantity + 1)} />
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
