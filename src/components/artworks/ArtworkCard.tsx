/* eslint-disable react/no-unescaped-entities */
import React from "react";
import styles from "../../styles/artwork-card.module.scss";

export default function ArtworkCard({ artwork }) {
  return (
    <div className={`card ${styles.card}`}>
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
        <p>{artwork.artist.email}</p>
      </div>
    </div>
  );
}
