'use client'

import { FC, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAppSelector } from '@/redux/store'
import { useLockBodyScroll } from '@uidotdev/usehooks'
import classNames from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import { SF_PRO_DISPLAY } from 'public/fonts'
import { FaPlus } from 'react-icons/fa6'
import { IoMdClose } from 'react-icons/io'

import { useWithDispatch } from '@/hooks/useWithDispatch'
import Drawer from '@/components/drawer'

import SearchProduct from '../../products'
import styles from './styles.module.scss'

const Cart: FC<{ setShowCart: () => void }> = ({ setShowCart }) => {
  const { push } = useRouter()
  const { getNewCartData } = useWithDispatch()
  const [showNote, setShowNote] = useState(false)
  const carts = useAppSelector(state => state.userData.cart)

  useEffect(() => {
    getNewCartData()
  }, [])

  useLockBodyScroll()
  return (
    <Drawer>
      <div className={classNames('relative h-full fcol', SF_PRO_DISPLAY.className)}>
        <div className={styles.header}>
          <span>Cart</span>
          <IoMdClose onClick={setShowCart} color="black" />
        </div>
        <div className={styles.products}>
          {!!carts?.length &&
            carts?.map(product => <SearchProduct isCart product={product as any} key={product?.id} setSearch={setShowCart} />)}
        </div>
        <div className={styles.addNoteContainer}>
          <span>Add order note</span>
          <FaPlus onClick={() => setShowNote(true)} />
        </div>
        <div className={styles.footer}>
          <span>Taxes and shipping calculated at checkout</span>
          <div className={styles.footer__checkbox}>
            <input type="checkbox" id="agree_checkbox" /> I agree with the{' '}
            <span className="underline underline-offset-4" onClick={() => push('/support/terms-of-service')}>
              terms and conditions
            </span>
            <label htmlFor="agree_checkbox">
              <span className="fa fa-check" />
            </label>
          </div>
          <div className={styles.btn}>
            checkout •{' '}
            {
              // ₱1,590.00
            }
          </div>
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
                <textarea />
                <div className={styles.btn} onClick={() => setShowNote(false)}>
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
