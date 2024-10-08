import { FC, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useLockBodyScroll } from '@uidotdev/usehooks'
import classNames from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import { SF_PRO_DISPLAY } from 'public/fonts'
import { FaArrowRight } from 'react-icons/fa'
import { FaArrowLeft } from 'react-icons/fa6'
import { FiUser } from 'react-icons/fi'

import { isLoggedIn } from '@/lib/helper'

import styles from './styles.module.scss'

const MobileMenu: FC<{ setOpen: () => void; setShowLogin: () => void }> = ({ setOpen, setShowLogin }) => {
  const { push } = useRouter()
  const pathname = usePathname()
  const [showSupport, setShowSupport] = useState(false)

  const handlePush = (path: string) => {
    setOpen()
    setShowSupport(false)
    push(path)
  }

  useLockBodyScroll()

  return (
    <motion.div
      className={classNames(styles.drawerContainer, SF_PRO_DISPLAY.className, {
        [styles.notHome]: pathname !== '/',
      })}
      initial={{ opacity: 0, top: '150%%' }}
      exit={{ opacity: 0, top: '150%%' }}
      animate={{ opacity: 1, top: pathname === '/' ? '3.75rem' : '5.6rem', animation: 'ease-out', transition: { duration: 0.5 } }}
    >
      <div className={styles.menuContainer}>
        <span onClick={() => handlePush('/')}>HOME</span>
        <span onClick={() => handlePush('/shop')}>SHOP</span>
        <span onClick={() => handlePush('/collection')}>COLLECTIONS</span>
        <motion.div className={styles.supportContainer}>
          <span>SUPPORT</span>
          <FaArrowRight
            className="cursor-pointer"
            onClick={() => {
              setShowSupport(true)
            }}
            color="black"
          />
          <AnimatePresence>
            {showSupport && (
              <motion.div
                className={styles.supportMenu}
                initial={{ left: '100%' }}
                exit={{ left: '100%' }}
                animate={{ left: 0, animation: 'ease-out', transition: { duration: 0.3 } }}
              >
                <div className={styles.backContainer}>
                  <FaArrowLeft className="cursor-pointer" onClick={() => setShowSupport(false)} />
                  <p>Support</p>
                </div>
                <span onClick={() => handlePush('/support/orders-payment')}>ORDERS & PAYMENT</span>
                <span onClick={() => handlePush('/support/shipping')}>SHIPPING</span>
                <span onClick={() => handlePush('/support/returns')}>RETURNS</span>
                <span onClick={() => handlePush('/support/gift-card-manual')}>GIFT CARD MANUAL</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
      <div className={styles.loginBtn}>
        <FiUser size={25} color="black" />
        <motion.span whileTap={{ scale: 0.95 }} onClick={setShowLogin}>
          {isLoggedIn() ? 'Logout' : 'Login'}
        </motion.span>
      </div>
    </motion.div>
  )
}

export default MobileMenu
