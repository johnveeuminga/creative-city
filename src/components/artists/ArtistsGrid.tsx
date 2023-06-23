import ArtistCard from "./ArtistCard";
import { getArtists } from "@/lib/server/artists";

export default async function ArtistsGrid() {
  const artists = await getArtists({
    orderBy: {
        nickname: 'asc', // assuming you're ordering by artist name
    }
  });

  return (
    <div className="row">
      {
        artists.length && artists.map(artist => (
          <div key={artist.id} className="col-md-6">
            <ArtistCard artist={artist}/>
          </div>
        ))
      }
      {
        ! artists.length && 
          <p>No artists found.</p>
      }
    </div>
  )
}
