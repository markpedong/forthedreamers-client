'use client'

import classNames from 'classnames'
import { motion } from 'framer-motion'
import { FC } from 'react'

import { SF_PRO_DISPLAY } from 'public/fonts'
import styles from './styles.module.scss'

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
    <div className={classNames(styles.marquee, styles.landing, SF_PRO_DISPLAY.className)}>
      <motion.div className={styles.track} animate="animate" variants={marqueeVariants}>
        {text}
      </motion.div>
    </div>
  )
}

export default Marquee
