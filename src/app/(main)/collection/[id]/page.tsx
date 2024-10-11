import classNames from 'classnames'
import { SF_PRO_DISPLAY } from 'public/fonts'

import { getCollections, getCollectionsByID } from '@/lib/server'
import Header from '@/components/header'
import Product from '@/components/product'

import styles from './styles.module.scss'

interface PageProps {
  params: {
    id: string
  }
}

export async function generateStaticParams() {
  const collections =
    (await getCollections({ passCookies: false }))?.map(collection => ({
      id: collection.id,
    })) || []

  return collections
}

const Page = async ({ params: { id } }: PageProps) => {
  const collections = await getCollectionsByID({ id })

  return (
    <div className={classNames(styles.mainWrapper, SF_PRO_DISPLAY.className)}>
      <Header arr={['HOME', 'SHOP', `${collections?.name}`]} />
      <div className={styles.titleContainer}>{collections?.name}</div>
      <div className={styles.filterContainer}>
        <div></div>
        {!!collections?.products?.length && <div>{collections?.products?.length} PRODUCTS</div>}
      </div>
      <div className={styles.productWrapper}>{collections?.products?.map(item => <Product product={item} key={item?.id} />)}</div>
    </div>
  )
}

export default Page
