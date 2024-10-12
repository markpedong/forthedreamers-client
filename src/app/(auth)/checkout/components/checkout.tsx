'use client'

import { TAddressItem } from '@/api/types'
import { useAppSelector } from '@/redux/store'
import classNames from 'classnames'
import { darkerGrotesque } from 'public/fonts'

import styles from '../styles.module.scss'
import Left from './left'
import Right from './right'

const Checkout = ({ address }: { address: TAddressItem[] }) => {
  const carts = useAppSelector(state => state.userData.cart)
  const totalPrice = carts?.reduce((acc, curr) => {
    acc += curr?.price * curr?.quantity
    return acc
  }, 0)

  return (
    <div className={classNames(styles.checkoutWrapper, darkerGrotesque.className)}>
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
