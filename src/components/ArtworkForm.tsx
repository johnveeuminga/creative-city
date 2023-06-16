"use client";
import React, { useState } from "react";

export default function ArtworkForm({ data, handleClick }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div>
      <h2>Create Artwork</h2>
      <p>User: {data.first_name}</p>
      <form>
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
      </form>
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
