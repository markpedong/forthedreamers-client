import dynamic from 'next/dynamic'

const DProduct = dynamic(() => import('@/components/product/index'), { loading: () => <></> })

const DProducts = dynamic(() => import('../app/(main)/components/products/index'), { loading: () => <></> })

const DCityProduct = dynamic(() => import('../app/(main)/components/city-product/index'), { loading: () => <></> })


export { DProduct, DProducts, DCityProduct }
