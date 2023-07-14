import { useTransition } from 'react';
import { Controller, useForm } from 'react-hook-form'
import { useRouter } from 'next/router';
import { createArtist } from '@/actions/artists'; // Replace with your actual action

export default function CreateArtistForm() {
  const {
    register,
    handleSubmit,
    control,
  } = useForm();

  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const onSubmit = (data: any) => {
    startTransition(async () => {
      try {
        await createArtist(data); // Replace with your actual action

        router.push("/dashboard/artists");
      } catch(err) {
        console.log(err);
      }
    });
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
