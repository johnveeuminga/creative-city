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

export type ArtworkWithMedia = Prisma.ArtworkGetPayload<{
  include: {
    media: true,
  }
}>

export type ArtworkWithArtistAndMedia = Prisma.ArtworkGetPayload<{
  include: {
    artist: true,
    media: true,
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

export type HighestBidWithArtworkAndUser = Prisma.ArtworkHighestBidGetPayload<{
  include: {
    artworkAuction: {
      include: {
        artwork: true
      }
    },
    bid: {
      include: {
        user: true,
      }
    }
  }
}>

export type ArtworkAuctionWithArtworkAndBids = Prisma.ArtworkAuctionGetPayload<{
  include: {
    bids: true,
    artwork: {
      include: {
        media: true
      }
    }
  }
}>;

export type ArtworkAuctionWithBids = Prisma.ArtworkAuctionGetPayload<{
  include: {
    bids: true,
  } 
}>;

export type ArtworkAuctionWithArtworkAndHighestBid = Prisma.ArtworkAuctionGetPayload<{
  include: {
    artwork: {
      include: {
        media: true
      }
    },
    highestBid: {
      include: {
        bid: true,
      }
    },
  }
}>

export type ArtworkAuctionWithArtworkAndBidsAndHighestBids = Prisma.ArtworkAuctionGetPayload<{
  include: {
    artwork: {
      include: {
        media: true
      }
    },
    bids: true,
    highestBid: {
      include: {
        bid: true,
      }
    },
  }
}>