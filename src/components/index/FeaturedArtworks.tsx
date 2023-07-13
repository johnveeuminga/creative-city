import React from "react";
import FeaturedArtworksGrid from "./FeaturedArtworksGrid";

export default function FeaturedArtworks() {
  return (
    <section className="shop-index-section">
      <div className="container">
        <h2 className="text-primary shop-index-section__title mb-4">Arts & Crafts</h2>
        <React.Suspense>
          <FeaturedArtworksGrid />
        </React.Suspense>
      </div>
    </section>
  );
}
