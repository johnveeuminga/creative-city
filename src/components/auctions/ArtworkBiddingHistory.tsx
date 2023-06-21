'use client'

import { testAppSync } from "@/actions/auctions";
import { useAppSync } from "@/lib/client/appsync-ws"
import { useEffect, useTransition } from "react"

export default function ArtworkBiddingHistory() {
  const { sendMessage } = useAppSync()
  const [isPending, startTransition] = useTransition()

  function handleOnClick() {
    testAppSync();
  }

  return (
    <p>
      This is the bidding history.
      <button 
        onClick={() => handleOnClick()}
        className="btn btn-primary">Test Bid</button>
    </p>
  )
}