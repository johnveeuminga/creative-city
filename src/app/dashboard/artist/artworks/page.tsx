import { handleOnClick } from "@/app/actions/artworks";
import Artwork from "@/components/Artwork";
import prisma from "@/lib/prisma";
import { getServerSession } from "@/lib/server/auth";
import { Suspense, useState } from "react";

export default async function ArtworksPage() {
  // Export to another file
  async function ArtworkList() {
    const artworks = await prisma.artwork.findMany();

    return (
      artworks.map((artwork: any)=> (
        <div 
          key={artwork.id}
          className="col-md-3">
          <Artwork 
            onClick={handleOnClick}
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
