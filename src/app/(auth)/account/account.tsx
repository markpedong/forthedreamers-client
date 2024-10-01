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

const menus = [
  {
    id: 1,
    name: 'Profile',
    icon: <FaUser className="mr-2 h-4 w-4" />,
    component: <Profile />,
  },
  {
    id: 2,
    name: 'Address',
    icon: <FaAddressCard className="mr-2 h-4 w-4" />,
    component: <Address />,
  },
  {
    id: 3,
    name: 'Payment Methods',
    icon: <FaRegCreditCard className="mr-2 h-4 w-4" />,
    component: <PaymentMethods />,
  },
  {
    id: 4,
    name: 'Orders',
    icon: <FaShoppingCart className="mr-2 h-4 w-4" />,
    component: <Orders />,
  },
  {
    id: 5,
    name: 'Reviews',
    icon: <FaStar className="mr-2 h-4 w-4" />,
    component: <Reviews />,
  },
]

const AccountPage = () => {
  const [currTab, setCurrTab] = useState(1)

  return (
    <div className={styles.mainWrapper}>
      <PageTitle title="account" medium className="!text-[1.5rem] !capitalize" />
      <div className={styles.menuWrapper}>
        <Command className="max-w-[200px] rounded-lg border shadow-md">
          <CommandList>
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
