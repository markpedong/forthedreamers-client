'use client'

import { useState } from 'react'
import { FaAddressCard, FaRegCreditCard, FaShoppingCart, FaStar, FaUser } from 'react-icons/fa'

import { Command, CommandGroup, CommandItem, CommandList, CommandSeparator } from '@/components/ui/command'
import { PageTitle } from '@/components/page-components'

import Address from './address'
import Orders from './orders'
import PaymentMethods from './payment-methods'
import Profile from './profile'
import Reviews from './reviews'
import styles from './styles.module.scss'

const AccountPage = () => {
  const [currTab, setCurrTab] = useState(1)

  return (
    <div className={styles.mainWrapper}>
      <PageTitle title="account" medium className="!text-[1.5rem] !capitalize" />
      <div className={styles.menuWrapper}>
        <Command className="max-w-[200px] rounded-lg border shadow-md">
          <CommandList>
            <CommandGroup heading="Settings">
              <CommandItem className="cursor-pointer" onSelect={() => setCurrTab(1)}>
                <FaUser className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </CommandItem>
              <CommandItem className="cursor-pointer" onSelect={() => setCurrTab(2)}>
                <FaAddressCard className="mr-2 h-4 w-4" />
                <span>Address</span>
              </CommandItem>
              <CommandItem className="cursor-pointer" onSelect={() => setCurrTab(3)}>
                <FaRegCreditCard className="mr-2 h-4 w-4" />
                <span>Payment Methods</span>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Other Details">
              <CommandItem className="cursor-pointer" onSelect={() => setCurrTab(4)}>
                <FaShoppingCart className="mr-2 h-4 w-4" />
                <span>Orders</span>
              </CommandItem>
              <CommandItem className="cursor-pointer" onSelect={() => setCurrTab(5)}>
                <FaStar className="mr-2 h-4 w-4" />
                <span>Reviews</span>
              </CommandItem>
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
