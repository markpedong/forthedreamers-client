'use client'

import { FC, useEffect, useState } from 'react'
import Image from 'next/image'
import { FileType, OrderItems } from '@/api/types'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { message, Upload } from 'antd'
import { FaAddressCard, FaRegCreditCard, FaShoppingCart, FaStar, FaUser } from 'react-icons/fa'

import { Command, CommandGroup, CommandItem, CommandList, CommandSeparator } from '@/components/ui/command'
import {
  DynamicAddress,
  DynamicOrders,
  DynamicPaymentMethods,
  DynamicProfile,
  DynamicReviews,
} from '@/components/dynamic-import'
import { PageTitle } from '@/components/page-components'

import styles from '../../styles.module.scss'
import { setBeforeCheckoutPage } from '@/redux/features/appData'

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

const AccountPage: FC<{ orders: OrderItems[] }> = ({ orders }) => {
  const dp = useAppSelector(s => s.userData.user?.image)
  const [currTab, setCurrTab] = useState(4)
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState<string>(dp)
  const beforeCheckoutPage = useAppSelector(s => s.appData.beforeCheckoutPage)
  const dispatch = useAppDispatch()

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

  useEffect(() => {
    if (beforeCheckoutPage === '/checkout') {
      dispatch(setBeforeCheckoutPage('/'))
      setCurrTab(4)
    }
  }, [])

  return (
    <div className={styles.mainWrapper}>
      <PageTitle title={menus[currTab - 1]?.name} medium className="!select-none !text-[1.3rem] !capitalize" />
      <div className={styles.menuWrapper}>
        {/* causes error on console #incorrect use of label */}
        <Command className={styles.command}>
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
                  <Image
                    priority
                    className={styles.profileImage}
                    src={imageUrl}
                    alt="avatar"
                    width={100}
                    height={100}
                  />
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
        <div className={styles.detailsWrapper} data-currtab={currTab}>
          {currTab === 1 && <DynamicProfile />}
          {currTab === 2 && <DynamicAddress />}
          {currTab === 3 && <DynamicPaymentMethods />}
          {currTab === 4 && <DynamicOrders orders={orders} />}
          {currTab === 5 && <DynamicReviews />}
        </div>
      </div>
    </div>
  )
}

export default AccountPage
