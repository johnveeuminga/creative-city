'use server'

import prisma from "@/lib/prisma";
import { getServerSession } from "@/lib/server/auth";
import xendit from "@/lib/xendit";
import { checkPrimeSync } from "crypto";

export async function doCreateInvoice(artworkId: string) {
  const session = await getServerSession()

  if(!session.user)
    throw new Error('Unauthorized')

  const artwork = await prisma.artwork.findFirst({
    where: {
      id: parseInt(artworkId),
    }
  })

  if(!artwork)
    throw new Error("Artwork not found")

  if(!artwork.price)
    throw new Error("Artwork has no set price")

  if(!artwork.inStock)
    throw new Error("Artwork has no stock currently")


  const x = xendit;
  const { 
    Invoice
  } = x

  const i = new Invoice({})

  const externalID = `bcc-${new Date().getTime()}-${artworkId}`;

  const invoice = await i.createInvoice({
    externalID,
    payerEmail: session.user.email,
    amount: artwork.price + (artwork.price * .10),
    items: [
      {
        name: artwork.name,
        quantity: 1,
        price: artwork.price
      }
    ],
    fees: [
      {
        type: 'Convenience Fee',
        value: artwork.price * .10,
      }
    ]
  }) as any

  const artworkPurchase = await prisma.artworkPurchase.create({
    data: {
      artworkId: parseInt(artworkId),
      xendItRefId: externalID,
      userId: 2,
    }
  })

  return {
    redirectUrl: invoice.invoice_url,
    artworkPurchase,
  }
}