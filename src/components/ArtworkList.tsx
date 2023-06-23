"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function ArtworkList({ artworks, userId }) {
  const { push } = useRouter();
  const handleClick = (id: number) => {
    push(`/dashboard/artworks/${id}/edit`);
  };
  return (
    <div className="row">
      {artworks.map((artwork: any) => (
        <div
          key={artwork.id}
          className="col-md-4"
          onClick={() => handleClick(artwork.id)}
        >
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">{artwork.name}</h5>
              <p className="card-text">{artwork.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
