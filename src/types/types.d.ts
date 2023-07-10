import { Prisma } from "@prisma/client"

export type ArtworkWithBids = Prisma.ArtworkGetPayload<{
  include: {
    bids: true
  }
}>