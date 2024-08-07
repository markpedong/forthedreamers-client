import React, { FC } from 'react'
import { getCollections } from '@/api'

import { PageTitle } from '@/components/page-components'
import Pagination from '@/components/pagination'

import Category from './components/category'
import styles from './styles.module.scss'

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

const Page: FC<PageProps> = async ({ searchParams }) => {
  const page = typeof searchParams.page === 'string' ? Number(searchParams.page) : 1
  const collections = await getCollections({ page })

  return (
    <div className={styles.mainWrapper}>
      <PageTitle title="SHOP BY CATEGORY" />
      <div className={styles.categoryWrapper}>
        {collections?.data?.map(collection => <Category data={collection} key={collection?.id} />)}
      </div>
      <Pagination type="collection" />
    </div>
  )
}

export default Page
