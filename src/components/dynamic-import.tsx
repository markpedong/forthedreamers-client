import dynamic from 'next/dynamic'

const DProduct = dynamic(() => import('@/components/product/index'), { loading: () => <></> })

const DProducts = dynamic(() => import('../app/(main)/components/products/index'), { loading: () => <></> })

const DCityProduct = dynamic(() => import('../app/(main)/components/city-product/index'), { loading: () => <></> })

const DynamicCareGuide = dynamic(() => import('../app/(main)/shop/[id]/components/care-guide'), { loading: () => <></> })

const DynamicListAnswers = dynamic(() => import('../components/page-components/index').then(m => m.ListAnswers), { loading: () => <></> })

export { DProduct, DProducts, DCityProduct, DynamicCareGuide, DynamicListAnswers }
