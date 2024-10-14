import { FC, memo, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { TCartProduct, TSearchProduct } from '@/api/types'
import classNames from 'classnames'
import { motion } from 'framer-motion'
import { debounce } from 'lodash'
import { FaMinus, FaPlus, FaRegTrashAlt } from 'react-icons/fa'

import { addQuantity, deleteCart, revalidate } from '@/lib/server'
import PopOver from '@/app/components/popover'
import { API_TAGS } from '@/app/constants/enums'

import styles from './styles.module.scss'

const SearchProduct: FC<TSearchProduct> = memo(({ product, setSearch }) => {
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
          <span>₱ {product?.variations?.[0].price}</span>
        </div>
        <span>{product?.description}</span>
      </div>
    </div>
  )
})

const CartProduct: FC<TCartProduct> = memo(({ cart, setSearch }) => {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const clickedHandler = () => {
    router.push(`/shop/${cart?.product_id}`)
    setSearch()
  }

  const handleDelete = async () => {
    const res = await deleteCart({ cart_id: cart?.id })

    if (res?.status === 200) {
      revalidate(API_TAGS.CART)
    }
  }

  const updateQty = async ({ id, quantity }: { id: string; quantity: number }) => {
    const res = await addQuantity({ cart_id: id, quantity })

    if (res?.status === 200) {
      revalidate(API_TAGS.CART)
    }
  }

  const updateQuantity = debounce((updateType: 'ADD' | 'SUB') => {
    if (cart?.quantity && (updateType === 'ADD' ? cart.quantity < 10 : cart.quantity > 1)) {
      updateQty({ id: cart?.id, quantity: updateType === 'ADD' ? cart.quantity + 1 : cart.quantity - 1 })
    }
  }, 100)

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
            <FaMinus onClick={() => updateQuantity('SUB')} />
            <span className={styles.qty}>{cart?.quantity}</span>
            <FaPlus onClick={() => updateQuantity('ADD')} />
          </div>

          <PopOver
            handleOk={handleDelete}
            open={open}
            setOpen={setOpen}
            title="Remove this item from cart?"
            trigger={
              <motion.span whileTap={{ scale: 0.9 }}>
                <FaRegTrashAlt color="red" />
              </motion.span>
            }
            key={cart.id}
          />
        </div>
      </div>
    </div>
  )
})

export { CartProduct, SearchProduct }
