import React from "react";
import FeaturedArtworksGrid from "./FeaturedArtworksGrid";
import { MdOutlineArrowRightAlt } from "react-icons/md";
import Link from "next/link";

export default function FeaturedArtworks() {
  return (
    <section className="shop-index-section py-5">
      <div className="container">
      <div className="d-flex justify-content-between align-items-center">
          <h2 className="text-primary shop-index-section__title">Featured Arts & Crafts</h2>
          <Link 
            href={"/artworks"}
            className="btn text-primary bg-transparent">
              View All
              <MdOutlineArrowRightAlt className="ms-1"/>
          </Link>
        </div>
        <React.Suspense>
          <FeaturedArtworksGrid />
        </React.Suspense>
      </div>
    </section>
  );
}
