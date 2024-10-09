'use client'

import { FC, useState } from 'react'
import { useRouter } from 'next/navigation'
import { TAddressItem } from '@/api/types'
import { useAppSelector } from '@/redux/store'
import classNames from 'classnames'
import { motion } from 'framer-motion'
import { darkerGrotesque } from 'public/fonts'
import { GrLocation } from 'react-icons/gr'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'

import styles from '../styles.module.scss'
import Right from './right'

const AddressContainer: FC<{ address: TAddressItem }> = ({ address }) => {
  return (
    <div className={classNames(styles.addressContainer, styles.isModal)}>
      <div>
        <span>
          {address?.first_name} {address?.last_name} / {address?.phone}
        </span>
      </div>
      <div>FREE</div>
      <div>{address?.address}</div>
    </div>
  )
}

const Checkout = ({ address }: { address: TAddressItem[] }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const carts = useAppSelector(state => state.userData.cart)
  const defaultAddress = address?.find(address => address?.is_default === 1)
  const router = useRouter()
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
        <div className={styles.left}>
          {!!!address?.length ? (
            <Button onClick={() => router.push('/account')}>ADD ADDRESS</Button>
          ) : (
            <div className={styles.addressContainer}>
              <div>
                <span>
                  {defaultAddress?.first_name} {defaultAddress?.last_name} / {defaultAddress?.phone}
                </span>
                <Dialog open={isModalOpen}>
                  <DialogTrigger asChild>
                    <motion.span whileTap={{ scale: 0.9 }} onClick={() => setIsModalOpen(true)}>
                      <GrLocation className="cursor-pointer" />
                    </motion.span>
                  </DialogTrigger>
                  <DialogContent className="pt-[3rem] sm:max-w-[550px]" onClose={() => setIsModalOpen(false)} title="Change Address">
                    {address?.map(address => <AddressContainer key={address?.id} address={address} />)}
                  </DialogContent>
                </Dialog>
              </div>
              <div>FREE</div>
              <div>{defaultAddress?.address}</div>
            </div>
          )}
          <div className={styles.payment}>PAYMENT</div>
        </div>
        <Right />
      </div>
    </div>
  )
}

export default Checkout
