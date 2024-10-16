'use client'

import { OrderItems } from '@/api/types'
import { FC } from 'react'
import styles from '../../styles.module.scss'

const OrderItem: FC<{ order: OrderItems }> = ({ order }) => {
  return (
    <div className={styles.order} key={order.id}>
      <div className={styles.orderId}>Order #{order.id}</div>
      <div className={styles.orderDate}>Date: {order.created_at}</div>
    </div>
  )
}
const Orders: FC<{ orders: OrderItems[] }> = ({ orders }) => {
  return <div className={styles.ordersWrapper}>{orders?.map(order => <OrderItem key={order.id} order={order} />)}</div>
}

export default Orders
