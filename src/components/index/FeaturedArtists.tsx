import React from "react";
import ArtistsGrid from "../artists/ArtistsGrid";
import Link from "next/link";
import { MdOutlineArrowRightAlt } from "react-icons/md";

export default function FeaturedArtists() {
  return (
    <section className="shop-index-section bg-secondary">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="text-primary shop-index-section__title">Featured Artists</h2>
          <Link href={"/artists"} className="btn text-primary bg-transparent">
            View All
            <MdOutlineArrowRightAlt className="ms-1" />
          </Link>
        </div>
        <React.Suspense fallback={<p>Loading..</p>}>
          <ArtistsGrid />
        </React.Suspense>
      </div>
    </section>
  );
}
