'use client'
import { createAuction } from '@/actions/auctions';
import Datepicker from '@/components/DatePicker';
import Quill from '@/components/Quill';
import { DateTime } from 'luxon';
import { useTransition } from 'react';
import { Controller, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation';


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


export default function CreateAuctionForm() {
  const {
    register,
    handleSubmit,
    control,
  } = useForm();

  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const onSubmit = (data: any) => {
    const params = {
      ...data,
      start_date: DateTime.fromFormat(data.start_date, 'yyyy-LL-dd TT').toISO(),
      end_date: DateTime.fromFormat(data.end_date, 'yyyy-LL-dd TT').toISO(),
    }

    startTransition(async () => {
      try {
        await createAuction(params)

        router.push("/dashboard/auctions");
      } catch(err) {
        console.log(err)
      }
    })
  }

  return(
    <>
      <form 
        onSubmit={handleSubmit(onSubmit)}
        className="my-3">
        <div className="row">
          <div className="col-md-6 col-12">
            <div className="form-group form-solid mb-3">
              <label className="label"htmlFor="">Auction Name</label>
              <input 
                {...register("name", {
                  required: true,
                  maxLength: 64
                })}
                type="text" 
                className="form-control" />
            </div>
            <div className="form-group form-solid mb-3">
              <label htmlFor="">Start Date</label>
              <Controller 
                control={control}
                defaultValue={DateTime.now().toFormat("yyyy-LL-dd TT")}
                name='start_date'
                render={({
                  field: {
                    onChange,
                    value,
                  }
                }) => (
                  <Datepicker 
                    onChange={onChange}
                    value={value}/>
                )}
              />
              <p className='m-2'>
                <small>yyyy/mm/dd hh:mm:ss format</small>
              </p>
            </div>
            <div className="form-group form-solid mb-3">
              <label htmlFor="">End Date</label>
              <Controller 
                control={control}
                defaultValue={DateTime.now().toFormat("yyyy-LL-dd TT")}
                name='end_date'
                render={({
                  field: {
                    onChange,
                    value
                  }
                }) => (
                  <Datepicker 
                    onChange={onChange}
                    value={value}/>
                )}
              />
              <p className='m-2'>
                <small>yyyy/mm/dd hh:mm:ss format</small>
              </p>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="form-group form-solid quill-container">
              <label htmlFor="">Description</label>
              <Controller 
                name='description'
                control={control}
                render={({ field: { onChange, onBlur, value, ref }}) => (
                  <Quill 
                    onChange={onChange}
                    value={value}
                    theme='snow' 
                    modules={modules} />
                )}
                />
            </div>
          </div>
        </div>
        <div className="actions d-flex justify-content-end mt-5">
          <button
            disabled={isPending}
            type='submit'
            className="btn btn-dashboard-primary">
              Create
          </button>
        </div>
      </form> 
    </>
  )
}
  