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
      className="d-block"
      href={`auctions/${auction.id}`}>
      <div className="auction-card card">
        <div className="card-img-top position-relative">
          <Image 
            fill={true}
            src="/assets/images/listing/listing-grid-1.jpg" 
            alt="" />
        </div>
        <div className="card-body">
          <h5 className="card-title">{ auction.name }</h5>
          <div 
            className="auction-card__description"
            dangerouslySetInnerHTML={{
            __html: auction.description
          }}></div>
          <div className="auction-card__details">
            <p>Starts: { DateTime.fromJSDate(auction.start_date).toFormat('LLLL dd, yyyy hh:mm a')  }</p>
            <p>Ends: { DateTime.fromJSDate(auction.end_date).toFormat('LLLL dd, yyyy hh:mm a') }</p>
            <p><strong>76</strong> artworks posted</p>
          </div>
        </div>
      </div>
    </Link>
  )
}