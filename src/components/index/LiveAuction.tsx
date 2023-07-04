import React from "react";
import LiveAuctionsGrid from "../auctions/LiveAuctionsGrid";
import Link from "next/link";
import { MdOutlineArrowRightAlt } from "react-icons/md";

export default function LiveAuctions() {
  return (
    <section className="shop-index-section">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="text-primary shop-index-section__title">Live Auctions</h2>
          <Link 
            href={"/auctions"}
            className="btn text-primary bg-transparent">
              View All
              <MdOutlineArrowRightAlt className="ms-1"/>
          </Link>
        </div>
        <React.Suspense fallback={<p>Loading..</p>}>
          <LiveAuctionsGrid />
        </React.Suspense>
      </div>
    </section>
  )
}