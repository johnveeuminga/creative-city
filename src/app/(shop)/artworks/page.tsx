import React from "react";
import styles from "../../../styles/artwork-page.module.scss";
import prisma from "@/lib/prisma";
import Link from "next/link";
import MoneyFormat from "@/components/MoneyFormat";
import ArtworkCard from "@/components/ArtworkCard";
import ArtworkCardGrid from "@/components/artworks/ArtworkCardGrid";

export default async function Page() {
  const artworks = await prisma.artwork.findMany({
    where: {
      auction_id: null,
      inStock: true,
      media: {
        some: {},
      },
    },
    include: {
      media: true,
      artist: true,
    },
  });

  return <ArtworkCardGrid artworks={artworks} />;
}
