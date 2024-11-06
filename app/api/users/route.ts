import { NextResponse } from 'next/server'

const API_URL = process.env.API_URL

export async function GET() {
  try {
    const response = await fetch(`${API_URL}/users`)
    if (!response.ok) {
      throw new Error('Failed to fetch users')
    }
    const users = await response.json()
    return NextResponse.json(users)
  } catch (error) {
    console.error('Failed to fetch users:', error)
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const userData = await request.json()
    const response = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
    if (!response.ok) {
      throw new Error('Failed to create user')
    }
    const newUser = await response.json()
    return NextResponse.json(newUser)
  } catch (error) {
    console.error('Failed to create user:', error)
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 })
  }
}