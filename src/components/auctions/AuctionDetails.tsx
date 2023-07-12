import prisma from "@/lib/prisma"
import { DateTime } from "luxon";
import { redirect, usePathname } from "next/navigation";
import AuctionArtworksGrid from "./AuctionArtworksGrid";
import Link from "next/link";
import { getServerSession } from "@/lib/server/auth";
import { useState } from "react";
import { AuctionDetailsCountdown } from "./AuctionDetailsCountdown";

export async function AuctionDetails({ id, page = 1 }: {
  id: string,
  page: number
}) {
  const currPage = page - 1;
  const auctionPromise = prisma.auction.findFirst({
    where: {
      id: parseInt(id),
    },
    include: {
      _count: {
        select: {
          artworks: true,
        }
      },
      artworks: {
        take: 10,
        skip: currPage * 10,
        include: {
          bids: true,
          highest_bid: {
            include: {
              bid: true
            }
          },
        }
      },
    },
  });
  const now = DateTime.now()

  const sessionPromise = getServerSession()
  const [session, auction] = await Promise.all([sessionPromise, auctionPromise]);

  if(!auction) 
    redirect("/")

  return (
    <div className="auctions-single">
      <div className="auctions-single-pagination">
        <div className="container">
          <p className="text-body-tertiary"><small>Home / Auctions / {auction.name}</small></p>
        </div>
      </div>
      <div className="auction-single-header">
        <div className="container position-relative">
          <div className="row">
            <div className="col-md-9 align-self-center">
              <h1 className="mb-3 fw-bold text-primary">{ auction.name }</h1>
              <div className="auction-single-header__description mb-4" dangerouslySetInnerHTML={{
                __html: auction.description
              }}></div>
              <div className="auction-single-header__details align-items-stretch d-flex my-3 w-100">
                <div className="auction-single-header__widget me-4">
                  <div className="auction-single-header__widget-icon me-3">
                    <p className="fw-bold mb-1 text-primary"><i className="ti-gallery d-inline-block me-2"></i>Artworks</p>
                  </div>
                  <div className="auction-single-header__widget-content fw-semibold">
                    { auction._count.artworks } Registered
                  </div>
                </div>
                <div className="auction-single-header__widget me-4">
                  <div className="auction-single-header__widget-icon me-3">
                    <p className="fw-bold mb-1 text-primary"><i className="ti-calendar d-inline-block me-2"></i>Starts At</p>
                  </div>
                  <div className="auction-single-header__widget-content fw-semibold">
                    { DateTime.fromJSDate(auction.start_date).toFormat('LLLL dd, yyyy hh:mm a') }
                  </div>
                </div>
                <div className="auction-single-header__widget">
                  <div className="auction-single-header__widget-icon me-3">
                    <p className="fw-bold mb-1 text-primary"><i className="ti-calendar d-inline-block me-2"></i>Ends At</p>
                  </div>
                  <div className="auction-single-header__widget-content fw-semibold">
                    { DateTime.fromJSDate(auction.end_date).toFormat('LLLL dd, yyyy hh:mm a') }
                  </div>
                </div>
              </div>
            </div>

          </div>
          <div className="auction-single-timer">
            <div className="py-3 text-center">
              {
                now < DateTime.fromJSDate(auction.start_date) &&
                <>
                  <h3 className="mb-4">Auction Starts In</h3>
                  <AuctionDetailsCountdown date={auction.start_date}  />
                </> 
              }
              {
                now >= DateTime.fromJSDate(auction.start_date) && now < DateTime.fromJSDate(auction.end_date) &&
                <>
                  <h3 className="mb-4">Auction Ends In</h3>
                  <AuctionDetailsCountdown date={auction.end_date}  />
                </>
              }
              {
                now >= DateTime.fromJSDate(auction.end_date) &&
                  <h3 className="mb-4">Auction Has Ended</h3>
              }
              {
                session.user && session.user.groups?.indexOf("artist") !== -1 &&
                  <div className="actions mt-4">
                    <button className="btn btn-tertiary text-white d-block w-100">
                      <strong>REGISTER YOUR ARTWORK</strong>
                    </button>
                  </div>
              }
            </div> 
          </div>
        </div>
      </div>
      <div className="auction-content py-5">
        <div className="container">
          <div className="filters">
            <div className="search">
              <div className="input-group">
                <span className="input-group-text">
                  <i className="ti-search"></i>
                </span>
                <input 
                  placeholder="Search for an artwork"
                  className="form-control"
                  type="text" />
              </div>
            </div>
          </div>
          <div className="auction-artworks-grid-container">
            <AuctionArtworksGrid 
              auctionEnded={now >= DateTime.fromJSDate(auction.end_date)}
              artworks={auction.artworks} />
            <div className="pagination d-flex justify-content-end">
              <ul className="pagination">
                <li className="page-item">
                  {
                    !! currPage &&
                      <Link 
                        scroll={false}
                        href={`/auctions/${auction.id}?page=${currPage}`}
                        className={"page-link"}>
                        <i className="ti-arrow-left"></i>
                      </Link>
                  }
                  {
                    !currPage &&
                      <a 
                        className={"page-link disabled"} 
                        href="#">
                        <i className="ti-arrow-left"></i>
                      </a>
                  }
                </li>
                <li className="page-item">
                  <Link 
                    scroll={false}
                    href={`/auctions/${auction.id}?page=${+page + 1}`}
                    className={"page-link"}>
                    <i className="ti-arrow-right"></i>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}