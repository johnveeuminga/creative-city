"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Artwork } from "@prisma/client";
import styles from "../styles/artwork-card.module.scss";

export default function ArtworkList({ artworks, userId }: { artworks: Artwork[], userId: number }) {
  const { push } = useRouter();
  const handleClick = (id: number) => {
    push(`/dashboard/artworks/${id}/edit`);
  };
  return (
    <div className="row">
      {artworks.map((artwork: any, index) => (
        <div className="col-lg-4 col-md-6 col-sm-12" key={artwork.id}>
          <div
            className={`card ${styles.card} mb-3`}
            onClick={() => handleClick(artwork.id)}
          >
            <img
              className={styles.card_img}
              src="https://i.pinimg.com/originals/1d/9d/aa/1d9daa58ee8a38b4dfcca39932316c8e.jpg"
              alt="Card Image"
            />
            <div className={styles.card_body}>
              <div className={styles.card_description}>
                <h5>{artwork.name}</h5>
                <p>{artwork.description}</p>
              </div>
              <div className={styles.card_price}>
                <p>Price:</p>
                <p>5,000 PHP</p>
              </div>
            </div>
            <div className={styles.avatar}>
              <div className={styles.avatar_img}>
                <img
                  src="https://th.bing.com/th/id/OIP.h0hPZzAziPf3v-srHQTdWQHaHa?pid=ImgDet&rs=1"
                  alt="Avatar"
                />
              </div>
              <p>@ericson_pogi69</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
