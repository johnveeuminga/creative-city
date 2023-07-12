import { getArtists } from "@/lib/server/artists";
import ArtistCard from "./ArtistCard";

export default async function ArtistsGrid() {
  const artists = await getArtists({
    orderBy: {
      nickname: 'asc',
    },
    include: {
      user: {
        include: {
          _count: {
            select: { artworks: true }
          }
        }
      },
    },
    take: 4
  });

  return (
    <div className="row">
      {
        artists.length && artists.map(artist => (
          <div 
            key={artist.id} 
            className="col-md-3">
            <ArtistCard 
              artist={artist} />
          </div>
        ))
      }
      {
        !artists.length && 
          <p>No artists found.</p>
      }
    </div>
  )
}