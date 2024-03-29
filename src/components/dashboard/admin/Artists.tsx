import ClientPagination from "@/components/ClientPagination"
import prisma from "@/lib/prisma"
import { getArtists } from "@/lib/server/artists"
import { Prisma } from "@prisma/client";
import { DateTime } from "luxon"
import { ArtistsSearch } from "./ArtistsSearch";
import { ArtistStatus } from "./ArtistStatus";
import Link from "next/link";
import { ArtistWithUser } from "@/types/types";

export async function Artists({
  page = '0',
  orderBy = {},
  search=''
}: {
  page?: string;
  orderBy?: Prisma.ArtistOrderByWithRelationInput,
  lastCursor?: string;
  search?: string;
}) {
  let params: Prisma.ArtistFindManyArgs = {
    take: 10,
    orderBy: [
      {
        "createdAt": "asc",
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
      nickname: {
        contains: search,
      }
    }
  }

  const artists = await getArtists<ArtistWithUser[]>(params);

  return(
    <div className="table-wrapper">
      <div className="actions d-flex align-items-center justify-content-between mb-3">
        <div className="search-wrapper">
          <ArtistsSearch />
        </div>
        <div className="filters">
          <Link 
            href={"/dashboard/artists/create"}
            className="btn btn-dashboard-primary">
            Create Artist
          </Link>
        </div>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Nickname</th>
            <th>Status</th>
            <th>Contact Number</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
        {
            artists && artists.map(artist => (
              <tr key={artist.id}>
                <td><span className="text-dark font-weight-bold">{ artist.user.name }</span></td>
                <td><span className="text-dark font-weight-bold">{ artist.user.email }</span></td>
                <td><span className="text-dark font-weight-bold">{ artist.nickname }</span></td>
                <td><ArtistStatus artist={artist} /></td>
                <td>{ artist.contactNumber }</td>
                <td>{ DateTime.fromJSDate(artist.createdAt).toLocaleString(DateTime.DATETIME_MED) }</td>
              </tr>
            ))
          }
        </tbody>
      </table>
      {
        ! artists.length &&
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
