import { getDatabase } from "../mongodb"
import type { User, UserInput } from "../models/User"
import { ObjectId } from "mongodb"
import bcrypt from "bcryptjs"

export async function createUser(userData: UserInput): Promise<User> {
  const db = await getDatabase()
  const users = db.collection<User>("users")

  // Check if user already exists
  const existingUser = await users.findOne({ email: userData.email })
  if (existingUser) {
    throw new Error("User already exists with this email")
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(userData.password, 12)

  const user: Omit<User, "_id"> = {
    ...userData,
    password: hashedPassword,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  const result = await users.insertOne(user)
  return { ...user, _id: result.insertedId }
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const db = await getDatabase()
  const users = db.collection<User>("users")
  return await users.findOne({ email })
}

export async function getUserById(id: string): Promise<User | null> {
  const db = await getDatabase()
  const users = db.collection<User>("users")
  return await users.findOne({ _id: new ObjectId(id) })
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword)
}
