"use client"

import Image from "next/image"


export default function Logo() {
  return (
    <div className="logo-container d-flex justify-content-center align-items-center">
      <Image 
        className="logo"
        src="/assets/images/unesco-logo.png"
        alt="UNESCO"
        height={100}
        width={95}
        /> 
      <Image 
        className="logo"
        src="/assets/images/bcc-logo.png"
        alt="Baguio Creative City"
        height={83}
        width={86}
        />
    </div>
  )
}