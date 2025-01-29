"use client"

import type React from "react"
import type { ChangeEvent, SyntheticEvent } from "react"
import { Search, CornerDownLeft } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
interface Props {
  onSearchSubmit: (e: SyntheticEvent) => void
  search: string | undefined
  handleSearchChange: (e: ChangeEvent<HTMLInputElement>) => void
}



const ModernSearch: React.FC<Props> = ({ search, onSearchSubmit, handleSearchChange }: Props): JSX.Element => {


  return (
      
      <div className="w-full max-w-2xl mx-auto p-4">
        <form onSubmit={onSearchSubmit} className="relative">
          <div className="relative">
            <Input
              placeholder="Search companies"
              className="pr-24 pl-10 text-black"
              value={search}
              onChange={handleSearchChange}
              id="search-input"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center">
              <Button type="submit" variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                Enter
                <CornerDownLeft className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </div>
        </form>
      </div>
  
  )
}

export default ModernSearch