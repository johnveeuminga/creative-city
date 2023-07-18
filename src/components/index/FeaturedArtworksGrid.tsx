import prisma from "@/lib/prisma";
import ArtworkCard from "../ArtworkCard";

export default async function FeaturedArtworksGrid() {
  const artworks = await prisma.artwork.findMany({
    take: 4,
    where: {
      auction_id: null,
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
          artworks.map(artwork => (
            <div 
              key={artwork.id}
              className="col-md-3 align-items-stretch">
              <ArtworkCard artwork={artwork}/>
            </div>
          ))
        }
      </div>
    </div>
  )
}