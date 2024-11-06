import { NextResponse } from 'next/server'

const API_URL = process.env.API_URL

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const {id} = await params
  try {
    const response = await fetch(`${API_URL}/users/${id}`)
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.detail || 'Failed to fetch user')
    }
    const user = await response.json()
    return NextResponse.json(user)
  } catch (error) {
    console.error('Failed to fetch user:', error)
    return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const {id} = await params
  try {
    const userData = await request.json()
    const response = await fetch(`${API_URL}/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.detail || 'Failed to update user')
    }
    const updatedUser = await response.json()
    return NextResponse.json(updatedUser)
  } catch (error) {
    console.error('Failed to update user:', error)
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const {id} = await params
  try {
    const response = await fetch(`${API_URL}/users/${id}`, {
      method: 'DELETE',
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.detail || 'Failed to delete user')
    }
    return NextResponse.json({ message: 'User deleted successfully' })
  } catch (error) {
    console.error('Failed to delete user:', error)
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 })
  }
}