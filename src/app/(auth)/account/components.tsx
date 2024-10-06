import { FC, useState } from 'react'
import { deleteAddress } from '@/api'
import { AddressProps, TAddressItem } from '@/api/types'
import { addressTypes } from '@/constants'
import classNames from 'classnames'
import { motion } from 'framer-motion'
import { RiErrorWarningFill } from 'react-icons/ri'
import { toast } from 'sonner'

import { revalidate } from '@/lib/server'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { API_TAGS } from '@/app/(main)/constants/enums'

import styles from '../styles.module.scss'

export const AddressItem: FC<AddressProps> = ({ data, refetch, setCurrAddress, ...props }) => {
  const [open, setOpen] = useState(false)

  const handleDelete = async () => {
    const res = await deleteAddress({ id: data?.id })
    if (res?.status === 200) {
      setOpen(false)
      revalidate(API_TAGS.ADDRESS)
      toast('address deleted')
      refetch()
    }
  }

  return (
    <div className={styles.detailsContainer} {...props}>
      <div className={styles.details}>
        <div>
          <span>
            {data?.first_name} {data?.last_name}
          </span>{' '}
          | <span>{data?.phone}</span>
        </div>
        <div>{data?.address}</div>
        <div className={styles.addressType}>
          {addressTypes?.slice(1).map(type => (
            <span
              key={type.value}
              className={classNames({
                [styles.activeAddress]: data?.is_default === +type.value,
              })}
            >
              {type.label}
            </span>
          ))}
        </div>
      </div>
      <div className={styles.actions}>
        <motion.span whileTap={{ scale: 0.95 }} onClick={() => setCurrAddress(data as TAddressItem)}>
          EDIT
        </motion.span>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger>
            <motion.span whileTap={{ scale: 0.95 }}>DELETE</motion.span>
          </PopoverTrigger>
          <PopoverContent className="w-[10rem] flex-col p-1" side="top">
            <div className="flex items-center gap-2">
              <RiErrorWarningFill color="rgb(153 27 27)" size={20} />
              <span className="text-[0.8rem] leading-4">Are you sure you want to delete this address?</span>
            </div>
            <div className="mt-3 flex items-center justify-end gap-2">
              <motion.span
                whileTap={{ scale: 0.95 }}
                onClick={handleDelete}
                className="cursor-pointer select-none rounded-sm bg-red-800 px-2 py-1 text-[0.6rem] text-white"
              >
                Yes
              </motion.span>
              <motion.span
                whileTap={{ scale: 0.95 }}
                onClick={() => setOpen(false)}
                className="cursor-pointer select-none rounded-sm bg-gray-800 px-2 py-1 text-[0.6rem] text-white"
              >
                No
              </motion.span>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}
