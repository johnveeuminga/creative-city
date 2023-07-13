import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json()
  
  const purchase = await prisma.artworkPurchase.findFirst({
    where: {
      xendItRefId: body.external_id,
    },
    include: {
      artwork: true,
    }
  })

  if(!purchase)
    return NextResponse.json('No purhcase found')

  // if(purchase.paymentStatus === 'PAID')
  //   return NextResponse.json('Payment has already been processed', { status: 400 })

  await prisma.artworkPurchase.update({
    where: {
      id: purchase.id,
    },
    data: {
      paymentStatus: 'PAID'
    }
  })

  await prisma.artwork.update({
    where: {
      id: purchase.artworkId
    },
    data: {
      inStock: false
    }
  })

  prisma.message.create({
    data: {
      fromUserId: purchase.userId,
      toUserId: purchase.artwork.artist_id,
      message: `Hi! I have successfuly purchased your piece named ${purchase.artwork.name}. Let me know what do you need from for shipping.`
    }  
  }).then()

  return NextResponse.json('processed')
}