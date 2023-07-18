'use client'

import { NumericFormat } from "react-number-format"

export default function MoneyFormat({ value }: { value: string }) {
  return (
    <NumericFormat 
      thousandSeparator={true}
      displayType="text" 
      value={value} 
      prefix="Php " />
  )
}