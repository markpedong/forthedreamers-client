import React from 'react'

import InputWithLabel from '@/components/inputWithLabel'

import styles from '../styles.module.scss'

const Profile = () => {
  return (
    <div className={styles.profileWrapper}>
      <div className="flex gap-2">
        <InputWithLabel key="first_name" label="First Name" placeholder="John" type="email" />
        <InputWithLabel key="last_name" label="Last Name" placeholder="Mayer" type="email" />
      </div>
      <div className="flex gap-2">
        <InputWithLabel key="phone" label="Phone" placeholder="(+63)9123456789" type="email" />
        <InputWithLabel key="email" label="Email" placeholder="Example@gmail.com" type="email" />
      </div>
      <div className="flex gap-2">
        <InputWithLabel key="username" label="Username" placeholder="johnmayer" type="email" />
        <InputWithLabel key="password" label="Password" placeholder="Atleast 8 characters" type="password" />
      </div>
      <div className={styles.btnContainer}>
        <div>Reset</div>
        <div>Submit</div>
      </div>
    </div>
  )
}

export default Profile
