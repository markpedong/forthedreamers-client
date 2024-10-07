import { FC, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { TProductItem } from '@/api/types'
import classNames from 'classnames'
import { SF_PRO_DISPLAY } from 'public/fonts'
import { FaMinus, FaPlus, FaRegTrashAlt } from 'react-icons/fa'

import styles from './styles.module.scss'

const SearchProduct: FC<{ isCart?: boolean; product?: TProductItem }> = ({ isCart, product }) => {
  const router = useRouter()
  const variations = product?.variations
  const [quantity, setQuantity] = useState(1)

  console.log(product)

  return (
    <div className={styles.products__item} data-iscart={isCart}>
      <Image onClick={() => router.push(`/shop/${product?.id}`)} src={product?.images?.[0] ?? ''} alt="" height={100} width={100} />
      <div className={classNames(styles.products__textContainer, SF_PRO_DISPLAY.className)}>
        <div className={styles.products__titleContainer} onClick={() => router.push(`/shop/${product?.id}`)}>
          <span>{product?.name}</span>
          {variations?.length! > 0 && <span>₱{variations?.[0]?.price}.00</span>}
        </div>
        {isCart && (
          <>
            <div className={styles.products__variation}>{product?.size}</div>
            <div className={styles.quantityContainer}>
              <div className={styles.addMinusContainer}>
                <FaMinus onClick={() => setQuantity(qty => (qty > 1 ? qty - 1 : qty))} />
                <span className={styles.qty}>{quantity}</span>
                <FaPlus onClick={() => setQuantity(qty => (qty < 10 ? (qty += 1) : qty))} />
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
