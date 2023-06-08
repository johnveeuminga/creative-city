import ClientPagination from "@/components/ClientPagination"
import prisma from "@/lib/prisma"
import { getAuctions } from "@/lib/server/auctions"
import { Prisma } from "@prisma/client";
import { DateTime } from "luxon"

export async function Auctions({
  page = '0',
  orderBy = {}
}: {
  page?: string;
  orderBy?: Prisma.AuctionOrderByWithRelationInput,
  lastCursor?: string;
}) {
  let params: Prisma.AuctionFindManyArgs = {
    take: 3,
    orderBy: [
      {
        "start_date": "asc",
      },
      {
        "id": "asc"
      },
    ]
  }

  if(page) {
    // params.skip = 1;
    // params.cursor = {
    //   id: parseInt(page),
    // }
    params.skip = 3 * (parseInt(page) - 1);
  }

  const auctions = await getAuctions(params);

  return(
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Artworks</th>
          </tr>
        </thead>
        <tbody>
        {
            auctions && auctions.map(auction => (
              <tr key={auction.id}>
                <td>{ auction.id }</td>
                <td><span className="text-dark font-weight-bold">{ auction.name }</span></td>
                <td>{ DateTime.fromJSDate(auction.start_date).toLocaleString(DateTime.DATETIME_MED) }</td>
                <td>{ DateTime.fromJSDate(auction.end_date).toLocaleString(DateTime.DATETIME_MED) }</td>
                <td></td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <div 
        className="pagination d-flex justify-content-end">
        <ClientPagination
          prevPage={page && parseInt(page) > 1? `?page=${(parseInt(page) - 1)}` : ""}
          nextPage={page ? `?page=${(parseInt(page) + 1)}` : `?page=2`} />
      </div>
    </div>
  )
}