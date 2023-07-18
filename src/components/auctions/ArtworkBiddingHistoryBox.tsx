'use client'

import { useAppSync } from "@/lib/client/appsync-ws"
import { ArtworkWithBids } from "@/types/types"
import { Bid } from "@prisma/client"
import { DateTime } from "luxon"
import { useEffect, useState } from "react"
import { NumericFormat } from "react-number-format"


export default function ArtworkBiddingHistoryBox({
  auctionId,
  artworkId,
  bids,
}: {
  auctionId: string,
  artworkId: string,
  bids: Bid[],
}) {
  const { 
    sendMessage,
    lastMessage,
  } = useAppSync({
    channelName: `auction.${auctionId}.artwork.${artworkId}.bid`
  })
  const [messages, setMessages] = useState<any[]>(bids)
  const [rendered, setRendered] = useState<boolean>(false)

  useEffect(() => {
    if(lastMessage) {
      const message = JSON.parse(lastMessage.data)
      const data = JSON.parse(message.payload.data.subscribe.data)
      data.createdAt = DateTime.fromFormat(data.createdAt, "LLL dd, yyyy hh:mm:ss a").toJSDate()

      setMessages((state) =>  {
        const newState = [ 
          data,
          ...state,
        ]

        console.log("here")

        return newState.slice(0, 5);
      })
    }
  }, [lastMessage]);

  return (
    <div className="card artwork-bidding-history">
      <div className="card-body">
        <h5 className="mb-3 card-title">Recent Bid History </h5>
        {
          messages.map((message, key) => (
            <div 
              key={key}
              className="artwork-bidding py-3 d-flex justify-content-between">
                <div><strong><NumericFormat thousandSeparator={true} displayType="text" value={message.amount} prefix="Php "/></strong></div>
                <div>
                  <small> { DateTime.fromJSDate(message.createdAt).toFormat("LLL dd, yyyy hh:mm:ss a") }</small>
                </div>
            </div>
          ))
        }
        {
          !messages.length &&
            <p>No recent bids for this item yet.</p>
        }
      </div>
    </div>
  )
}