'use client'

import { Artwork } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { NumericFormat } from 'react-number-format';
import { ArtworkWithBids } from "../../../types";
import { getHighestBid } from "@/lib/server/artworks";


export default async function AuctionArtworksGrid({ 
  artworks = [],
  auctionId 
}: {
  artworks: ArtworkWithBids[],
  auctionId?: number
}) {
  return (
    <>
      <div className="row">
      {
        artworks.map(artwork => (
          <div 
            key={artwork.id}
            className="col-lg-4 col-md-6 col-12 mb-5">
              <Link
                className="d-block"
                href={`/auctions/${artwork.auction_id}/artwork/${artwork.id}`}>
                <div className="card auctions-artwork-card">
                  <div className="card-img-top">
                  <Image 
                    fill={true}
                    src="/assets/images/listing/listing-grid-1.jpg" 
                    alt="" />
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">{ artwork.name }</h5>
                    <div className="artwork-details">
                      { !! artwork.bids.length && 
                        <p>
                        Current Bid: <strong><NumericFormat 
                          displayType="text"
                          prefix="Php "
                          thousandSeparator={true}
                          value={getHighestBid(artwork)}/>
                          </strong>
                      </p> 
                      }
                      { artwork.minimum_bid && !artwork.bids.length &&
                        <p>
                          Starts at: <strong><NumericFormat 
                            displayType="text"
                            prefix="Php "
                            thousandSeparator={true}
                            value={artwork.minimum_bid}/>
                            </strong>
                        </p>
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