'use client'

import { OrderItems } from '@/api/types'
import OrderItem from '@/components/order'
import { ORDER_METHODS } from '@/constants'
import dayjs from 'dayjs'
import { Dispatch, FC, SetStateAction, useState } from 'react'
import { CiLocationOn } from 'react-icons/ci'
import { MdArrowBack } from 'react-icons/md'
import styles from '../styles.module.scss'


const Orders: FC<{ orders: OrderItems[]; setCurrTab: Dispatch<SetStateAction<number>> }> = ({ orders, setCurrTab }) => {
  const [details, setDetails] = useState('')
  const selectedOrder = orders.find(o => o.id === details)

  return (
    <div className={styles.ordersWrapper}>
      {details === '' &&
        orders?.map(order => (
          <OrderItem key={order.id} order={order} setDetails={setDetails} type="page" setCurrTab={setCurrTab} />
        ))}
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
                <OrderItem order={selectedOrder} type="details" setCurrTab={setCurrTab} />
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
