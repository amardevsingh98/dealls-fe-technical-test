"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"


type PropsType = {
  search: string,
  className?: string,
  placeholder?: string,
  onChange: (value: string) => void,
  formatter?: (value: string) => string,
  hideSearchButton?: boolean,
}

export function SearchFilter({ search, className, onChange, formatter, placeholder, hideSearchButton }: PropsType) {
  const [searchValue, setSearchValue] = useState(search)

  useEffect(() => {
    setSearchValue(search)
  }, [search])

  function onClickSearchButton() {
    onChange(searchValue)
  }

  function onKeyEnterCheck(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      onClickSearchButton()
    }
  }

  function onSearchValueChange(value: string) {
    if (formatter) {
      setSearchValue(formatter(value))
      return
    }
    setSearchValue(value)
  }

  return (
    <div className={cn(className, 'flex items-center space-x-2')}>
      <Input type="text" placeholder={placeholder} value={searchValue} onChange={(e) => onSearchValueChange(e.target.value)} onKeyDown={onKeyEnterCheck} />
      {
        !hideSearchButton ? <Button onClick={onClickSearchButton}>Search</Button> : null
      }
    </div>
  )
}
