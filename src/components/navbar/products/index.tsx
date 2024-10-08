import { FC, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { TCartItem, TProductItem, TSearchProduct } from '@/api/types'
import classNames from 'classnames'
import { FaMinus, FaPlus, FaRegTrashAlt } from 'react-icons/fa'

import styles from './styles.module.scss'

const isProductType = (product: TProductItem | TCartItem | undefined): product is TProductItem => {
  return product !== undefined && 'variations' in product
}

const isCartType = (product: TProductItem | TCartItem | undefined): product is TCartItem => {
  return product !== undefined && 'size' in product
}

const SearchProduct: FC<TSearchProduct> = ({ isCart, product, setSearch }) => {
  const router = useRouter()
  const [quantity, setQuantity] = useState(1)

  const variations = isProductType(product) ? product.variations : []
  const size = isCartType(product) ? product.size : undefined

  const clickedHandler = () => {
    product && router.push(`/shop/${product.id}`)
    setSearch()
  }
  return (
    <div className={styles.products__item} data-iscart={isCart}>
      <Image onClick={clickedHandler} src={product?.images?.[0] ?? ''} alt={product?.name ?? ''} height={100} width={100} />
      <div className={classNames(styles.products__textContainer)}>
        <div className={styles.products__titleContainer} onClick={clickedHandler}>
          <span>{product?.name}</span>
          {variations.length > 0 && <span>₱{variations[0]?.price}.00</span>}
        </div>
        {isCart && (
          <>
            {size && <div className={styles.products__variation}>{size}</div>}
            <div className={styles.quantityContainer}>
              <div className={styles.addMinusContainer}>
                <FaMinus onClick={() => setQuantity(qty => (qty > 1 ? qty - 1 : qty))} />
                <span className={styles.qty}>{quantity}</span>
                <FaPlus onClick={() => setQuantity(qty => (qty < 10 ? qty + 1 : qty))} />
              </div>
              <FaRegTrashAlt color="red" />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default SearchProduct
