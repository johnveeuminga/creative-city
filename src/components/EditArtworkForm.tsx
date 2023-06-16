"use client";
import React from "react";
import { useState } from "react";

export default function EditArtworkForm({ artwork, handleClick }) {
  const [name, setName] = useState(artwork.name);
  const [description, setDescription] = useState(artwork.description);

  return (
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
      <button
        className="btn btn-primary"
        onClick={async () => {
          await handleClick(name, description, artwork.id);
        }}
      >
        Save
      </button>
    </form>
  );
}
