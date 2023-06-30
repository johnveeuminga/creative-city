import prisma from "@/lib/prisma"
import Image from "next/image"
import { redirect } from "next/navigation"
import { relative } from "path"

export default async function AuctionArtworkSinglePage({
  params: {
    id: auctionId,
    artworkId,
  }
}: {
  params: {
    id: string,
    artworkId: string,
  }
}) {
  const artwork = await prisma.artwork.findFirst({
    where: {
      id: parseInt(artworkId),
      auction_id: parseInt(auctionId),
    },
    include: {
      artist: true,
    }
  })

  if(! artwork)
    // TODO: 404 redirect
    redirect("/")

  return(
    <div className="auction-artwork-single mb-5">
      <div className="container">
        <div className="row gx-5">
          <div className="col-md-7">
            <div className="image-container mb-3" style={{
              width: "100%",
              height: 450,
              position: 'relative',
            }}>
              <Image 
                fill={true}
                alt={artwork.name}
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
                src={"/assets/images/features/features-1.jpg"}/>
            </div>
            <div 
              dangerouslySetInnerHTML={{ __html: artwork.description }}
              className="auction-artwork-single-description mb-5">
            </div>
          </div>
          <div className="col-md-5">
            <div className="artwork-heading mb-3">
              <h3>{ artwork.name }</h3>
              <p>{ artwork.artist.first_name } {artwork.artist.last_name }</p>
            </div>
            <div className="bidding-box">
              <div className="bidding-box__current-details">
                <p><small>Current Price</small></p>
                <p className="bidding-box__current-price"><strong>Php 100,000</strong></p>
              </div>
              <div className="bidding-box__bid my-5">
                <div className="mb-3">
                  <label className="mb-2" htmlFor="">Your bid</label>
                  <div className="input-group">
                    <span className="input-group-text">₱</span>
                    <input type="number" className="form-control" />
                  </div>
                </div>
                <div className="d-grid">
                  <button className="btn btn-primary btn-lg fw-bold">
                    PLACE BID
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}