'use client'

import { useCallback, useEffect, useState } from 'react'
import { addNewAddress, updateAddress } from '@/api'
import { TAddressItem } from '@/api/types'
import { addressTypes } from '@/constants'
import { zodResolver } from '@hookform/resolvers/zod'
import { CheckIcon, ChevronDownIcon } from '@radix-ui/react-icons'
import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { getAddress, revalidate } from '@/api'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Command, CommandGroup, CommandItem, CommandList } from '@/components/ui/command'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Form } from '@/components/ui/form'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import InputWithLabel from '@/components/inputWithLabel'
import { API_TAGS } from '@/app/(main)/constants/enums'

import styles from '../styles.module.scss'
import { AddressItem } from './components'

type TAddressSchema = z.infer<typeof addressSchema>

const addressSchema = z.object({
  first_name: z.string({ message: 'First Name is required' }).min(3, 'First Name should be at least 3 characters'),
  last_name: z.string({ message: 'Last Name is required' }).min(3, 'Last Name should be at least 3 characters'),
  phone: z.string({ message: 'Phone is required' }).min(9, 'Phone should be at least 9 characters'),
  address: z.string({ message: 'Address is required' }).min(3, 'Address should be at least 3 characters'),
})

const Address = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [value, setValue] = useState('')
  const [currAddress, setCurrAddress] = useState<TAddressItem>()
  const { data: address = [], refetch } = useQuery({
    queryKey: ['addresses'],
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
    reset,
    setValue: setFormValue,
    formState: { errors },
  } = form

  const onSubmitForm = useCallback(
    async data => {
      const res = currAddress?.id
        ? await updateAddress({ ...data, user_id: currAddress?.user_id, id: currAddress?.id, is_default: +value })
        : await addNewAddress({ ...data, is_default: +value })

      if (res?.status === 200) {
        revalidate(API_TAGS.ADDRESS)
        toast(res?.message || 'Address added successfully', { duration: 1500 })
        refetch()
        reset()
        setValue('')
        setDropdownOpen(false)
        setIsModalOpen(false)
        setCurrAddress(undefined)
      }
    },
    [currAddress, refetch, reset, setValue, value],
  )

  const onError = (errors: any) => {
    console.log(errors)
  }

  useEffect(() => {
    reset()
    setValue('')
  }, [isModalOpen])

  useEffect(() => {
    if (currAddress?.id) {
      setFormValue('address', currAddress?.address)
      setFormValue('first_name', currAddress?.first_name)
      setFormValue('last_name', currAddress?.last_name)
      setFormValue('phone', currAddress?.phone)
      setValue(String(currAddress?.is_default))
    }
  }, [currAddress?.id])

  return (
    <div className={styles.addressWrapper}>
      <Dialog open={isModalOpen || !!currAddress?.id}>
        <DialogTrigger asChild>
          <div className={classNames(styles.btnContainer, styles.addAddressBtn, '!mt-0')}>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                currAddress?.id && setCurrAddress(undefined)
                setIsModalOpen(true)
              }}
            >
              New Address
            </motion.button>
          </div>
        </DialogTrigger>
        <DialogContent
          className="sm:max-w-[550px]"
          onClose={() => {
            setIsModalOpen(false)
            setCurrAddress(undefined)
          }}
        >
          <Form {...form}>
            <form className={styles.profileWrapper} onSubmit={handleSubmit(onSubmitForm, onError)}>
              <DialogHeader>
                <DialogTitle>Add New Address</DialogTitle>
                <DialogDescription>
                  Enter your new address information and click save to add it to your list of addresses.
                </DialogDescription>
              </DialogHeader>
              <div className="mt-[1rem] flex flex-col gap-2 sm:flex-row">
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
              <Popover open={dropdownOpen} onOpenChange={setDropdownOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" role="combobox" aria-expanded={dropdownOpen} className="mb-[2rem] w-full justify-between">
                    {value ? addressTypes.find(framework => framework.value === value)?.label : 'Select Address type...'}
                    <ChevronDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[29rem] p-0">
                  <Command>
                    <CommandList>
                      <CommandGroup>
                        {addressTypes.map(framework => (
                          <CommandItem
                            key={framework.value}
                            value={framework.value}
                            onSelect={currentValue => {
                              setValue(currentValue === value ? '' : currentValue)
                              setDropdownOpen(false)
                            }}
                          >
                            <CheckIcon className={cn('mr-2 h-4 w-4', value === framework.value ? 'opacity-100' : 'opacity-0')} />
                            {framework.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <DialogFooter>
                <Button type="submit">Save</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      <div className="divide-y-2">
        {address?.map(item => <AddressItem data={item} key={item?.id} refetch={refetch} setCurrAddress={setCurrAddress} />)}
      </div>
    </div>
  )
}

export default Address
