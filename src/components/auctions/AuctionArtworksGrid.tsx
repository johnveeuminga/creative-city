import prisma from "@/lib/prisma"
import { Artwork } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

export default async function AuctionArtworksGrid({ 
  artworks = [],
  auctionId 
}: {
  artworks: Artwork[],
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
                      <p>Minimum Bid: Php 100,000.00</p>
                    </div>
                  </div>
                </div>
              </Link>
          </div>
        ))
      } 
      </div>
    </>
  )
}