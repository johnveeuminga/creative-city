'use client'

import { NumericFormat } from "react-number-format"

export default function MoneyFormat({ value }: { value: string | number }) {
  return (
    <NumericFormat 
      thousandSeparator={true}
      decimalScale={2}
      fixedDecimalScale
      displayType="text" 
      value={value} 
      prefix="Php " />
  )
}