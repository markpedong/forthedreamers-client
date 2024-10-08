'use client'

import { FC, useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useAppSelector } from '@/redux/store'
import { useWindowScroll, useWindowSize } from '@uidotdev/usehooks'
import classNames from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import { poppins, SF_PRO_DISPLAY } from 'public/fonts'
import { CiShoppingCart } from 'react-icons/ci'
import { FaChevronDown } from 'react-icons/fa'
import { FiUser } from 'react-icons/fi'
import { IoClose, IoMenu, IoSearchOutline } from 'react-icons/io5'

import { isLoggedIn } from '@/lib/helper'
import { useWithDispatch } from '@/hooks/useWithDispatch'

import { DynamicCart, DynamicSearch } from '../dynamic-import'
import Marquee from '../marquee'
import MobileMenu from './components/mobile-menu'
import styles from './style.module.scss'

const Navbar: FC = () => {
  const { push, refresh } = useRouter()
  const { dispatchWebData, logoutUser } = useWithDispatch()
  const { website } = useAppSelector(state => state.appData)
  const cart = useAppSelector(state => state.userData.cart)
  const pathname = usePathname()
  const [isHovering, setIsHovering] = useState(false)
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState(false)
  const [showCart, setShowCart] = useState(false)
  const { width } = useWindowSize()
  const [{ y }] = useWindowScroll()
  const [showDropdown, setShowDropdown] = useState(false)
  const isWhiteBG = isHovering || y! > 40

  const handlePush = (path: string) => {
    setOpen(false)
    setShowDropdown(false)
    push(path)
    refresh()
  }

  useEffect(() => {
    dispatchWebData()
  }, [])

  return (
    <>
      {pathname !== '/' && <Marquee text={website?.promo_text ?? ''} landing />}
      <motion.div
        className={styles.navbarWrapper}
        onHoverStart={() => setIsHovering(!search && true)}
        onHoverEnd={() => setIsHovering(false)}
        style={
          pathname === '/'
            ? { color: isWhiteBG ? 'black' : 'white' }
            : { borderBottom: '0.1rem solid rgba(0, 0, 0, 0.2)', top: y! > 15 ? 0 : 40 }
        }
      >
        <motion.div
          className={styles.background}
          initial={{ y: pathname === '/' ? '-100%' : 0 }}
          animate={pathname === '/' ? { y: isWhiteBG ? 0 : '-100%', transition: { duration: 0.15, ease: 'easeIn' } } : {}}
        />
        {width! > 992 && (
          <div className={classNames(styles.leftBtnWrapper, SF_PRO_DISPLAY.className)}>
            <span onClick={() => handlePush('/')}>HOME</span>
            <span onClick={() => handlePush('/shop')}>SHOP</span>
            <span onClick={() => handlePush('/collection')}>COLLECTIONS</span>
            <motion.div className={styles.supportContainer} onClick={() => handlePush('/support')}>
              <span
                onMouseEnter={() => {
                  setShowDropdown(true)
                }}
              >
                SUPPORT
              </span>
              <FaChevronDown />
            </motion.div>
          </div>
        )}
        {width! < 993 && (
          <div className={styles.mobileBtnWrapper}>
            {open && <IoClose onClick={() => setOpen(false)} size={30} />}
            {!open && (
              <IoMenu
                onClick={() => {
                  setOpen(true)
                }}
                size={30}
              />
            )}
            <AnimatePresence>
              {open && <MobileMenu setOpen={() => setOpen(false)} setShowLogin={() => (isLoggedIn() ? logoutUser() : push('/login'))} />}
            </AnimatePresence>
          </div>
        )}
        <div className={classNames(styles.navTitle, poppins.className)} onClick={() => handlePush('/')}>
          {website?.website_name}
        </div>
        <div className={classNames(styles.rightBtnWrapper, SF_PRO_DISPLAY.className)}>
          <div className={styles.loginBtn}>
            {!isLoggedIn() ? (
              <span
                onClick={() => {
                  setOpen(false)
                  setShowCart(false)
                  setSearch(false)
                  push('/login')
                }}
              >
                LOGIN
              </span>
            ) : (
              <span onClick={logoutUser}>LOGOUT</span>
            )}
            <motion.span whileTap={{ scale: 0.9 }} className="before:hidden">
              <FiUser className="cursor-pointer" size={20} onClick={() => (isLoggedIn() ? push('/account') : push('/login'))} />
            </motion.span>
          </div>
          <motion.span whileTap={{ scale: 0.9 }} className="before:hidden">
            <IoSearchOutline
              className="cursor-pointer"
              size={20}
              onClick={() => {
                setOpen(false)
                setShowCart(false)
                setSearch(true)
              }}
            />
          </motion.span>
          {isLoggedIn() && (
            <motion.div
              whileTap={{ scale: 0.9 }}
              className={styles.cartIcon}
              onClick={() => {
                setOpen(false)
                setShowCart(true)
                setSearch(false)
              }}
            >
              {!!cart?.length && <span>{cart?.length}</span>}
              <CiShoppingCart className="cursor-pointer" size={20} />
            </motion.div>
          )}
        </div>
        <AnimatePresence>{showCart && <DynamicCart setShowCart={() => setShowCart(false)} />}</AnimatePresence>
        <AnimatePresence>{search && <DynamicSearch setSearch={() => setSearch(false)} />}</AnimatePresence>
        <AnimatePresence>
          {width! > 1068 && showDropdown && (
            <motion.div
              className={styles.dropdownMenu}
              onMouseLeave={() => setShowDropdown(false)}
              initial={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              animate={{ opacity: 1, animation: 'ease-out', transition: { duration: 0.5 } }}
            >
              <span onClick={() => handlePush('/support/orders-payment')}>ORDERS & PAYMENT</span>
              <span onClick={() => handlePush('/support/shipping')}>SHIPPING</span>
              <span onClick={() => handlePush('/support/returns')}>RETURNS</span>
              <span onClick={() => handlePush('/support/gift-card-manual')}>GIFT CARD MANUAL</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  )
}

export default Navbar
