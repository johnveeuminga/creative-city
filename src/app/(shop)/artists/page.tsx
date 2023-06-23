// Import your components
import ArtistCard from "@/components/artists/ArtistCard"
import ArtistsGrid from "@/components/artists/ArtistsGrid"
import { Suspense } from "react"

export default function ArtistsPage() {
  return (
    <div className="artists content-container">
      <div className="container">
        <div className="header">
          <h2>Artists</h2> 
        </div>
        <section className="artists-section py-5 d-flex ">
          <div className="artists-sidebar">
            <div className="artists-aggregation">
              <p>1,083 Artists</p> // replace this with actual data
            </div>
          </div>  
          <div className="artists-content">
            <div className="row">
              {/* TODO: Add skeleton loading here */}
              <Suspense fallback={<p>Loading</p>}>
                <ArtistsGrid />
              </Suspense>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
