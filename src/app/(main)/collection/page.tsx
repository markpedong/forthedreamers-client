import { getCollections } from '@/api'

import { PageTitle } from '@/components/page-components'

import Collection from './collection'
import styles from './styles.module.scss'

const Page = async () => {
  const collections = await getCollections({ page: 1 })

  return (
    <div className={styles.mainWrapper}>
      <PageTitle title="SHOP BY CATEGORY" medium  className='!text-center !py-10'/>
      <Collection data={collections?.data ?? []} />
    </div>
  )
}

export default Page
