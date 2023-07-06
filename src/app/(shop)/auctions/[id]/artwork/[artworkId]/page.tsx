import { ArtworkBiddingBox } from "@/components/auctions/ArtworkBiddingBox"
import ArtworkBiddingHistory from "@/components/auctions/ArtworkBiddingHistory"
import prisma from "@/lib/prisma"
import Image from "next/image"
import { redirect } from "next/navigation"
import { relative } from "path"
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
      bids: true,
      artist: true,
    }
  })

  if(! artwork)
    // TODO: 404 redirect
    redirect("/")

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
              <p>{ artwork.artist.first_name } {artwork.artist.last_name }</p>
            </div>
            <ArtworkBiddingBox artwork={ artwork }/>
            <div className="artwork-bidding-history-container my-3">
              <ArtworkBiddingHistory 
                auctionId={auctionId}
                artworkId={artworkId}
                />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}