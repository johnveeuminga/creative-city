import { AuctionDetails } from "@/components/auctions/AuctionDetails"

export default async function AuctionSinglePage({
  params: {
    id
  }
}: {
  params: {
    id: string,
  }
}) {
  return (
    <>
      <div className="auctions-single mb-3" style={{ minHeight: 400 }}>
        <AuctionDetails id={id}/>
      </div>
    </>
  )
}