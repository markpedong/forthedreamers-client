import { TTestimonials } from '@/api/types'
import classNames from 'classnames'
import { FC } from 'react'

import { SF_PRO_DISPLAY } from 'public/fonts'
import styles from './styles.module.scss'
import Image from 'next/image'
import dayjs from 'dayjs'

const Testimonial: FC<{ className?: string; data: TTestimonials }> = ({ data, className }) => {
	return (
		<div className={classNames(styles.testimonial, SF_PRO_DISPLAY.className, className)} key={data?.id}>
			<div className={styles.testimonial__header}>
				<Image src={data?.image ?? ''} alt="" width={100} height={100} placeholder="empty" />
				<div>
					<span>{data?.title}</span>
					<span>@{data?.username}</span>
				</div>
			</div>
			<div className={styles.testimonial__body}>{data?.title}</div>
			<div className={styles.testimonial__footer}>
				<span></span>
				<span>{dayjs.unix(data?.created_at).format('MM.DD.YYYY')}</span>
			</div>
		</div>
	)
}

export default Testimonial
