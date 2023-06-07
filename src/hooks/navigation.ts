import { ReadonlyURLSearchParams, usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

// export const usePrevious = <T>(value: T) => {
//   const ref = useRef<T>()

//   useEffect(() => {
//     ref.current = value
//   })

//   return ref
// }

interface RouterEventParams {
  pathname: string | null
  searchParams: ReadonlyURLSearchParams | null
}

interface NavigationEvents {
  routerChangeStart?: ({
    pathname,
    searchParams,
  }: RouterEventParams) => void

  routerChangeComplete?: ({
    pathname,
    searchParams
  }: RouterEventParams) => void
}

export const useNavigation = ({ on }: { on?: NavigationEvents }) => {
  const pathname = usePathname()
  const prevPathname = useRef(pathname ?? "/")

  const searchParams = useSearchParams()
  const prevSearchParams = useRef(searchParams)

  const [route, setRoute] = useState({ pathname, searchParams })

  const {
    routerChangeStart,
    routerChangeComplete
  } = on || {}

  useEffect(() => {
    if(
      searchParams.toString() !== prevSearchParams?.current.toString() ||
      pathname !== prevPathname.current.toString()
    ) {
      routerChangeComplete?.({ pathname, searchParams })

      prevPathname.current = pathname
      prevSearchParams.current = searchParams

      setRoute({
        pathname,
        searchParams
      })
    }
  }, [
    pathname, 
    prevPathname, 
    searchParams, 
    prevSearchParams, 
    routerChangeStart,
    routerChangeComplete,
  ]) 

  return route
}