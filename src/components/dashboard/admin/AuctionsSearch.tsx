'use client'

import { useCallback, useEffect, useState } from "react"
import { useDebounce } from "@/lib/utils"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

export function AuctionsSearch() {
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 500)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    router.push(`${pathname}?search=${debouncedSearch}`)
  }, [debouncedSearch, pathname, router])

  return (
    <>
      <input 
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        type="text" /> 
    </>
  )
}