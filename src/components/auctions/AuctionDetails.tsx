import prisma from "@/lib/prisma"
import { DateTime } from "luxon";
import { redirect } from "next/navigation";

export async function AuctionDetails({ id }: {
  id: string
}) {
  const auction = await prisma.auction.findFirst({
    where: {
      id: parseInt(id),
    }
  });

  if(!auction) 
    redirect("/")

  return (
    <div className="auctions-single">
      <div className="auction-single-header">
        <div className="container position-relative">
          <div className="row">
            <div className="col-md-9 align-self-center">
              <h2 className="mb-3">{ auction.name }</h2>
              <div className="auction-single-header__description" dangerouslySetInnerHTML={{
                __html: auction.description
              }}></div>
              <div className="auction-single-header__details align-items-stretch d-flex my-3 w-100">
                <div className="auction-single-header__widget me-4">
                  <div className="auction-single-header__widget-icon me-3">
                    <p className="fw-bold"><i className="ti-gallery d-inline-block me-1"></i>Artworks</p>
                  </div>
                  <div className="auction-single-header__widget-content">
                    76 Registered
                  </div>
                </div>
                <div className="auction-single-header__widget me-4">
                  <div className="auction-single-header__widget-icon me-3">
                    <p className="fw-bold"><i className="ti-calendar d-inline-block me-1"></i>Start Date</p>
                  </div>
                  <div className="auction-single-header__widget-content">
                    { DateTime.fromJSDate(auction.start_date).toFormat('LLLL dd, yyyy hh:mm a') }
                  </div>
                </div>
                <div className="auction-single-header__widget">
                  <div className="auction-single-header__widget-icon me-3">
                    <p className="fw-bold"><i className="ti-calendar d-inline-block me-1"></i>End Date</p>
                  </div>
                  <div className="auction-single-header__widget-content">
                    { DateTime.fromJSDate(auction.end_date).toFormat('LLLL dd, yyyy hh:mm a') }
                  </div>
                </div>
              </div>
            </div>

          </div>
          <div className="auction-single-timer">
            <div className="py-3 text-center">
              <h4 className="mb-4">Auction Starting In</h4>
              {/* TODO: Make client component and countdown */}
              <div className="timer d-flex justify-content-around mb-3">
                <div className="timer-section days">
                  <p className="value">3</p>
                  <p className="label"><small>Days</small></p>
                </div>
                <div className="timer-section hours">
                <p className="value">18</p>
                  <p className="label"><small>Hrs</small></p>
                </div>
                <div className="timer-section minutes">
                <p className="value">30</p>
                  <p className="label"><small>Mins</small></p>
                </div>
                <div className="timer-section seconds">
                <p className="value">00</p>
                  <p>Sec</p>
                </div>
              </div>
              <div className="actions mt-4">
                <button className="btn btn-secondary text-white d-block w-100">
                  <strong>REGISTER YOUR ARTWORK</strong>
                </button>
              </div>
            </div> 
          </div>
        </div>
      </div>
    </div>
  )
}