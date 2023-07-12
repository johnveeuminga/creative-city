import AuctionCard from "./AuctionCard";
import { getAuctions, getOngoingAuctions } from "@/lib/server/auctions";

export default async function AuctionsGrid() {
  const auctions = await getOngoingAuctions({
    orderBy: {
      start_date: 'asc',
    }
  })

  return(
    <div className="row">
      {
        auctions.length && auctions.map(auction => (
          <div 
            key={auction.id}
            className="col-md-4">
              <AuctionCard 
                auction={auction}/>
          </div>
        ))
      }
      {
        ! auctions.length && 
          <p>No auctions found.</p>
      }
    </div>
  )  
}