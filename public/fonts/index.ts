import { Darker_Grotesque, Poppins, Roboto_Condensed } from 'next/font/google'
import localFont from 'next/font/local'

export const roboto = Roboto_Condensed({ weight: ['200', '300', '400', '500', '600', '800'], subsets: ['latin'] })

export const poppins = Poppins({ weight: ['400', '600', '800'], subsets: ['latin'] })

export const darkerGrotesque = Darker_Grotesque({ weight: ['500', '600', '700', '800', '900', '300', '400'], subsets: ['latin'] })

export const SF_PRO_DISPLAY = localFont({
  src: [
    {
      path: './SF-Pro-Display-Light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: './SF-Pro-Display-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './SF-Pro-Display-Semibold.otf',
      weight: '500',
      style: 'normal',
    },
  ],
})
