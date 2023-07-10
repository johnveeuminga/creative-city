import { Artist, Auction, Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";

export type ArtistWithUser = Prisma.ArtistGetPayload<{
  include: {
    user: true
  }
}>

export async function getArtists(params: Prisma.ArtistFindManyArgs = {}): Promise<Artist[] | ArtistWithUser[]> {
  const artists = await prisma.artist.findMany(params);

  return artists;
}