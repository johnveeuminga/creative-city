import { ArtworkBiddingBox } from "@/components/auctions/ArtworkBiddingBox"
import ArtworkBiddingHistory from "@/components/auctions/ArtworkBiddingHistory"
import ArtworkBiddingHistoryBox from "@/components/auctions/ArtworkBiddingHistoryBox"
import { checkIfAuctionHasEnded } from "@/lib/client/auction-helpers"
import prisma from "@/lib/prisma"
import { getServerSession } from "@/lib/server/auth"
import { redirect } from "next/navigation"
import React from "react"

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
  const auctionArtworkData = prisma.artworkAuction.findFirst({
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
      highestBid: {
        include: {
          bid: true
        }
      },
      artwork: {
        include: {
          artist: true,
          media: true,
        }
      },
    }
  })

  const userData = getServerSession();

  const [auctionArtwork, user] = await Promise.all([auctionArtworkData, userData]);
 
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
            {
              user.user && 
              auctionArtwork.highestBid &&
              auctionArtwork.highestBid.bid.userId === parseInt(user.user?.id) &&
                <p className="fw-bold text-success">You currently own the highest bid.</p>
            }
            <p></p>
            <ArtworkBiddingBox 
              bids={auctionArtwork.bids}
              finished={ auctionHasEnded }
              artworkAuction={ auctionArtwork } />
            <div className="artwork-bidding-history-container my-3">
              <React.Suspense fallback={<p>Loading</p>}>
                <ArtworkBiddingHistory 
                  auctionId={auctionId}
                  artwork={artwork}
                />
              </React.Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}