import { getArtists } from "@/lib/server/artists";
import ArtistCard from "./ArtistCard";

export default async function ArtistsGrid() {
  const artists = await getArtists({
    orderBy: {
      nickname: 'asc',
    }
  });

  return (
    <div className="row">
      {
        artists.length && artists.map(artist => (
          <div 
            key={artist.id} 
            className="col-md-2" style={{ width: '20%' }}>
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