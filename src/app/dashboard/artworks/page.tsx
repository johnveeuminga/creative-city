import { handleOnClick } from "@/actions/artworks";
import Artwork from "@/components/Artwork";
import ArtworkList from "@/components/ArtworkList";
import prisma from "@/lib/prisma";
import { getServerSession } from "@/lib/server/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";



export default async function ArtworksPage() {
  const server = await getServerSession()

  if(!server.user)
    redirect("/")
    
  let artworks = await prisma.artwork.findMany({
    where: {
      artist_id: Number(server.user.id),
    }
  });

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
        <ArtworkList artworks={artworks} userId={parseInt(server.user.id)} />
      </div>
    </div>
  );
}
