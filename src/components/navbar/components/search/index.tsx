'use client'

import { FC, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { useLockBodyScroll } from '@uidotdev/usehooks'
import classNames from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import { SF_PRO_DISPLAY } from 'public/fonts'
import { IoIosCloseCircle } from 'react-icons/io'

import { getProducts } from '@/lib/server'
import Drawer from '@/components/drawer'
import { Question } from '@/components/page-components'

import SearchProduct from '../../products'
import styles from './styles.module.scss'

const Search: FC<{ setSearch: () => void }> = ({ setSearch }) => {
  const [value, setValue] = useState('')
  const { push } = useRouter()
  const sample = ['hoodie', 'hoodies', 'casual', 'apparel']
  const { data: products } = useQuery({
    queryKey: ['search', value?.toLowerCase()],
    staleTime: 1000 * 60 * 10,
    queryFn: async () => {
      const res = await getProducts({ search: value?.toLowerCase() })

      return res
    },
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
                  {sample?.map(q => <span className={styles.suggestions__item}>{q}</span>)}
                </motion.div>
              </div>
              <Question normal question="PRODUCTS" className={styles.productHeader} />
              <motion.div
                className={styles.products}
                initial={{ y: 100, opacity: 0 }}
                exit={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
              >
                {products?.map(product => <SearchProduct isCart={false} product={product} setSearch={setSearch} />)}
              </motion.div>
              <motion.div
                whileTap={{ scale: 0.97 }}
                className={classNames(styles.footer, SF_PRO_DISPLAY.className)}
                onClick={() => push(`/search?search=${value?.toLowerCase()}`)}
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
