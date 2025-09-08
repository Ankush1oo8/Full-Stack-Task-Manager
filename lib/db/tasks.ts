import { getDatabase } from "../mongodb"
import type { Task, TaskInput, TaskUpdate } from "../models/Task"
import { ObjectId } from "mongodb"

export async function createTask(userId: string, taskData: TaskInput): Promise<Task> {
  const db = await getDatabase()
  const tasks = db.collection<Task>("tasks")

  const task: Omit<Task, "_id"> = {
    ...taskData,
    status: taskData.status || "pending",
    userId: new ObjectId(userId),
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  const result = await tasks.insertOne(task)
  return { ...task, _id: result.insertedId }
}

export async function getUserTasks(
  userId: string,
  options: {
    search?: string
    status?: "pending" | "done" | "all"
    page?: number
    limit?: number
  } = {},
): Promise<{ tasks: Task[]; total: number }> {
  const db = await getDatabase()
  const tasks = db.collection<Task>("tasks")

  const { search, status, page = 1, limit = 10 } = options

  // Build query
  const query: any = { userId: new ObjectId(userId) }

  if (status && status !== "all") {
    query.status = status
  }

  if (search) {
    query.$or = [{ title: { $regex: search, $options: "i" } }, { description: { $regex: search, $options: "i" } }]
  }

  // Get total count
  const total = await tasks.countDocuments(query)

  // Get paginated results
  const taskList = await tasks
    .find(query)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .toArray()

  return { tasks: taskList, total }
}

export async function getTaskById(taskId: string, userId: string): Promise<Task | null> {
  const db = await getDatabase()
  const tasks = db.collection<Task>("tasks")
  return await tasks.findOne({
    _id: new ObjectId(taskId),
    userId: new ObjectId(userId),
  })
}

export async function updateTask(taskId: string, userId: string, updates: TaskUpdate): Promise<Task | null> {
  const db = await getDatabase()
  const tasks = db.collection<Task>("tasks")

  const result = await tasks.findOneAndUpdate(
    { _id: new ObjectId(taskId), userId: new ObjectId(userId) },
    {
      $set: {
        ...updates,
        updatedAt: new Date(),
      },
    },
    { returnDocument: "after" },
  )

  return result || null
}

export async function deleteTask(taskId: string, userId: string): Promise<boolean> {
  const db = await getDatabase()
  const tasks = db.collection<Task>("tasks")

  const result = await tasks.deleteOne({
    _id: new ObjectId(taskId),
    userId: new ObjectId(userId),
  })

  return result.deletedCount === 1
}
