import { Artist, Prisma } from "@prisma/client";
import prisma from "../prisma";

export async function getArtists(params: Prisma.ArtistFindManyArgs = {}): Promise<Artist[]> {
  const artists = await prisma.artist.findMany(params);

  return artists;
}
