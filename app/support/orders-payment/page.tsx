import { AMEND_ANSWERS, PAYMENT_ANSWERS } from '@/app/constants'
import { DynamicListAnswers } from '@/components/dynamic-import'
import { PageTitle, Question } from '@/components/page-components'
import Image from 'next/image'
import styles from '../styles.module.scss'

const Page = () => {
  return (
    <div className={styles.mainWrapper}>
      <PageTitle title="ORDERS & PAYMENT" />
      <Question question="WHAT PAYMENT METHODS DO YOU ACCEPT?" />
      <DynamicListAnswers answers={PAYMENT_ANSWERS} />
      <Image
        className={styles.payments}
        src={'/assets/images/payments.webp'}
        alt="payments"
        width={500}
        height={1000}
      />
      <Question question="CAN I AMEND OR CANCEL MY ORDER?" />
      <DynamicListAnswers answers={AMEND_ANSWERS} />
    </div>
  )
}

export default Page
