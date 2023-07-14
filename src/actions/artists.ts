'use server'

import 'server-only'
import { getClient } from "@/lib/apollo";
import prisma from "@/lib/prisma";
import { getServerSession } from "@/lib/server/auth";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

export enum ArtistStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export async function createArtist(params: Prisma.ArtistCreateInput)  {
  try {
    const artist = await prisma.artist.create({
      data: params
    })

    revalidatePath('/dashboard/artists')
    return artist
  } catch(err) {
    throw new Error("There was an error when creating the artist")
  }
}

export async function updateArtist(id: number, params: Prisma.ArtistUpdateInput) {
  try {
    const artist = await prisma.artist.update({
      where: {
        id
      },
      data: params
    })

    revalidatePath(`/dashboard/artists/${id}`)
    return artist
  } catch(err) {
    throw new Error("There was an error when updating the artist")
  }
}

export async function deleteArtist(id: number) {
  try {
    await prisma.artist.delete({
      where: {
        id
      },
    })

    revalidatePath('/dashboard/artists')
  } catch(err) {
    throw new Error("There was an error when deleting the artist")
  }
}
