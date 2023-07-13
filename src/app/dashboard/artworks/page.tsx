import { handleOnClick } from "@/actions/artworks";
import Artwork from "@/components/Artwork";
import ArtworkList from "@/components/ArtworkList";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { Suspense } from "react";

async function getArtworks(id: number) {
  return await prisma.artwork.findMany({
    where: {
      artist_id: Number(id),
    },
  });
}

export default async function ArtworksPage() {
  let artworks = await getArtworks(1);

  return (
    <div>
      <div>
        <Link 
          className="btn btn-outline-primary"
          href="/dashboard/artworks/create">
          Add Artwork
        </Link>
      </div>
      <div className="row mt-5">
        <ArtworkList artworks={artworks} userId={2} />
      </div>
    </div>
  );
}
