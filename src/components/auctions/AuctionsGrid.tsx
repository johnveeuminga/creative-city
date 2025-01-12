import prisma from "@/lib/prisma";
import AuctionCard from "./AuctionCard";
import { getAuctions, getOngoingAuctions } from "@/lib/server/auctions";

export default async function AuctionsGrid() {
  const auctions = await prisma.auction.findMany({
    orderBy: {
      start_date: 'asc',
    }
  })

  return(
    <div className="row">
      {
        auctions.length > 0 && auctions.map(auction => (
          <div 
            key={auction.id}
            className="col-md-4">
              <AuctionCard 
                auction={auction}
              />
          </div>
        ))
      }
      {
        !auctions.length && 
          <div className="col">
            <p className="py-5 text-center">No auctions found.</p>
          </div>
      }
    </div>
  )  
}