import { FC, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { deleteCart } from '@/api'
import { TCartProduct, TSearchProduct } from '@/api/types'
import classNames from 'classnames'
import { motion } from 'framer-motion'
import { FaMinus, FaPlus, FaRegTrashAlt } from 'react-icons/fa'

import PopOver from '@/app/(main)/components/popover'

import styles from './styles.module.scss'

const SearchProduct: FC<TSearchProduct> = ({ product, setSearch }) => {
  const router = useRouter()

  const clickedHandler = () => {
    router.push(`/shop/${product?.id}`)
    setSearch()
  }

  return (
    <div className={classNames(styles.products__item, styles.isSearch)}>
      <Image onClick={clickedHandler} src={product?.images?.[0] ?? ''} alt={product?.name ?? ''} height={100} width={100} />
      <div className={classNames(styles.products__textContainer)}>
        <div className={styles.products__titleContainer} onClick={clickedHandler}>
          <span>{product?.name}</span>
        </div>
      </div>
    </div>
  )
}

const CartProduct: FC<TCartProduct> = ({ cart, setSearch, refetch }) => {
  const router = useRouter()
  const [quantity, setQuantity] = useState(1)
  const [open, setOpen] = useState(false)

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
        </div>
        {cart?.size && <div className={styles.products__variation}>{cart?.size}</div>}
        <div className={styles.quantityContainer}>
          <div className={styles.addMinusContainer}>
            <FaMinus onClick={() => setQuantity(qty => (qty > 1 ? qty - 1 : qty))} />
            <span className={styles.qty}>{quantity}</span>
            <FaPlus onClick={() => setQuantity(qty => (qty < 10 ? qty + 1 : qty))} />
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
