import React, { FC } from 'react'
import { InfoItem } from '@/api/types'

import styles from '../styles.module.scss'

interface AddressProps extends React.HTMLAttributes<HTMLDivElement> {
  data?: InfoItem
}
const AddressItem: FC<AddressProps> = ({ data, ...props }) => {
  return (
    <div className={styles.addressContainer} {...props}>
      <div>
        <span>
          {data?.first_name} {data?.last_name}
        </span>{' '}
        | <span>+{data?.phone}</span>
      </div>
      <div>{data?.address}</div>
      {/* <div>
        {data?.house}, {data?.street}
      </div> */}
      {/* <div>
        {data?.city}, {data?.pin_code}
      </div> */}
      <div>
        <span className={data?.is_default === 1 ? styles.activeAddress : ''}>Default</span>
        <span className={data?.is_default === 2 ? styles.activeAddress : ''}>Pickup Address</span>
        <span className={data?.is_default === 3 ? styles.activeAddress : ''}>Return Address</span>
      </div>
    </div>
  )
}

const Address = () => {
  return (
    <div className={styles.addressWrapper}>
      <AddressItem />
      <AddressItem />
      <AddressItem />
      <AddressItem />
    </div>
  )
}

export default Address
