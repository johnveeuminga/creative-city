import { handleOnClick } from "@/actions/artworks";
import Artwork from "@/components/Artwork";
import ArtworkList from "@/components/ArtworkList";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { Suspense } from "react";

async function getArtworks(id: number) {
  return await prisma.artwork.findMany({
    where: {
      artist_id: id.toString(),
    },
  });
}

export default async function ArtworksPage() {
  let artworks = await getArtworks(2);

  return (
    <div>
      <div>
        {" "}
        <button className="main-btn icon-btn">
          <Link href="/dashboard/artworks/create">Add Artwork</Link>
        </button>
      </div>
      <div className="row mt-5">
        <ArtworkList artworks={artworks} userId={2} />
      </div>
    </div>
  );
}
