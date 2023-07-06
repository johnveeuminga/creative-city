import { Prisma } from "@prisma/client"

declare global {
  interface Window {
    WOW: any
  }
}

const artworkWithBids = Prisma.validator<Prisma.ArtworkArgs>({
  include: { bids: true }
})

console.log(artworkWithBids)

type ArtworkWithBids = Prisma.ArtworkGetPayload<{
  include: { bids: true }
}>;


export {
  ArtworkWithBids,
}