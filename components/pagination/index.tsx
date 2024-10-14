import React, { FC } from 'react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

import styles from './styles.module.scss'

interface Props {
  pageTotal: number
  currentPage: number
  handlePageChange: (type: 'next' | 'prev' | 'current', page?: number) => void
}

const Pagination: FC<Props> = ({ pageTotal, currentPage, handlePageChange }) => {
  const isPrevDisabled = currentPage === 1
  const isNextDisabled = currentPage === pageTotal

  return (
    <div className={styles.pagination}>
      <span onClick={() => !isPrevDisabled && handlePageChange('prev')} className={isPrevDisabled ? styles.disabled : ''}>
        <FaArrowLeft />
      </span>
      {Array.from({ length: pageTotal }, (_, index) => (
        <span
          key={index}
          onClick={() => handlePageChange('current', index + 1)}
          className={currentPage === index + 1 ? styles.activePage : ''}
        >
          {index + 1}
        </span>
      ))}
      <span onClick={() => !isNextDisabled && handlePageChange('next')} className={isNextDisabled ? styles.disabled : ''}>
        <FaArrowRight />
      </span>
    </div>
  )
}

export default Pagination
