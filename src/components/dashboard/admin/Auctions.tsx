import ClientPagination from "@/components/ClientPagination"
import prisma from "@/lib/prisma"
import { getAuctions } from "@/lib/server/auctions"
import { Prisma } from "@prisma/client";
import { DateTime } from "luxon"
import { AuctionsSearch } from "./AuctionsSearch";
import Link from "next/link";

export async function Auctions({
  page = '0',
  orderBy = {},
  search=''
}: {
  page?: string;
  orderBy?: Prisma.AuctionOrderByWithRelationInput,
  lastCursor?: string;
  search?: string;
}) {
  let params: Prisma.AuctionFindManyArgs = {
    take: 10,
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
    params.skip = 10 * (parseInt(page) - 1);
  }

  if(search) {
    params.where = {
      name: {
        contains: search,
      }
    }
  }

  const auctions = await getAuctions(params);

  return(
    <div className="table-wrapper">
      <div className="actions d-flex align-items-center justify-content-between mb-3">
        <div className="search-wrapper">
          <AuctionsSearch />
        </div>
        <div className="filters">
          <Link 
            href={"/dashboard/auctions/create"}
            className="btn btn-dashboard-primary">
            Create Auction
          </Link>
        </div>
      </div>
      <table className="table">
        <thead>
          <tr>
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
                <td><span className="text-dark font-weight-bold">{ auction.name }</span></td>
                <td>{ DateTime.fromJSDate(auction.start_date).toLocaleString(DateTime.DATETIME_MED) }</td>
                <td>{ DateTime.fromJSDate(auction.end_date).toLocaleString(DateTime.DATETIME_MED) }</td>
                <td></td>
              </tr>
            ))
          }
        </tbody>
      </table>
      {
        ! auctions.length &&
          <p className="text-center">No data found</p>
      }
      <div 
        className="table-pagination d-flex justify-content-end">
        <ClientPagination
          prevPage={page && parseInt(page) > 1? `?page=${(parseInt(page) - 1)}` : ""}
          nextPage={page ? `?page=${(parseInt(page) + 1)}` : `?page=2`} />
      </div>
    </div>
  )
}