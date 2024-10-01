import React from 'react'

import InputWithLabel from '@/components/inputWithLabel'

type Props = {}

const Profile = (props: Props) => {
  return (
    <div>
      <InputWithLabel key="email" label="Email" placeholder="Example@gmail.com" type="email" />
      <InputWithLabel key="email" label="Email" placeholder="Example@gmail.com" type="email" />
      <InputWithLabel key="email" label="Email" placeholder="Example@gmail.com" type="email" />
      <InputWithLabel key="email" label="Email" placeholder="Example@gmail.com" type="email" />
    </div>
  )
}

export default Profile
