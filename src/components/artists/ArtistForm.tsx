"use client";
import React, { useState, useTransition } from "react";
import axios from "axios";
import './ArtistForm.css';
import { FaUser, FaEnvelope, FaFileAlt, FaBuilding, FaPhone, FaMoneyBill, FaCreditCard } from "react-icons/fa";

export default function ArtistForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState("");
  const [myStory, setMyStory] = useState("");
  const [myBio, setMyBio] = useState("");
  const [artworkPickUpAddress, setArtworkPickUpAddress] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [gcash, setGcash] = useState("");
  const [paymaya, setPaymaya] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await axios.post("/api/artists/register", {
        name: `${firstName} ${lastName}`,
        email,
        nickname,
        myStory,
        myBio,
        artworkPickUpAddress,
        contactNumber,
        gcash,
        paymaya,
      });
      // Handle the response as needed
      console.log("Registration successful");
    } catch (error) {
      // Handle error
      console.error(error);
    }
  };


  return (
    <div className="main-block">
      <h2>Artist</h2>
      <form onSubmit={handleSubmit} className="my-3">
        <div className="form-row">
          <div className="form-group col-md-6">
            <div className="input-group">
              <label htmlFor="firstName">
                <FaUser /> First Name
              </label>
              <input
                id="firstName"
                type="text"
                className="form-control"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group col-md-6">
            <div className="input-group">
              <label htmlFor="lastName">
                <FaUser /> Last Name
              </label>
              <input
                id="lastName"
                type="text"
                className="form-control"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="form-group">
          <div className="input-group">
            <label htmlFor="email">
              <FaEnvelope /> Email
            </label>
            <input
              id="email"
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="form-group">
          <div className="input-group">
            <label htmlFor="nickname">
              <FaFileAlt /> Nickname
            </label>
            <input
              id="nickname"
              type="text"
              className="form-control"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          </div>
        </div>
        <div className="form-group">
          <div className="input-group">
            <label htmlFor="myStory">
              <FaFileAlt /> My Story
            </label>
            <textarea
              id="myStory"
              className="form-control"
              value={myStory}
              onChange={(e) => setMyStory(e.target.value)}
            ></textarea>
          </div>
        </div>
        <div className="form-group">
          <div className="input-group">
            <label htmlFor="myBio">
              <FaFileAlt /> My Bio
            </label>
            <textarea
              id="myBio"
              className="form-control"
              value={myBio}
              onChange={(e) => setMyBio(e.target.value)}
            ></textarea>
          </div>
        </div>
        <div className="form-group">
          <div className="input-group">
            <label htmlFor="artworkPickUpAddress">
              <FaBuilding /> Artwork Pickup Address
            </label>
            <input
              id="artworkPickUpAddress"
              type="text"
              className="form-control"
              value={artworkPickUpAddress}
              onChange={(e) => setArtworkPickUpAddress(e.target.value)}
            />
          </div>
        </div>
        <div className="form-group">
          <div className="input-group">
            <label htmlFor="contactNumber">
              <FaPhone /> Contact Number
            </label>
            <input
              id="contactNumber"
              type="text"
              className="form-control"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
            />
          </div>
        </div>
        <div className="form-group">
          <div className="input-group">
            <label htmlFor="gcash">
              <FaMoneyBill /> GCash
            </label>
            <input
              id="gcash"
              type="text"
              className="form-control"
              value={gcash}
              onChange={(e) => setGcash(e.target.value)}
            />
          </div>
        </div>
        <div className="form-group">
          <div className="input-group">
            <label htmlFor="paymaya">
              <FaCreditCard /> PayMaya
            </label>
            <input
              id="paymaya"
              type="text"
              className="form-control"
              value={paymaya}
              onChange={(e) => setPaymaya(e.target.value)}
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    </div>
  );  
}