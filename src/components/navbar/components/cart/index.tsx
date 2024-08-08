import React, { FC, useState } from 'react'
import { Roboto_Condensed } from 'next/font/google'
import { useRouter } from 'next/navigation'
import { STALE_TIME } from '@/constants'
import { useQuery } from '@tanstack/react-query'
import { useLockBodyScroll } from '@uidotdev/usehooks'
import classNames from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import { FaPlus } from 'react-icons/fa6'
import { IoMdClose } from 'react-icons/io'

import Drawer from '@/components/drawer'

import SearchProduct from '../../products'
import styles from './styles.module.scss'

const roboto = Roboto_Condensed({ weight: ['300', '400', '800'], subsets: ['latin'] })

const Cart: FC<{ setShowCart: () => void }> = ({ setShowCart }) => {
  const [showNote, setShowNote] = useState(false)
  const { push } = useRouter()
  const { data: products } = useQuery({
    queryKey: ['cart'],
    staleTime: STALE_TIME,
    queryFn: async () => {
      //   const res = await getCart({ id: '' })

      return []
    },
  })

  useLockBodyScroll()
  return (
    <Drawer>
      <div className={classNames('relative h-full fcol', roboto.className)}>
        <div className={styles.header}>
          <span>Cart</span>
          <IoMdClose onClick={setShowCart} color="black" />
        </div>
        <div className={styles.products}>{products?.map(product => <SearchProduct isCart product={product} />)}</div>
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
