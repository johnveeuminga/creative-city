import { Artist, User } from "@prisma/client";
import styles from "@/styles/artist-card.module.scss";
import Link from "next/link";
import { useEffect, useState } from 'react';

interface ArtistWithUser extends Artist {
  user: User;
}

export default function ArtistCard({ artist }: { artist: ArtistWithUser }) {
  return (
    <Link href={`/artists/${artist?.id}`} style={{ textDecoration: 'none' }} >
      <div className={`${styles.container} ${styles.categoryItem} ${styles.categoryItemTwo} mb-25 wow fadeInUp`} data-wow-delay=".2s">
        <div className={styles.artistPhoto}>
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
            alt="Generic placeholder image"
            className={styles.artistPhotoImg}
          />
          <div className={styles.categoryOverlay}>
            <div className={styles.categoryContent}></div>
          </div>
        </div>
        <div className={styles.info}>
          <div className={styles.artistDetails}>
            <h3 className={styles.title}>{artist?.nickname}</h3>
            <p className={styles.artworksCount}>Artworks: 20</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
