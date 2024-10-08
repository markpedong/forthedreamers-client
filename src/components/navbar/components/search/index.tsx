'use client'

import { FC, useState } from 'react'
import { useRouter } from 'next/navigation'
import { STALE_TIME } from '@/constants'
import { useQuery } from '@tanstack/react-query'
import { useDebounce, useLockBodyScroll } from '@uidotdev/usehooks'
import classNames from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import { SF_PRO_DISPLAY } from 'public/fonts'
import { IoIosCloseCircle } from 'react-icons/io'

import { getCollections, getProducts } from '@/lib/server'
import Drawer from '@/components/drawer'
import { Question } from '@/components/page-components'

import { SearchProduct } from '../../products'
import styles from './styles.module.scss'

const Search: FC<{ setSearch: () => void }> = ({ setSearch }) => {
  const [value, setValue] = useState('')
  const { push } = useRouter()
  const delayedValue = useDebounce(value, 500)
  const { data: products } = useQuery({
    queryKey: ['search', delayedValue?.toLowerCase()],
    staleTime: STALE_TIME,
    enabled: !!delayedValue,
    queryFn: async () => await getProducts({ search: delayedValue?.toLowerCase() }),
  })
  const { data: collections } = useQuery({
    queryKey: ['collections'],
    staleTime: Infinity,
    queryFn: async () => await getCollections({}),
  })

  useLockBodyScroll()
  return (
    <Drawer>
      <div className="h-full fcol">
        <div className={classNames(styles.header, SF_PRO_DISPLAY.className)}>
          <input placeholder="Search for anything" value={value} onChange={e => setValue(e.target.value || '')} />
          <IoIosCloseCircle onClick={setSearch} color="black" />
        </div>
        <AnimatePresence>
          {!!products?.length && value !== '' && (
            <>
              <div className={classNames(styles.suggestions, SF_PRO_DISPLAY.className)}>
                <motion.span className={styles.suggestions__header} initial={{ opacity: 0 }} exit={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  SUGGESTIONS
                </motion.span>
                <motion.div
                  className={styles.suggestions__container}
                  initial={{ x: 100, opacity: 0 }}
                  exit={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                >
                  {collections?.slice(0, 4)?.map(collection => (
                    <span className={styles.suggestions__item} onClick={() => push(`/collection/${collection?.id}`)}>
                      {collection?.name}
                    </span>
                  ))}
                </motion.div>
              </div>
              <Question normal question="PRODUCTS" className={styles.productHeader} />
              <motion.div
                className={styles.products}
                initial={{ y: 100, opacity: 0 }}
                exit={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
              >
                {products?.map(product => <SearchProduct product={product} setSearch={setSearch} key={product?.id} />)}
              </motion.div>
              <motion.div
                whileTap={{ scale: 0.97 }}
                className={classNames(styles.footer, SF_PRO_DISPLAY.className)}
                onClick={() => {
                  push(`/search?search=${delayedValue?.toLowerCase()}`)
                  setSearch()
                }}
              >
                view all results
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </Drawer>
  )
}

export default Search
