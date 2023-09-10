"use client"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useEffect, useState } from "react"

type PropsType = {
  value: string | undefined,
  onChange: (value: string) => void,
  placeholder: string,
  items: string[],
  className?: string
}

export default function SelectFilter({ value, onChange, placeholder, items, className }: PropsType) {
  const [selectedValue, setSelectedValue] = useState(value || undefined)

  useEffect(() => {
    setSelectedValue(value ? value : undefined)
  }, [value])

  return(
    <Select
      defaultValue={selectedValue}
      value={selectedValue}
      onValueChange={(value) => onChange(value)}
    >
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {
          items.map((item) => (
            <SelectItem
              className="capitalize"
              key={item} 
              value={item} 
            >
              {item.replace(/-/g, ' ')}
            </SelectItem>
          ))
        }
      </SelectContent>
    </Select>
  )
}
