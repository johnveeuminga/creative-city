import { Auction, Prisma } from "@prisma/client";
import prisma from "../prisma";
import { DateTime } from "luxon";

export async function getAuctions(params: Prisma.AuctionFindManyArgs = {}): Promise<Auction[]> {
  const auctions = await prisma.auction.findMany(params);

  return auctions;
}

export type AuctionWithArtworkCount = Prisma.AuctionGetPayload<{
  include: {
    _count: {
      select: { artworks: true }
    }
  }
}>

export async function getOngoingAuctions(params: Prisma.AuctionFindManyArgs = {}): Promise<AuctionWithArtworkCount[]> {
  const now = DateTime.now().toJSDate()

  const auctions = await prisma.auction.findMany({
    where: {
      start_date: {
        lte: now,
      },
      end_date: {
        gt: now,
      }
    },
    include: {
      _count: {
        select: { artworks: true }
      }
    },
    take: params.take,
    orderBy: params.orderBy,
  })

  return auctions
}