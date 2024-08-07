import React from 'react'
// import { Roboto_Condensed } from 'next/font/google'
// import Image from 'next/image'
// import { getProducts } from '@/api'
// import { TProductItem } from '@/api/types'
// import classNames from 'classnames'
// import { FaFilter } from 'react-icons/fa'
// import { FaAngleDown, FaArrowRight } from 'react-icons/fa6'

// import Header from '@/components/header'
// import { PageTitle } from '@/components/page-components'
// import Product from '@/components/product'

import styles from './styles.module.scss'

// const roboto = Roboto_Condensed({ weight: ['300', '800'], subsets: ['latin'] })

const Page = async () => {
  // const [products] = await Promise.all([getProducts({})])
  // const first: TProductItem = products?.[0] ?? {}
  // const second: TProductItem = products?.[1] ?? {}

  return (
    <div className={styles.mainWrapper}>
      {/* <Header arr={['HOME', 'SHOP', 'PRODUCTS']} />
      <PageTitle title="PRODUCTS" />
      <div className={classNames(styles.filterContainer, roboto.className)}>
        <div>
          <FaFilter />
          <span>FILTER AND SORT</span>
        </div>
        <div>
          <span className={styles.sort}>ALPHABETICALLY, A-Z</span>
          <FaAngleDown />
          <span>{products?.data?.length} PRODUCTS</span>
        </div>
      </div>
      <div className={styles.productWrapper}>{products?.data?.map(item => <Product product={item} />)}</div>
      <div className={classNames(styles.pagination, roboto.className)}>
        <span>1</span>
        <span>2</span>
        <span>3</span>
        <span>4</span>
        <span>
          <FaArrowRight />
        </span>
      </div>
      <div className={styles.crowdWrapper}>
        <span className={styles.crowdTitle}>CROWD FAVORITES</span>
        <div className={styles.crowdItemsContainer}>
          <div>
            <Image src={first?.images?.[0]} width={500} height={500} alt="img1" />
            <span>{first?.name}</span>
          </div>
          <div>
            <Image src={second?.images?.[0]} width={500} height={500} alt="img1" />
            <span>{second?.name}</span>
          </div>
        </div>
      </div> */}
    </div>
  )
}

export default Page
