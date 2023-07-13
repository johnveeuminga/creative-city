/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/no-unescaped-entities */
import React from "react";
import styles from "../../../styles/artwork-page.module.scss";

export default function page() {
  return (
    <div className={styles.container}>
      <div className={styles.container__title}>
        <p>Collect art and design online</p>
        <hr />
      </div>
      <div className={styles.container__categories}>
        <div className={styles.card}>
          <img src="assets/images/photorealism.png" alt="" />
          <p>Photorealism Art</p>
        </div>
        <div className={styles.card}>
          <img src="assets/images/modern.png" alt="" />
          <p>Modern Art</p>
        </div>
        <div className={styles.card}>
          <img src="assets/images/postwar.png" alt="" />
          <p>Post-War Art</p>
        </div>
        <div className={styles.card}>
          <img src="assets/images/contemporary.png" alt="" />
          <p>Contemporary Art</p>
        </div>
        <div className={styles.card}>
          <img src="assets/images/photog.png" alt="" />
          <p>Photography</p>
        </div>
      </div>
      <div className={styles.container__main}>
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
            />
          </div>
          <hr />
          <div>
            <p>Medium</p>
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
                  type="email"
                  className="form-control"
                  placeholder="Min"
                />
              </div>
              <div className="mx-1">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Max"
                />
              </div>
            </div>
          </div>
          <div className="mt-5 text-center">
            <button className="btn btn-primary text-white">Filter</button>
          </div>
        </div>
        <div className={styles.grid}>
          <div className={styles.grid__header}>
            <div>
              <p>10,000 Artworks:</p>
            </div>
            <div>Sort by:</div>
          </div>
          <div className={styles.grid__main}>
            {Array(10)
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
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
