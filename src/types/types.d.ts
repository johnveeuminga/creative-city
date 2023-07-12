import { Prisma } from "@prisma/client"

export type ArtworkWithBids = Prisma.ArtworkGetPayload<{
  include: {
    bids: true
  }
}>

export type ArtworkWithBidsAndHighestBid = Prisma.ArtworkGetPayload<{
  include: {
    bids: true,
    highest_bid: {
      include: {
        bid: true,
      }
    }
  }
}>

export type ArtworkWithAuctionBidAndHighestBid = Prisma.ArtworkGetPayload<{
  include: {
    bids: true,
    auction: true,
    highest_bid: {
      include: {
        bid: true,
      }
    }
  }
}>