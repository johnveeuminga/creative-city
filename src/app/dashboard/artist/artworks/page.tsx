import { handleOnClick } from "@/actions/artworks";
import Artwork from "@/components/Artwork";
import prisma from "@/lib/prisma";
import { Suspense } from "react";

export default async function ArtworksPage() {
  async function ArtworkList() {
    // const artworks = await prisma.artwork.findMany();
    const artworks: any = []

    return (
      artworks.map((artwork: any)=> (
        <div 
          key={artwork.id}
          className="col-md-3">
          <Artwork 
            // onClick={handleOnClick}
            artwork={artwork} />
        </div>
      ))
    )
  }

  return(
    <>
      <div className="container">
        <div className="row">
          <Suspense fallback={<p>Loading Artworks</p>}>
            {/* @ts-expect-error Async Server Component */}
            <ArtworkList /> 
          </Suspense>
        </div>
      </div>
    </>
  )
}
