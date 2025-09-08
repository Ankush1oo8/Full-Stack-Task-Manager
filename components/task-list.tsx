"use client"

import { useState } from "react"
import { TaskCard } from "./task-card"
import { TaskForm } from "./task-form"
import { TaskSearch } from "./task-search"
import { TaskPagination } from "./task-pagination"
import { Button } from "@/components/ui/button"
import { Plus, Loader2 } from "lucide-react"
import { useTasks } from "@/hooks/use-tasks"
import type { Task } from "@/lib/models/Task"

export function TaskList() {
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState<"all" | "pending" | "done">("all")
  const [page, setPage] = useState(1)
  const [showForm, setShowForm] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)

  const { tasks, loading, error, pagination, createTask, updateTask, deleteTask, toggleTaskStatus } = useTasks({
    search,
    status,
    page,
    limit: 10,
  })

  const handleCreateTask = async (taskData: { title: string; description: string; status?: "pending" | "done" }) => {
    const result = await createTask(taskData)
    if (result.success) {
      setShowForm(false)
    }
    return result
  }

  const handleUpdateTask = async (taskData: { title: string; description: string; status?: "pending" | "done" }) => {
    if (!editingTask) return { success: false, error: "No task selected" }

    const result = await updateTask(editingTask._id!.toString(), taskData)
    if (result.success) {
      setEditingTask(null)
    }
    return result
  }

  const handleToggleStatus = async (taskId: string, currentStatus: "pending" | "done") => {
    await toggleTaskStatus(taskId, currentStatus)
  }

  const handleDeleteTask = async (taskId: string) => {
    await deleteTask(taskId)
  }

  const handleEditTask = (task: Task) => {
    setEditingTask(task)
    setShowForm(true)
  }

  const handleCancelForm = () => {
    setShowForm(false)
    setEditingTask(null)
  }

  const handleSearchChange = (newSearch: string) => {
    setSearch(newSearch)
    setPage(1) // Reset to first page when searching
  }

  const handleStatusChange = (newStatus: "all" | "pending" | "done") => {
    setStatus(newStatus)
    setPage(1) // Reset to first page when filtering
  }

  if (showForm) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">{editingTask ? "Edit Task" : "Create New Task"}</h2>
        </div>
        <TaskForm
          task={editingTask || undefined}
          onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
          onCancel={handleCancelForm}
        />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">My Tasks</h2>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Task
        </Button>
      </div>

      <TaskSearch
        onSearchChange={handleSearchChange}
        onStatusChange={handleStatusChange}
        initialSearch={search}
        initialStatus={status}
      />

      {error && (
        <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
          <p className="text-destructive text-sm">{error}</p>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="ml-2 text-muted-foreground">Loading tasks...</span>
        </div>
      ) : tasks.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg mb-4">
            {search || status !== "all" ? "No tasks found matching your criteria" : "No tasks yet"}
          </p>
          {!search && status === "all" && (
            <Button onClick={() => setShowForm(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Create Your First Task
            </Button>
          )}
        </div>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {tasks.map((task) => (
              <TaskCard
                key={task._id?.toString()}
                task={task}
                onToggleStatus={handleToggleStatus}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
              />
            ))}
          </div>

          <TaskPagination
            currentPage={pagination.page}
            totalPages={pagination.totalPages}
            totalItems={pagination.total}
            itemsPerPage={pagination.limit}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  )
}
