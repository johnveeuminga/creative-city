import SkeletonLoader from "@/components/SkeletonLoader";
import React, { PropsWithChildren } from "react"

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
          <th>User ID</th>
          <th>Nickname</th>
          <th>Avatar Path</th>
          <th>Story</th>
          <th>Bio</th>
          <th>Pickup Address</th>
          <th>Contact Number</th>
          <th>GCash</th>
          <th>Paymaya</th>
          <th>Status</th>
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
