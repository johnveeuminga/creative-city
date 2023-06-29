"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ArtworkList({ artworks, userId }) {
  const { push } = useRouter();
  const handleClick = (id: number) => {
    push(`/dashboard/artworks/${id}/edit`);
  };
  return (
    <div className="row">
      {artworks.map((artwork: any) => (
        <div className="col-lg-4 col-md-6 col-sm-12" key={artwork.id}>
          <div
            className="listing-item listing-grid-one mb-45 wow fadeInUp"
            dta-wow-delay="10ms"
          >
            <div className="listing-thumbnail">
              <img
                src="https://3.bp.blogspot.com/-Tg561TlmZNA/TxGjt2qSBrI/AAAAAAAAEQk/63OZ-7QFON8/s1600/WEDDING+DOD+20X16.jpg"
                alt="Listing Image"
              />
              <div className="thumbnail-meta d-flex justify-content-between align-items-center">
                <div className="meta-icon-title d-flex align-items-center">
                  <div className="icon">
                    <i className="ti-announcement"></i>
                  </div>
                  <div className="title">
                    <h6>For Auction</h6>
                  </div>
                </div>
                <span className="status st-open">Open</span>
              </div>
            </div>
            <div className="listing-content">
              <h3 className="title">
                <Link href="/listing-details-1">{artwork.name}</Link>
              </h3>
              <div className="my-3">
                <span>{artwork.description}</span>
              </div>
              <span className="price">P10, 000.00</span>
              <span className="phone-meta">
                <i className="ti-tablet"></i>
                <a href="tel:+982653652-05">+98 (265) 3652 - 05</a>
              </span>
              <div className="listing-meta">
                <ul>
                  <li>
                    <span>
                      <i className="ti-location-pin"></i>Baguio City, Benguet
                    </span>
                  </li>
                  <li>
                    <span></span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
