'use client'

import { FC } from 'react'
import { useKeenSlider } from 'keen-slider/react'

import Testimonial from '../testimonial'

import 'keen-slider/keen-slider.min.css'

import { TTestimonials } from '@/api/types'

const Testimonials: FC<{ data: TTestimonials[] }> = ({ data }) => {
  const [sliderRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
    },
    [
      slider => {
        let timeout: ReturnType<typeof setTimeout>
        let mouseOver = false
        function clearNextTimeout() {
          clearTimeout(timeout)
        }
        function nextTimeout() {
          clearTimeout(timeout)
          if (mouseOver) return
          timeout = setTimeout(() => {
            slider.next()
          }, 2000)
        }
        slider.on('created', () => {
          slider.container.addEventListener('mouseover', () => {
            mouseOver = true
            clearNextTimeout()
          })
          slider.container.addEventListener('mouseout', () => {
            mouseOver = false
            nextTimeout()
          })
          nextTimeout()
        })
        slider.on('dragStarted', clearNextTimeout)
        slider.on('animationEnded', nextTimeout)
        slider.on('updated', nextTimeout)
      },
    ],
  )

  return (
    <div>
      <div className="keen-slider my-5" ref={sliderRef}>
        {data?.map(item => <Testimonial className="keen-slider__slide" key={item?.id} data={item} />)}
      </div>
    </div>
  )
}

export default Testimonials
