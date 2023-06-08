'use client'

import Link from "next/link"
import React from "react"

export default function UniversalLoadingLink({
  href,
  children,
  className,
  prefetch,
}: {
  href: string,
  className?: string,
  children?: React.ReactNode,
  prefetch?: boolean,
}) {
  function handleOnClick() {
    console.log("This is start")
  }

  return (
    <>
      <Link 
        className={className}
        href={href} 
        onClick={() => handleOnClick()}
        prefetch={!! prefetch}>
        {children}
      </Link>
    </>
  )
}