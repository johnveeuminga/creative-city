'use client'
import { createArtist, ArtistStatus } from '@/actions/artists';
import { useTransition } from 'react';
import { Controller, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation';
import Quill from '@/components/Quill';
import { DateTime } from 'luxon';

const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { header: '3' }, { font: [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image', 'video'],
      ['clean'],
    ],
    clipboard: {
      matchVisual: false,
    },
  }

export default function CreateArtistForm() {
  const {
    register,
    handleSubmit,
    control,
    watch,
  } = useForm();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const onSubmit = (data: any) => {
      const params = {
        nickname: data.nickname ?? "",
        avatar_path: data.avatar_path ?? "",
        myBio: data.myBio ?? "",
        myStory: data.myStory ?? "",
        artworkPickUpAddress: data.artworkPickUpAddress ?? "",
        contactNumber: data.contactNumber ?? "",
        gcash: data.gcash ?? "",
        paymaya: data.paymaya ?? "",
        status: ArtistStatus.APPROVED,  // Add a default status
        user: data.userId ?? "",
      }
      startTransition(async () => {
      try {
        await createArtist(params);
  
        router.push("/dashboard/artists");
      } catch(err) {
        console.log(err);
      }
    })
  }

  return(
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="my-3">
        <div className="row">
          <div className="col-md-6 col-12">
            <div className="form-group form-solid mb-3">
              <label className="label">Nickname</label>
              <input 
                {...register("nickname", {
                  maxLength: 64
                })}
                type="text" 
                className="form-control" />
            </div>

            <div className="form-group form-solid mb-3">
              <label className="label">Avatar Path</label>
              <input 
                {...register("avatar_path")}
                type="text" 
                className="form-control" />
            </div>

            <div className="form-group form-solid mb-3">
              <label className="label">Bio</label>
              <textarea 
                {...register("myBio", {
                  maxLength: 1000
                })}
                className="form-control" />
            </div>

            <div className="form-group form-solid mb-3">
              <label className="label">Story</label>
              <textarea 
                {...register("myStory", {
                  maxLength: 1000
                })}
                className="form-control" />
            </div>

            <div className="form-group form-solid mb-3">
              <label className="label">Artwork Pick Up Address</label>
              <input 
                {...register("artworkPickUpAddress")}
                type="text" 
                className="form-control" />
            </div>

            <div className="form-group form-solid mb-3">
              <label className="label">Contact Number</label>
              <input 
                {...register("contactNumber")}
                type="text" 
                className="form-control" />
            </div>

            <div className="form-group form-solid mb-3">
              <label className="label">GCash</label>
              <input 
                {...register("gcash")}
                type="text" 
                className="form-control" />
            </div>

            <div className="form-group form-solid mb-3">
              <label className="label">PayMaya</label>
              <input 
                {...register("paymaya")}
                type="text" 
                className="form-control" />
            </div>
          </div>
        </div>
        <div className="actions d-flex justify-content-end mt-5">
          <button type='submit' className="btn btn-dashboard-primary">Create</button>
        </div>
      </form> 
    </>
  )
}
