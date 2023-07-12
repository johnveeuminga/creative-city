'use client'

import { Auction, Prisma } from "@prisma/client"
import { DateTime } from "luxon"
import Image from "next/image"
import Link from "next/link"

export default function AuctionCard({ auction }: {
  auction: Auction
}) {
  return (
    <Link 
      className="d-block text-decoration-none"
      href={`auctions/${auction.id}`}>
      <div className="auction-card card">
        <div className="card-img-top position-relative">
          <Image 
            fill={true}
            style={{ objectFit: 'cover' }}
            src="/assets/images/listing/listing-grid-1.jpg" 
            alt="" />
        </div>
        <div className="card-body">
          <h3 className="card-title mb-3">{ auction.name }</h3>
          <div 
            className="auction-card__description"
            dangerouslySetInnerHTML={{
            __html: auction.description
          }}></div>
          <div className="auction-card__details">
            <p className="mb-0">Starts: { DateTime.fromJSDate(auction.start_date).toFormat('LLLL dd, yyyy hh:mm a')  }</p>
            <p className="mb-3">Ends: { DateTime.fromJSDate(auction.end_date).toFormat('LLLL dd, yyyy hh:mm a') }</p>
            <p><strong>76</strong> artworks posted</p>
          </div>
        </div>
      </div>
    </Link>
  )
}