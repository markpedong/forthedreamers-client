'use client'

import classNames from 'classnames'
import { FC, ReactNode } from 'react'

import { poppins, SF_PRO_DISPLAY } from 'public/fonts'
import styles from './styles.module.scss'

export const PageTitle: FC<{ title: string; medium?: boolean; className?: string }> = ({
  title,
  medium,
  className
}) => {
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
  children
}) => {
  const commonClassName = classNames(
    className,
    SF_PRO_DISPLAY.className,
    `font-${normal ? 'normal' : 'bold'}`,
    styles.question
  )

  return question ? (
    <div className={commonClassName} dangerouslySetInnerHTML={{ __html: question }} />
  ) : (
    <div className={commonClassName}>{children}</div>
  )
}

export const ListAnswers: FC<{ answers: ReactNode[]; numbers?: boolean; className?: string }> = ({
  answers,
  numbers,
  className
}) => {
  return (
    <ul className={classNames(styles.answers, SF_PRO_DISPLAY.className, className)} data-numbers={numbers}>
      {answers?.map(q => <li key={q?.toString()} dangerouslySetInnerHTML={{ __html: q! }} />)}
    </ul>
  )
}
