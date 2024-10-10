import { getCollections } from '@/api'
import { PageTitle } from '@/components/page-components'

import Collection from './collection'
import styles from './styles.module.scss'

const Page = async () => {
  const collections = await getCollections({})

  return (
    <div className={styles.mainWrapper}>
      <PageTitle title="SHOP BY CATEGORY" medium className="!py-10 !text-center" />
      <Collection data={collections ?? []} />
    </div>
  )
}

export default Page
