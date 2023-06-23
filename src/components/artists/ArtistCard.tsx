'use client'

import { Artist, User } from "@prisma/client";
import Link from "next/link";

interface ArtistWithUser extends Artist {
    user: User;
}

// This is your ArtistCard component
export default function ArtistCard({ artist }: { artist: ArtistWithUser }) {
  return (
    <Link href={`/artists/${artist.id}`}>
      <div className="artist-card card">
        <div className="card-body">
          {/* <h5 className="card-title">{artist.user.first_name} {artist.user.last_name}</h5> */}
          <h5 className="card-title">{artist.nickname}</h5>
          <p className="artist-card__nickname">Nickname: {artist.nickname || 'N/A'}</p>
          <p className="artist-card__story">Story: {artist.myStory || 'N/A'}</p>
          <p className="artist-card__bio">Bio: {artist.myBio || 'N/A'}</p>
          <p className="artist-card__status">Status: {artist.status}</p>
          {/* Add more artist details here as needed */}
        </div>
      </div>
    </Link>
  )
}