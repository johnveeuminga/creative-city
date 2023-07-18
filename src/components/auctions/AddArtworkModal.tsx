'use client'

import Modal from "../Modal";
import { ArtworkWithMedia } from "@/types/types";
import Image from "next/image";
import React, { useState, useTransition } from "react";
import styles from "@/styles/components/artwork-add-modal.module.scss"
import { doRegisterArtworkToAuction } from "@/actions/auctions";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AddArtworkModal({
  artworks,
  auctionId
}: {
  artworks: ArtworkWithMedia[],
  auctionId: number
}) {
  const [added, setIsAdded] = useState(false)
  const [artworkIds, setArtworkIds] = useState<Array<number>>([])
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value)
    const index = artworkIds.indexOf(value)

    if(index !== -1) 
      setArtworkIds(artworkIds.filter(id => id !== Number(value)))
    else {
      const newArtworkIds = [
        ...artworkIds,
        Number(value),
      ]
      console.log(newArtworkIds)

      setArtworkIds(newArtworkIds)
    }
  }

  const isChecked = (value: number) => {
    return artworkIds.indexOf(value) !== -1;
  }

  const handleSubmit = () => {
    startTransition(async () => {
      const res = await doRegisterArtworkToAuction(artworkIds, auctionId)
      setIsAdded(true)
    })
  }

  const closeModal = () => {
    router.back()
  }

  return (
    <Modal>
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title fs-2">Register Your Artwork</h1>
        </div>
        <div className="modal-body">
          {
            !added && 
            <>
              <p>Select an artwork that you have registered as for auction.</p>
              { artworks.map(artwork => (
                <div 
                  key={artwork.id}
                  className={`${styles.artwork} py-2 px-3 d-flex align-items-center`}>
                    <div className="check me-3">
                      <input 
                        onChange={e => handleCheckboxChange(e)}
                        className="form-check-input" 
                        type="checkbox" 
                        checked={isChecked(artwork.id)}
                        value={artwork.id} 
                        id="flexCheckDefault" />
                      <label className="form-check-label d-none">
                        { artwork.name }
                      </label>
                    </div>
                    <div 
                      style={{ width: 60, height: 60, position: 'relative'}}
                      className="artwork__image me-3">
                      <Image 
                        fill={true}
                        src={`${process.env.NEXT_PUBLIC_S3_URL}/${artwork.media[0].filePath}`}
                        style={{ objectFit: 'cover' }}
                        alt={artwork.name} />
                    </div>
                    <div className="artwork__name fw-bold">
                      { artwork.name }
                    </div>
                </div>
              ))}

              { 
                !!! artworks.length &&
                  <p className="py-5">No art/craft registered for auction found. <Link className="fw-semibold" href={'/dashboard/artworks/create'}> Create One </Link></p> 
              }
            </>
          }
          {
            added &&
              <>
                <div className="text-center py-5">
                  <h2 className="fs-4 mb-4 fw-bold">Success!</h2>   
                  <p>We still need to review your application. <br/>You will be notified once your application has been approved</p>
                </div> 
              </>
          }
         
        </div>
        <div className="modal-footer">
          {
            !added && 
              <button 
                onClick={() => handleSubmit()}
                disabled={isPending}
                type="button" className="btn btn-primary">
                  Register
              </button>
          }
          <button 
            onClick={() => closeModal() }
            type="button" 
            className="btn btn-secondary">
              Close
          </button>
        </div>
      </div>
    </Modal>
  )
}