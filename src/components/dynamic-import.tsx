import dynamic from 'next/dynamic'

const Product = dynamic(() => import('@/components/product/index'), { loading: () => <></> })

const Products = dynamic(() => import('../app/(main)/components/products/index'), { loading: () => <></> })

const CityProduct = dynamic(() => import('../app/(main)/components/city-product/index'), { loading: () => <></> })

const CareGuide = dynamic(() => import('../app/(main)/shop/[id]/components/care-guide'), { loading: () => <></> })

const Shipping = dynamic(() => import('../app/(main)/shop/[id]/components/shipping'), { loading: () => <></> })

const Returns = dynamic(() => import('../app/(main)/shop/[id]/components/returns'), { loading: () => <></> })

const ListAnswers = dynamic(() => import('../components/page-components/index').then(m => m.ListAnswers), { loading: () => <></> })

const Cart = dynamic(() => import('../components/navbar/components/cart'), { loading: () => <></> })

const Search = dynamic(() => import('../components/navbar/components/search'), { loading: () => <></> })

const Profile = dynamic(() => import('../app/(auth)/account/profile'), { loading: () => <></>, ssr: false })

const Address = dynamic(() => import('../app/(auth)/account/address'), { loading: () => <></>, ssr: false })

const Orders = dynamic(() => import('../app/(auth)/account/orders'), { loading: () => <></>, ssr: false })

const PaymentMethods = dynamic(() => import('../app/(auth)/account/payment-methods'), { loading: () => <></>, ssr: false })

const Reviews = dynamic(() => import('../app/(auth)/account/reviews'), { loading: () => <></>, ssr: false })

export {
  Product,
  Products,
  CityProduct,
  CareGuide,
  ListAnswers,
  Returns,
  Shipping,
  Cart,
  Search,
  Profile,
  Address,
  Orders,
  PaymentMethods,
  Reviews,
}
