'use client'

import React, { FC, useState } from 'react'
import { TAddressItem } from '@/api/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { getAddress } from '@/lib/server'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Form } from '@/components/ui/form'
import InputWithLabel from '@/components/inputWithLabel'

import styles from '../styles.module.scss'

interface AddressProps extends React.HTMLAttributes<HTMLDivElement> {
  data?: TAddressItem
}

type TAddressSchema = z.infer<typeof addressSchema>

const addressSchema = z.object({
  first_name: z.string({ message: 'First Name is required' }).min(3, 'First Name should be at least 3 characters'),
  last_name: z.string({ message: 'Last Name is required' }).min(3, 'Last Name should be at least 3 characters'),
  phone: z.string({ message: 'Phone is required' }).min(9, 'Phone should be at least 9 characters'),
  address: z.string({ message: 'Address is required' }).min(3, 'Address should be at least 3 characters'),
})

const AddressItem: FC<AddressProps> = ({ data, ...props }) => {
  return (
    <div className={styles.detailsContainer} {...props}>
      <div className={styles.details}>
        <div>
          <span>
            {data?.first_name} {data?.first_name}
          </span>{' '}
          | <span>{data?.phone}</span>
        </div>
        <div>{data?.address}</div>
        <div>
          <span className={data?.is_default === 1 ? styles.activeAddress : ''}>Default</span>
          <span className={data?.is_default === 2 ? styles.activeAddress : ''}>Pickup Address</span>
          <span className={data?.is_default === 3 ? styles.activeAddress : ''}>Return Address</span>
        </div>
      </div>
      <div className={styles.actions}>
        <motion.span whileTap={{ scale: 0.95 }}>EDIT</motion.span>
        <motion.span whileTap={{ scale: 0.95 }}>DELETE</motion.span>
      </div>
    </div>
  )
}

const Address = () => {
  const [position, setPosition] = useState('bottom')

  const { data: address = [] } = useQuery({
    queryKey: ['address'],
    queryFn: async () => {
      const res = await getAddress()

      return res ?? []
    },
  })
  const form = useForm<TAddressSchema>({
    resolver: zodResolver(addressSchema),
    defaultValues: { address: '', first_name: '', last_name: '', phone: '' },
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form

  const onSubmitForm = data => {
    console.log(data)
  }

  const onError = (errors: any) => {
    console.log(errors)
  }

  return (
    <div className={styles.addressWrapper}>
      <Dialog>
        <DialogTrigger asChild>
          <div className={classNames(styles.btnContainer, '!mt-0')}>
            <motion.button whileTap={{ scale: 0.95 }} type="submit">
              New Address
            </motion.button>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[550px]">
          <Form {...form}>
            <form className={styles.profileWrapper} onSubmit={handleSubmit(onSubmitForm, onError)}>
              <DialogHeader>
                <DialogTitle>Add New Address</DialogTitle>
                <DialogDescription>
                  Enter your new address information and click save to add it to your list of addresses.
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-2 sm:flex-row">
                <InputWithLabel
                  key="first_name"
                  label="First Name"
                  placeholder="John"
                  type="text"
                  form={form}
                  err={errors?.first_name?.message}
                  {...register('first_name')}
                />
                <InputWithLabel
                  key="last_name"
                  label="Last Name"
                  placeholder="Miller"
                  type="text"
                  form={form}
                  err={errors?.last_name?.message}
                  {...register('last_name')}
                />
              </div>
              <InputWithLabel
                key="phone"
                label="Phone"
                placeholder="(+63)9123456789"
                type="text"
                form={form}
                err={errors?.phone?.message}
                {...register('phone')}
              />
              <InputWithLabel
                key="address"
                label="Address"
                placeholder=" 1234 Main St Apt 1 San Francisco, CA 94107"
                type="text"
                form={form}
                err={errors?.address?.message}
                textarea
                {...register('address')}
              />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">Open</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="!left-[10rem] w-[27rem]">
                  <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup className="!left-[1rem]" value={position} onValueChange={setPosition}>
                    <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
              <DialogFooter>
                <Button type="submit">Save</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      {address?.map(item => <AddressItem data={item} key={item?.id} />)}
    </div>
  )
}

export default Address
