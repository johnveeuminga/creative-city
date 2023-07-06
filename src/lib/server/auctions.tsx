import { Auction, Prisma } from "@prisma/client";
import prisma from "../prisma";


export async function getAuctions(params: Prisma.AuctionFindManyArgs = {}): Promise<Auction[]> {
  const auctions = await prisma.auction.findMany(params);

  return auctions;
}
