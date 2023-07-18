
import prisma from "@/lib/prisma"
import { ArtworkWithBids } from "@/types/types"
import React from "react"
import ArtworkBiddingHistoryBox from "./ArtworkBiddingHistoryBox"


export default async function ArtworkBiddingHistory({
  auctionId,
  artwork,
}: {
  auctionId: string,
  artwork: ArtworkWithBids,
}) {
  const bids = await prisma.bid.findMany({
    where: {
      artwork: {
        id: artwork.id,
        auction_id: parseInt(auctionId)
      }
    },
    orderBy: {
      createdAt: 'desc'
    },
    take: 5,
  })

  return (
    <React.Suspense fallback={<p>Fetching Suspense</p>}>
      <ArtworkBiddingHistoryBox 
        auctionId={auctionId}
        artworkId={artwork.id.toString()}
        bids={bids} />
    </React.Suspense>
  )
}