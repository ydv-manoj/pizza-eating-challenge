import { NextResponse } from 'next/server'

const API_URL = process.env.API_URL

export async function POST(request: Request) {
  try {
    const { userId } = await request.json()
    const response = await fetch(`${API_URL}/log-pizza`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    })
    if (!response.ok) {
      throw new Error('Failed to log pizza')
    }
    const result = await response.json()
    return NextResponse.json(result)
  } catch (error) {
    console.error('Failed to log pizza:', error)
    return NextResponse.json({ error: 'Failed to log pizza' }, { status: 500 })
  }
}