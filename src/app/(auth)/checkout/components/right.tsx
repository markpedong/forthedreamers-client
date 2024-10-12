import { FC } from 'react'
import Image from 'next/image'
import { useAppSelector } from '@/redux/store'
import classNames from 'classnames'
import { SF_PRO_DISPLAY } from 'public/fonts'
import { MdOutlineLabel } from 'react-icons/md'

import { Separator } from '@/components/ui/separator'

import styles from '../styles.module.scss'

const Right: FC = () => {
  const carts = useAppSelector(state => state.userData.cart)
  const totalPrice = carts?.reduce((acc, curr) => {
    acc += curr?.price * curr?.quantity
    return acc
  }, 0)

  return (
    <div className={classNames(styles.right, SF_PRO_DISPLAY.className)}>
      <div className={styles.header}>
        <h1>Your Order</h1>
        <span>edit</span>
      </div>
      <div className={styles.details}>
        <div>
          <span>{carts?.length} item</span>
          <span>₱{(totalPrice - 0.12 * totalPrice)?.toFixed(2)}</span>
        </div>
        <div>
          <span>Sales Tax</span>
          <span>₱{(totalPrice * 0.12).toFixed(2)}</span>
        </div>
        <div>
          <span>Delivery</span>
          <span>₱120</span>
        </div>
      </div>
      <div className={styles.total}>
        <span>Total</span>
        <span>₱{totalPrice + 120}</span>
      </div>
      <div className={styles.voucher}>
        <MdOutlineLabel />
        <span>use your voucher code</span>
      </div>
      <Separator className="my-8" />
      <div className={styles.checkoutProducts}>
        {carts?.map(cart => (
          <div className={styles.product} key={cart?.id}>
            <Image src={cart?.images?.[0] ?? ''} alt={cart?.name ?? ''} height={50} width={50} quality={20} priority />
            <div className={styles.productDetails}>
              <span>{cart?.name}</span>
              <span>₱{cart?.price}</span>
              <span>
                Size: {cart?.size} / Quantity: {cart?.quantity}
              </span>
              <span>Color: {cart?.color}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Right
