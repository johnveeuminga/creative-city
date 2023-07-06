'use client'

import SkeletonLoader from "@/components/SkeletonLoader";
import React, { PropsWithChildren } from "react"
import Skeleton from "react-loading-skeleton"

export default function LoadingSkeleton() {
  function Wrapper({ children }: PropsWithChildren<unknown>) {
    console.log(children);
    return (
      <div>{ children }</div>
    )
  }
  return (
    <table className='table skeleton-loader'>
      <thead>
        <tr>
          <th>Name</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Artworks</th>
        </tr>
      </thead>
      <tbody>
          {
            Array(5).fill("").map((_, index) => (
              <tr key={index}>
                <td>
                  <SkeletonLoader />
                </td>
                <td>
                  <SkeletonLoader />
                </td>
                <td>
                  <SkeletonLoader />
                </td>
                <td>
                  <SkeletonLoader />
                </td>
              </tr>
            ))
          }
      </tbody>
    </table>
  )
}