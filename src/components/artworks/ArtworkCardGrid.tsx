"use client";

import React, { useState, useEffect } from "react";
import ArtworkCard from "./ArtworkCard";
import Link from "next/link";
import styles from "../../styles/artwork-page.module.scss";

export default function ArtworkCardGrid({ artworks }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [filteredArtworks, setFilteredArtworks] = useState(artworks);

  const applyFilters = () => {
    setFilteredArtworks(
      artworks.filter(
        (artwork) => artwork.price >= minPrice && artwork.price <= maxPrice
      )
    );
  };

  useEffect(() => {
    setFilteredArtworks(
      artworks.filter((artwork) =>
        artwork.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, artworks]);
  return (
    <div className="container">
      <div className={styles.container__title}>
        <h1>Explore Arts & Crafts</h1>
      </div>
      <div className={styles.container__main}>
        <div className="row">
          <div className="col-md-3">
            <div className={styles.filters}>
              <div>
                <select className="form-select">
                  <option selected>Filter by:</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                </select>
              </div>
              <hr />
              <div>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter a search term"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <hr />
              <div className="d-none">
                <p className="fw-semibold">Medium</p>
                <div className={styles.checkbox}>
                  <label className="form-check-label" htmlFor="exampleCheckbox">
                    Painting
                  </label>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="exampleCheckbox"
                  />
                </div>
                <div className={styles.checkbox}>
                  <label className="form-check-label" htmlFor="exampleCheckbox">
                    Sculpture
                  </label>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="exampleCheckbox"
                  />
                </div>{" "}
                <div className={styles.checkbox}>
                  <label className="form-check-label" htmlFor="exampleCheckbox">
                    Prints
                  </label>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="exampleCheckbox"
                  />
                </div>{" "}
                <div className={styles.checkbox}>
                  <label className="form-check-label" htmlFor="exampleCheckbox">
                    Work on Paper
                  </label>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="exampleCheckbox"
                  />
                </div>{" "}
                <div className={styles.checkbox}>
                  <label className="form-check-label" htmlFor="exampleCheckbox">
                    Drawing
                  </label>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="exampleCheckbox"
                  />
                </div>{" "}
                <div className={styles.checkbox}>
                  <label className="form-check-label" htmlFor="exampleCheckbox">
                    Photography
                  </label>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="exampleCheckbox"
                  />
                </div>
              </div>
              <hr />
              <div>
                <p>Price</p>
                <div className="d-flex">
                  <div className="mx-1">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Min"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                    />
                  </div>
                  <div className="mx-1">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Max"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-5 text-center">
                <button
                  className="btn btn-primary text-white"
                  onClick={applyFilters}
                >
                  Filter
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-9">
            <div className={styles.grid}>
              <div className={styles.grid__header}>
                <div>
                  <p>{filteredArtworks.length}+ Arts & Crafts:</p>
                </div>
              </div>
              <div className="row">
                {filteredArtworks.map((artwork) => (
                  <div key={artwork.id} className="col-md-4">
                    <ArtworkCard artwork={artwork} />
                  </div>
                ))}
              </div>
              {/* {Array(10)
                .fill(null)
                .map((_, i) => (
                  <div key={i} className={styles.artwork}>
                    <img
                      className={styles.artwork__image}
                      src="https://i.pinimg.com/originals/1d/9d/aa/1d9daa58ee8a38b4dfcca39932316c8e.jpg"
                      alt="Card Image"
                    />
                    <div className={styles.artwork__body}>
                      <p className="text-center">"Kasiyana"</p>
                      <div className={styles.artwork__body__details}>
                        <div>
                          <img src="assets/images/avatar.png" alt="" />
                          <p>
                            Owned by: <br />
                            <span>Venazir Martinez</span>
                          </p>
                        </div>
                        <div>
                          <p>ACRYLIC ON PAINT</p>
                          <p>30.4 x 30.4 CM</p>
                          <p>Price : </p>
                          <p>1,000 PHP</p>
                        </div>
                      </div>
                      <div className={styles.artwork__body__footer}>
                        <button>Buy</button>
                      </div>
                    </div>
                  </div>
                ))} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
