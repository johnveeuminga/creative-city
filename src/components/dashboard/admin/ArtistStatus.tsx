'use client'

import { useState, useEffect } from "react";
import { useDebounce } from "@/lib/utils";
import { Artist } from "@prisma/client";

interface ArtistStatusProps {
  artist: Artist;
}

export function ArtistStatus({ artist }: ArtistStatusProps) {
  const [updatingArtistId, setUpdatingArtistId] = useState<number | null>();
  const [status, setStatus] = useState('');
  const debouncedStatus = useDebounce(status, 500);

  useEffect(() => {
    if (updatingArtistId === artist.id && status !== artist.status) {
      fetch(`/api/artists/${artist.id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          artistId: artist.id,
          status: debouncedStatus,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          setUpdatingArtistId(null);
        });
    }
  }, [debouncedStatus, updatingArtistId, artist.id, status, artist.status]);

  return (
    updatingArtistId === artist.id ? (
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="PENDING">PENDING</option>
        <option value="APPROVED">APPROVED</option>
        <option value="REJECTED">REJECTED</option>
      </select>
    ) : (
      <span
        onClick={() => setUpdatingArtistId(artist.id)}
      >
        {status}
      </span>
    )
  );
}
