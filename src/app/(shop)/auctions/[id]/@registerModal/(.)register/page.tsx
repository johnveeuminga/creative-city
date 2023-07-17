import AddArtworkModal from "@/components/auctions/AddArtworkModal";
import AuctionRegisterArtwork from "@/components/auctions/AuctionRegisterArtwork";
import React from "react";

export default async function RegisterModalPage({
  params: {
    id
  }
}: { 
  params: { id: string }
}) {
  return (
    <React.Suspense>
      <AuctionRegisterArtwork id={ parseInt(id) } />
    </React.Suspense>
  )
}