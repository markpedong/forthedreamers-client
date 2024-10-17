import { FC, useState } from 'react'
import { deleteAddress } from '@/api'
import { AddressProps, TAddressItem } from '@/api/types'
import { addressTypes } from '@/constants'
import classNames from 'classnames'
import { toast } from 'sonner'

import { revalidate } from '@/lib/server'
import PopOver from '@/app/components/popover'
import { API_TAGS } from '@/app/constants/enums'

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
        <span className="btn" onClick={() => setCurrAddress(data as TAddressItem)}>
          EDIT
        </span>
        <PopOver
          handleOk={handleDelete}
          open={open}
          setOpen={setOpen}
          title="Are you sure you want to delete this address?"
          trigger={<span className="btn">DELETE</span>}
          key={data?.id}
        />
      </div>
    </div>
  )
}
