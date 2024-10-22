'use client'

import { useAppSelector } from '@/redux/store'
import { useQuery } from '@tanstack/react-query'
import { useWindowScroll, useWindowSize } from '@uidotdev/usehooks'
import classNames from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import { usePathname, useRouter } from 'next/navigation'
import { poppins, SF_PRO_DISPLAY } from 'public/fonts'
import { FC, useState } from 'react'
import { CiShoppingCart } from 'react-icons/ci'
import { FiUser } from 'react-icons/fi'
import { IoClose, IoMenu, IoSearchOutline } from 'react-icons/io5'

import { useWithDispatch } from '@/hooks/useWithDispatch'
import { isLoggedIn } from '@/lib/helper'

import { DynamicCart, DynamicSearch } from '../dynamic-import'
import Marquee from '../marquee'
import MobileMenu from './components/mobile-menu'
import styles from './style.module.scss'
import { NO_NAVBAR_PAGES } from '@/constants'

const Navbar: FC = () => {
	const { push, refresh } = useRouter()
	const { dispatchWebData, logoutUser } = useWithDispatch()
	const { website } = useAppSelector(state => state.appData)
	const carts = useAppSelector(state => state.userData.cart)
	const pathname = usePathname()
	const [isHovering, setIsHovering] = useState(false)
	const [open, setOpen] = useState(false)
	const [search, setSearch] = useState(false)
	const [showCart, setShowCart] = useState(false)
	const { width } = useWindowSize()
	const [{ y }] = useWindowScroll()
	const isWhiteBG = isHovering || y! > 40
	const {} = useQuery({
		queryKey: ['website'],
		staleTime: Infinity,
		queryFn: async () => {
			dispatchWebData()
			return 0
		}
	})

	const handlePush = (path: string) => {
		setOpen(false)
		push(path)
		refresh()
	}

	if (!NO_NAVBAR_PAGES.includes(pathname)) {
		return (
			<>
				{pathname !== '/' && <Marquee text={website?.promo_text ?? ''} landing />}
				<div
					className={classNames(styles.navbarWrapper, {
						['border-b border-b-[rgba(0,0,0,0.2)]']: pathname !== '/'
					})}
				>
					<motion.div
						className={classNames(styles.navbar)}
						onHoverStart={() => setIsHovering(!search && true)}
						onHoverEnd={() => setIsHovering(false)}
						style={pathname === '/' ? { color: isWhiteBG ? 'black' : 'white' } : {}}
					>
						<motion.div
							className={styles.background}
							initial={{ y: pathname === '/' ? '-100%' : 0 }}
							animate={
								pathname === '/' ? { y: isWhiteBG ? 0 : '-100%', transition: { duration: 0.15, ease: 'easeIn' } } : {}
							}
						/>
						{width! > 992 && (
							<div className={classNames(styles.leftBtnWrapper, SF_PRO_DISPLAY.className)}>
								<span onClick={() => handlePush('/')}>HOME</span>
								<span onClick={() => handlePush('/shop')}>SHOP</span>
								<span onClick={() => handlePush('/collection')}>COLLECTIONS</span>
								<span onClick={() => handlePush('/support')}>SUPPORT</span>
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
											setShowLogin={() => (isLoggedIn() ? logoutUser() : push('/login'))}
										/>
									)}
								</AnimatePresence>
							</div>
						)}
						<div className={classNames(styles.navTitle, poppins.className)} onClick={() => handlePush('/')}>
							{website?.website_name}
						</div>
						<div className={classNames(styles.rightBtnWrapper, SF_PRO_DISPLAY.className)}>
							{isLoggedIn() && width! > 992 && (
								<span className="btn before:hidden">
									<FiUser className="cursor-pointer" size={20} onClick={() => push('/account')} />
								</span>
							)}
							<span className="btn before:hidden">
								<IoSearchOutline
									className="cursor-pointer"
									size={20}
									onClick={() => {
										setOpen(false)
										setShowCart(false)
										setSearch(true)
									}}
								/>
							</span>
							{isLoggedIn() && pathname !== '/checkout' && (
								<div
									className={classNames(styles.cartIcon, 'btn')}
									onClick={() => {
										setOpen(false)
										setShowCart(true)
										setSearch(false)
									}}
								>
									{!!carts?.length && <span>{carts?.reduce((acc, curr) => acc + curr.quantity, 0)}</span>}
									<CiShoppingCart className="cursor-pointer" size={20} />
								</div>
							)}
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
							</div>
						</div>
						<AnimatePresence>
							{showCart && <DynamicCart carts={carts ?? []} setShowCart={() => setShowCart(false)} />}
						</AnimatePresence>
						<AnimatePresence>{search && <DynamicSearch setSearch={() => setSearch(false)} />}</AnimatePresence>
					</motion.div>
				</div>
			</>
		)
	} else null
}

export default Navbar
