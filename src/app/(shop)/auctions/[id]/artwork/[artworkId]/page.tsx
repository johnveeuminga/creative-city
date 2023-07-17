import { ArtworkBiddingBox } from "@/components/auctions/ArtworkBiddingBox"
import ArtworkBiddingHistory from "@/components/auctions/ArtworkBiddingHistory"
import { checkIfAuctionHasEnded, checkIfAuctionIsOngoing } from "@/lib/client/auction-helpers"
import prisma from "@/lib/prisma"
import Image from "next/image"
import { redirect } from "next/navigation"
import { relative } from "path"
import React from "react"
import { NumericFormat } from "react-number-format"

export default async function AuctionArtworkSinglePage({
  params: {
    id: auctionId,
    artworkId,
  }
}: {
  params: {
    id: string,
    artworkId: string,
  }
}) {
  const artwork = await prisma.artwork.findFirst({
    where: {
      id: parseInt(artworkId),
      auction_id: parseInt(auctionId),
    },
    include: {
      bids: {
        orderBy: {
          createdAt: 'desc',
        }
      },
      artist: true,
      auction: true,
      highest_bid: {
        include: {
          bid: true
        }
      },
    }
  })

  if(!artwork || !artwork.auction)
    redirect("/")

  const auctionHasEnded = checkIfAuctionHasEnded(artwork.auction.start_date, artwork.auction.end_date)

  return(
    <div className="auction-artwork-single mb-5">
      <div className="container">
        <div className="row gx-5">
          <div className="col-md-7">
            <div className="image-container mb-3" style={{
              width: "100%",
              height: 450,
              position: 'relative',
            }}>
              <Image 
                fill={true}
                alt={artwork.name}
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
                src={"/assets/images/features/features-1.jpg"}/>
            </div>
            <div 
              dangerouslySetInnerHTML={{ __html: artwork.description }}
              className="auction-artwork-single-description mb-5">
            </div>
          </div>
          <div className="col-md-5">
            <div className="artwork-heading mb-3">
              <h3>{ artwork.name }</h3>
              <p>{ artwork.artist.name }</p>
            </div>
            <ArtworkBiddingBox 
              finished={ auctionHasEnded }
              artwork={ artwork } />
            <div className="artwork-bidding-history-container my-3">
              <React.Suspense fallback={<p>Loading</p>}>
                <ArtworkBiddingHistory 
                  auctionId={auctionId}
                  artwork={artwork} />
              </React.Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}