'use client'

import { useLockBodyScroll } from '@uidotdev/usehooks'
import classNames from 'classnames'
import { SF_PRO_DISPLAY } from 'public/fonts'
import { FC, useState } from 'react'
import { IoIosCloseCircle } from 'react-icons/io'

import { CARE_GUIDE_ANSWERS } from '@/constants/static'
import { CARE_GUIDE } from '@/constants/enums'
import Drawer from '@/components/drawer'
import { ListAnswers, Returns, Shipping } from '@/components/dynamic-import'

import styles from './styles.module.scss'

const CareGuide: FC<{ setOpenCareGuide: () => void; activeTab: string }> = ({ setOpenCareGuide, activeTab }) => {
  const [selectedTab, setSelectedTab] = useState(activeTab)
  const tabs = ['care guide', 'shipping', 'returns']

  useLockBodyScroll()

  return (
    <Drawer>
      <div className={classNames(styles.header, SF_PRO_DISPLAY.className)}>
        <span>PRODUCT INFORMATION</span>
        <IoIosCloseCircle onClick={setOpenCareGuide} />
      </div>
      <div className={classNames(styles.tabs, SF_PRO_DISPLAY.className)}>
        {tabs?.map(q => (
          <span key={q} onClick={() => setSelectedTab(q)} data-isActive={q === selectedTab}>
            {q}
          </span>
        ))}
      </div>
      <div className={styles.content}>
        {selectedTab === CARE_GUIDE.CARE_GUIDE && <ListAnswers answers={CARE_GUIDE_ANSWERS} />}
        {selectedTab === CARE_GUIDE.SHIPPING && <Shipping />}
        {selectedTab === CARE_GUIDE.RETURNS && <Returns />}
      </div>
    </Drawer>
  )
}

export default CareGuide
