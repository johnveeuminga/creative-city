'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react"

export default function ClientPagination({ 
  nextPage,
  prevPage,
}: {
  nextPage: string,
  prevPage: string,
}) {
  const currPath = usePathname();


  return (
    <nav>
      <ul className="pagination">
        <li className="page-item">
          { prevPage &&
            <Link 
              className="page-link"
              href={`${currPath}${prevPage}` ?? null}
              prefetch={false}>  
              <i className="ti-arrow-left"></i>
            </Link>
          }
          {
            ! prevPage &&
              <a href="#" className="page-link disabled">
                <i className="ti-arrow-left"></i>
              </a>
          }
        </li>
        <li className="page-item">
          <Link 
            className="page-link"
            href={`${currPath}${nextPage}` ?? null}
            prefetch={false}>  
            <i className="ti-arrow-right"></i>
          </Link>
        </li>
      </ul>
    </nav>
  )
}