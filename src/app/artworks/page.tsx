import React from "react";
import Link from "next/link";

export default function page() {
  return (
    <div>
      {" "}
      <Link href="/artworks/create">Add Artwork</Link>
    </div>
  );
}
