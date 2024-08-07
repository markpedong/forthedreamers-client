import React from 'react'
import Link from 'next/link'
import { getCollections } from '@/api'

import { PageTitle } from '@/components/page-components'
import Pagination from '@/components/pagination'

import Category from './components/category'
import styles from './styles.module.scss'

const Page = async (searchParams: { [key: string]: string | string[] | undefined }) => {
  const page = typeof searchParams.page === 'string' ? Number(searchParams.page) : 1
  const collections = await getCollections({ page })

  return (
    <div className={styles.mainWrapper}>
      <PageTitle title="SHOP BY CATEGORY" />
      <div className={styles.categoryWrapper}>
        {collections?.data?.map(collection => <Category data={collection} key={collection?.id} />)}
      </div>
      <Pagination type="collection" />
      <Link
        href={{
          pathname: '/collection',
          query: {
            page: page - 1,
          },
        }}
      >
        prev
      </Link>
      <Link
        href={{
          pathname: '/collection',
          query: {
            page: page + 1,
          },
        }}
      >
        next
      </Link>
    </div>
  )
}

export default Page
