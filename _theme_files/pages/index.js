import Link from "next/link";
import React, { useState } from "react";
import Slider from "react-slick";
import dynamic from "next/dynamic";

const Counter = dynamic(() => import("../src/components/Counter"), {
  ssr: false,
});

import VideoPopup from "../src/components/VideoPopup";
import Layout from "../src/layouts/Layout";
import {
  ClientSliderOne,
  ListingSliderOne,
  PlaceSliderOne,
} from "../src/sliderProps";

const Index = () => {
  const [video, setVideo] = useState(false);
  return (
    <Layout>
      {video && <VideoPopup close={setVideo} />}
      {/* <!--====== Start Hero Section ======--> */}
      <section className="hero-area">
        <div className="hero-wrapper-one">
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <div className="hero-content">
                  <h1 className="wow fadeInUp" wow-data-delay="30mss">
                    Dream Explore Discover
                  </h1>
                  <h3 className="wow fadeInDown" wow-data-delay="50ms">
                    People Don’t Take,Trips Take People
                  </h3>
                  <div
                    className="hero-search-wrapper wow fadeInUp"
                    wow-data-delay="70ms"
                  >
                    <form onSubmit={(e) => e.preventDefault()}>
                      <div className="row">
                        <div className="col-lg-5 col-md-4 col-sm-12">
                          <div className="form_group">
                            <input
                              type="search"
                              className="form_control"
                              placeholder="Search By Category"
                              name="search"
                              required
                            />
                            <i className="ti-ink-pen"></i>
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-12">
                          <div className="form_group">
                            <input
                              type="text"
                              className="form_control"
                              placeholder="Location"
                              name="location"
                              required
                            />
                            <i className="ti-location-pin"></i>
                          </div>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-12">
                          <div className="form_group">
                            <button className="main-btn icon-btn">
                              Search Now
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                  <p className="tags">
                    <span>Popular:</span>
                    <a href="#">Saloon</a>,<a href="#">Restaurant</a>,
                    <a href="#">Game</a>,<a href="#">Counter</a>,
                    <a href="#">Train Station</a>,<a href="#">Parking</a>,
                    <a href="#">Shooping</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!--====== End Hero Section ======--> */}
      {/* <!--====== Start Category Section ======--> */}
      <section className="category-area">
        <div className="container">
          <div className="category-wrapper-one wow fadeInDown">
            <div className="row no-gutters">
              <div className="col-lg-2 col-md-4 category-column">
                <div className="category-item category-item-one">
                  <div className="info text-center">
                    <div className="icon">
                      <i className="flaticon-government"></i>
                    </div>
                    <h6>Museums</h6>
                  </div>
                  <Link href="/" className="category-btn">

                    <i className="ti-arrow-right"></i>

                  </Link>
                </div>
              </div>
              <div className="col-lg-2 col-md-4 category-column">
                <div className="category-item category-item-one">
                  <div className="info text-center">
                    <div className="icon">
                      <i className="flaticon-serving-dish"></i>
                    </div>
                    <h6>Restaurant</h6>
                  </div>
                  <Link href="/" className="category-btn">

                    <i className="ti-arrow-right"></i>

                  </Link>
                </div>
              </div>
              <div className="col-lg-2 col-md-4 category-column">
                <div className="category-item category-item-one">
                  <div className="info text-center">
                    <div className="icon">
                      <i className="flaticon-game-controller"></i>
                    </div>
                    <h6>Game Field</h6>
                  </div>
                  <Link href="/" className="category-btn">

                    <i className="ti-arrow-right"></i>

                  </Link>
                </div>
              </div>
              <div className="col-lg-2 col-md-4 category-column">
                <div className="category-item category-item-one">
                  <div className="info text-center">
                    <div className="icon">
                      <i className="flaticon-suitcase"></i>
                    </div>
                    <h6>Job & Feed</h6>
                  </div>
                  <Link href="/" className="category-btn">

                    <i className="ti-arrow-right"></i>

                  </Link>
                </div>
              </div>
              <div className="col-lg-2 col-md-4 category-column">
                <div className="category-item category-item-one">
                  <div className="info text-center">
                    <div className="icon">
                      <i className="flaticon-gift-box"></i>
                    </div>
                    <h6>Party Center</h6>
                  </div>
                  <Link href="/" className="category-btn">

                    <i className="ti-arrow-right"></i>

                  </Link>
                </div>
              </div>
              <div className="col-lg-2 col-md-4 category-column">
                <div className="category-item category-item-one">
                  <div className="info text-center">
                    <div className="icon">
                      <i className="flaticon-dumbbell"></i>
                    </div>
                    <h6>Fitness Zone</h6>
                  </div>
                  <Link href="/" className="category-btn">

                    <i className="ti-arrow-right"></i>

                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!--====== End Category Section ======--> */}
      {/* <!--====== Start Listing Section ======--> */}
      <section className="listing-grid-area light-bg pt-115 pb-90">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="section-title text-center mb-60 wow fadeInUp">
                <span className="sub-title">Featured List</span>
                <h2>Explore Destination</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div
                className="listing-item listing-grid-item-three mb-30 wow fadeInUp"
                data-wow-delay=".15s"
              >
                <div className="listing-thumbnail">
                  <img
                    src="assets/images/listing/listing-grid-10.jpg"
                    alt="listing image"
                  />
                  <a href="#" className="wishlist-btn">
                    <i className="ti-heart" />
                  </a>
                </div>
                <div className="listing-content">
                  <h3 className="title">
                    <Link href="/listing-details-1">
                      Museum of Islamic Art,
                    </Link>
                  </h3>
                  <span className="city">
                    <img
                      src="assets/images/listing/thumb-1.jpg"
                      alt="city image"
                    />
                    Doha, Qatar
                  </span>
                  <ul className="ratings ratings-three">
                    <li className="star">
                      <i className="flaticon-star-1" />
                    </li>
                    <li className="star">
                      <i className="flaticon-star-1" />
                    </li>
                    <li className="star">
                      <i className="flaticon-star-1" />
                    </li>
                    <li className="star">
                      <i className="flaticon-star-1" />
                    </li>
                    <li className="star">
                      <i className="flaticon-star-1" />
                    </li>
                    <li>
                      <span>
                        <a href="#">(02 Reviews)</a>
                      </span>
                    </li>
                  </ul>
                  <span className="price">$05.00 - $80.00</span>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div
                className="listing-item listing-grid-item-three mb-30 wow fadeInUp"
                data-wow-delay=".20s"
              >
                <div className="listing-thumbnail">
                  <img
                    src="assets/images/listing/listing-grid-11.jpg"
                    alt="listing image"
                  />
                  <span className="featured-btn">Featured</span>
                  <a href="#" className="wishlist-btn">
                    <i className="ti-heart" />
                  </a>
                </div>
                <div className="listing-content">
                  <h3 className="title">
                    <Link href="/listing-details-1">
                      Museum of Islamic Art,
                    </Link>
                  </h3>
                  <span className="city">
                    <img
                      src="assets/images/listing/thumb-2.jpg"
                      alt="city image"
                    />
                    Venezia, Italy
                  </span>
                  <ul className="ratings ratings-five">
                    <li className="star">
                      <i className="flaticon-star-1" />
                    </li>
                    <li className="star">
                      <i className="flaticon-star-1" />
                    </li>
                    <li className="star">
                      <i className="flaticon-star-1" />
                    </li>
                    <li className="star">
                      <i className="flaticon-star-1" />
                    </li>
                    <li className="star">
                      <i className="flaticon-star-1" />
                    </li>
                    <li>
                      <span>
                        <a href="#">(02 Reviews)</a>
                      </span>
                    </li>
                  </ul>
                  <span className="price">$05.00 - $80.00</span>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div
                className="listing-item listing-grid-item-three mb-30 wow fadeInUp"
                data-wow-delay=".25s"
              >
                <div className="listing-thumbnail">
                  <img
                    src="assets/images/listing/listing-grid-12.jpg"
                    alt="listing image"
                  />
                  <a href="#" className="wishlist-btn">
                    <i className="ti-heart" />
                  </a>
                </div>
                <div className="listing-content">
                  <h3 className="title">
                    <Link href="/listing-details-1">
                      Museum of Islamic Art,
                    </Link>
                  </h3>
                  <span className="city">
                    <img
                      src="assets/images/listing/thumb-3.jpg"
                      alt="city image"
                    />
                    New York
                  </span>
                  <ul className="ratings ratings-three">
                    <li className="star">
                      <i className="flaticon-star-1" />
                    </li>
                    <li className="star">
                      <i className="flaticon-star-1" />
                    </li>
                    <li className="star">
                      <i className="flaticon-star-1" />
                    </li>
                    <li className="star">
                      <i className="flaticon-star-1" />
                    </li>
                    <li className="star">
                      <i className="flaticon-star-1" />
                    </li>
                    <li>
                      <span>
                        <a href="#">(02 Reviews)</a>
                      </span>
                    </li>
                  </ul>
                  <span className="price">$05.00 - $80.00</span>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div
                className="listing-item listing-grid-item-three mb-30 wow fadeInUp"
                data-wow-delay=".30s"
              >
                <div className="listing-thumbnail">
                  <img
                    src="assets/images/listing/listing-grid-13.jpg"
                    alt="listing image"
                  />
                  <span className="featured-btn">Featured</span>
                  <a href="#" className="wishlist-btn">
                    <i className="ti-heart" />
                  </a>
                </div>
                <div className="listing-content">
                  <h3 className="title">
                    <Link href="/listing-details-1">
                      Museum of Islamic Art,
                    </Link>
                  </h3>
                  <span className="city">
                    <img
                      src="assets/images/listing/thumb-2.jpg"
                      alt="city image"
                    />
                    Venezia, Italy
                  </span>
                  <ul className="ratings ratings-three">
                    <li className="star">
                      <i className="flaticon-star-1" />
                    </li>
                    <li className="star">
                      <i className="flaticon-star-1" />
                    </li>
                    <li className="star">
                      <i className="flaticon-star-1" />
                    </li>
                    <li className="star">
                      <i className="flaticon-star-1" />
                    </li>
                    <li className="star">
                      <i className="flaticon-star-1" />
                    </li>
                    <li>
                      <span>
                        <a href="#">(02 Reviews)</a>
                      </span>
                    </li>
                  </ul>
                  <span className="price">$05.00 - $80.00</span>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div
                className="listing-item listing-grid-item-three mb-30 wow fadeInUp"
                data-wow-delay=".35s"
              >
                <div className="listing-thumbnail">
                  <img
                    src="assets/images/listing/listing-grid-14.jpg"
                    alt="listing image"
                  />
                  <a href="#" className="wishlist-btn">
                    <i className="ti-heart" />
                  </a>
                </div>
                <div className="listing-content">
                  <h3 className="title">
                    <Link href="/listing-details-1">
                      Museum of Islamic Art,
                    </Link>
                  </h3>
                  <span className="city">
                    <img
                      src="assets/images/listing/thumb-1.jpg"
                      alt="city image"
                    />
                    Doha, Qatar
                  </span>
                  <ul className="ratings ratings-three">
                    <li className="star">
                      <i className="flaticon-star-1" />
                    </li>
                    <li className="star">
                      <i className="flaticon-star-1" />
                    </li>
                    <li className="star">
                      <i className="flaticon-star-1" />
                    </li>
                    <li className="star">
                      <i className="flaticon-star-1" />
                    </li>
                    <li className="star">
                      <i className="flaticon-star-1" />
                    </li>
                    <li>
                      <span>
                        <a href="#">(02 Reviews)</a>
                      </span>
                    </li>
                  </ul>
                  <span className="price">$05.00 - $80.00</span>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div
                className="listing-item listing-grid-item-three mb-30 wow fadeInUp"
                data-wow-delay=".40s"
              >
                <div className="listing-thumbnail">
                  <img
                    src="assets/images/listing/listing-grid-15.jpg"
                    alt="listing image"
                  />
                  <a href="#" className="wishlist-btn">
                    <i className="ti-heart" />
                  </a>
                </div>
                <div className="listing-content">
                  <h3 className="title">
                    <Link href="/listing-details-1">
                      Museum of Islamic Art,
                    </Link>
                  </h3>
                  <span className="city">
                    <img
                      src="assets/images/listing/thumb-3.jpg"
                      alt="city image"
                    />
                    New York
                  </span>
                  <ul className="ratings ratings-five">
                    <li className="star">
                      <i className="flaticon-star-1" />
                    </li>
                    <li className="star">
                      <i className="flaticon-star-1" />
                    </li>
                    <li className="star">
                      <i className="flaticon-star-1" />
                    </li>
                    <li className="star">
                      <i className="flaticon-star-1" />
                    </li>
                    <li className="star">
                      <i className="flaticon-star-1" />
                    </li>
                    <li>
                      <span>
                        <a href="#">(02 Reviews)</a>
                      </span>
                    </li>
                  </ul>
                  <span className="price">$05.00 - $80.00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!--====== End Listing Section ======--> */}
      {/* <!--====== Start offer Section ======--> */}
      <section className="cta-area">
        <div
          className="cta-wrapper-one bg_cover"
          style={{ backgroundImage: `url(assets/images/bg/cta-bg-1.jpg)` }}
        >
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <div className="cta-content-box text-center wow fadeInUp">
                  <img src="assets/images/icon-1.png" alt="offer icon" />
                  <h2>Splash Yourself Bigger Offer on Everyday</h2>
                  <Link href="/how-work" className="main-btn icon-btn">
                    Explore Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!--====== End offer Section ======--> */}
      {/* <!--====== Start Features Section ======--> */}
      <section className="features-area">
        <div className="features-wrapper-one pt-120">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="features-img wow fadeInLeft">
                  <img
                    src="assets/images/features/features-1.jpg"
                    alt="Features Image"
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="features-content-box features-content-box-one">
                  <div className="section-title section-title-left mb-25 wow fadeInUp">
                    <span className="sub-title">Our Speciality</span>
                    <h2>Comprehnsive All Great Destination Here</h2>
                  </div>
                  <h5>
                    Risus urnas Iaculis per amet vestibulum luctus.tincidunt
                    ultricies aenean quam eros eleifend sodales cubilia mattis
                    quam.
                  </h5>
                  <ul className="features-list-one">
                    <li
                      className="list-item wow fadeInUp"
                      data-wow-delay="10ms"
                    >
                      <div className="icon">
                        <i className="flaticon-find"></i>
                      </div>
                      <div className="content">
                        <h5>Find What You Want</h5>
                        <p>
                          Rhoncus dolor quam etiam mattis, tincidunt nec
                          lobortis sociis facilisi aenean netus tempor duis.
                        </p>
                      </div>
                    </li>
                    <li
                      className="list-item wow fadeInUp"
                      data-wow-delay="20ms"
                    >
                      <div className="icon">
                        <i className="flaticon-place"></i>
                      </div>
                      <div className="content">
                        <h5>Easy Choose Your Place</h5>
                        <p>
                          Rhoncus dolor quam etiam mattis, tincidunt nec
                          lobortis sociis facilisi aenean netus tempor duis.
                        </p>
                      </div>
                    </li>
                    <li
                      className="list-item wow fadeInUp"
                      data-wow-delay="30ms"
                    >
                      <div className="icon">
                        <i className="flaticon-social-care"></i>
                      </div>
                      <div className="content">
                        <h5>Live Online Assistance</h5>
                        <p>
                          Rhoncus dolor quam etiam mattis, tincidunt nec
                          lobortis sociis facilisi aenean netus tempor duis.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!--====== End Features Section ======--> */}
      {/* <!--====== Start Place Section ======--> */}
      <section className="place-area pt-115 pb-110">
        <div className="container-fluid place-container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="section-title text-center mb-60 wow fadeInUp">
                <span className="sub-title">Feature Places</span>
                <h2>Explore By Destination</h2>
              </div>
            </div>
          </div>
          <Slider
            {...PlaceSliderOne}
            className="place-slider-one wow fadeInDown"
          >
            <div className="place-item place-item-one">
              <div className="place-thumbnail">
                <img src="assets/images/place/place-1.jpg" alt="Place Image" />
                <div className="place-overlay">
                  <div className="place-content text-center">
                    <span className="listing">10 Listing</span>
                    <h3 className="title">Australia</h3>
                    <Link href="/listing-grid" className="arrow-btn">

                      <i className="ti-arrow-right"></i>

                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="place-item place-item-one">
              <div className="place-thumbnail">
                <img src="assets/images/place/place-2.jpg" alt="Place Image" />
                <div className="place-overlay">
                  <div className="place-content text-center">
                    <span className="listing">10 Listing</span>
                    <h3 className="title">Australia</h3>
                    <Link href="/listing-grid" className="arrow-btn">

                      <i className="ti-arrow-right"></i>

                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="place-item place-item-one">
              <div className="place-thumbnail">
                <img src="assets/images/place/place-3.jpg" alt="Place Image" />
                <div className="place-overlay">
                  <div className="place-content text-center">
                    <span className="listing">10 Listing</span>
                    <h3 className="title">Australia</h3>
                    <Link href="/listing-grid" className="arrow-btn">

                      <i className="ti-arrow-right"></i>

                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="place-item place-item-one">
              <div className="place-thumbnail">
                <img src="assets/images/place/place-4.jpg" alt="Place Image" />
                <div className="place-overlay">
                  <div className="place-content text-center">
                    <span className="listing">10 Listing</span>
                    <h3 className="title">Australia</h3>
                    <Link href="/listing-grid" className="arrow-btn">

                      <i className="ti-arrow-right"></i>

                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="place-item place-item-one">
              <div className="place-thumbnail">
                <img src="assets/images/place/place-2.jpg" alt="Place Image" />
                <div className="place-overlay">
                  <div className="place-content text-center">
                    <span className="listing">10 Listing</span>
                    <h3 className="title">Australia</h3>
                    <Link href="/listing-grid" className="arrow-btn">

                      <i className="ti-arrow-right"></i>

                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Slider>
        </div>
      </section>
      {/* <!--====== End Place Section ======--> */}
      {/* <!--====== Start Download Section ======--> */}
      <section className="download-app">
        <div className="download-wrapper-one pt-115">
          <div className="container">
            <div className="row">
              <div className="col-lg-5">
                <div className="app-img wow fadeInLeft">
                  <img src="assets/images/app-1.png" alt="App Image" />
                </div>
              </div>
              <div className="col-lg-7">
                <div className="download-content-box download-content-box-one">
                  <div className="section-title section-title-left mb-25 wow fadeInUp">
                    <span className="sub-title">Downlaod App</span>
                    <h2>Comprehnsive All Great Destination Here</h2>
                  </div>
                  <p>
                    Dictumst integer tellus eros quam vestibulum ante tortor
                    mollis adipisn pharetra curae curae and pulvinar porttitor
                  </p>
                  <ul className="button wow fadeInDown">
                    <li>
                      <Link href="/" className="app-btn">

                        <div className="icon">
                          <i className="ti-android"></i>
                        </div>
                        <div className="info">
                          <span>get it on</span>
                          <h6>Goole Play</h6>
                        </div>

                      </Link>
                    </li>
                    <li>
                      <Link href="/" className="app-btn">

                        <div className="icon">
                          <i className="ti-apple"></i>
                        </div>
                        <div className="info">
                          <span>get it on</span>
                          <h6>App Store</h6>
                        </div>

                      </Link>
                    </li>
                  </ul>
                  <div className="counter-area pt-120">
                    <div className="row">
                      <div className="col-lg-4 col-md-4 col-ms-12">
                        <div className="counter-item counter-item-one wow fadeInUp">
                          <div className="info">
                            <h4>
                              <span>Member</span>Professional
                            </h4>
                            <h3>
                              <Counter end={220} /> +
                            </h3>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-4 col-ms-12">
                        <div className="counter-item counter-item-one wow fadeInUp">
                          <div className="info">
                            <h4>
                              <span>Listing</span>Received
                            </h4>
                            <h3>
                              <Counter end={72} />K +
                            </h3>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-4 col-ms-12">
                        <div className="counter-item counter-item-one wow fadeInUp">
                          <div className="info">
                            <h4>
                              <span>Client</span>Satisfaction
                            </h4>
                            <h3>
                              <Counter end={50} />K +
                            </h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*<!--====== End Download Section ======--> */}
      {/* <!--====== Start Popular Listing Section ======--> */}
      <section className="listing-grid-area pt-75 pb-110">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="section-title text-center mb-60 wow fadeInUp">
                <span className="sub-title">Featured List</span>
                <h2>Explore Destination</h2>
              </div>
            </div>
          </div>
          <Slider
            {...ListingSliderOne}
            className="listing-slider-one wow fadeInDown"
          >
            <div className="listing-item listing-grid-item-two">
              <div className="listing-thumbnail">
                <img
                  src="assets/images/listing/listing-grid-7.jpg"
                  alt="Listing Image"
                />
                <a href="#" className="cat-btn">
                  <i className="flaticon-chef"></i>
                </a>
                <span className="featured-btn">Featured</span>
                <ul className="ratings ratings-four">
                  <li className="star">
                    <i className="flaticon-star-1"></i>
                  </li>
                  <li className="star">
                    <i className="flaticon-star-1"></i>
                  </li>
                  <li className="star">
                    <i className="flaticon-star-1"></i>
                  </li>
                  <li className="star">
                    <i className="flaticon-star-1"></i>
                  </li>
                  <li className="star">
                    <i className="flaticon-star-1"></i>
                  </li>
                  <li>
                    <span>
                      <a href="#">(02 Reviews)</a>
                    </span>
                  </li>
                </ul>
              </div>
              <div className="listing-content">
                <h3 className="title">
                  <Link href="/listing-details-1">
                    Pizza Recipe
                  </Link>
                </h3>
                <p>Popular restaurant in california</p>
                <span className="phone-meta">
                  <i className="ti-tablet"></i>
                  <a href="tel:+982653652-05">+98 (265) 3652 - 05</a>
                  <span className="status st-open">Open</span>
                </span>
                <div className="listing-meta">
                  <ul>
                    <li>
                      <span>
                        <i className="ti-location-pin"></i>California, USA
                      </span>
                    </li>
                    <li>
                      <span>
                        <i className="ti-heart"></i>
                        <a href="#">Save</a>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="listing-item listing-grid-item-two">
              <div className="listing-thumbnail">
                <img
                  src="assets/images/listing/listing-grid-8.jpg"
                  alt="Listing Image"
                />
                <a href="#" className="cat-btn">
                  <i className="flaticon-dumbbell"></i>
                </a>
                <ul className="ratings ratings-three">
                  <li className="star">
                    <i className="flaticon-star-1"></i>
                  </li>
                  <li className="star">
                    <i className="flaticon-star-1"></i>
                  </li>
                  <li className="star">
                    <i className="flaticon-star-1"></i>
                  </li>
                  <li className="star">
                    <i className="flaticon-star-1"></i>
                  </li>
                  <li className="star">
                    <i className="flaticon-star-1"></i>
                  </li>
                  <li>
                    <span>
                      <a href="#">(02 Reviews)</a>
                    </span>
                  </li>
                </ul>
              </div>
              <div className="listing-content">
                <h3 className="title">
                  <Link href="/listing-details-1">Gym Ground</Link>
                </h3>
                <p>Popular restaurant in california</p>
                <span className="phone-meta">
                  <i className="ti-tablet"></i>
                  <a href="tel:+982653652-05">+98 (265) 3652 - 05</a>
                  <span className="status st-close">close</span>
                </span>
                <div className="listing-meta">
                  <ul>
                    <li>
                      <span>
                        <i className="ti-location-pin"></i>California, USA
                      </span>
                    </li>
                    <li>
                      <span>
                        <i className="ti-heart"></i>
                        <a href="#">Save</a>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="listing-item listing-grid-item-two">
              <div className="listing-thumbnail">
                <img
                  src="assets/images/listing/listing-grid-9.jpg"
                  alt="Listing Image"
                />
                <a href="#" className="cat-btn">
                  <i className="flaticon-government"></i>
                </a>
                <span className="featured-btn">Featured</span>
                <ul className="ratings ratings-five">
                  <li className="star">
                    <i className="flaticon-star-1"></i>
                  </li>
                  <li className="star">
                    <i className="flaticon-star-1"></i>
                  </li>
                  <li className="star">
                    <i className="flaticon-star-1"></i>
                  </li>
                  <li className="star">
                    <i className="flaticon-star-1"></i>
                  </li>
                  <li className="star">
                    <i className="flaticon-star-1"></i>
                  </li>
                  <li>
                    <span>
                      <a href="#">(02 Reviews)</a>
                    </span>
                  </li>
                </ul>
              </div>
              <div className="listing-content">
                <h3 className="title">
                  <Link href="/listing-details-1">City Palace</Link>
                </h3>
                <p>Popular restaurant in california</p>
                <span className="phone-meta">
                  <i className="ti-tablet"></i>
                  <a href="tel:+982653652-05">+98 (265) 3652 - 05</a>
                  <span className="status st-open">Open</span>
                </span>
                <div className="listing-meta">
                  <ul>
                    <li>
                      <span>
                        <i className="ti-location-pin"></i>California, USA
                      </span>
                    </li>
                    <li>
                      <span>
                        <i className="ti-heart"></i>
                        <a href="#">Save</a>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="listing-item listing-grid-item-two">
              <div className="listing-thumbnail">
                <img
                  src="assets/images/listing/listing-grid-1.jpg"
                  alt="Listing Image"
                />
                <a href="#" className="cat-btn">
                  <i className="flaticon-chef"></i>
                </a>
                <span className="featured-btn">Featured</span>
                <ul className="ratings ratings-two">
                  <li className="star">
                    <i className="flaticon-star-1"></i>
                  </li>
                  <li className="star">
                    <i className="flaticon-star-1"></i>
                  </li>
                  <li className="star">
                    <i className="flaticon-star-1"></i>
                  </li>
                  <li className="star">
                    <i className="flaticon-star-1"></i>
                  </li>
                  <li className="star">
                    <i className="flaticon-star-1"></i>
                  </li>
                  <li>
                    <span>
                      <a href="#">(02 Reviews)</a>
                    </span>
                  </li>
                </ul>
              </div>
              <div className="listing-content">
                <h3 className="title">
                  <Link href="/listing-details-1">
                    Pizza Recipe
                  </Link>
                </h3>
                <p>Popular restaurant in california</p>
                <span className="phone-meta">
                  <i className="ti-tablet"></i>
                  <a href="tel:+982653652-05">+98 (265) 3652 - 05</a>
                  <span className="status st-open">Open</span>
                </span>
                <div className="listing-meta">
                  <ul>
                    <li>
                      <span>
                        <i className="ti-location-pin"></i>California, USA
                      </span>
                    </li>
                    <li>
                      <span>
                        <i className="ti-heart"></i>
                        <a href="#">Save</a>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Slider>
        </div>
      </section>
      {/* <!--====== End Popular Listing Section ======--> */}
      {/* <!--====== Start Intro Video Section ======--> */}
      <section className="intro-video">
        <div
          className="intro-wrapper-one bg_cover pt-115"
          style={{ backgroundImage: `url(assets/images/bg/video-bg-1.jpg)` }}
        >
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-5">
                <div className="play-content play-content-one text-center wow fadeInLeft">
                  <a
                    href="#"
                    className="video-popup"
                    onClick={(e) => {
                      e.preventDefault();
                      setVideo(true);
                    }}
                  >
                    <i className="flaticon-play-button"></i>
                  </a>
                  <h5>Play Video</h5>
                </div>
              </div>
              <div className="col-lg-7">
                <div className="intro-content-box intro-content-box-one wow fadeInRight">
                  <div className="section-title section-title-left section-title-white mb-35">
                    <span className="sub-title">Checkout List</span>
                    <h2>Professional planners for your vacation</h2>
                  </div>
                  <p>
                    Risus urnas Iaculis per amet vestibulum luctus tincidunt
                    ultricies aenean quam eros eleifend sodales cubilia mattis
                    quam.
                  </p>
                  <Link href="/listing-grid" className="main-btn icon-btn">
                    Explore List
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!--====== End Intro Video Section ======--> */}
      {/* <!--====== Start Newsletter Section ======--> */}
      <section className="newsletter-area">
        <div className="container">
          <div
            className="newsletter-wrapper newsletter-wrapper-one bg_cover"
            style={{
              backgroundImage: `url(assets/images/bg/newsletter-bg-1.jpg)`,
            }}
          >
            <div className="row">
              <div className="col-lg-5">
                <div className="newsletter-content-box-one wow fadeInLeft">
                  <div className="icon">
                    <i className="flaticon-email"></i>
                  </div>
                  <div className="content">
                    <h2>Get Special Rewards</h2>
                  </div>
                </div>
              </div>
              <div className="col-lg-7">
                <div className="newsletter-form wow fadeInRight">
                  <div className="form_group">
                    <input
                      type="email"
                      className="form_control"
                      placeholder="Enter Address"
                      name="email"
                      required
                    />
                    <i className="ti-location-pin"></i>
                    <button className="main-btn">Subscribe +</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!--====== End Newsletter Section ======--> */}
      {/* <!--====== Start Client Section ======--> */}
      <section className="client-area pt-120">
        <div className="client-wrapper-one pb-120">
          <div className="container">
            <Slider
              {...ClientSliderOne}
              className="client-slider-one wow fadeInDown"
            >
              <div className="client-item">
                <div className="client-img">
                  <a href="#">
                    <img src="assets/images/client/01.png" alt="Client Image" />
                  </a>
                </div>
              </div>
              <div className="client-item">
                <div className="client-img">
                  <a href="#">
                    <img src="assets/images/client/02.png" alt="Client Image" />
                  </a>
                </div>
              </div>
              <div className="client-item">
                <div className="client-img">
                  <a href="#">
                    <img src="assets/images/client/03.png" alt="Client Image" />
                  </a>
                </div>
              </div>
              <div className="client-item">
                <div className="client-img">
                  <a href="#">
                    <img src="assets/images/client/04.png" alt="Client Image" />
                  </a>
                </div>
              </div>
              <div className="client-item">
                <div className="client-img">
                  <a href="#">
                    <img src="assets/images/client/02.png" alt="Client Image" />
                  </a>
                </div>
              </div>
            </Slider>
          </div>
        </div>
      </section>
      {/* <!--====== End Client Section ======--> */}
      {/* <!--====== Start Blog Section ======--> */}
      <section className="blog-area pt-115 pb-120">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="section-title text-center mb-60 wow fadeInUp">
                <span className="sub-title">Recent Articles</span>
                <h2>Every Single Journal</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div
                className="blog-post-item blog-post-item-one mb-40 wow fadeInUp"
                data-wow-delay="10ms"
              >
                <div className="post-thumbnail">
                  <Link href="/blog-details">

                    <img
                      src="assets/images/blog/blog-1.jpg"
                      alt="Blog Image"
                    />

                  </Link>
                  <div className="post-date">
                    <a href="#">
                      20 <span>Oct</span>
                    </a>
                  </div>
                </div>
                <div className="entry-content">
                  <a href="#" className="cat-btn">
                    <i className="ti-bookmark-alt"></i>Tours & Travel
                  </a>
                  <h3 className="title">
                    <Link href="/blog-details">
                      Duis nonummy socios mattis tempus penatibus
                    </Link>
                  </h3>
                  <div className="post-meta">
                    <ul>
                      <li>
                        <span>
                          <i className="ti-comments-smiley"></i>
                          <a href="#">0 Comment</a>
                        </span>
                      </li>
                      <li>
                        <span>
                          <i className="ti-id-badge"></i>
                          <a href="#">By admin</a>
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div
                className="blog-post-item blog-post-item-one mb-40 wow fadeInUp"
                data-wow-delay="20ms"
              >
                <div className="post-thumbnail">
                  <Link href="/blog-details">

                    <img
                      src="assets/images/blog/blog-2.jpg"
                      alt="Blog Image"
                    />

                  </Link>
                  <div className="post-date">
                    <a href="#">
                      20 <span>Oct</span>
                    </a>
                  </div>
                </div>
                <div className="entry-content">
                  <a href="#" className="cat-btn">
                    <i className="ti-bookmark-alt"></i>Tours & Travel
                  </a>
                  <h3 className="title">
                    <Link href="/blog-details">
                      Litora phasellus in phasellus curabitur porta eun
                    </Link>
                  </h3>
                  <div className="post-meta">
                    <ul>
                      <li>
                        <span>
                          <i className="ti-comments-smiley"></i>
                          <a href="#">0 Comment</a>
                        </span>
                      </li>
                      <li>
                        <span>
                          <i className="ti-id-badge"></i>
                          <a href="#">By admin</a>
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div
                className="blog-post-item blog-post-item-one mb-40 wow fadeInUp"
                data-wow-delay="310ms"
              >
                <div className="post-thumbnail">
                  <Link href="/blog-details">

                    <img
                      src="assets/images/blog/blog-3.jpg"
                      alt="Blog Image"
                    />

                  </Link>
                  <div className="post-date">
                    <a href="#">
                      20 <span>Oct</span>
                    </a>
                  </div>
                </div>
                <div className="entry-content">
                  <a href="#" className="cat-btn">
                    <i className="ti-bookmark-alt"></i> Tours & Travel
                  </a>
                  <h3 className="title">
                    <Link href="/blog-details">
                      Mattis parturent tortor lectus lestie sapien Dapus
                    </Link>
                  </h3>
                  <div className="post-meta">
                    <ul>
                      <li>
                        <span>
                          <i className="ti-comments-smiley"></i>
                          <a href="#">0 Comment</a>
                        </span>
                      </li>
                      <li>
                        <span>
                          <i className="ti-id-badge"></i>
                          <a href="#">By admin</a>
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="button text-center mt-40">
                <Link href="/blog" className="main-btn icon-btn">
                  View Blog
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!--====== End Blog Section ======--> */}
    </Layout>
  );
};
export default Index;
