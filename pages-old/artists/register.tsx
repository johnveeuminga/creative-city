import React from 'react'
import { useForm } from 'react-hook-form'

export default function RegisterArtist() {
  const { register, handleSubmit } = useForm()
  
  const onSubmit = async (data) => {
    // make POST request to /api/artists with form data
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("myStory")} placeholder="My Story" />
      {/* Create similar inputs for other fields */}
      <button type="submit">Register</button>
    </form>
  )
}
