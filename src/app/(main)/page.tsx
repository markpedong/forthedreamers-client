// import { GoDotFill } from 'react-icons/go'
// import { FaCircleDot } from 'react-icons/fa6'
import { Poppins, Roboto_Condensed } from 'next/font/google'
import Image from 'next/image'
import { getProducts, getWebsiteData } from '@/api'
import classNames from 'classnames'

import Marquee from '@/components/marquee'
import Testimonials from '@/components/testimonials'
import styles from '@/styles/styles.module.scss'

import CityProduct from './components/city-product'
import Products from './components/products'

const roboto = Roboto_Condensed({ weight: ['300', '800'], subsets: ['latin'] })
const poppins = Poppins({ weight: ['400', '600', '800'], subsets: ['latin'] })

const Home = async () => {
  const [products, web] = await Promise.all([getProducts({}), getWebsiteData({})])
  const website = web?.data

  return (
    <div>
      <div
        className={classNames(styles.mainWrapper)}
        style={{
          backgroundImage: `url(${website?.landing_image1})`,
        }}
      >
        {/* <div className={styles.timelessContainer}>
					<span>timeless silhouettes</span>
					<span className={roboto.className}>live now</span>
					<div>
						<FaCircleDot />
						<GoDotFill />
					</div>
				</div> */}
      </div>
      <Products products={products?.data ?? []} />
      <Marquee text={website?.marquee_text ?? ""} />
      <div className={styles.dudeWrapper}>
        <Image src={website?.landing_image2 ?? ""} alt="" height={1000} width={1000} />
      </div>
      <div className={styles.afterProductWrapper}>
        <div className={styles.header}>
          <span className={poppins.className}>FOR THE DREAMERS CITY</span>
          <span className={roboto.className}>Inspired by the vibrant aesthetics of the urban and the cozy spirit of a hometown.</span>
        </div>
        <CityProduct products={products?.data ?? []} />
      </div>
      <div className={styles.dudeWrapper}>
        <Image src={website?.landing_image3 ?? ""} alt="" height={1000} width={1000} />
      </div>
      <Testimonials />
    </div>
  )
}

export default Home
