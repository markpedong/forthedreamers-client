import classNames from 'classnames'
import { MdFilterListAlt } from 'react-icons/md'

import Header from '@/components/header'
import { PageTitle } from '@/components/page-components'
import Product from '@/components/product'

import { SF_PRO_DISPLAY } from 'public/fonts'
import Search from './search'
import styles from './styles.module.scss'
import { getProducts } from '@/lib/server'

interface PageProps {
  searchParams?: {
    search?: string
  }
}

const Page = async ({ searchParams }: PageProps) => {
  const search = searchParams && typeof searchParams.search === 'string' ? searchParams.search : ''
  const products = await getProducts({ search })

  return (
    <div className={classNames(styles.mainWrapper, SF_PRO_DISPLAY.className)}>
      <Header arr={['HOME', 'SEARCH']} />
      <PageTitle title="SEARCH RESULTS" className="!py-5 !text-center" medium />
      <Search />
      <div className={styles.searchText}>{search !== '' && `${products?.length ?? 0} results found for "${search}"`}</div>
      <div className={styles.filterContainer}>
        <div>
          <MdFilterListAlt />
          <span>FILTER AND SORT</span>
        </div>
        <span>{products?.length ?? 0} results</span>
      </div>
      <div className={styles.productWrapper}>{products?.map(product => <Product product={product} key={product?.id} />)}</div>
    </div>
  )
}

export default Page
