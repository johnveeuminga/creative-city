'use client'

import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

export default function CreateArtistForm() {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('/api/artists/register', data);
      // Handle the response as needed
      console.log(response.data);
    } catch (error) {
      // Handle error
      console.error(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="my-3">
        <div className="form-group">
          <label htmlFor="nickname">Nickname</label>
          <input {...register('nickname')} id="nickname" type="text" className="form-control" />
        </div>
        <div className="form-group">
          <label htmlFor="myStory">My Story</label>
          <textarea {...register('myStory')} id="myStory" className="form-control" />
        </div>
        <div className="form-group">
          <label htmlFor="myBio">My Bio</label>
          <textarea {...register('myBio')} id="myBio" className="form-control" />
        </div>
        <div className="form-group">
          <label htmlFor="artworkPickUpAddress">Artwork Pickup Address</label>
          <input {...register('artworkPickUpAddress')} id="artworkPickUpAddress" type="text" className="form-control" />
        </div>
        <div className="form-group">
          <label htmlFor="contactNumber">Contact Number</label>
          <input {...register('contactNumber')} id="contactNumber" type="text" className="form-control" />
        </div>
        <div className="form-group">
          <label htmlFor="gcash">GCash</label>
          <input {...register('gcash')} id="gcash" type="text" className="form-control" />
        </div>
        <div className="form-group">
          <label htmlFor="paymaya">PayMaya</label>
          <input {...register('paymaya')} id="paymaya" type="text" className="form-control" />
        </div>
        {/* Add more inputs for other fields as needed */}
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    </>
  );
}
