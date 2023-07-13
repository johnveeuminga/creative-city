import prisma from "@/lib/prisma";
import { Auction } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  const auctions = await prisma.auction.findMany({
    where: {
      end_date: {
        lte: new Date()
      },
      isProcessed: false,
    },
    include: {
      artworks: true
    }
  })

  console.log(auctions)

  const promises: Promise<any>[] = auctions.map(async (auction) => {
    return processAuction(auction)  
  })

  await Promise.all(promises)

  return NextResponse.json("Successfully processed auction")
}

const processAuction = async(auction: Auction): Promise<{
  processed: boolean
}> => {
  try {
    const highestBids = await prisma.artworkHighestBid.findMany({
      where: {
        artwork: {
          auction: {
            id: auction.id
          }
        }
      },
      include: {
        artwork: true,
        bid: {
          include: {
            user: true,
          }
        }
      }
    })

    await prisma.artworkHighestBid.updateMany({
      where: {
        artwork: {
          auction: {
            id: auction.id
          }
        }  
      },
      data: {
        processed: true
      }
    })

    await prisma.auction.updateMany({
      data: {
        isProcessed: true
      },
      where: {
        id: auction.id,
      }
    })

    const promises: Promise<any>[] = highestBids.map(highestBid => {
      return prisma.message.create({
        data: {
          fromUserId: highestBid.artwork.artist_id,
          toUserId: highestBid.bid.userId,
          message: `Congratulations! You have won the auction for ${highestBid.artwork.name} at ${auction.name}! Payment should be made before we initiate shipping. Please see your Dashboard -> My Biddings to start your payment.`
        }
      })
    })

    await Promise.all(promises)

    return {
      processed: true
    }
  } catch(err) {
    // TODO: Log error here
    return {
      processed: false
    }
  }
}