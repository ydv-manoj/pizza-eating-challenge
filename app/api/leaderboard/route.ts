import { NextResponse } from 'next/server'

const API_URL = process.env.API_URL

export async function GET() {
  try {
    const response = await fetch(`${API_URL}/leaderboard`)
    if (!response.ok) {
      throw new Error('Failed to fetch leaderboard')
    }
    const leaderboard = await response.json()
    return NextResponse.json(leaderboard)
  } catch (error) {
    console.error('Failed to fetch leaderboard:', error)
    return NextResponse.json({ error: 'Failed to fetch leaderboard' }, { status: 500 })
  }
}