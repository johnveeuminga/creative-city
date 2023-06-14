import { AuctionDetails } from "@/components/auctions/AuctionDetails"
import { Suspense } from "react"

export default async function AuctionSinglePage({
  params: {
    id
  },
  searchParams: {
    page,
  }
}: {
  params: {
    id: string,
  }, 
  searchParams: {
    page: number,
  }
}) {
  return (
    <>
      <div className="auctions-single mb-3" style={{ minHeight: 400 }}>
        <Suspense fallback={<p>Loading Content...</p>}>
          <AuctionDetails 
            page={page}
            id={id} />
        </Suspense>
      </div>
    </>
  )
}