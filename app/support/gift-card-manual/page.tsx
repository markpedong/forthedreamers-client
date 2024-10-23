'use client'

import { FAQ_ANSWERS, TERMS_CONDITIONS } from '@/app/constants'
import { DynamicListAnswers } from '@/components/dynamic-import'
import { PageTitle } from '@/components/page-components'
import classNames from 'classnames'
import Image from 'next/image'
import { SF_PRO_DISPLAY } from 'public/fonts'
import styles from '../styles.module.scss'

const Page = () => {
  return (
    <div className={styles.mainWrapper}>
      <PageTitle title="GIFT CARD MANUAL" />
      <PageTitle title="TERMS AND CONDITIONS" medium className="text-[1.5rem]" />
      <DynamicListAnswers answers={TERMS_CONDITIONS} />
      <div className="mt-10" />
      <PageTitle title="FAQ'S" medium className="text-[1.5rem]" />
      <DynamicListAnswers answers={FAQ_ANSWERS} />
      <PageTitle title="HOW TO USE THE GIFT CARD (WEB)" medium className="text-[1.5rem]" />
      <ul className={classNames(styles.answers, SF_PRO_DISPLAY.className)}>
        <li>After receiving your UNIQUE GIFT CARD CODE, you may shop in our webstore.</li>
        <li>
          Proceed to Check Out and you will be directed to Customer Information Page with the Gift Card option on the
          right side.
        </li>
        <Image src={'/assets/images/web-step3.webp'} width={500} height={300} alt="web_step3" />
        <li>
          Enter your UNIQUE GIFT CARD CODE and click APPLY. Amount will be automatically deducted on your SUB-TOTAL
          (Shipping will be calculated at next step).
        </li>
        <Image src={'/assets/images/web-step4.webp'} width={500} height={300} alt="web_step4" />
        <li>Continue to Shipping and Payment pages with your new total amount and then Complete Order.</li>
      </ul>
      <PageTitle title="HOW TO USE GIFT CARD (Mobile)" medium className="text-[1.5rem]" />
      <ul className={styles.answers}>
        <li>After receiving your UNIQUE GIFT CARD CODE, you may shop in our webstore then proceed to Check Out.</li>
        <Image src={'/assets/images/mobile-step1.webp'} width={500} height={300} alt="mobile_step1" />
        <li>Fill out Customer Information and Shipping pages then click Continue to Payment.</li>
        <Image src={'/assets/images/mobile-step2.webp'} width={500} height={300} alt="mobile_step2" />
        <li>
          On the Payments page, enter your UNIQUE GIFT CARD CODE and click APPLY. Amount will be automatically deducted
          on your TOTAL (Shipping fee included).
        </li>
        <Image src={'/assets/images/mobile-step3.webp'} width={500} height={300} alt="mobile_step3" />
        <li>Complete order.</li>
        <Image src={'/assets/images/mobile-step4.webp'} width={500} height={300} alt="mobile_step4" />
      </ul>
    </div>
  )
}

export default Page
