"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { MoreHorizontal, Edit, Trash2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { Task } from "@/lib/models/Task"

interface TaskCardProps {
  task: Task
  onToggleStatus: (taskId: string, currentStatus: "pending" | "done") => Promise<void>
  onEdit: (task: Task) => void
  onDelete: (taskId: string) => Promise<void>
}

export function TaskCard({ task, onToggleStatus, onEdit, onDelete }: TaskCardProps) {
  const [isUpdating, setIsUpdating] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleToggleStatus = async () => {
    setIsUpdating(true)
    try {
      await onToggleStatus(task._id!.toString(), task.status)
    } finally {
      setIsUpdating(false)
    }
  }

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setIsDeleting(true)
      try {
        await onDelete(task._id!.toString())
      } finally {
        setIsDeleting(false)
      }
    }
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div className="flex items-start space-x-3 flex-1">
          <Checkbox
            checked={task.status === "done"}
            onCheckedChange={handleToggleStatus}
            disabled={isUpdating}
            className="mt-1"
          />
          <div className="flex-1 min-w-0">
            <h3
              className={`font-semibold text-sm leading-tight ${task.status === "done" ? "line-through text-muted-foreground" : ""}`}
            >
              {task.title}
            </h3>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit(task)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleDelete} disabled={isDeleting} className="text-destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="pt-0">
        <p className={`text-sm text-muted-foreground ${task.status === "done" ? "line-through" : ""}`}>
          {task.description}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between items-center pt-2">
        <Badge variant={task.status === "done" ? "secondary" : "default"}>
          {task.status === "done" ? "Completed" : "Pending"}
        </Badge>
        <span className="text-xs text-muted-foreground">{new Date(task.createdAt).toLocaleDateString()}</span>
      </CardFooter>
    </Card>
  )
}
