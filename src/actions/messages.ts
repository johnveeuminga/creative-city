'use server'

import prisma from "@/lib/prisma"

export default async function doSendMessage({
  toUserId,
  fromUserId,
  message
}: { 
  toUserId: number,
  fromUserId: number,
  message: string
}) {
  const messageToSend = await prisma.message.create({
    data: {
      fromUserId,
      toUserId,
      message
    }
  })

  return messageToSend
}
