'use client'

import { ReactNode, useEffect } from "react"

export default function Modal({ children }: { children: ReactNode}) {
  useEffect(() => {
    console.log("Here")
    document.body.classList.add('modal-open')
  }, []) 

  return (
    <>
      <div className="modal show" style={{ display: 'block' }}>
        <div className="modal-dialog modal-dialog-centered modal-lg">
          { children }
        </div>
      </div>
      <div className="modal-backdrop show"></div>
    </>
  )
}