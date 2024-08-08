'use client'

import { FC, memo, useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { TCollectionItem } from '@/api/types'
import { useAppSelector } from '@/redux/store'

import Pagination from '@/components/pagination'

import Category from './components/category'
import styles from './styles.module.scss'

const Collection: FC<{ data: TCollectionItem[] }> = ({ data }) => {
  const pathname = usePathname()
  const router = useRouter()
  const { collection_length, default_pageSize } = useAppSelector(state => state.appData.website)
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(collection_length / default_pageSize)
  const validCurrentPage = Math.max(1, Math.min(currentPage, totalPages))

  const handlePageChange = async (type: 'next' | 'prev' | 'current', page?: number) => {
    let newPage = currentPage

    if (type === 'next') newPage = currentPage + 1
    if (type === 'prev') newPage = currentPage - 1
    if (type === 'current' && page !== undefined) newPage = page

    setCurrentPage(newPage)
  }

  useEffect(() => {
    router.push(`${pathname}?page=${currentPage}`)
  }, [currentPage, pathname, router])

  return (
    <>
      <div className={styles.categoryWrapper}>{data?.map(collection => <Category data={collection} key={collection?.id} />)}</div>
      <Pagination
        currentPage={validCurrentPage}
        pageTotal={collection_length / default_pageSize < 1 ? 1 : collection_length / default_pageSize}
        handlePageChange={handlePageChange}
      />
    </>
  )
}

export default memo(Collection)
