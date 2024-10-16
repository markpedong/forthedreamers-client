'use client'

import { OrderItems } from '@/api/types'
import { FC } from 'react'
import styles from '../../styles.module.scss'

const OrderItem: FC<{ order: OrderItems }> = ({ order }) => {
  return (
    <div className={styles.orderContainer} key={order.id}>
      <div>
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
