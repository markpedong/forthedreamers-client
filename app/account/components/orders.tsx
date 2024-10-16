'use client'

import { OrderItems } from '@/api/types'
import { FC } from 'react'
import styles from '../../styles.module.scss'
import { ORDER_STATUS } from '@/app/constants/enums'
import Image from 'next/image'

const OrderItem: FC<{ order: OrderItems }> = ({ order }) => {
  const first = order.items?.[0]
  return (
    <div className={styles.orderContainer} key={order.id}>
      <div className={styles.status}>
        <span>{ORDER_STATUS[order?.status]}</span>
      </div>
      <div className={styles.item}>
        <Image src={first?.images} alt="pic" width={100} height={100} />
        <div className={styles.details}>
          <div>{first?.name}</div>
          <div>
            <div>
              {first?.color} {first?.size}
            </div>
            <div>×{first?.quantity}</div>
          </div>
          <div>₱{first?.price}</div>
        </div>
      </div>
      <div className={styles.total}>
        Total {order?.items.length} item: ₱{order?.total_price}
      </div>
      <div className={styles.btnContainer}>
        <div className="btn">Return/ Refund</div>
        <div className="btn">Order Received</div>
      </div>
    </div>
  )
}
const Orders: FC<{ orders: OrderItems[] }> = ({ orders }) => {
  return <div className={styles.ordersWrapper}>{orders?.map(order => <OrderItem key={order.id} order={order} />)}</div>
}

export default Orders
