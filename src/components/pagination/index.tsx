import { FC } from 'react'
import { FaArrowLeft } from 'react-icons/fa'

import styles from './styles.module.scss' // Adjust the import as necessary

interface Props {
  pageTotal: number
  handlePageChange: (type: 'next' | 'prev' | 'current', page?: number) => void
}

const Pagination: FC<Props> = ({ pageTotal, handlePageChange }) => {
  return (
    <div className={styles.pagination}>
      <span onClick={() => handlePageChange('prev')} role="button" tabIndex={0}>
        <FaArrowLeft />
      </span>
      {Array.from({ length: pageTotal }, (_, index) => (
        <span key={index} onClick={() => handlePageChange('current', index + 1)} role="button" tabIndex={0}>
          {index + 1}
        </span>
      ))}
      <span onClick={() => handlePageChange('next')} role="button" tabIndex={0}>
        next
      </span>
    </div>
  )
}

export default Pagination
