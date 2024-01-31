'use client'

import Image from "next/image";
import Link from "next/link";
import { ArtworkAuctionWithArtworkAndHighestBid } from "@/types/types";
import { toMedDate } from "@/lib/dates";
import BidAmountDetails from "./BidAmountDetails";


export default function AuctionArtworksGrid({ 
  artworks = [],
  auctionEnded = false
}: {
  artworks: any[],
  auctionId?: number,
  auctionEnded?: boolean,
}) {
  return (
    <>
      <div className="row">
      {
        artworks.map(( artwork:  ArtworkAuctionWithArtworkAndHighestBid ) => (
          <div 
            key={artwork.artwork.id}
            className="col-lg-4 col-md-6 col-12 mb-5">
              <Link
                className="d-block text-decoration-none"
                href={`/auctions/${artwork.auction_id}/artwork/${artwork.id}`}>
                <div className="card auctions-artwork-card">
                  <div className="card-img-top" style={{ height: 400 }}>
                    <Image 
                      fill={true}
                      style={{ objectFit: 'cover', objectPosition: 'top' }}
                      src={artwork.artwork.media.length ? `${process.env.NEXT_PUBLIC_S3_URL}/${artwork.artwork.media[0].filePath}`:  "/assets/images/features/features-1.jpg" }
                      alt="" />
                  </div>
                  <div className="card-body">
                    <h4 className="card-title text-decoration-none fw-bold mb-4">{ artwork.artwork.name }</h4>
                    <div className="artwork-details">
                      {
                        !!! auctionEnded &&
                        <>
                          <p>
                            <span>Current Bid: </span> <br/>
                            <span className="fw-semibold"> <BidAmountDetails artworkAuction={artwork} /> </span>
                          </p>
                          <p className="mb-1">Bidding Period: <br/><strong>{ toMedDate(artwork.startDateTime) } - { toMedDate(artwork.endDateTime) }</strong></p>
                        </>
                      }
                    </div>
                  </div>
                </div>
              </Link>
          </div>
        ))
      } 
      {
        !artworks.length &&
          <p className="text-center fw-semibold px-5">There are no artworks registered for this auction just yet.</p>
      }
      </div>
    </>
  )
}