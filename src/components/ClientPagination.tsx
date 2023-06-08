'use client'

import React from "react"
import { Pagination } from "react-bootstrap"

export default function ClientPagination({ 
  nextPage,
  prevPage,
}: {
  nextPage: string,
  prevPage: string,
}) {

  return (
    <Pagination>
      <Pagination.Item 
        href={prevPage ?? null}
        disabled={!prevPage}>
        <i className="ti-angle-left"></i>
      </Pagination.Item>
      <Pagination.Item
        disabled={!nextPage}
        href={nextPage}>
        <i className="ti-angle-right"></i>
      </Pagination.Item>
    </Pagination>
  )
}