'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useAppSelector } from '@/redux/store'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { GetProp, message, Upload, UploadProps } from 'antd'
import { FaAddressCard, FaRegCreditCard, FaShoppingCart, FaStar, FaUser } from 'react-icons/fa'

import { Command, CommandGroup, CommandItem, CommandList, CommandSeparator } from '@/components/ui/command'
import { Address, Orders, PaymentMethods, Profile, Reviews } from '@/components/dynamic-import'
import { PageTitle } from '@/components/page-components'

import styles from '../styles.module.scss'

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]

const menus = [
  {
    id: 1,
    name: 'Profile',
    icon: <FaUser className="mr-2 h-4 w-4" />,
  },
  {
    id: 2,
    name: 'Address',
    icon: <FaAddressCard className="mr-2 h-4 w-4" />,
  },
  {
    id: 3,
    name: 'Payment Methods',
    icon: <FaRegCreditCard className="mr-2 h-4 w-4" />,
  },
  {
    id: 4,
    name: 'Orders',
    icon: <FaShoppingCart className="mr-2 h-4 w-4" />,
  },
  {
    id: 5,
    name: 'Reviews',
    icon: <FaStar className="mr-2 h-4 w-4" />,
  },
]

const AccountPage = () => {
  const dp = useAppSelector(s => s.userData.user?.image)
  const [currTab, setCurrTab] = useState(1)
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState<string>(dp)

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  )

  const beforeUpload = (file: FileType) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!')
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!')
    }
    return isJpgOrPng && isLt2M
  }

  return (
    <div className={styles.mainWrapper}>
      <PageTitle title={menus[currTab - 1]?.name} medium className="!select-none !text-[1.3rem] !capitalize" />
      <div className={styles.menuWrapper}>
        {/* causes error on console #incorrect use of label */}
        <Command className="max-w-[200px] rounded-lg border shadow-md">
          <CommandList>
            <CommandGroup heading="Display Picture">
              <Upload
                className={`!flex justify-center ${currTab !== 1 && '!pointer-events-none'}`}
                listType="picture-circle"
                name="avatar"
                showUploadList={false}
                beforeUpload={beforeUpload}
                action={async e => {
                  setLoading(true)
                  setImageUrl('')

                  try {
                    // const res = await uploadImages(e)
                    // setImageUrl(res?.data?.url)

                    // return res?.data?.url
                    return ''
                  } finally {
                    setLoading(false)
                  }
                }}
              >
                {imageUrl ? (
                  <Image priority className={styles.profileImage} src={imageUrl} alt="avatar" width={100} height={100} />
                ) : (
                  uploadButton
                )}
              </Upload>
            </CommandGroup>
            <CommandGroup heading="Settings">
              {menus?.slice(0, 3)?.map(menu => (
                <CommandItem className="cursor-pointer" key={menu.id} onSelect={() => setCurrTab(menu.id)}>
                  {menu.icon}
                  <span>{menu.name}</span>
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Other Details">
              {menus?.slice(3)?.map(menu => (
                <CommandItem className="cursor-pointer" key={menu.id} onSelect={() => setCurrTab(menu.id)}>
                  {menu.icon}
                  <span>{menu.name}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
        <div className={styles.detailsWrapper}>
          {currTab === 1 && <Profile />}
          {currTab === 2 && <Address />}
          {currTab === 3 && <PaymentMethods />}
          {currTab === 4 && <Orders />}
          {currTab === 5 && <Reviews />}
        </div>
      </div>
    </div>
  )
}

export default AccountPage
