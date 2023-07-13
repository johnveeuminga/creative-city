'use client'

import doSendMessage from "@/actions/messages";
import { useState, useTransition } from "react"

export default function MessageForm({
  fromUserId,
  toUserId
}: {
  fromUserId: number,
  toUserId: number,
}) {
  const [message, setMessage] = useState<string>('')
  const [isPending, startTransition] = useTransition();

  const handleSubmit = () => {
    startTransition(async () => {
      await doSendMessage({
        message,
        fromUserId,
        toUserId,
      })
      setMessage('')
    })
  }
  

  return (
    <>
      <textarea 
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        name="" 
        id="" 
        className="form-control border-0"
        placeholder="Type a message here">
      </textarea>
      <div className="text-end my-3">
        <button 
          disabled={isPending}
          onClick={() => handleSubmit()}
          className="btn btn-outline-primary">Send Message</button>
      </div>
    </>
  )
}