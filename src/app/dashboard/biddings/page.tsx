import MoneyFormat from "@/components/MoneyFormat"
import prisma from "@/lib/prisma"
import { getServerSession } from "@/lib/server/auth"
import { tr } from "@faker-js/faker"
import { redirect } from "next/navigation"

export default async function BiddingsPage() {
  const { user } = await getServerSession()

  if(!user)
    redirect("/401")


  const biddings = await prisma.bid.findMany({
    distinct: ['artworkId'],
    include: {
      artwork: {
        include: {
          auction: true,
          purchase: {
            take: 1,
            orderBy: {
              id: 'desc'
            }
          },
        }
      },
    },
    where: {
      userId: Number(user.id)
    },
    orderBy: {
      id: 'desc'
    }
  })



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
                    <td>{ bid.artwork.auction?.name }</td>
                    <td><MoneyFormat value={bid.amount.toString()}/></td>
                    <td>
                      {
                        bid.artwork.purchase[0].paymentStatus  == 'PENDING' ?
                          <a href={bid.artwork.purchase[0].url ?? ""} target="_blank">Proceed to Payment</a> :
                          <p className="mb-0">{bid.artwork.purchase[0].paymentStatus}</p>
                      } 
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