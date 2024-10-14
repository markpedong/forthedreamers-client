'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { CiSearch } from 'react-icons/ci'

import styles from './styles.module.scss'

const Search = () => {
  const pathname = usePathname()
  const router = useRouter()
  const [search, setSearch] = useState('')

  useEffect(() => {
    router.push(`${pathname}?search=${search || ''}`)
  }, [search, pathname, router])

  return (
    <div className={styles.inputContainer}>
      <div>
        <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." />
        <CiSearch color="black" />
      </div>
    </div>
  )
}

export default Search
