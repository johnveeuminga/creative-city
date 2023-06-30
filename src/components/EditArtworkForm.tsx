"use client";
import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { doDeleteArtwork, doEditArtwork } from "@/actions/artworks";

export default function EditArtworkForm({ artwork }) {
  const router = useRouter();
  const [name, setName] = useState(artwork.name);
  const [description, setDescription] = useState(artwork.description);
  const [isPending, startTransition] = useTransition();

  const handleEdit = async (name: string, description: string) => {
    startTransition(async () => {
      try {
        await doEditArtwork(name, description, artwork.id);
      } catch (err) {
        console.log(err);
      }
    });
  };

  const handleDelete = async () => {
    startTransition(async () => {
      try {
        await doDeleteArtwork(artwork.id);
        router.push(`/dashboard/artworks/`);
      } catch (err) {
        console.log(err);
      }
    });
  };

  return (
    <div>
      <div></div>
      <form>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="d-flex justify-content-between">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={async () => {
              await handleDelete();
            }}
          >
            Delete
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={async () => {
              await handleEdit(name, description);
            }}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}