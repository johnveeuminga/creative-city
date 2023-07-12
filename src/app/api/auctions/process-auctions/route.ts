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
    await prisma.artworkHighestBid.updateMany({
      data: {
        processed: true,
      },
      where: {
        artwork: {
          auction: {
            id: auction.id
          }
        }
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