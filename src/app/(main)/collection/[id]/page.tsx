import { getCollectionsByID } from '@/api'
import classNames from 'classnames'
import { Roboto_Condensed } from 'next/font/google'

import Header from '@/components/header'
import Product from '@/components/product'

import styles from './styles.module.scss'

interface PageProps {
  params: {
    id: string
  }
}

const roboto = Roboto_Condensed({ weight: ['400', '600', '800'], subsets: ['latin'] })

const Page = async ({ params: { id } }: PageProps) => {
  const collections = await getCollectionsByID({ id })
  const data = collections?.data

  return (
    <div className={classNames(styles.mainWrapper, roboto.className)}>
      <Header arr={['HOME', 'SHOP', `${data?.name}`]} />
      <div className={styles.titleContainer}>{data?.name}</div>
      <div className={styles.filterContainer}>
        <div></div>
        {!!data?.products?.length && <div>{data?.products?.length} PRODUCTS</div>}
      </div>
      <div className={styles.productWrapper}>{data?.products?.map(item => <Product product={item} key={item?.id} />)}</div>
    </div>
  )
}

export default Page
