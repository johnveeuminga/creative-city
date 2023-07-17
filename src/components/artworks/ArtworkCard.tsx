/* eslint-disable react/no-unescaped-entities */
import React from "react";
import styles from "../../styles/artwork-page.module.scss";
import Link from "next/link";
import MoneyFormat from "../MoneyFormat";

export default function ArtworkCard({ artwork }) {
  console.log(artwork)
  return (
    <Link
      className="text-decoration-none"
      href={`/artworks/${artwork.id}"`}
      prefetch={false}
    >
      <div className={`${styles.artwork} mb-4`}>
        <picture className="artwork__image-container w-100">
          <img
            className={styles.artwork__image}
            alt={artwork.name}
            src={`${process.env.NEXT_PUBLIC_S3_URL}/${artwork.media[0].filePath}`}
          />
        </picture>
        <div className="artwork__content px-1 py-2">
          <h4 className="fw-semibold text-primary">{artwork.name}</h4>
          <p className="mb-0">
            {artwork.artist.first_name} {artwork.artist.last_name}
          </p>
          <p className="fw-semibold">
            <MoneyFormat value={artwork.price?.toString() ?? ""} />
          </p>
        </div>
      </div>
    </Link>
  );
}
