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
  const auctionArtwork = await prisma.artworkAuction.findFirst({
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
      auction: true,
      artwork: {
        include: {
          artist: true,
          media: true,
        }
      },
    }
  })


 
  if(!auctionArtwork || !auctionArtwork.auction)
    redirect("/")

  const { 
    artwork
  } = auctionArtwork;

  const auctionHasEnded = checkIfAuctionHasEnded(auctionArtwork.startDateTime, auctionArtwork.endDateTime)

  const media = artwork.media.length ?
    `${process.env.NEXT_PUBLIC_S3_URL}/${artwork.media[0].filePath}` :
    "/assets/images/features/features-1.jpg";

  return(
    <div className="auction-artwork-single mb-5">
      <div className="container">
        <div className="row gx-5">
          <div className="col-md-7">
            <picture>
              <img 
                alt={artwork.name}
                src={media} 
                className="w-100"/>
            </picture>
            {/* <div className="image-container mb-3" style={{
              width: "100%",
              height: 600,
              position: 'relative',
            }}>
              <Image 
                fill={true}
                alt={artwork.name}
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
                src={media}/>
            </div> */}
            <div 
              dangerouslySetInnerHTML={{ __html: artwork.description }}
              className="auction-artwork-single-description mb-5 mt-3">
            </div>
          </div>
          <div className="col-md-5">
            <div className="artwork-heading mb-3">
              <h3>{ artwork.name }</h3>
              <p>{ artwork.artist.name }</p>
            </div>
            <ArtworkBiddingBox 
              bids={auctionArtwork.bids}
              finished={ auctionHasEnded }
              artworkAuction={ auctionArtwork } />
            <div className="artwork-bidding-history-container my-3">
              {/* <React.Suspense fallback={<p>Loading</p>}>
                <ArtworkBiddingHistory 
                  auctionId={auctionId}
                  artwork={artwork} />
              </React.Suspense> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}