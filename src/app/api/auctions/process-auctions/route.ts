import prisma from "@/lib/prisma";
import xendit from "@/lib/xendit";
import { HighestBidWithArtworkAndUser } from "@/types/types";
import { Artwork, ArtworkPurchase, Auction, User } from "@prisma/client";
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
          message: `Congratulations! You have won the auction for ${highestBid.artwork.name} at ${auction.name}! Payment should be made before we initiate shipping. Please see your Dashboard -> My Orders to start your payment.`
        }
      })
    })

    const orderPromises: Promise<any>[] = highestBids.map(highestBid => {
      return createPurchaseOrders({ highestBid })
    })

    await Promise.all([
      ...promises,
      ...orderPromises,
    ])

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

async function createPurchaseOrders({
  highestBid
}: { highestBid: HighestBidWithArtworkAndUser }): Promise<{ artworkPurchase: ArtworkPurchase }> {
  console.log("Creating Purchase Order")
  const { artwork, bid } = highestBid
  const { user } = bid

  const x = xendit;
  const { 
    Invoice
  } = x

  const i = new Invoice({})

  const externalID = `bcc-${new Date().getTime()}-${artwork.id}`;

  const invoice = await i.createInvoice({
    externalID,
    payerEmail: user.email,
    amount: bid.amount + (bid.amount * .10),
    items: [
      {
        name: artwork.name,
        quantity: 1,
        price: artwork.price
      }
    ],
    fees: [
      {
        type: 'Convenience Fee',
        value: bid.amount * .10,
      }
    ]
  }) as any


  const artworkPurchase = await prisma.artworkPurchase.create({
    data: {
      artworkId: artwork.id,
      xendItRefId: externalID,
      userId: user.id,
      url: invoice.invoice_url,
    }
  })

  return {
    artworkPurchase,
  }
}