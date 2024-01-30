import { ArtworkAuctionWithArtworkAndBids, ArtworkAuctionWithBids, ArtworkWithBids } from "@/types/types";

export function getHighestBid(artwork: ArtworkAuctionWithArtworkAndBids) {
  const max = artwork.bids.map(artwork => artwork.amount)
    .reduce((prev: number, current: number) => {
    if(!prev)
      return current;

    return current > prev ? current : prev;
  }, artwork.artwork.minimum_bid ?? 0);

  return max;
}