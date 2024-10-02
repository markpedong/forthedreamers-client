'use client'

import React, { FC, ReactNode } from 'react'
import { Poppins, Roboto_Condensed } from 'next/font/google'
import classNames from 'classnames'

import styles from './styles.module.scss'

const poppins = Poppins({ weight: ['400', '600', '800'], subsets: ['latin'] })
const roboto = Roboto_Condensed({ weight: ['400', '800'], subsets: ['latin'] })

export const PageTitle: FC<{ title: string; medium?: boolean; className?: string }> = ({ title, medium, className }) => {
  return (
    <div className={classNames(styles.pageTitle, poppins.className, className)} data-medium={medium}>
      {title}
    </div>
  )
}

export const Question: FC<{ question?: string; className?: string; normal?: boolean; children?: ReactNode }> = ({
  question,
  className,
  normal,
  children,
}) => {
  const commonClassName = classNames(className, roboto.className, `font-${normal ? 'normal' : 'bold'}`, styles.question)

  return question ? (
    <div className={commonClassName} dangerouslySetInnerHTML={{ __html: question }} />
  ) : (
    <div className={commonClassName}>{children}</div>
  )
}

export const ListAnswers: FC<{ answers: ReactNode[]; numbers?: boolean; className?: string }> = ({ answers, numbers, className }) => {
  return (
    <ul className={classNames(styles.answers, roboto.className, className)} data-numbers={numbers}>
      {answers?.map(q => <li key={q?.toString()} dangerouslySetInnerHTML={{ __html: q! }} />)}
    </ul>
  )
}
