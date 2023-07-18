'use client'

import { useCallback, useEffect, useState } from "react"
import { useDebounce } from "@/lib/utils"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

export function ArtistsSearch() {
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 500)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    router.push(`${pathname}?search=${debouncedSearch}`)
  }, [debouncedSearch, pathname, router])

  return (
    <div className="form-solid">
      <div className='input-group'>
        <span className="input-group-text">
          <i className="ti-search"></i>
        </span>
        <input 
          placeholder="Search"
          className="form-control"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text" /> 
      </div>
    </div>
  )
}
