'use client'

import { NumericFormat } from "react-number-format"
import { getHighestBid } from "@/lib/server/artworks"
import { useState, useTransition } from "react"
import { bidOnAnArtwork } from "@/actions/auctions"
import { getServerSession } from "@/lib/server/auth"
import { ArtworkWithBids } from "@/types/types"

export function ArtworkBiddingBox({ artwork }: {
  artwork: ArtworkWithBids
}) {
  const [bid, setBid] = useState<number| null>(0);
  const [highestBid, setHighestBid] = useState<number>(getHighestBid(artwork));
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isPending, startTransition] = useTransition();
  
  function handleBidClicked() {
    startTransition(async () => {
      if(!bid) {
        setErrorMessage("Please enter a valid bid amount.")
        return
      }

      const res: any = await bidOnAnArtwork(artwork.id, {
        amount: bid,
      });

      if(res.error) {
        setErrorMessage(res.error);
        setSuccessMessage("");
      }
      else {
        setBid(0);
        setSuccessMessage("Bid successfuly placed");
        setErrorMessage("");
        setHighestBid(res.bid.amount)
      }
    })
  }

  return (
    <div className="bidding-box">
      <div className="bidding-box__current-details">
        <p><small>Current Price</small></p>
        <p className="bidding-box__current-price">
          <strong>
            <NumericFormat thousandSeparator={true} value={highestBid} displayType="text" prefix="Php "/>
          </strong>
        </p>
      </div>
      <div className="bidding-box__bid my-5">
        <div className="mb-3">
          <label className="mb-2" htmlFor="">Your bid</label>
          <div className="input-group">
            <span className="input-group-text">₱</span>
            <input 
              value={bid ?? 0}
              onChange={(e) => setBid(parseFloat(e.target.value))}
              min={highestBid + 1} 
              type="number"
              className="form-control" />
          </div>
        </div>
        <div className="d-grid">
          <button 
            disabled={isPending}
            onClick={() => handleBidClicked()}
            className="btn btn-primary btn-lg fw-bold">
            PLACE BID
          </button>
        </div>
        {/* TODO: Handle success and error messages better. */}
        {
          successMessage &&
            <div className="success mt-3">
              <p>
                Success! {successMessage}
              </p>
            </div>
        }
        {
          errorMessage &&
            <div className="error mt-3">
              <p className="text-danger">* { errorMessage }</p>
            </div>
        }
      </div>
    </div>
  )
}