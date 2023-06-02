'use server'

import prisma from "@/lib/prisma";

export async function handleOnClick(id: string) {
  const artwork = await prisma.artwork.findUnique({
    where: {
      id: parseInt(id),
    }
  });

  // Redirect with success message.
  console.log(artwork);
}