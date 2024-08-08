'use client'

import React, { FC } from 'react'
import { Roboto_Condensed } from 'next/font/google'
import classNames from 'classnames'
import { motion } from 'framer-motion'

import styles from './styles.module.scss'

const roboto = Roboto_Condensed({ weight: ['300', '800'], subsets: ['latin'] })

const Marquee: FC<{ text: string; landing?: boolean }> = ({ text, landing }) => {
  const marqueeVariants = {
    animate: {
      x: ['1000%', '-100%'],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: 'loop',
          duration: landing ? 7 : 3,
          ease: 'linear',
        },
      },
    },
  }

  return (
    <div className={classNames(styles.marquee, styles.landing, roboto.className)}>
      <motion.div className={styles.track} animate="animate" variants={marqueeVariants}>
        {text}
      </motion.div>
    </div>
  )
}

export default Marquee
