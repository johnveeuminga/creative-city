import { getArtistsWithArtworkCount } from "@/lib/server/artists";
import ArtistCard from "./ArtistCard";

export default async function ArtistsGrid() {
  const artists = await getArtistsWithArtworkCount();

  return (
    <div className="row">
      {
        artists.length > 0 && artists.map(artist => (
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
          <p className="py-5 text-center">No artists found.</p>
      }
    </div>
  )
}