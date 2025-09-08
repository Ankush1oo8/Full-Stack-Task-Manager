"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, X } from "lucide-react"

interface TaskSearchProps {
  onSearchChange: (search: string) => void
  onStatusChange: (status: "all" | "pending" | "done") => void
  initialSearch?: string
  initialStatus?: "all" | "pending" | "done"
}

export function TaskSearch({
  onSearchChange,
  onStatusChange,
  initialSearch = "",
  initialStatus = "all",
}: TaskSearchProps) {
  const [search, setSearch] = useState(initialSearch)
  const [status, setStatus] = useState(initialStatus)

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearchChange(search)
    }, 300)

    return () => clearTimeout(timer)
  }, [search, onSearchChange])

  const handleStatusChange = (newStatus: "all" | "pending" | "done") => {
    setStatus(newStatus)
    onStatusChange(newStatus)
  }

  const clearSearch = () => {
    setSearch("")
    onSearchChange("")
  }

  const hasActiveFilters = search.length > 0 || status !== "all"

  return (
    <div className="flex flex-col sm:flex-row gap-4 p-4 bg-card rounded-lg border">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search tasks by title or description..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 pr-10"
        />
        {search && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearSearch}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="flex gap-2 items-center">
        <Select value={status} onValueChange={handleStatusChange}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Tasks</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="done">Completed</SelectItem>
          </SelectContent>
        </Select>

        {hasActiveFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSearch("")
              setStatus("all")
              onSearchChange("")
              onStatusChange("all")
            }}
          >
            Clear Filters
          </Button>
        )}
      </div>
    </div>
  )
}
