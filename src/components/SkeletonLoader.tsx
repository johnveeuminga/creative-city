'use client'

import { PropsWithChildren } from "react";
import Skeleton from "react-loading-skeleton";

export default function SkeletonLoader() {
  function Wrapper({ children }: PropsWithChildren<unknown>) {

    return (
      <div>{ children }</div>
    )
  }

  return (
    <Skeleton 
      containerClassName="d-block"
      wrapper={Wrapper}/>
  )
}