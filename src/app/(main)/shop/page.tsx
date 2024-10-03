import Image from 'next/image'
import { TProductItem } from '@/api/types'
import classNames from 'classnames'
import { SF_PRO_DISPLAY } from 'public/fonts'

import Header from '@/components/header'
import { PageTitle } from '@/components/page-components'

import ShopPagination from './shop-pagination'
import styles from './styles.module.scss'
import { getProducts } from '@/lib/server'

const Page = async () => {
  const products = await getProducts({})
  const first: TProductItem = products?.[0]!
  const second: TProductItem = products?.[1]!

  return (
    <div className={styles.mainWrapper}>
      <Header arr={['HOME', 'SHOP', 'PRODUCTS']} />
      <PageTitle title="PRODUCTS" />
      <div className={classNames(styles.filterContainer, SF_PRO_DISPLAY.className)}>
        <div>
          {/* <FaFilter /> */}
          {/* <span>FILTER AND SORT</span> */}
        </div>
        <div>
          {/* <span className={styles.sort}>ALPHABETICALLY, A-Z</span> */}
          {/* <FaAngleDown />
          <span>{products?.data?.length} PRODUCTS</span> */}
        </div>
      </div>
      <ShopPagination data={products} />
      <div className={styles.crowdWrapper}>
        <span className={styles.crowdTitle}>CROWD FAVORITES</span>
        <div className={styles.crowdItemsContainer}>
          <div>
            <Image src={first?.images?.[0] ?? ''} width={500} height={500} alt="img1" priority />
            <span>{first?.name}</span>
          </div>
          <div>
            <Image src={second?.images?.[0] ?? ''} width={500} height={500} alt="img1" priority />
            <span>{second?.name}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
