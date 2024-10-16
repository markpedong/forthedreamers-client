'use client'

import { OrderItems, TOrderItem } from '@/api/types'
import { FC, useState } from 'react'
import styles from '../../styles.module.scss'
import Image from 'next/image'
import classNames from 'classnames'
import { MdArrowBack } from 'react-icons/md'
import { CiLocationOn } from 'react-icons/ci'
import { ORDER_METHODS, ORDER_STATUS } from '@/constants'
import dayjs from 'dayjs'

const OrderItem: FC<TOrderItem> = ({ order, setDetails, type }) => {
	const first = order.items?.[0]
	return (
		<div
			className={classNames(
				styles.orderContainer,
				`${type === 'details' && 'mb-0 [&:last-child]:rounded-t-none [&:first-child]:rounded-b-none [&:not(:first-child):not(:last-child)]:rounded-none'}`,
			)}
			key={order.id}
		>
			<div className={classNames(styles.status, `${type === 'details' && 'hidden'}`)}>
				<span data-status={order?.status}>{ORDER_STATUS[order?.status]}</span>
			</div>
			<div
				className={classNames(styles.item, `${type === 'page' && 'cursor-pointer'}`)}
				onClick={() => type === 'page' && setDetails?.(order.id)}
			>
				<Image src={first?.images} alt="pic" width={100} height={100} />
				<div className={styles.details}>
					<div className={styles.name}>{first?.name}</div>
					<div>
						<div>
							{first?.color} {first?.size}
						</div>
						<div>×{first?.quantity}</div>
					</div>
					<div>₱{first?.price}</div>
				</div>
			</div>
			<div className={classNames(styles.total, `${type === 'details' && 'hidden'}`)}>
				Total {order?.items.length} item: ₱{order?.total_price}
			</div>
			<div className={classNames(styles.btnContainer, `${type === 'details' && '!hidden'}`)}>
				{order?.status === 3 && <div className="btn">Return/ Refund</div>}
				<div className={classNames('btn', `${order?.status !== 4 && `grayscale pointer-events-none`}`)}>
					{order?.status === 4 ? 'View Details' : 'Order Received'}
				</div>
			</div>
		</div>
	)
}
const Orders: FC<{ orders: OrderItems[] }> = ({ orders }) => {
	const [details, setDetails] = useState('')
	const selectedOrder = orders.find(o => o.id === details)

	return (
		<div className={styles.ordersWrapper}>
			{details === '' &&
				orders?.map(order => <OrderItem key={order.id} order={order} setDetails={setDetails} type="page" />)}
			{details !== '' && (
				<>
					<MdArrowBack
						className="cursor-pointer"
						size={20}
						onClick={() => {
							setDetails('')
						}}
					/>
					<div className={styles.delivery}>
						<div className={styles.delivery__title}>Delivery information</div>
						<div className={styles.delivery__details}>
							<CiLocationOn size={15} />
							<div>
								<div className="flex gap-3">
									<span>
										{selectedOrder?.address.first_name} {selectedOrder?.address.last_name}
									</span>
									<span>{selectedOrder?.address.phone}</span>
								</div>
								<div>{selectedOrder?.address.address}</div>
							</div>
						</div>
					</div>
					<div className={styles.itemsContainer}>
						{selectedOrder?.items.map(item => (
							<div key={item.id}>
								<OrderItem order={selectedOrder} type="details" />
								<div className={styles.total_price}>Order Total: ₱{selectedOrder?.total_price}</div>
							</div>
						))}
					</div>
					<div className={styles.orderFooter}>
						<div className={styles.orderFooter__id}>
							<span>Order ID:</span>
							<span>{selectedOrder?.id}</span>
						</div>
						<div className={styles.orderFooter__payment}>
							<span>Paid By</span>
							<span>{ORDER_METHODS[selectedOrder?.payment_method as keyof typeof ORDER_METHODS]}</span>
						</div>
						<div className={styles.orderFooter__time}>
							<span>Order Time</span>
							<span>{dayjs.unix(selectedOrder?.created_at!).format('MM-DD-YYYY HH:mm')}</span>
						</div>
					</div>
				</>
			)}
		</div>
	)
}

export default Orders
