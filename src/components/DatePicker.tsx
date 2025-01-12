'use client'
import flatpickr from "flatpickr"
import { Instance } from "flatpickr/dist/types/instance";
import { useEffect, useRef, useState } from "react"
import "flatpickr/dist/themes/airbnb.css";


export default function DatePicker({
  onChange,
  value,
  minDate = null,
  maxDate = null,
}: {
  onChange?: (...event: any[]) => void,
  value: string,
  defaultValue?: any,
  minDate?: Date | null,
  maxDate?: Date | null,
}) {
  const flatpickrRef = useRef<Instance>();
  const inputRef = useRef<HTMLInputElement>(null);
  const [date, setDate] = useState('')

  useEffect(() => {
    if(!flatpickrRef.current) {
      flatpickrRef.current = flatpickr(inputRef.current as Node, {
        altFormat: "Y-m-d h:i:S K",
        enableTime: false,
        time_24hr: false,
        onChange: (selectedDates, dateStr, instance) => {
          setDate(dateStr);
          console.log(dateStr)
          if(onChange) {
            onChange(dateStr)
          }
        }
      })
    }

    if(minDate)
      flatpickrRef.current.set({
        minDate: minDate
      })

    if(maxDate)
      flatpickrRef.current.set({ 
        maxDate: maxDate
      })

  }, [inputRef, onChange, minDate, maxDate])


  return (
    <div className="input-group">
      <span className="input-group-text">
        <i className="ti-calendar"></i>
      </span>
      <input
        defaultValue={value}
        ref={inputRef} 
        className="form-control" />
    </div>
  )
}