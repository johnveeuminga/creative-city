import React from "react";
import styles from "../../../styles/artwork-page.module.scss";
import prisma from "@/lib/prisma";
import Link from "next/link";
import MoneyFormat from "@/components/MoneyFormat";

export default async function Page() {
  const artworks = await prisma.artwork.findMany({
    where: {
      auction_id: null,
      media: {
        some: {},
      }
    },
    include: {
      media: true,
      artist: true,
    }
  })

  return (
    <div className='container'>
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
          </div>
          <div className="col-md-9">
            <div className={styles.grid}>
              <div className={styles.grid__header}>
                <div>
                  <p>{ artworks.length }+ Arts & Crafts:</p>
                </div>
              </div>
              <div className='row'>
                {
                  artworks.map(artwork => (
                    <div 
                      key={artwork.id}
                      className="col-md-4">
                      <Link 
                        className="text-decoration-none"
                        href={`/artworks/${artwork.id}"`}
                        prefetch={false}>
                        <div 
                          className={`${styles.artwork} mb-4`}>
                            <picture className="artwork__image-container w-100">
                              <img 
                                className={styles.artwork__image}
                                alt={artwork.name}
                                src={`${process.env.NEXT_PUBLIC_S3_URL}/${artwork.media[0].filePath}`}/>
                            </picture>
                            <div className="artwork__content px-1 py-2">
                              <h4 className="fw-semibold text-primary">{ artwork.name }</h4>
                              <p className="mb-0">{ artwork.artist.first_name } { artwork.artist.last_name }</p>
                              <p className="fw-semibold"><MoneyFormat value={artwork.price?.toString() ?? ""} /></p>
                            </div>
                        </div>
                      </Link>
                    </div>
                  ))
                }
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
    </div>
  );
}
