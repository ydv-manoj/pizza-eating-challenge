import { NextResponse } from 'next/server'

const API_URL = process.env.API_URL

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const {id} = await params
  try {
    const response = await fetch(`${API_URL}/pizza-history/${id}`)
    if (!response.ok) {
      throw new Error('Failed to fetch pizza history')
    }
    const history = await response.json()
    return NextResponse.json(history)
  } catch (error) {
    console.error('Failed to fetch pizza history:', error)
    return NextResponse.json({ error: 'Failed to fetch pizza history' }, { status:  500 })
  }
}