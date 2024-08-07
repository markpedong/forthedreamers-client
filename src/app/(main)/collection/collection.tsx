'use client'

import { FC, memo, useState } from 'react'
import { getCollections } from '@/api'
import { TCollectionItem } from '@/api/types'
import { useAppSelector } from '@/redux/store'

import Pagination from '@/components/pagination'

import Category from './components/category'
import styles from './styles.module.scss'

const Collection: FC<{ data: TCollectionItem[] }> = ({ data }) => {
  const { collection_length } = useAppSelector(state => state.appData.website)
  const [collections, setCollections] = useState(data)
  const [currentPage, setCurrentPage] = useState(1)
  //   const { data: newCollection } = useQuery({
  //     queryKey: ['collections'],
  //     staleTime: STALE_TIME,
  //     queryFn: async () => {
  //       const res = await getCollections({ page })

  //       if (res?.status !== 200) return []
  //       return res?.data
  //     },
  //   })
  const handlePageChange = async (type: 'next' | 'prev' | 'current', page?: number) => {
    let newPage = currentPage

    if (type === 'next') newPage = currentPage + 1
    if (type === 'prev') newPage = currentPage - 1
    if (type === 'current' && page !== undefined) newPage = page

    setCurrentPage(newPage)

    const res = await getCollections({ page: newPage })
    setCollections(res?.data ?? [])
  }
  return (
    <>
      <div className={styles.categoryWrapper}>{collections?.map(collection => <Category data={collection} key={collection?.id} />)}</div>
      <Pagination pageTotal={collection_length / 10 < 1 ? 1 : collection_length / 10} handlePageChange={handlePageChange} />
    </>
  )
}

export default memo(Collection)
