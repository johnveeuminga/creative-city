"use client"

import { ArtworkAuctionWithArtworkAndHighestBid } from "@/types/types";
import MoneyFormat from "../MoneyFormat";

export default function BidAmountDetails({
  artworkAuction
}: { artworkAuction: ArtworkAuctionWithArtworkAndHighestBid }) {
  let amount = artworkAuction.artwork.minimum_bid ?? 0;

  if (!! artworkAuction.highestBid) {
    amount = artworkAuction.highestBid.bid.amount;
  }

  return (
    <MoneyFormat value={amount}/>  
  );
}