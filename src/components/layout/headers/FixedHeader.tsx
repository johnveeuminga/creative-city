'use client'

import { usePathname, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function FixedHeader({ children }: { children: React.ReactNode }) {
  const [navScrolled, setNavScrolled] = useState(false)

  const changeNavBg = () => {
    window.scrollY > 0 ? setNavScrolled(true) : setNavScrolled(false)
  }

  useEffect(() => {
    window.addEventListener('scroll', changeNavBg);

    return () => window.removeEventListener('scroll', changeNavBg)
  }, [])

  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if(pathname !== "/")
      setNavScrolled(true)
  }, [pathname, searchParams])

  return (
    <div className={`fixed-header shop-header border-bottom${navScrolled ? ' bg-white scrolled': ''}`}>
      { children } 
    </div>
  )
}