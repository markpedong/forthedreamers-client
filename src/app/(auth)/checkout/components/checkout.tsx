'use client'

import { useRouter } from 'next/navigation'
import { TAddressItem } from '@/api/types'
import { setBeforeCheckoutPage } from '@/redux/features/appData'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import classNames from 'classnames'
import { motion } from 'framer-motion'
import { darkerGrotesque } from 'public/fonts'
import { MdArrowBack } from 'react-icons/md'

import styles from '../styles.module.scss'
import Left from './left'
import Right from './right'

const Checkout = ({ address }: { address: TAddressItem[] }) => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const carts = useAppSelector(state => state.userData.cart)
  const beforeCheckoutPage = useAppSelector(state => state.appData.beforeCheckoutPage)
  const totalPrice = carts?.reduce((acc, curr) => {
    acc += curr?.price * curr?.quantity
    return acc
  }, 0)

  return (
    <div className={classNames(styles.checkoutWrapper, darkerGrotesque.className)}>
      <motion.span className={styles.back} whileTap={{ scale: 0.9 }}>
        <MdArrowBack
          onClick={() => {
            router.push(beforeCheckoutPage)

            setTimeout(() => {
              dispatch(setBeforeCheckoutPage(''))
            }, 300)
          }}
        />
      </motion.span>
      <div className={styles.titleContainer}>
        <h1>CHECKOUT</h1>
        <span>
          {`(${carts?.length} items)`} ₱{totalPrice}
        </span>
      </div>
      <div className={styles.detailsContainer}>
        <Left address={address} />
        <Right />
      </div>
    </div>
  )
}

export default Checkout
