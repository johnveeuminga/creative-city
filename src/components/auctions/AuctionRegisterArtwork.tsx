import prisma from "@/lib/prisma";
import { getServerSession } from "@/lib/server/auth";
import { redirect } from "next/navigation";
import AddArtworkModal from "./AddArtworkModal";

export default async function AuctionRegisterArtwork({ id }: { id: number }) {
  const session = await getServerSession()

  if(!session.user)
    return redirect('401')

  const artworks = await prisma.artwork.findMany({
    where: {
      auction_id: null,
      isAuction: true,
      auctionApproved: false,
      artist_id: parseInt(session.user.id),
    },
    include: {
      media: true
    }
  })

  console.log(artworks)

  return (
    <AddArtworkModal 
      auctionId={id}
      artworks={artworks} />
  )
}