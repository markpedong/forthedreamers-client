import { Roboto_Condensed } from 'next/font/google'
import { getProducts } from '@/api'

import { PageTitle } from '@/components/page-components'

import { Cart, CheckoutSectionWrapper, Suggestions } from './cart'
import styles from './styles.module.scss'

const roboto = Roboto_Condensed({ weight: ['300', '400', '800'], subsets: ['latin'] })

const Page = async () => {
  const products = await getProducts({})
  return (
    <div className={roboto.className}>
      <div className={styles.mainWrapper}>
        {/* <PageTitle title="Your Cart" medium className="!capitalize" /> */}
        <div className={styles.cartWrapper}>
          {/* <Cart /> */}
        </div>
        <CheckoutSectionWrapper />
      </div>
      <Suggestions products={products?.data?.slice(0, 4) ?? []} />
    </div>
  )
}

export default Page
