import AuctionCard from "./AuctionCard";
import { getAuctions } from "@/lib/server/auctions";

export default async function AuctionsGrid() {
  const auctions = await getAuctions({
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
            className="col-md-6">
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