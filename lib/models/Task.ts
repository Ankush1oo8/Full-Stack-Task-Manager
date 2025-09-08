import type { ObjectId } from "mongodb"

export interface Task {
  _id?: ObjectId
  title: string
  description: string
  status: "pending" | "done"
  userId: ObjectId
  createdAt: Date
  updatedAt: Date
}

export interface TaskInput {
  title: string
  description: string
  status?: "pending" | "done"
}

export interface TaskUpdate {
  title?: string
  description?: string
  status?: "pending" | "done"
}
