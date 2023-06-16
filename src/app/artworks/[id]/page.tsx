import ArtworkList from "@/components/ArtworkList";
import { Artwork, PrismaClient } from "@prisma/client";
import Link from "next/link";

const prisma = new PrismaClient();

async function getArtworks(id: number) {
  return await prisma.artwork.findMany({
    where: {
      artist_id: Number(id),
    },
  });
}

async function getArtist(id: number) {
  return await prisma.user.findUnique({
    where: {
      id: Number(id),
    },
  });
}

export default async function Page({ params }: { params: { id: number } }) {
  
  let [artworks, artist] = await Promise.all([
    getArtworks(params.id),
    getArtist(params.id),
  ]);

  return (
    <div>
      <h1>
        {artist?.first_name} {artist?.last_name}
      </h1>
      <div>
        {" "}
        <button className="btn btn-primary">
          <Link href="/artworks/create">Add Artwork</Link>
        </button>
      </div>
      <ArtworkList artworks={artworks} userId={params.id} />
    </div>
  );
}
