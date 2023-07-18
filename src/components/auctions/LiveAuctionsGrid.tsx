import { getOngoingAuctions } from "@/lib/server/auctions";
import LiveAuctionCard from "./LiveAuctionCard";

export default async function LiveAuctionsGrid() {
  const auctions = await getOngoingAuctions({
    take: 4,
    where: {
      end_date: {
        lte: new Date(),
      }
    },
    orderBy: {
      start_date: 'asc'
    }
  })


  return (
    <div className="live-auctions-grid py-3">
      <div className="row">
        {
          auctions.map(auction => (
            <div 
              key={auction.id}
              className="col-lg-6 col-xl-3 col-12 mb-3">
                <LiveAuctionCard auction={auction} />
            </div>
          ))
        }
      </div>
    </div>
  )
}