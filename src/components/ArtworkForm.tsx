"use client";
import React, { useState, useTransition } from "react";
import { doCreateArtwork } from "@/actions/artworks";
import { useRouter } from "next/navigation";
import { User } from "@prisma/client";
import { useS3Upload } from "next-s3-upload";

export default function ArtworkForm({ data }: { data: User }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isPending, startTransition] = useTransition();
  let [imageUrl, setImageUrl] = useState("");
  let { FileInput, openFileDialog, uploadToS3 } = useS3Upload();

  let handleFileChange = async (file) => {
    let { url } = await uploadToS3(file);
    setImageUrl(url);
  };

  const handleClick = async (name: string, description: string) => {
    startTransition(async () => {
      try {
        await doCreateArtwork(name, description, data.id);
        router.push(`/dashboard/artworks/`);
      } catch (err) {
        console.log(err);
      }
    });
  };

  return (
    <div>
      <h2>Create Artwork</h2>
      <div>
        <label className="form-label">
          Name:
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <br />
        <label className="form-label">
          Description:
          <textarea
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </label>
        <br />
        <div>
          <FileInput onChange={handleFileChange} />

          <button onClick={openFileDialog}>Upload file</button>

          {imageUrl && <img src={imageUrl} />}
        </div>
      </div>
      <br />
      <button
        className="btn btn-primary"
        onClick={async () => {
          await handleClick(name, description);
        }}
      >
        Submit
      </button>
    </div>
  );
}
