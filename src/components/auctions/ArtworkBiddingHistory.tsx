'use client'

import { useAppSync } from "@/lib/client/appsync-ws"
import { useEffect, useState, useTransition } from "react"
import { NumericFormat } from "react-number-format"


export default function ArtworkBiddingHistory({
  auctionId,
  artworkId,
}: {
  auctionId: string,
  artworkId: string,
}) {
  const { 
    sendMessage,
    lastMessage,
  } = useAppSync({
    channelName: `auction.${auctionId}.artwork.${artworkId}.bid`
  })
  const [messages, setMessages] = useState<any[]>([])

  useEffect(() => {
    if(lastMessage) {
      const message = JSON.parse(lastMessage.data)
      const data = JSON.parse(message.payload.data.subscribe.data)
      setMessages((state) =>  {
        const newState = [ 
          data,
          ...state,
        ]

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
                <div>10 mins ago</div>
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