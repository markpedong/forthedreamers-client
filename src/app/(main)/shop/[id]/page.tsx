import { getProductDetails, getVariations } from '@/api'
import Product from './product'

const Page = async ({ params }: { params: { id: string } }) => {
  const [product, variations] = await Promise.all([getProductDetails({ product_id: params.id }), getVariations({ product_id: params.id })])

  return <Product product={product?.data!} variations={variations?.data!} />
}

export default Page
