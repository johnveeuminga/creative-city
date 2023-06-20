'use server'

import prisma from "@/lib/prisma";
import { getServerSession } from "@/lib/server/auth";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

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

export type artworkBidInput = {
  amount: number,
}

export async function bidOnAnArtwork(id: number, { amount }: artworkBidInput) {
  const { user } = await getServerSession();

  if(!user)
    return {
      error: "Unauthorized",
    }
  
  try {
    // Gets the current highest bid.
    const highestBid = await prisma.artwork.findFirst({
      where: {
        id,
      }
    }).highest_bid({
      include: {
        bid: true,
        artwork: true,
      }
    });

    if(!highestBid)
      // TODO: Create a new error for better error returns.
      throw new Error("Artwork has not been setup for auction");

    // Extract min bid amount.
    const currentBidAmount = highestBid.bid ? highestBid.bid.amount : (highestBid.artwork.minimum_bid ?? 1);

    if(amount > currentBidAmount) {
      const result = await prisma.$transaction(async (tx) => {
        // Create bid.
        const bid = await tx.bid.create({
          data: {
            amount: amount,
            artwork_id: id,
            user_id: user.id,
          }
        });

        // Check if the version from the highest bid is still the same. If it's not, this means that
        // sometime that this query is running, the version has been updated. Proceed if the same
        const highestBidVersion = await tx.artworkHighestBid.updateMany({
          data: {
            bid_id: bid.id,
            version: {
              increment: 1
            }
          }, 
          where: {
            artwork_id: highestBid.artwork_id,
            version: highestBid.version,
          }
        })

        // If there has been 0 updates, the version has been changed implying that there has been 
        // a new highest bid. Throws an error if no result has been updated.
        // TODO: Create a new error for better error returns.
        if (highestBidVersion.count === 0) {
          throw new Error("The amount you entered is lower than the current highest bid")
        }

        return {
          ...highestBid,
          bid,
        };
      });

      revalidatePath("/auctions/[id]")

      return result;
    } else {
      // TODO: Create a new error for better error returns.
      throw new Error("Your bid is lower or equal to the current highest bid");
    }
  } catch(err: any) {
    return {
      error: err.message,
    }
  }
}