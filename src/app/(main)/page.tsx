import { getProducts, getTestimonials, getWebsiteData } from '@/api'
import Image from 'next/image'

import { DCityProduct, DProducts } from '@/components/dynamic-import'
import Marquee from '@/components/marquee'
import Testimonials from '@/components/testimonials'
import styles from '@/styles/styles.module.scss'
import { poppins, SF_PRO_DISPLAY } from 'public/fonts'

const Home = async () => {
  const [products, web, testimonials] = await Promise.all([getProducts({}), getWebsiteData({}), getTestimonials({})])
  const website = web?.data

  return (
    <>
      <div
        className={styles.mainWrapper}
        style={{
          backgroundImage: `url(${website?.landing_image1})`,
        }}
      >
        {/* <div className={styles.timelessContainer}>
					<span>timeless silhouettes</span>
					<span className={SF_PRO_DISPLAY.className}>live now</span>
					<div>
						<FaCircleDot />
						<GoDotFill />
					</div>
				</div> */}
      </div>
      <DProducts products={products?.data ?? []} />
      <Marquee text={website?.marquee_text ?? ''} landing />
      <div className={styles.dudeWrapper}>
        <Image src={website?.landing_image2 ?? ''} alt="" height={300} width={300} sizes="100vw" />
      </div>
      <div className={styles.afterProductWrapper}>
        <div className={styles.header}>
          <span className={poppins.className}>FOR THE DREAMERS CITY</span>
          <span className={SF_PRO_DISPLAY.className}>Inspired by the vibrant aesthetics of the urban and the cozy spirit of a hometown.</span>
        </div>
        <DCityProduct products={products?.data ?? []} />
      </div>
      <div className={styles.dudeWrapper}>
        <Image src={website?.landing_image3 ?? ''} alt="" height={300} width={300} sizes="100vw" />
      </div>
      <Testimonials data={testimonials?.data ?? []} />
    </>
  )
}

export default Home
