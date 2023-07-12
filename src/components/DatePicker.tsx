'use client'
import flatpickr from "flatpickr"
import { Instance } from "flatpickr/dist/types/instance";
import { useEffect, useRef, useState } from "react"
import "flatpickr/dist/themes/airbnb.css";


export default function DatePicker({
  onChange,
  value,
}: {
  onChange?: (...event: any[]) => void,
  value: string,
  defaultValue?: any,
}) {
  const flatpickrRef = useRef<Instance>();
  const inputRef = useRef<HTMLInputElement>(null);
  const [date, setDate] = useState('')

  useEffect(() => {
    if(!flatpickrRef.current) {
      flatpickrRef.current = flatpickr(inputRef.current as Node, {
        dateFormat: "Y-m-d",
        onChange: (selectedDates, dateStr, instance) => {
          setDate(dateStr);
          if(onChange) {
            onChange(dateStr)
          }
        }
      })
    }
  }, [inputRef, onChange])


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