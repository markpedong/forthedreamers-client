'use client'

import { FC, useEffect, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useAppSelector } from '@/redux/store'
import { FaArrowLeft } from 'react-icons/fa'

import styles from './Pagination.module.css' // Adjust the import as necessary

const Pagination: FC<{ type: 'collection' | 'products' }> = ({ type }) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { collection_length, product_length, default_pageSize } = useAppSelector(state => state.appData.website)
  const initialPage = parseInt(searchParams.get('page') || '1', 10)
  const length = Math.ceil(type === 'collection' ? collection_length / default_pageSize : product_length / default_pageSize)
  const [currentPage, setCurrentPage] = useState(initialPage)

  useEffect(() => {
    const current = new URLSearchParams(Array.from(searchParams.entries()))
    if (currentPage === 1) {
      current.delete('page')
    } else {
      current.set('page', currentPage.toString())
    }

    const search = current.toString()
    const query = search ? `?${search}` : ''
    router.push(`${pathname}${query}`)
  }, [currentPage, router, pathname, searchParams])

  const handleNextPage = () => {
    if (currentPage < length) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  return (
    <div className={styles.pagination}>
      <span onClick={handlePreviousPage}>
        <FaArrowLeft />
      </span>
      {Array.from(Array(length), (_, x) => (
        <span key={x} onClick={() => setCurrentPage(x + 1)}>
          {x + 1}
        </span>
      ))}
      <span onClick={handleNextPage}>next</span>
    </div>
  )
}

export default Pagination
