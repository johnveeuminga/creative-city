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

export default async function EditArtworkPage({
  params,
}: {
  params: { artwork_id: number };
}) {
  let artwork = await getArtwork(params.artwork_id);
  return <EditArtworkForm artwork={artwork} />;
}
