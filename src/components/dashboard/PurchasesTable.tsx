import prisma from "@/lib/prisma";
import { User } from "@/lib/server/auth";
import Link from "next/link";

export async function PurchasesTable({ user }: { user: User }) {
  console.log(user)
  const purchases = await prisma.artworkPurchase.findMany({
    where: {
      userId: parseInt(user.id),
    },
    include: {
      artwork: true
    }
  })

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Artwork</th>
            <th>Order Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            purchases.map(purchase => (
              <tr key={purchase.id}>
                <td>{ purchase.id }</td>
                <td>
                  <Link href={`/artworks/${purchase.artworkId}`}>
                    { purchase.artwork.name }
                  </Link>
                </td>
                <td><strong>{ purchase.paymentStatus }</strong></td>
                <td></td>
              </tr>
            ))
          }
        </tbody>
      </table>
      {
        !!! purchases.length && 
          <p className="text-center py-5">No purchases found.</p>
      }
    </>
  )
}