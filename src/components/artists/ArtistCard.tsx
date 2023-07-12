import { Artist, User } from "@prisma/client";
import styles from "@/styles/artist-card.module.scss";
import Link from "next/link";
import { useEffect, useState } from 'react';
import { ArtistWithUser } from "@/lib/server/artists";
import { ArtistWithUserAndArtworkCount } from "@/types/types";

// interface ArtistWithUser extends Artist {
//   user: User;
// }

export default function ArtistCard({ artist }: { artist: ArtistWithUserAndArtworkCount }) {
  return (
      <div className="artist-card card mb-4">
        <div className="card-body">
          <div className="text-center">
            <img
              src={artist.avatar_path ?? ""}
              alt="Generic placeholder image"
              className={styles.artistPhotoImg}
            />
            <h5 className="mt-3">{ artist.user.first_name } { artist.user.last_name }</h5>
            <p>Artworks: { artist.user._count.artworks }</p>
            <Link className="btn btn-outline-primary" href={`/artists/${artist?.id}`} style={{ textDecoration: 'none' }} >
              See More
            </Link>
          </div>
        </div>
      </div>
  );
}
