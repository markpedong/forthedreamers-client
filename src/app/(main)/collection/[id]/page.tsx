import { getCollectionsByID } from '@/api'
import classNames from 'classnames'
import { SF_PRO_DISPLAY } from 'public/fonts'

import { getCollections } from '@/lib/server'
import Header from '@/components/header'
import Product from '@/components/product'

import styles from './styles.module.scss'

interface PageProps {
  params: {
    id: string
  }
}

export async function generateStaticParams() {
  const collections = await getCollections({ passCookies: false })

  const params =
    collections?.map(collection => ({
      id: collection.id,
    })) || []

  return params
}

const Page = async ({ params: { id } }: PageProps) => {
  const collections = await getCollectionsByID({ id })
  const data = collections?.data

  return (
    <div className={classNames(styles.mainWrapper, SF_PRO_DISPLAY.className)}>
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
