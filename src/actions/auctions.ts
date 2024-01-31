'use server'

import 'server-only'
import { getClient } from "@/lib/apollo";
import prisma from "@/lib/prisma";
import { getServerSession } from "@/lib/server/auth";
import { gql } from "@apollo/client";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import Artwork from '@/components/Artwork';
import { DateTime } from 'luxon';
import { NextResponse } from 'next/server';


export async function createAuction(params: Prisma.AuctionCreateInput)  {
  try {
    const auction = await prisma.auction.create({
      data: params
    })

    revalidatePath('/dashboard/auctions')
    return auction
  } catch(err) {
    throw new Error("There was an error when creating the auction")
  }
}

export type artworkBidInput = {
  amount: number,
}

export async function bidOnAnArtwork(id: number, { amount }: artworkBidInput) {
  const { user } = await getServerSession();

  const now = DateTime.now().toJSDate();

  if(!user)
    return {
      error: "Unauthorized",
    }

  const artworkAuction = await prisma.artworkAuction.findFirst({
    where: {
      id
    },
    include: {
      artwork: true,
    }
  })

  if(!artworkAuction || !artworkAuction.artwork)
    return {
      error: "Artwork auction was not found"
    }

  if(!artworkAuction.artwork.minimum_bid)
    return {
      error: "Artwork auction has no minimum bid"
    }

  if(amount < artworkAuction.artwork.minimum_bid)
    return {
      error: "Amount is less than minimum bid"
    }

  if(now < artworkAuction.startDateTime)
    return { error: "Bidding has not started yet" }

  if(now > artworkAuction.endDateTime)
    return { error: "Bidding has already ended" }

  try {
    const result = await prisma.$transaction(async (tx) => {
      // Gets the current highest bid.
      let highestBid = await tx.artworkHighestBid.findFirst({
        where: {
          artworkAuctionId: artworkAuction.id,
        },
        include: {
          bid: true,
          artworkAuction: true
        }
      });

      // Create bid.
      const bid = await tx.bid.create({
        data: {
          amount: amount,
          artworkAuctionId: id,
          userId: parseInt(user.id),
        },
      });

      if(!highestBid) {
        // If there is no highest bid, we create one
        highestBid = await tx.artworkHighestBid.create({
          data: {
            bidId: bid.id,
            artworkAuctionId: id,
            version: 1
          },
          include: {
            bid: true,
            artworkAuction: {
              include: {
                artwork: true
              },
            }
          }
        })
      } else {
        // If the amount is lesser than the current highest bid found,
        // we throw an error specifiying that they have the lowest bid.
        if(amount <= highestBid.bid.amount)
          throw new Error("The amount you entered is lower than the current highest bid")

        // Check if the version from the highest bid is still the same. If it's not, this means that
        // sometime that this query is running, the version has been updated. Proceed if the version
        // is the same.
        const highestBidVersion = await tx.artworkHighestBid.updateMany({
          data: {
            bidId: bid.id,
            version: {
              increment: 1
            }
          }, 
          where: {
            artworkAuctionId: highestBid.artworkAuctionId,
            version: highestBid.version,
          }
        })

        // If there has been 0 updates, the version has been changed implying that there has been 
        // a new highest bid. Throws an error if no result has been updated.
        // TODO: Create a new error for better error returns.
        if (highestBidVersion.count === 0) {
          throw new Error("The amount you entered is lower than the current highest bid")
        }
      }

      return {
        ...highestBid,
        bid,
      };
    });

    const mutation = gql`mutation PublishData($data: AWSJSON!, $channelName: String!) {
      publish(data: $data, name: $channelName) {
        data
        name
      }
    }`

    await getClient().mutate({
      mutation: mutation,
      variables: {
        data: JSON.stringify({
          "amount": result.bid.amount.toString(),
          "createdAt": DateTime.fromJSDate(result.bid.createdAt).toFormat("LLL dd, yyyy hh:mm:ss a"),
        }),
        channelName: `auction.${result.artworkAuctionId}.artwork.${result.artworkAuction.id}.bid`.toString(),
      },
    })
    revalidatePath("/auctions/[id]")

    return result;
  } catch(err: any) {
    return {
      error: err.message,
    }
  }
}

export async function doRegisterArtworkToAuction(artworkIds: number[], auctionId: number) {
  try {
    const session = await getServerSession()

    // TODO: Check for capability here.
    if(!session.user)
      throw new Error('Error')

    await prisma.artwork.updateMany({
      where: {
        id: {
          in: artworkIds,
        }
      },
      data: {
        auction_id: auctionId,
      }
    })

    return {
      success: true
    }
  } catch {
    return {
      error: "Something went wrong"
    }
  }
}