'use server'

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function handleOnClick(id: string) {
  const artwork = await prisma.artwork.findUnique({
    where: {
      id: parseInt(id),
    }
  });

  // Redirect with success message.
}

export async function doCreateArtwork(name: string, description: string, userId: number) {
  try {
    await prisma.artwork.create({
      data: {
        name,
        description,
        artist: {
          connect: { id: userId },
        },
      },
    });
    console.log("Success Creating Artwork");

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