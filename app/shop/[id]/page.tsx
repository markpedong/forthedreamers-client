import { getProductDetails, getVariations } from '@/api'

import { getProducts } from '@/lib/server'

import Product from './product'

export async function generateStaticParams() {
  const products =
    (await getProducts({ passCookies: false }))?.map(product => ({
      id: product.id
    })) || []

  return products
}

const Page = async ({ params }) => {
  const { id } = await params
  const [product, variations] = await Promise.all([
    getProductDetails({ product_id: id }),
    getVariations({ product_id: id })
  ])

  return <Product product={product?.data!} variations={variations?.data!} />
}

export default Page
