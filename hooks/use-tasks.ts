"use client"

import { useState, useEffect } from "react"
import type { Task } from "@/lib/models/Task"

interface TasksState {
  tasks: Task[]
  loading: boolean
  error: string | null
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

interface UseTasksOptions {
  search?: string
  status?: "pending" | "done" | "all"
  page?: number
  limit?: number
}

export function useTasks(options: UseTasksOptions = {}) {
  const { search = "", status = "all", page = 1, limit = 10 } = options

  const [tasksState, setTasksState] = useState<TasksState>({
    tasks: [],
    loading: true,
    error: null,
    pagination: { page: 1, limit: 10, total: 0, totalPages: 0 },
  })

  useEffect(() => {
    fetchTasks()
  }, [search, status, page, limit])

  const fetchTasks = async () => {
    try {
      setTasksState((prev) => ({ ...prev, loading: true, error: null }))

      const params = new URLSearchParams({
        search,
        status,
        page: page.toString(),
        limit: limit.toString(),
      })

      const response = await fetch(`/api/tasks?${params}`)
      const data = await response.json()

      if (response.ok) {
        setTasksState({
          tasks: data.tasks,
          loading: false,
          error: null,
          pagination: data.pagination,
        })
      } else {
        setTasksState((prev) => ({
          ...prev,
          loading: false,
          error: data.error || "Failed to fetch tasks",
        }))
      }
    } catch (error) {
      setTasksState((prev) => ({
        ...prev,
        loading: false,
        error: "Failed to fetch tasks",
      }))
    }
  }

  const createTask = async (taskData: { title: string; description: string; status?: "pending" | "done" }) => {
    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskData),
      })

      const data = await response.json()

      if (response.ok) {
        // Optimistically update the tasks list
        setTasksState((prev) => ({
          ...prev,
          tasks: [data.task, ...prev.tasks],
          pagination: {
            ...prev.pagination,
            total: prev.pagination.total + 1,
          },
        }))
        return { success: true, task: data.task }
      } else {
        return { success: false, error: data.error }
      }
    } catch (error) {
      return { success: false, error: "Failed to create task" }
    }
  }

  const updateTask = async (
    taskId: string,
    updates: { title?: string; description?: string; status?: "pending" | "done" },
  ) => {
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      })

      const data = await response.json()

      if (response.ok) {
        // Optimistically update the task in the list
        setTasksState((prev) => ({
          ...prev,
          tasks: prev.tasks.map((task) => (task._id?.toString() === taskId ? data.task : task)),
        }))
        return { success: true, task: data.task }
      } else {
        return { success: false, error: data.error }
      }
    } catch (error) {
      return { success: false, error: "Failed to update task" }
    }
  }

  const deleteTask = async (taskId: string) => {
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: "DELETE",
      })

      const data = await response.json()

      if (response.ok) {
        // Optimistically remove the task from the list
        setTasksState((prev) => ({
          ...prev,
          tasks: prev.tasks.filter((task) => task._id?.toString() !== taskId),
          pagination: {
            ...prev.pagination,
            total: prev.pagination.total - 1,
          },
        }))
        return { success: true }
      } else {
        return { success: false, error: data.error }
      }
    } catch (error) {
      return { success: false, error: "Failed to delete task" }
    }
  }

  const toggleTaskStatus = async (taskId: string, currentStatus: "pending" | "done") => {
    const newStatus = currentStatus === "pending" ? "done" : "pending"
    return await updateTask(taskId, { status: newStatus })
  }

  return {
    tasks: tasksState.tasks,
    loading: tasksState.loading,
    error: tasksState.error,
    pagination: tasksState.pagination,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskStatus,
    refetch: fetchTasks,
  }
}
