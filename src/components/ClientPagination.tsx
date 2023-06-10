'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react"
import { Pagination } from "react-bootstrap"

export default function ClientPagination({ 
  nextPage,
  prevPage,
}: {
  nextPage: string,
  prevPage: string,
}) {
  const currPath = usePathname();


  return (
    // <Pagination>
    //   <Pagination.Item 
    //     href={prevPage ?? null}
    //     disabled={!prevPage}>
    //     <i className="ti-angle-left"></i>
    //   </Pagination.Item>
    //   <Pagination.Item
    //     disabled={!nextPage}
    //     href={nextPage}>
    //     <i className="ti-angle-right"></i>
    //   </Pagination.Item>
    // </Pagination>
    <>
      {
        prevPage &&
          <Link 
            href={`${currPath}${prevPage}`} >  
            &lt; 
          </Link>
      }
      &nbsp;
      <Link 
        href={`${currPath}${nextPage}` ?? null}
        prefetch={false}>  
        &gt; 
      </Link>
    </>
  )
}