'use client'

import { FC, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { TCheckoutLeft } from '@/api/types'
import { setBeforeCheckoutPage } from '@/redux/features/appData'
import { useAppDispatch } from '@/redux/store'
import classNames from 'classnames'
import { darkerGrotesque } from 'public/fonts'
import { MdArrowBack } from 'react-icons/md'

import styles from '../styles.module.scss'
import Left from './left'
import Right from './right'

const Checkout: FC<TCheckoutLeft> = ({ address, carts }) => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const totalPrice = carts?.reduce((acc, curr) => {
    acc += curr?.price * curr?.quantity
    return acc
  }, 0)

  useEffect(() => {
    return () => {
      dispatch(setBeforeCheckoutPage('/checkout'))
    }
  }, [])

  return (
    <div className={classNames(styles.checkoutWrapper, darkerGrotesque.className)}>
      <span className={classNames(styles.back, 'btn')}>
        <MdArrowBack
          onClick={() => {
            router.back()

            setTimeout(() => {
              dispatch(setBeforeCheckoutPage('/checkout'))
            }, 300)
          }}
        />
      </span>
      <div className={styles.titleContainer}>
        <h1>CHECKOUT</h1>
        <span>
          {`(${carts?.length} items)`} ₱{totalPrice}
        </span>
      </div>
      <div className={styles.detailsContainer}>
        <Left address={address} carts={carts} />
        <Right carts={carts} />
      </div>
    </div>
  )
}

export default Checkout
