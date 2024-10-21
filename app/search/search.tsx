'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { CiSearch } from 'react-icons/ci'
import styles from './styles.module.scss'
import { debounce } from 'lodash'

const Search = () => {
  const pathname = usePathname()
  const router = useRouter()
  const [search, setSearch] = useState('')

  const debouncedSearch = debounce(query => {
    router.push(`${pathname}?search=${query}`)
  }, 300)

  useEffect(() => {
    setSearch('')

    const clearSearchParam = () => {
      const urlParams = new URLSearchParams(window.location.search)
      if (urlParams.has('search')) {
        urlParams.delete('search')
        router.replace(`${pathname}?${urlParams.toString()}`)
      }
    }

    clearSearchParam()

    return () => {
      clearSearchParam()
    }
  }, [pathname, router])

  useEffect(() => {
    if (search) {
      debouncedSearch(search)
    }
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
