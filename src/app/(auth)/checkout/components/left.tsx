import { FC, useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { CheckoutAddressProps, TCheckoutLeft, TPaymentMethods } from '@/api/types'
import { setPaymentMethod } from '@/redux/features/userData'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import classNames from 'classnames'
import { motion } from 'framer-motion'
import { debounce } from 'lodash'
import { BsCash } from 'react-icons/bs'
import { FaCcVisa } from 'react-icons/fa'
import { GrLocation } from 'react-icons/gr'
import { RiMastercardFill } from 'react-icons/ri'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { PAYMENT_METHODS } from '@/app/(main)/constants/enums'

import styles from '../styles.module.scss'

const AddressContainer: FC<CheckoutAddressProps> = ({ address, setCurrAddress, setIsModalOpen, defaultAddress }) => {
  return (
    <div
      className={classNames(styles.addressContainer, styles.isModal, { [styles.selected]: address?.id === defaultAddress?.id })}
      onClick={() => {
        setCurrAddress(address)
        setIsModalOpen(false)
      }}
    >
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

const PaymentMethods: FC<TPaymentMethods> = ({ logos, title, value, disabled }) => {
  const paymentMethod = useAppSelector(s => s.userData.paymentMethod)
  const dispatch = useAppDispatch()
  return (
    <div
      className={classNames(styles.methodContainer, { [styles.selected]: paymentMethod === value, [styles.disabled]: disabled })}
      onClick={() => !disabled && dispatch(setPaymentMethod(value))}
    >
      <div>{title}</div>
      <div>
        {logos?.map((item, idx) =>
          typeof item === 'string' ? (
            <div key={`${item}${idx}`}>
              <Image src={item} alt={item} />
            </div>
          ) : (
            <div key={`${item}${idx}`}>{item}</div>
          ),
        )}
      </div>
    </div>
  )
}

const Left: FC<TCheckoutLeft> = ({ address }) => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [defaultAddress, setDefaultAddress] = useState(address?.find(address => address?.is_default === 1) ?? address?.[0])
  const paymentMethod = useAppSelector(s => s.userData.paymentMethod)

  const checkoutHandler = debounce(async () => {
    paymentMethod === '' && toast('Please select payment method')
  }, 500)

  useEffect(() => {
    dispatch(setPaymentMethod(''))
  }, [])

  return (
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
                {address?.map(address => (
                  <AddressContainer
                    key={address?.id}
                    setIsModalOpen={setIsModalOpen}
                    address={address}
                    defaultAddress={defaultAddress}
                    setCurrAddress={setDefaultAddress}
                  />
                ))}
              </DialogContent>
            </Dialog>
          </div>
          <div>FREE</div>
          <div>{defaultAddress?.address}</div>
        </div>
      )}
      <div className={styles.payment}>PAYMENT</div>
      <div className={styles.paymentMethods}>
        <PaymentMethods title="COD" logos={[<BsCash />]} value={PAYMENT_METHODS.CASH_ON_DELIVERY} key={1} />
        <PaymentMethods
          title="Credit/ Debit Card"
          logos={[<FaCcVisa />, <RiMastercardFill />]}
          value={PAYMENT_METHODS.CREDIT_CARD}
          disabled
          key={2}
        />
      </div>
      <motion.div whileTap={{ scale: 0.99 }} className={styles.placeOrderBtn} onClick={checkoutHandler}>
        PLACE ORDER
      </motion.div>
    </div>
  )
}

export default Left
