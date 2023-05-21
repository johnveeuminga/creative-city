'use client'

import Slider from "react-slick"

export default function SlickSlider({ sliderOptions, className, children }: {
  sliderOptions?: any,
  className?: string,
  children?: any,
}) {
  return (
    <>
      <Slider 
        className={className}
        {...sliderOptions}>
        { children }
      </Slider> 
    </>
  )
}