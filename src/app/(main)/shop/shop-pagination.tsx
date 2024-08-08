'use client'

import React, { FC, useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { TProductItem } from '@/api/types'
import { useAppSelector } from '@/redux/store'

import Pagination from '@/components/pagination'
import Product from '@/components/product'

import styles from './styles.module.scss'

const ShopPagination: FC<{ data?: TProductItem[] }> = ({ data }) => {
  const { default_pageSize, product_length } = useAppSelector(state => state.appData.website)
  const pathname = usePathname()
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState(1)

  const handlePageChange = async (type: 'next' | 'prev' | 'current', page?: number) => {
    let newPage = currentPage

    if (type === 'next') newPage = currentPage + 1
    if (type === 'prev') newPage = currentPage - 1
    if (type === 'current' && page !== undefined) newPage = page

    setCurrentPage(newPage)
  }

  useEffect(() => {
    router.push(`${pathname}?page=${currentPage || 1}`)
  }, [currentPage, pathname, router])

  return (
    <>
      <div className={styles.productWrapper}>{data?.map(item => <Product product={item} key={item?.id} />)}</div>
      <Pagination
        currentPage={currentPage}
        handlePageChange={handlePageChange}
        pageTotal={product_length / default_pageSize < 1 ? 1 : product_length / default_pageSize}
      />
    </>
  )
}

export default ShopPagination
