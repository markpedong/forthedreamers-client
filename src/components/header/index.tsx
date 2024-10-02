'use client'
import classNames from 'classnames'
import { SF_PRO_DISPLAY } from 'public/fonts'
import { FC } from 'react'


const Header: FC<{ arr: string[] }> = ({ arr }) => {
	return (
		<div className={classNames('flex gap-3', SF_PRO_DISPLAY.className)}>
			{arr?.map((q, i) => (
				<div className="flex gap-4" key={`${q}${i}`}>
					<span className="underline underline-offset-4 text-[0.75rem] last:no-underline">{q}</span>
					{i !== arr.length - 1 && <span className="no-underline">/</span>}
				</div>
			))}
		</div>
	)
}

export default Header
