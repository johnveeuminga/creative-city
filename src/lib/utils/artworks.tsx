import { ArtworkAuctionWithArtworkAndHighestBid } from "@/types/types";

export function getHighestBid(artworkAuction: ArtworkAuctionWithArtworkAndHighestBid) {
  return artworkAuction.highestBid ?
    artworkAuction.highestBid.bid.amount : 
    artworkAuction.artwork.minimum_bid ?? 0;
}