import prisma from "@/lib/prisma";
import ArtworkCard from "../ArtworkCard";
import { ArtworkWithArtistAndMedia } from "@/types/types";

export default async function FeaturedArtworksGrid() {
  const artworks: ArtworkWithArtistAndMedia[] = await prisma.artwork.findMany({
    take: 4,
    where: {
      // auction_id: null,
    },
    include: {
      artist: true,
      media: true,
    },
    orderBy: {
      created_at: 'desc'
    }
  })

  return (
    <div className="featured-artrworks-grid mt-3">
      <div className="row">
        {
          artworks.map((artwork: ArtworkWithArtistAndMedia) => (
            <div 
              key={artwork.id}
              className="col-md-3 align-items-stretch">
              <ArtworkCard artwork={artwork} />
            </div>
          ))
        }
        {
          !artworks.length && 
            <p className="py-5 text-center">No artworks</p>
        }
      </div>
    </div>
  )
}