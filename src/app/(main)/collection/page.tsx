import React from 'react'
import { getCollections } from '@/api'

import { PageTitle } from '@/components/page-components'
import Pagination from '@/components/pagination'

import Category from './components/category'
import styles from './styles.module.scss'

const Page = async () => {
  const collections = await getCollections({})
  return (
    <div className={styles.mainWrapper}>
      <PageTitle title="SHOP BY CATEGORY" />
      <div className={styles.categoryWrapper}>{collections?.data?.map(collection => <Category data={collection} />)}</div>
      <Pagination type="collection" />
    </div>
  )
}

export default Page
