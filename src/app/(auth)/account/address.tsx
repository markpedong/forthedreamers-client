import React from 'react'

import styles from '../styles.module.scss'

type Props = {}

const AddressItem = (props: Props) => {
  return (
    <div className={styles.addressItemWrapper}>
      <div>asd</div>
    </div>
  )
}

const Address = (props: Props) => {
  return (
    <div className={styles.addressWrapper}>
      <AddressItem />
    </div>
  )
}

export default Address
