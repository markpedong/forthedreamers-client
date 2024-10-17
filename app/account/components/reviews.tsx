'use client'

import { TCartItem } from '@/api/types'
import { FC, useState } from 'react'
import styles from '../styles.module.scss'
import Image from 'next/image'
import dayjs from 'dayjs'
import classNames from 'classnames'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Rate } from 'antd'
import { Textarea } from '@/components/ui/textarea'
import { addReview } from '@/api'
import { toast } from 'sonner'

const Reviews: FC<{ reviews: TCartItem[] }> = ({ reviews }) => {
	const [open, setOpen] = useState(false)
	const [rating, setRating] = useState(0)
	const [description, setDescription] = useState('')

	const handleConfirm = async (review: TCartItem) => {
		try {
			const res = await addReview({
				rating,
				description,
				product_id: review?.product_id,
			})

			if (res?.status === 200) {
				toast.success(res?.message)
				setRating(0)
				setDescription('')
			}
		} finally {
			setTimeout(() => {
				setOpen(false)
			}, 500)
		}
	}
	return (
		<div className={styles.reviewWrapper}>
			{reviews?.map(review => (
				<>
					<div key={review.id} className={styles.review}>
						<div className={styles.review__container}>
							<Image src={review?.images as unknown as string} alt="" width={100} height={100} />
							<div className={styles.review__details}>
								<h1>{review?.name}</h1>
								<div className={styles.review__variation}>
									<span>
										Variation: {review?.size} {review?.color}
									</span>
									<span>Quantity: {review?.quantity}</span>
									<span>Date Ordered: {dayjs.unix(review?.created_at).format('MM.DD.YYYY')}</span>
								</div>
							</div>
						</div>
						<div className={classNames(styles.review__add, 'btn')} onClick={() => setOpen(true)}>
							Write review
						</div>
					</div>
					<Dialog open={open}>
						<DialogContent
							className="sm:max-w-[550px] p-3 gap-1"
							onClose={() => {
								setOpen(false)
							}}
						>
							<DialogHeader>
								<DialogTitle className="mb-4">Write Review</DialogTitle>
								<div className={styles.starContainer}>
									<span>Give Rating: </span>
									<Rate style={{ fontSize: '0.9rem' }} onChange={val => setRating(val)} />
								</div>
								<div className="fcol text-[0.8rem]">
									<span>Comment:</span>
									<Textarea onChange={e => setDescription(e.target.value)} />
								</div>
							</DialogHeader>
							<DialogFooter>
								<Button className="px-2 py-1" size="sm" type="button" onClick={() => handleConfirm(review)}>
									Submit
								</Button>
							</DialogFooter>
						</DialogContent>
					</Dialog>
				</>
			))}
		</div>
	)
}

export default Reviews
