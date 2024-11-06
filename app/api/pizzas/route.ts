import { NextResponse } from 'next/server'

const API_URL = process.env.API_URL

export async function POST(request: Request) {
  try {
    const { userId } = await request.json()
    const response = await fetch(`${API_URL}/pizzas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    })
    if (!response.ok) {
      throw new Error('Failed to buy pizza')
    }
    const result = await response.json()
    return NextResponse.json(result)
  } catch (error) {
    console.error('Failed to buy pizza:', error)
    return NextResponse.json({ error: 'Failed to buy pizza' }, { status: 500 })
  }
}