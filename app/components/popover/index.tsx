'use client'

import React from 'react'
import { RiErrorWarningFill } from 'react-icons/ri'

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

type Props = {
  trigger: React.ReactNode
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  title: string
  handleOk: () => void
}

const PopOver = ({ trigger, open, setOpen, title, handleOk }: Props) => {
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>{trigger}</PopoverTrigger>
      <PopoverContent className="w-[10rem] flex-col p-1" side="top">
        <div className="flex items-center gap-2">
          <RiErrorWarningFill color="rgb(153 27 27)" size={20} />
          <span className="text-[0.8rem] leading-4">{title}</span>
        </div>
        <div className="mt-3 flex items-center justify-end gap-2">
          <span
            onClick={handleOk}
            className="cursor-pointer select-none rounded-sm bg-red-800 px-2 py-1 text-[0.6rem] text-white btn"
          >
            Yes
          </span>
          <span
            onClick={() => setOpen(false)}
            className="cursor-pointer select-none rounded-sm bg-gray-800 px-2 py-1 text-[0.6rem] text-white btn"
          >
            No
          </span>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default PopOver
