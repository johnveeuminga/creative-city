import prisma from "@/lib/prisma";
import { getServerSession } from "@/lib/server/auth";
import { redirect } from "next/navigation";
import AddArtworkModal from "./AddArtworkModal";

export default async function AuctionRegisterArtwork({ id }: { id: number }) {
  const session = await getServerSession()

  if(!session.user)
    return redirect('401')

  const auctionData = prisma.auction.findFirst({
    where: {
      id,
    },
  });

  const artworksData = prisma.artwork.findMany({
    where: {
      // Include only where auctions are non-existent.
      auctions: {
        none: {
          NOT: {
            approvedAt: null
          }
        },
      },
      isAuction: true,
      artist_id: parseInt(session.user.id),
    },
    include: {
      media: true
    }
  })

  const [auction, artworks] = await Promise.all([auctionData, artworksData]);

  if(!auction)
    return

  return (
    <AddArtworkModal 
      auction={auction}
      artworks={artworks} />
  )
}