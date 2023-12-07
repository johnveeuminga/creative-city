'use client'

import Image from "next/image";
import Link from "next/link";
import { getHighestBid } from "@/lib/server/artworks";
import MoneyFormat from "../MoneyFormat";
import { ArtworkWithBids } from "@/types/types";


export default async function AuctionArtworksGrid({ 
  artworks = [],
  auctionId,
  auctionEnded = false
}: {
  artworks: any[],
  auctionId?: number,
  auctionEnded?: boolean,
}) {

  const FinishedBid = ({ artwork }: { artwork: any }) => {
    console.log(artwork.highest_bid)
    return (
      <>
        {
          !! artwork.highest_bid &&
            <p className="fw-semibold">Sold for <MoneyFormat value={artwork.highest_bid.bid.amount} /></p>
        }
        {
          !!! artwork.highest_bid &&
            <p className="fw-semibold">No winner</p> 
        }
      </>
    )
  }

  const CurrentBid = ({ artwork }: { artwork: ArtworkWithBids }) => {
    return (
      <>
        {
          !! artwork.bids.length &&
          <p className="text-decoration-none">
            Current Bid: <strong><MoneyFormat value={ getHighestBid(artwork).toString() } /></strong>
          </p>  
        } 
        { artwork.minimum_bid && !artwork.bids.length &&
          <p>
            Bid starts at: <strong><MoneyFormat value={ artwork.minimum_bid.toString() } /></strong>
          </p>
        } 
      </>
    )
  }

  return (
    <>
      <div className="row">
      {
        artworks.map(artwork => (
          <div 
            key={artwork.id}
            className="col-lg-4 col-md-6 col-12 mb-5">
              <Link
                className="d-block text-decoration-none"
                href={`/auctions/${artwork.auction_id}/artwork/${artwork.id}`}>
                <div className="card auctions-artwork-card">
                  <div className="card-img-top" style={{ height: 400 }}>
                    <Image 
                      fill={true}
                      style={{ objectFit: 'cover', objectPosition: 'top' }}
                      src={artwork.media.length ?  `${process.env.NEXT_PUBLIC_S3_URL}/${artwork.media[0].filePath}`:  "/assets/images/features/features-1.jpg" }
                      alt="" />
                  </div>
                  <div className="card-body">
                    <h4 className="card-title text-decoration-none fw-bold mb-4">{ artwork.name }</h4>
                    <div className="artwork-details">
                      {
                        auctionEnded &&
                          <FinishedBid artwork={ artwork }/>
                      }
                      {
                        !!! auctionEnded &&
                          <CurrentBid artwork={ artwork } /> 
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