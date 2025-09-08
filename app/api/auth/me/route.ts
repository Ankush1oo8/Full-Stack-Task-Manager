import { NextResponse } from "next/server"
import { getUser } from "@/lib/auth"
import { getUserById } from "@/lib/db/users"

export async function GET() {
  try {
    const userPayload = await getUser()

    if (!userPayload) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const user = await getUserById(userPayload.userId)

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
    })
  } catch (error) {
    console.error("Get user error:", error)
    return NextResponse.json({ error: "Failed to get user" }, { status: 500 })
  }
}
