import { Artist, Auction, Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";
import { ArtistWithUserAndArtworkCount } from "@/types/types";

export type ArtistWithUser = Prisma.ArtistGetPayload<{
  include: {
    user: true
  },
}>

export async function getArtists(params: Prisma.ArtistFindManyArgs = {}): Promise<Artist[]> {
  const artists = await prisma.artist.findMany({
    ...params,
    include: {
      ...params.include,
      user: true,
    },
  });

  return artists;
}

export async function getArtistsWithArtworkCount(): Promise<ArtistWithUserAndArtworkCount[]> {
  const artists = await prisma.artist.findMany({
    orderBy: {
      createdAt: 'desc'
    },
    include: {
      user: {
        include: {
          _count: {
            select: { artworks: true }
          }
        }
      },
    },
    take: 4
  })

  return artists;
}

export async function updateArtistStatus(id: number, newStatus: 'PENDING' | 'APPROVED' | 'REJECTED'): Promise<Artist> {
  const artist = await prisma.artist.update({
    where: {
      id: id,
    },
    data: {
      status: newStatus,
    },
  });

  return artist;
}
