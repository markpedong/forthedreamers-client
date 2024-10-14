'use client'

import { FC, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { TCartItem } from '@/api/types'
import { setBeforeCheckoutPage, setOrderNote } from '@/redux/features/appData'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { useLockBodyScroll } from '@uidotdev/usehooks'
import classNames from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import { debounce } from 'lodash'
import { SF_PRO_DISPLAY } from 'public/fonts'
import { FaPlus } from 'react-icons/fa6'
import { IoMdClose } from 'react-icons/io'
import { toast } from 'sonner'

import Drawer from '@/components/drawer'

import { CartProduct } from '../../products'
import styles from './styles.module.scss'

const Cart: FC<{ setShowCart: () => void; carts: TCartItem[] }> = ({ setShowCart, carts }) => {
  const pathname = usePathname()
  const dispatch = useAppDispatch()
  const { push } = useRouter()

  const orderNote = useAppSelector(state => state.appData.orderNote)
  const [isUserAgree, setIsUserAgree] = useState(false)
  const [showNote, setShowNote] = useState(false)
  const [note, setNote] = useState(orderNote || '')

  const totalPrice = carts?.reduce((acc, curr) => {
    acc += curr?.price * curr?.quantity
    return acc
  }, 0)

  const debounceCheckout = debounce(() => {
    if (isUserAgree) {
      dispatch(setBeforeCheckoutPage(pathname))
      push('/checkout')
    } else {
      toast('Please agree to the terms and conditions')
    }
  }, 500)

  useLockBodyScroll()
  return (
    <Drawer>
      <div className={classNames('relative h-full fcol', SF_PRO_DISPLAY.className)}>
        <div className={styles.header}>
          <span>Cart</span>
          <IoMdClose onClick={setShowCart} color="black" />
        </div>
        <div className={styles.products}>
          {!!carts?.length && carts?.map(product => <CartProduct cart={product} key={product?.id} setSearch={setShowCart} />)}
        </div>
        {!!carts?.length && (
          <div className={styles.addNoteContainer}>
            <span>Add order note</span>
            <FaPlus onClick={() => setShowNote(true)} />
          </div>
        )}
        {!!carts?.length && (
          <div className={styles.footer}>
            <span>Taxes and shipping calculated at checkout</span>
            <div className={styles.footer__checkbox}>
              <input type="checkbox" id="agree_checkbox" onChange={() => setIsUserAgree(!isUserAgree)} /> I agree with the{' '}
              <span className="underline underline-offset-4" onClick={() => push('/support/terms-of-service')}>
                terms and conditions
              </span>
              <label htmlFor="agree_checkbox">
                <span className="fa fa-check" />
              </label>
            </div>
            <motion.div whileTap={{ scale: 0.98 }} className={styles.btn} onClick={debounceCheckout}>
              checkout • ₱{totalPrice}
            </motion.div>
            <div
              className="uppercase tracking-wider underline underline-offset-8"
              onClick={() => {
                push('/cart')
                setShowCart()
              }}
            >
              view cart
            </div>
          </div>
        )}
        <AnimatePresence>
          {showNote && (
            <>
              <motion.div
                className={styles.noteBG}
                onClick={() => setShowNote(false)}
                initial={{ opacity: 0 }}
                exit={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.25 } }}
              />
              <motion.div
                className={styles.note}
                initial={{ y: 150, opacity: 0 }}
                exit={{ y: 150, opacity: 0 }}
                animate={{ y: 0, opacity: 1, transition: { duration: 0.25 } }}
              >
                <span>add order note</span>
                <textarea value={note} onChange={e => setNote(e.target.value)} />
                <div
                  className={styles.btn}
                  onClick={() => {
                    setShowNote(false)
                    dispatch(setOrderNote(note))
                  }}
                >
                  save
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </Drawer>
  )
}

export default Cart
