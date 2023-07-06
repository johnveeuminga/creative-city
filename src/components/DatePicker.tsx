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
        enableTime: true,
        dateFormat: "Y-m-d H:i:S",
        onChange: (selectedDates, dateStr, instance) => {
          setDate(dateStr);
          if(onChange) {
            onChange(dateStr)
          }
        }
      })
    }
    
  }, [inputRef, onChange])


  const handleChange = (event: any) => {
    console.log(event.target.value)
  }

  return (
    <div className="input-group">
      <input
        defaultValue={value}
        ref={inputRef} 
        className="form-control" />
      <span className="input-group-text">
        <i className="ti-calendar"></i>
      </span>
    </div>
  )
}