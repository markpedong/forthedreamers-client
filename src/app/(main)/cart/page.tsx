import { SF_PRO_DISPLAY } from 'public/fonts'

import { getProducts } from '@/lib/server'

import { CheckoutSectionWrapper, Suggestions } from './cart'
import styles from './styles.module.scss'

const Page = async () => {
  const products = await getProducts({})

  return (
    <div className={SF_PRO_DISPLAY.className}>
      <div className={styles.mainWrapper}>
        {/* <PageTitle title="Your Cart" medium className="!capitalize" /> */}
        <div className={styles.cartWrapper}>{/* <Cart /> */}</div>
        <CheckoutSectionWrapper />
      </div>
      <Suggestions products={products?.slice(0, 4) ?? []} />
    </div>
  )
}

export default Page
