import { SHIPPING_ANSWERS, SHIPPING_MODAL } from '@/app/(main)/constants'
import { DynamicListAnswers } from '@/components/dynamic-import'
import { Question } from '@/components/page-components'
import { useLockBodyScroll } from '@uidotdev/usehooks'
import classNames from 'classnames'
import { roboto } from 'public/fonts'
import { FC } from 'react'
import { IoCloseCircle } from 'react-icons/io5'
import styles from './styles.module.scss'

const ShippingModal: FC<{ closeModal: () => void }> = ({ closeModal }) => {
	useLockBodyScroll()

	return (
		<>
			<div className={styles.BG} />
			<div className={styles.mainWrapper}>
				<IoCloseCircle
					onClick={closeModal}
					color="black"
					className="absolute top-4 right-4 z-[9999]"
					size={30}
				/>
				<Question question="Shipping Policy" className={classNames(roboto.className, styles.header)} />
				<div>
					<Question normal question="WHAT SHIPPING TYPES DO YOU HAVE?" />
					<DynamicListAnswers
						className="!mt-0"
						answers={SHIPPING_ANSWERS?.map(q => `For ${q}`).concat(SHIPPING_MODAL)}
					/>
					<Question normal question="HOW LONG WILL IT TAKE TO RECEIVE MY ORDER?" />
					<DynamicListAnswers
						className="!mt-0"
						answers={[
							`Metro Manila: Within 3-5 business days`,
							`Provincial: Please check J&T's shipping <a class="text-blue-600" href="https://www.jtexpress.ph/trajectoryQuery?flag=3" target="_blank">timeframe chart</a>.`
						]}
					/>
					<Question normal question="DO YOU SHIP INTERNATIONALLY?" />
					<DynamicListAnswers
						className="!mt-0"
						answers={[
							`Yes we do! You may place an order thru this form and send us a message on Instagram at @forthedreamers if you have questions.`
						]}
					/>
				</div>
			</div>
		</>
	)
}

export default ShippingModal
