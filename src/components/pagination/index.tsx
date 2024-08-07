'use client'

import React, { FC, useEffect, useState } from 'react'
import { Roboto_Condensed } from 'next/font/google'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useAppSelector } from '@/redux/store'
import classNames from 'classnames'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

import styles from './styles.module.scss'

const roboto = Roboto_Condensed({ weight: ['300', '800'], subsets: ['latin'] })

const Pagination: FC<{ type: 'collection' | 'products' }> = ({ type }) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { collection_length, product_length, default_pageSize } = useAppSelector(state => state.appData.website)
  const initialPage = parseInt(searchParams.get('page') || '1', 10)
  const length = Math.ceil(type === 'collection' ? collection_length / default_pageSize : product_length / default_pageSize)
  const [currentPage, setCurrentPage] = useState(initialPage)

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
    router.refresh()
  }, [currentPage, router, pathname, searchParams])

  return (
    <div className={classNames(styles.pagination, roboto.className)}>
      <span onClick={handlePreviousPage} className={currentPage === 1 ? styles.disabled : undefined}>
        <FaArrowLeft />
      </span>
      {Array.from(Array(length), (_, x) => (
        <span key={x} className={currentPage === x + 1 ? styles.active : undefined} onClick={() => setCurrentPage(x + 1)}>
          {x + 1}
        </span>
      ))}
      <span onClick={handleNextPage} className={currentPage === length ? styles.disabled : undefined}>
        <FaArrowRight />
      </span>
    </div>
  )
}

export default Pagination
