'use client'

import { useState, useTransition } from "react"
import { bidOnAnArtwork } from "@/actions/auctions"
import { 
  ArtworkAuctionWithArtworkAndBidsAndHighestBids,
} from "@/types/types"
import MoneyFormat from "../MoneyFormat"
import { toMedDate } from "@/lib/dates"
import { getHighestBid } from "@/lib/utils/artworks"

export function ArtworkBiddingBox({ artworkAuction, finished = false, bids = [] }: {
  artworkAuction: ArtworkAuctionWithArtworkAndBidsAndHighestBids,
  finished?: boolean,
  bids: Array<any>,
}) {
  const [bid, setBid] = useState<string>("");
  const [highestBid, setHighestBid] = useState<number>(getHighestBid(artworkAuction));
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleBidClicked() {
    startTransition(async () => {
      const amount = parseFloat(bid)

      if(!bid && isNaN(amount)) {
        setErrorMessage("Please enter a valid bid amount.")
        return
      }

      const res: any = await bidOnAnArtwork(artworkAuction.id, {
        amount,
      });

      if(res.error) {
        setErrorMessage(res.error);
        setSuccessMessage("");
      }
      else {
        setBid("");
        setSuccessMessage("Your bid has been successfuly placed.");
        setErrorMessage("");
        setHighestBid(res.bid.amount)
      }
    });
  }

  return (
    <div className="bidding-box">
      {
        ! finished &&
          <>
            <div className="bidding-box__current-details mb-4">
              <p className="mb-2">{ artworkAuction.bids.length ? "Current Bid" : "Starting Bid"} </p>
              <h4 className="fw-bold">
                <MoneyFormat value={ highestBid } />
              </h4>
            </div>
            <div className="bidding-box__bid my-3">
              <div className="mb-3">
                <label className="mb-2" htmlFor="bid">Your Bid:</label>
                <div className="input-group">
                  <span className="input-group-text">₱</span>
                  <input 
                    id="bid"
                    value={bid}
                    onChange={(e) => setBid(e.target.value)}
                    min={highestBid + 1} 
                    type="number"
                    className="form-control" />
                </div>
              </div>
              <div className="d-grid mb-4">
                <button 
                  disabled={isPending}
                  onClick={() => handleBidClicked()}
                  className="btn btn-primary btn-lg fw-bold">
                  PLACE BID
                </button>
              </div>
              <p>
                Bidding period: <br />
                { toMedDate(artworkAuction.startDateTime) } - { toMedDate(artworkAuction.endDateTime) }
              </p>
            </div>
          </>
      }
      {
        finished &&
          <div className="bidding-box__finished">
            <p className="mb-2">The bidding period has ended. </p>
            <div className="border-bottom py-3">
              <small className="fw-semibold d-block mb-1">Bidding Ended:</small>
              {toMedDate(artworkAuction.endDateTime)}
            </div>
            <div className="border-bottom py-3">
              <p className="mb-2">
                <small className="fw-semibold d-block mb-1">Sold for:</small>
              </p>
              <h4>
                <MoneyFormat value={highestBid}/>
              </h4>
            </div>
          </div> 
      }
      {/* TODO: Handle success and error messages better. */}
      {
        successMessage &&
          <div className="success mt-3">
            <p className="text-success fw-bold">
              Success! {successMessage}
            </p>
          </div>
      }
      {
        errorMessage &&
          <div className="error mt-3">
            <p className="text-danger">* { errorMessage } </p>
          </div>
      }
    </div>
  )
}