import EditArtworkForm from "@/components/EditArtworkForm";
import React from "react";
import { Artwork, PrismaClient } from "@prisma/client";
import { useRouter } from "next/navigation";

const prisma = new PrismaClient();

async function getArtwork(id: number) {
  return await prisma.artwork.findUnique({
    where: {
      id: Number(id),
    },
  });
}

export default async function page({
  params,
}: {
  params: { id: number; artwork_id: number };
}) {
  async function handleClick(name, description, id) {
    "use server";
    console.log(name, description);
    try {
      const res = await prisma.artwork.update({
        where: { id: id },
        data: {
          name,
          description,
        },
      });
      console.log("Success");
      return res;
    } catch (error) {
      console.error("Error creating artwork:", error);
    }
  }

  let artwork = await getArtwork(params.artwork_id);
  return <EditArtworkForm artwork={artwork} handleClick={handleClick} />;
}
