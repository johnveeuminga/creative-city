import AuctionCard from "@/components/auctions/AuctionCard"
import AuctionsGrid from "@/components/auctions/AuctionsGrid"
import { Suspense } from "react"

export default async function AuctionsPage() {
  return (
    <div className="auctions content-container">
      <div className="container">
        <div className="header">
          <h2>Auctions</h2> 
        </div>
        <section className="auctions-section py-5 d-flex ">
          <div className="auctions-sidebar">
            <div className="auctions-aggregation">
              <p>1,083 Auctions</p>
            </div>
          </div>  
          <div className="auctions-content">
            <div className="row">
              {/* TODO: Add skeleton loading here */}
              <Suspense fallback={<p>Loading</p>}>
                <AuctionsGrid />
              </Suspense>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}