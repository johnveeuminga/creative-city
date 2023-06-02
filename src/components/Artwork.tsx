'use client'
import prisma from "@/lib/prisma";
import { useState } from "react"

export default function Artwork({
  artwork,
  onClick,
}: {
  artwork: Artwork
  onClick: OnClick
}) {
  const [state, setState] = useState();

  return (
    <div 
      onClick={async () => await onClick(artwork.id)}
      className="card">
      <div className="card-header">
        <p className="card-title">{ artwork.name }</p>
      </div>
      <div className="card-body">
        <p>{ artwork.description }</p>
      </div>
    </div>
  )
}

interface Artwork {
  id: string;
  name: string;
  description: string;
}

interface OnClick {
  (id: string): void;
}