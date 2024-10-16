import dynamic from 'next/dynamic'

const DProduct = dynamic(() => import('@/components/product/index'), { loading: () => <></> })

const DProducts = dynamic(() => import('../app/components/products/index'), { loading: () => <></> })

const DCityProduct = dynamic(() => import('../app/components/city-product/index'), { loading: () => <></> })

const DynamicCareGuide = dynamic(() => import('../app/shop/[id]/components/care-guide'), { loading: () => <></> })

const DynamicShipping = dynamic(() => import('../app/shop/[id]/components/shipping'), { loading: () => <></> })

const DynamicReturns = dynamic(() => import('../app/shop/[id]/components/returns'), { loading: () => <></> })

const DynamicListAnswers = dynamic(() => import('../components/page-components/index').then(m => m.ListAnswers), {
  loading: () => <></>,
})

const DynamicCart = dynamic(() => import('../components/navbar/components/cart'), { loading: () => <></> })

const DynamicSearch = dynamic(() => import('../components/navbar/components/search'), { loading: () => <></> })

const DynamicProfile = dynamic(() => import('../app/account/components/profile'), { loading: () => <></>, ssr: false })

const DynamicAddress = dynamic(() => import('../app/account/components/address'), { loading: () => <></>, ssr: false })

const DynamicOrders = dynamic(() => import('../app/account/components/orders'), { loading: () => <></>, ssr: false })

const DynamicPaymentMethods = dynamic(() => import('../app/account/components/payment-methods'), {
  loading: () => <></>,
  ssr: false,
})

const DynamicReviews = dynamic(() => import('../app/account/components/reviews'), { loading: () => <></>, ssr: false })

export {
  DProduct,
  DProducts,
  DCityProduct,
  DynamicCareGuide,
  DynamicListAnswers,
  DynamicReturns,
  DynamicShipping,
  DynamicCart,
  DynamicSearch,
  DynamicProfile,
  DynamicAddress,
  DynamicOrders,
  DynamicPaymentMethods,
  DynamicReviews,
}
