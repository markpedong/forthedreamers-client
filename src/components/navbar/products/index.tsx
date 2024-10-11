import { FC, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { deleteCart } from '@/api'
import { TCartProduct, TSearchProduct } from '@/api/types'
import classNames from 'classnames'
import { motion } from 'framer-motion'
import { FaMinus, FaPlus, FaRegTrashAlt } from 'react-icons/fa'

import { useWithDispatch } from '@/hooks/useWithDispatch'
import PopOver from '@/app/(main)/components/popover'

import styles from './styles.module.scss'

const SearchProduct: FC<TSearchProduct> = ({ product, setSearch }) => {
  const router = useRouter()

  const clickedHandler = () => {
    router.push(`/shop/${product?.id}`)
    setSearch()
  }

  console.log(product)

  return (
    <div className={classNames(styles.products__item, styles.isSearch)}>
      <Image onClick={clickedHandler} src={product?.images?.[0] ?? ''} alt={product?.name ?? ''} height={100} width={100} />
      <div className={classNames(styles.products__textContainer)}>
        <div className={styles.products__titleContainer} onClick={clickedHandler}>
          <span>{product?.name}</span>
          <span>₱ {product?.variations?.[0].price}</span>
        </div>
        <span>{product?.description}</span>
      </div>
    </div>
  )
}

const CartProduct: FC<TCartProduct> = ({ cart, setSearch, refetch }) => {
  const router = useRouter()
  const { updateQty } = useWithDispatch()
  const [open, setOpen] = useState(false)
  const [quantity, setQuantity] = useState(cart?.quantity ?? 1)

  const clickedHandler = () => {
    router.push(`/shop/${cart?.product_id}`)
    setSearch()
  }

  const handleDelete = async () => {
    deleteCart({ cart_id: cart?.id })
    refetch()
  }

  return (
    <div className={classNames(styles.products__item, styles.isCart)}>
      <Image onClick={clickedHandler} src={cart.images?.[0] ?? ''} alt={cart?.name ?? ''} height={100} width={100} />
      <div className={classNames(styles.products__textContainer)}>
        <div className={styles.products__titleContainer} onClick={clickedHandler}>
          <span>{cart?.name}</span>
          <span>₱ {cart?.price * cart?.quantity}</span>
        </div>
        <div className={styles.products__variation}>
          {cart?.size}, {cart?.color}
        </div>
        <div className={styles.quantityContainer}>
          <div className={styles.addMinusContainer}>
            <FaMinus
              onClick={() => {
                if (quantity > 1) {
                  setQuantity(qty => qty - 1)
                  updateQty({ id: cart?.id, quantity })
                }
              }}
            />
            <span className={styles.qty}>{quantity}</span>
            <FaPlus
              onClick={() => {
                if (quantity < 10) {
                  setQuantity(qty => qty + 1)
                  updateQty({ id: cart?.id, quantity })
                }
              }}
            />
          </div>

          <PopOver
            handleOk={handleDelete}
            open={open}
            setOpen={setOpen}
            title="Remove this item from cart?"
            trigger={
              <motion.span whileTap={{ scale: 0.9 }}>
                <FaRegTrashAlt color="red" onClick={handleDelete} />
              </motion.span>
            }
            key={cart.id}
          />
        </div>
      </div>
    </div>
  )
}

export { CartProduct, SearchProduct }
