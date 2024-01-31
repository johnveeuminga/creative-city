import MoneyFormat from "@/components/MoneyFormat"
import prisma from "@/lib/prisma"
import { getServerSession } from "@/lib/server/auth"
import { tr } from "@faker-js/faker"
import { redirect } from "next/navigation"

export default async function BiddingsPage() {
  const { user } = await getServerSession()

  if(!user)
    redirect("/401")

  const biddings = await prisma.artworkAuction.findMany({
    where: {
      bids: {
        some: {
          userId: Number(user.id)
        }
      }
    },
    include: {
      auction: true,
      artwork: true,
      bids: {
        where: {
          userId: Number(user.id)
        },
        orderBy: {
          amount: 'desc'
        },
        take: 1
      }
    }
  });

  return (
    <>
      <h1>My Biddings</h1>
      <div className="card shadow-sm">
        <div className="card-body">
          <table className="table w-100">
            <thead>
              <tr>
                <th>ID</th>
                <th>Art/Craft</th>  
                <th>Auction</th>
                <th>Your Highest Bid</th>
                <th>Purchase Order</th>
              </tr>
            </thead>
            <tbody>
              {
                biddings.map(bid => (
                  <tr key={bid.id}>
                    <td>{ bid.id }</td>
                    <td>{ bid.artwork.name }</td>
                    <td>{ bid.auction?.name }</td>
                    <td>
                      { 
                        bid.bids.length &&
                          <MoneyFormat value={ bid.bids[0].amount} />
                      }
                    </td>
                    <td>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}