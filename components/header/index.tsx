'use client'
import classNames from 'classnames'
import { SF_PRO_DISPLAY } from 'public/fonts'
import { FC } from 'react'

const Header: FC<{ arr: string[] }> = ({ arr }) => {
  return (
    <div className={classNames('flex items-start gap-3', SF_PRO_DISPLAY.className)}>
      {arr?.map((q, i) => (
        <div className="flex gap-2" key={`${q}${i}`}>
          <div className="relative inline-block">
            <span className="text-gray-800 text-[0.75rem]">{q}</span>
            <span
              className={`absolute left-0 right-0 bottom-[0.3rem] h-[0.1rem] bg-gray-800 ${i === arr.length - 1 ? 'hidden' : ''} -mb-1`}
            ></span>
          </div>
          {i !== arr.length - 1 && <span className="no-underline">/</span>}
        </div>
      ))}
    </div>
  )
}

export default Header
