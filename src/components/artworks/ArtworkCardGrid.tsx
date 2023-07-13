import React from "react";
import ArtworkCard from "./ArtworkCard";

export default function ArtworkCardGrid({ artworks }) {
  return (
    <div className="row">
      {artworks.map((artwork, i) => (
        <div key={i} className="col-lg-6 col-xl-3 col-12 mb-3">
          <ArtworkCard artwork={artwork} />
        </div>
      ))}
    </div>
  );
}
