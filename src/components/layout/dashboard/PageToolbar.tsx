'use client'

import React from "react"

export function PageToolbar({
  heading,
  breadcrumbs,
  actions = null
}: {
  heading: string,
  breadcrumbs: PageToolbarBreadcrumbs,
  actions?: React.ReactNode
}){ 
  return (
    <div className="toolbar">
      <div className="page-title">
        <h1>{ heading }</h1>
        {
          breadcrumbs.length &&
            <ol className="breadcrumb">
              {
                breadcrumbs.map((breadcrumb, index) => (
                  <li 
                    key={index}
                    className={`breadcrumb-item${breadcrumb.active ? " active" : ""}`}>
                      { breadcrumb.label }
                  </li>
                ))
              }
            </ol>
        }
      </div>
      <div className="page-actions">
        { actions }
      </div>
    </div>
  )
}

export type PageToolbarBreadcrumbs = PageToolbarBreadcrumbsItem[]

export type PageToolbarBreadcrumbsItem = {
  label: string,
  active?: boolean,
}