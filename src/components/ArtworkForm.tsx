"use client";
import React, { useState, useTransition } from "react";
import { doCreateArtwork } from "@/actions/artworks";
import { useRouter } from "next/navigation";
import { User } from "@prisma/client";
import { doFileUpload } from "@/actions/upload";
import { upload } from "@/lib/client/s3-upload";
import { useDropzone } from "react-dropzone";
import Dropzone, { FileWithPreview } from "./dropzone/Dropzone";

export default function ArtworkForm({ data }: { data: any }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [price, setPrice] = useState<number>();
  const [forAuction, setForAuction] = useState<number>();
  const [promises, setPromises] = useState<Promise<any>[]>([])
  const [isPending, startTransition] = useTransition();
  let [imageUrl, setImageUrl] = useState("");

  const handleClick = async () => {
    startTransition(async () => {
      try {
        await Promise.all(promises)
        const filesToUpload = files.filter(file => !! file.s3FileName)
          .map(file => {
            return file.s3FileName ?? ""
          })

        console.log(filesToUpload)

        await doCreateArtwork(name, description, data.id, {
          files: filesToUpload,
          type: forAuction && forAuction == 1 ? 'auction' : 'bidding',
          price: price ?? 0,
        });

        router.push(`/dashboard/artworks/`);
      } catch (err) {
        console.log(err);
      }
    });
  };

  const handFileChange = (files: FileWithPreview[], promises: Promise<any>[])  => {
    console.log(files)
    setPromises(promises)
  }

  return (
    <div>
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h4 className="card-title mb-4">General</h4>
          <div className="mb-3">
            <label className="form-label fw-semibold">
              Name:
            </label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold">
              Description:
            </label>
            <textarea
              className="form-control"
              rows={10}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
        </div>
      </div>
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h4 className="card-title mb-4">Pricing</h4>
          <div className="mb-5">
            <p className="form-label fw-semibold">Is this piece for auction?</p>
            <div className="form-check">
              <input 
                value={1}
                checked={!! forAuction && forAuction == 1}
                onChange={() => setForAuction(1)}
                className="form-check-input" 
                type='radio' 
                id="auction_yes" />
              <label className="form-check-label" htmlFor="auction">Yes, this piece will be for auction</label>
            </div>
            <div className="form-check">
              <input 
                value={2}
                checked={!! forAuction && forAuction == 2}
                onChange={() => setForAuction(2)}
                className="form-check-input" 
                type='radio' 
                id="auction_yes" />
              <label className="form-check-label" htmlFor="auction">No, this piece will be for sale</label>
            </div>
          </div>
          <div className="mb-3">
            {
              forAuction && forAuction == 2 &&
                <>
                  <label className="form-label fw-semibold"> Price </label>
                  <input 
                    value={price}
                    onChange={(e) => setPrice(parseFloat(e.target.value))}
                    type="number" 
                    className="form-control" />
                </>
            }
            {
              forAuction && forAuction == 1 &&
              <>
                <label className="form-label fw-semibold">Minimum Bid Price</label>
                <input 
                  value={price}
                  onChange={(e) => setPrice(parseFloat(e.target.value))}
                  type="number" 
                  className="form-control" />
              </> 
            }
          </div>
        </div>
      </div>
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h4 className="card-title mb-4">Media</h4>
          <Dropzone 
            onFileChange={(files, promises) => handFileChange(files, promises)} />
        </div>
      </div>
      <div className="actions mt-4 text-end mb-4">
        <button 
          onClick={() => handleClick()}
          className="btn btn-outline-primary btn-lg">
          Save Art/Craft
        </button>
      </div>
    </div>

  );
}
