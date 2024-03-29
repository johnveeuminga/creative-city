'use server'

import prisma from "@/lib/prisma";
import { getServerSession } from "@/lib/server/auth";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function handleOnClick(id: string) {
  const artwork = await prisma.artwork.findUnique({
    where: {
      id: parseInt(id),
    }
  });
}

export async function doCreateArtwork(
  name: string, 
  description: string, 
  shortDescription: string,
  material: string, 
  dimensions: string, 
  weight: number, 
  {
    files,
    type,
    price,
  }: {
    files: string[],
    type: 'auction' | 'bidding'
    price: number
  } = { files: [], type: 'bidding', price: 0 }) {
  const server = await getServerSession()

  if(!server.user)
    throw new Error("Unauthorized")

  try {
    const media: Prisma.ArtworkMediaCreateWithoutArtworkInput[] = files.map(f => ({
      filePath: f
    }))

    const data: Prisma.ArtworkCreateInput = {
      name,
      description,
      shortDescription,
      material,
      dimensions,
      weight,
      artist: {
        connect: { id: parseInt(server.user.id) }
      },
      media: {
        create: media
      }
    }

    if(type === 'auction') {  
      data.isAuction = true;
    }

    await prisma.artwork.create({
      data,
    });

  } catch (error) {
    console.error("Error creating artwork:", error);
  }
}

export async function doEditArtwork(name: string, description: string, artworkId: number) {
  try {
    await prisma.artwork.update({
      where: { id: artworkId },
      data: {
        name,
        description,
      },
    });
    console.log("Success Editing Artwork");
    revalidatePath(`/dashboard/artworks/[artwork_id]`)
  } catch (error) {
    console.error("Error editing artwork:", error);
  }
}

export async function doDeleteArtwork(artworkId: number) {
  try {
    await prisma.artwork.delete({
      where: { id: artworkId },
    });
    console.log("Success Deleting Artwork");
  } catch (error) {
    console.error("Error deleting artwork:", error);
  }
}
