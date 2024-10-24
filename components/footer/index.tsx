'use client'

import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useMediaQuery } from '@uidotdev/usehooks'
import { AnimatePresence, motion } from 'framer-motion'
import { FaTiktok } from 'react-icons/fa'
import { FaAngleDown, FaMinus, FaPlus } from 'react-icons/fa6'
import { IoLogoFacebook, IoLogoInstagram, IoLogoPinterest } from 'react-icons/io'

import styles from './styles.module.scss'
import classNames from 'classnames'
import { NO_NAVBAR_PAGES } from '@/constants'

const Footer = () => {
	const { push } = useRouter()
	const pathname = usePathname()
	const [open, setOpen] = useState(false)
	const [showLanguage, setShowLanguage] = useState(false)
	const [showCurrency, setShowCurrency] = useState(false)
	const small = useMediaQuery('only screen and (max-width : 576px)')
	const medium = useMediaQuery('only screen and (min-width : 993px)')

	if (!NO_NAVBAR_PAGES.includes(pathname)) {
		return (
			<div className={styles.footerContainer}>
				<div className={styles.footerWrapper}>
					<div>
						<h2>
							SUPPORT
							{!medium && open ? (
								<FaMinus className={styles.minusIcon} onClick={() => setOpen(false)} />
							) : (
								<FaPlus className={styles.plusIcon} onClick={() => setOpen(true)} />
							)}
						</h2>
						<AnimatePresence>
							{(open || medium) && (
								<motion.div
									className={styles.menuContainer}
									initial={{ opacity: 0, height: 0, y: -10 }}
									animate={{ opacity: 1, height: 'auto', y: 0 }}
									exit={{ opacity: 0, height: 0, y: -10 }}
									transition={{ duration: 0.3 }}
								>
									<span onClick={() => push('/search')}>Search</span>
									<span onClick={() => push('/support/orders-payment')}>Orders & Payment</span>
									<span onClick={() => push('/support/shipping')}>Shipping</span>
									<span onClick={() => push('/support/returns')}>Returns</span>
									<span onClick={() => push('/support/terms-of-service')}>Terms of Service</span>
								</motion.div>
							)}
						</AnimatePresence>
					</div>
					<div>
						<h2>MADE IN THE PHILIPPINES</h2>
						<div className={styles.socmedContainer}>
							<IoLogoFacebook />
							<IoLogoInstagram />
							<IoLogoPinterest />
							<FaTiktok />
						</div>
					</div>
				</div>
				<div className="container">
					<div className={styles.dropdownContainer}>
						<motion.div
							className={classNames(styles.dropdown, 'pointer-events-none text-gray-300')}
							onClick={() => {
								setShowCurrency(false)
								setShowLanguage(!showLanguage)
							}}
						>
							<span>English</span>
							<FaAngleDown />
							<AnimatePresence>
								{showLanguage && (
									<motion.div
										className={styles.options}
										initial={small ? { opacity: 0, top: '-9rem' } : { opacity: 0, height: 0, y: -10 }}
										exit={small ? { opacity: 0, top: '-9rem' } : { opacity: 0, height: 0, y: -10 }}
										animate={
											small
												? { opacity: 1, top: '-8.3rem', animation: 'ease-out', transition: { duration: 0.3 } }
												: { opacity: 1, height: 'auto', y: 0, transition: { duration: 0.3 } }
										}
									>
										<span>Japanese</span>
										<span>Japanese</span>
										<span>Japanese</span>
										<span>Japanese</span>
										<span>Japanese</span>
									</motion.div>
								)}
							</AnimatePresence>
						</motion.div>
						<motion.div
							className={classNames(styles.dropdown, 'pointer-events-none text-gray-300')}
							onClick={() => {
								setShowLanguage(false)
								setShowCurrency(!showCurrency)
							}}
						>
							<span>Philippines (PHP ₱)</span>
							<FaAngleDown />
							<AnimatePresence>
								{showCurrency && (
									<motion.div
										className={styles.options}
										initial={small ? { opacity: 0, top: '-9rem' } : { opacity: 0, height: 0, y: -10 }}
										exit={small ? { opacity: 0, top: '-9rem' } : { opacity: 0, height: 0, y: -10 }}
										animate={
											small
												? { opacity: 1, top: '-8.3rem', animation: 'ease-out', transition: { duration: 0.3 } }
												: { opacity: 1, height: 'auto', y: 0, transition: { duration: 0.3 } }
										}
									>
										<span>1 Philippines (PHP ₱)</span>
										<span>2 Philippines (PHP ₱)</span>
										<span>3 Philippines (PHP ₱)</span>
										<span>4 Philippines (PHP ₱)</span>
										<span>5 Philippines (PHP ₱)</span>
									</motion.div>
								)}
							</AnimatePresence>
						</motion.div>
					</div>
					<span className={styles.tradeMark}>© 2024 FOR THE DREAMERS, All rights reserved. Powered by Shopify</span>
				</div>
			</div>
		)
	} else null
}

export default Footer
