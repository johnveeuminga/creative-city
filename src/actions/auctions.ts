'use server'

import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function createAuction(params: Prisma.AuctionCreateInput)  {
  try {
    const auction = await prisma.auction.create({
      data: params
    });
    return auction;
  } catch(err) {
    console.log(err);
  }
}