import { useEffect, useState } from "react"

export default function CreateAuctionFormTimeSelect({ value, onChange }: 
  {
    value: string, 
    onChange: (value: string) => void 
  }
) {
  const [time, setTime] = useState('')

  useEffect(() => {
    setTime(value)
  }, [value])

  const handleChange = (value: string) => {
    setTime(value)

    if(onChange)
      onChange(value)
  }
  
  return (
    <select 
      value={time}
      onChange={(e) => handleChange(e.target.value)}
      className="form-select">
      <option value="" disabled>Select Time</option>
      <option value="12:00 AM">12:00 AM</option>
      <option value="1:00 AM">1:00 AM</option>
      <option value="2:00 AM">2:00 AM</option>
      <option value="3:00 AM">3:00 AM</option>
      <option value="4:00 AM">4:00 AM</option>
      <option value="5:00 AM">5:00 AM</option>
      <option value="6:00 AM">6:00 AM</option>
      <option value="7:00 AM">7:00 AM</option>
      <option value="8:00 AM">8:00 AM</option>
      <option value="9:00 AM">9:00 AM</option>
      <option value="10:00 AM">10:00 AM</option>
      <option value="11:00 AM">11:00 AM</option>
      <option value="12:00 PM">12:00 PM</option>
      <option value="1:00 PM">1:00 PM</option>
      <option value="2:00 PM">2:00 PM</option>
      <option value="3:00 PM">3:00 PM</option>
      <option value="4:00 PM">4:00 AM</option>
      <option value="5:00 PM">5:00 PM</option>
      <option value="6:00 PM">6:00 PM</option>
      <option value="7:00 PM">7:00 PM</option>
      <option value="8:00 PM">8:00 PM</option>
      <option value="9:00 PM">9:00 PM</option>
      <option value="10:00 PM">10:00 PM</option>
      <option value="11:00 PM">11:00 PM</option>
    </select>
  )
}