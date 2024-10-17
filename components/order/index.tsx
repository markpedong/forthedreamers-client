import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { ORDER_STATUS } from '@/constants'
import { finishOrder, revalidate } from '@/lib/server'
import { toast } from 'sonner'
import { API_TAGS } from '@/app/constants/enums'
import Image from 'next/image'
import { FC, useState } from 'react'
import { TOrderItem } from '@/api/types'
import classNames from 'classnames'
import styles from '@/app/account/styles.module.scss'

const OrderItem: FC<TOrderItem> = ({ order, setDetails, type, setCurrTab }) => {
  const first = order.items?.[0]
  const [open, setOpen] = useState(false)
  console.log('order', order)

  const handleBtn = async () => {
    if (type === 'page' && order?.status !== 3) {
      setDetails?.(order.id)
    }

    if (type === 'page' && order?.status === 4) {
      setCurrTab(5)
    }

    if (type === 'page' && order?.status === 3) {
      setOpen(true)
    }
  }

  const handleConfirm = async () => {
    try {
      const res = await finishOrder({ order_id: order.id })
      if (res?.status === 200) {
        toast.success(res?.message)
        revalidate(API_TAGS.ORDERS)
      }
    } finally {
      setTimeout(() => {
        setOpen(false)
      }, 500)
    }
  }

  const renderOrderConfirmation = () => {
    return (
      <Dialog open={open}>
        <DialogContent
          className="sm:max-w-[550px] p-3 gap-1"
          onClose={() => {
            setOpen(false)
          }}
        >
          <DialogHeader>
            <DialogTitle>Is your order complete?</DialogTitle>
            <DialogDescription>Once you click confirm, your order will be completed.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button type="button" onClick={handleConfirm}>
              Confirm Order
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }

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
        {[3, 4].includes(order?.status) && <div className="btn">Return/ Refund</div>}
        <div className="btn" onClick={handleBtn}>
          {order?.status === 3 ? 'Order Received' : order?.status === 4 ? 'Write a Review' : 'View Details'}
        </div>
      </div>
      {renderOrderConfirmation()}
    </div>
  )
}

export default OrderItem
