import React from "react";

export default function AuctionDetailLayout({
  children,
  registerModal
}: {
  children: React.ReactNode,
  registerModal: React.ReactNode,
}) {
  return (
    <>
      { children } 
      { registerModal }
    </>
  )
}