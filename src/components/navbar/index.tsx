'use client'

import { useAppSelector } from '@/redux/store'
import { useWindowScroll, useWindowSize } from '@uidotdev/usehooks'
import classNames from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import { usePathname, useRouter } from 'next/navigation'
import { FC, useEffect, useState } from 'react'
import { CiShoppingCart } from 'react-icons/ci'
import { FaChevronDown } from 'react-icons/fa'
import { FiUser } from 'react-icons/fi'
import { IoClose, IoMenu, IoSearchOutline } from 'react-icons/io5'

import { useWithDispatch } from '@/hooks/useWithDispatch'

import { poppins, SF_PRO_DISPLAY } from 'public/fonts'
import { DynamicCart, DynamicSearch } from '../dynamic-import'
import Marquee from '../marquee'
import MobileMenu from './components/mobile-menu'
import styles from './style.module.scss'

const Navbar: FC = () => {
  const { push, refresh } = useRouter()
  const { dispatchWebData } = useWithDispatch()
  const { website } = useAppSelector(state => state.appData)
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
              {open && (
                <MobileMenu
                  setOpen={() => setOpen(false)}
                  setShowLogin={() => {
                    setOpen(false)
                  }}
                />
              )}
            </AnimatePresence>
          </div>
        )}
        <div className={classNames(styles.navTitle, poppins.className)} onClick={() => handlePush('/')}>
          {website?.website_name}
        </div>
        <div className={classNames(styles.rightBtnWrapper, SF_PRO_DISPLAY.className)}>
          <div className={styles.loginBtn}>
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
            <FiUser size={20} />
          </div>
          <IoSearchOutline
            className="cursor-pointer"
            size={20}
            onClick={() => {
              setOpen(false)
              setShowCart(false)
              setSearch(true)
            }}
          />
          <CiShoppingCart
            className="cursor-pointer"
            size={20}
            onClick={() => {
              setOpen(false)
              setShowCart(true)
              setSearch(false)
            }}
          />
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
