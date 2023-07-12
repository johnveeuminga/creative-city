import { Prisma, PrismaClient } from "@prisma/client"

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

export type ArtworkWithArtist = Prisma.ArtworkGetPayload<{
  include: {
    artist: true,
  }
}>

export type ArtistWithUser = Prisma.ArtistGetPayload<{
  include: {
    user: true,
  }
}>

export type ArtistWithUserAndArtworkCount = Prisma.ArtistGetPayload<{
  include: {
    user: {
      include: {
        _count: {
          select: { artworks: true }
        }
      }
    },
  }
}>