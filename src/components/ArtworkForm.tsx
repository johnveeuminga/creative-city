"use client";
import React, { useState, useTransition } from "react";
import { doCreateArtwork } from "@/actions/artworks";
import { useRouter } from "next/navigation";
import { User } from "@prisma/client";
import { doFileUpload } from "@/actions/upload";

export default function ArtworkForm({ data }: { data: any }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isPending, startTransition] = useTransition();

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

  // TODO: Make this a hook or callback
  const generatePostSignedUrl = async(file: File) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/s3/post/url`);

    const presignedUrl = await response.json();

    return {
      url: presignedUrl.url,
      fields: presignedUrl.fields,
    }
  }


  const fileHandle = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const toUpload = event.target.files?.item(0) as File;

    const res = await generatePostSignedUrl(toUpload);

    const formData = new FormData()

    Object.keys(res.fields).forEach((key, field) => {
      formData.append(key, res.fields[key])
    })

    formData.append('file', toUpload)

    await fetch(res.url, {
      method: 'POST',
      body: formData,
    })
  }

  return (
    <div className="card content-card">
      <div className="card-body">
        <form>
          <div className="mb-3">
            <label className="form-label">
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
            <label className="form-label">
              Description:
            </label>
            <textarea
              className="form-control"
              rows={10}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="" className='form-label'>Upload</label>
            <input 
              onChange={(e) => fileHandle(e) }
              multiple={true}
              accept="image/*"
              type="file" 
              className="form-control" />
          </div>
        </form>
        <button
          className="btn btn-primary"
          onClick={async () => {
            await handleClick(name, description);
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
