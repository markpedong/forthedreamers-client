import { getProducts } from '@/api'
import { roboto } from 'public/fonts'

import { CheckoutSectionWrapper, Suggestions } from './cart'
import styles from './styles.module.scss'

const Page = async () => {
  const products = await getProducts({})
  return (
    <div className={roboto.className}>
      <div className={styles.mainWrapper}>
        {/* <PageTitle title="Your Cart" medium className="!capitalize" /> */}
        <div className={styles.cartWrapper}>{/* <Cart /> */}</div>
        <CheckoutSectionWrapper />
      </div>
      <Suggestions products={products?.data?.slice(0, 4) ?? []} />
    </div>
  )
}

export default Page
