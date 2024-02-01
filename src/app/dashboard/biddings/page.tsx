import MoneyFormat from "@/components/MoneyFormat"
import prisma from "@/lib/prisma"
import { getServerSession } from "@/lib/server/auth"
import { tr } from "@faker-js/faker"
import Link from "next/link"
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
      artwork: {
        include: {
          purchase: {
            where: {
              userId: Number(user.id)
            }
          }
        }
      },
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
                <th>Invoice</th>
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
                      {
                        !! bid.artwork.purchase.length && bid.artwork.purchase[0].paymentStatus !== "PAID" &&
                          <Link href={bid.artwork.purchase[0].url ?? ""}>
                            Pay Now
                          </Link>
                      }
                      {
                        !! bid.artwork.purchase.length && bid.artwork.purchase[0].paymentStatus === "PAID" &&
                        <p className="mb-0">
                          INVOICE PAID <br/>
                          Ref ID: <strong>{ bid.artwork.purchase[0].xendItRefId }</strong>
                        </p>
                      }
                      {
                        ! bid.artwork.purchase.length &&
                          <p className="mb-0">Generating Invoice</p>
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