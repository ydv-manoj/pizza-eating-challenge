'use client'

import { useState, useEffect,use } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type Player = {
  id: string
  name: string
  age: number
  gender: string
}

export default function EditPlayer({ params }: { params: Promise<{ id: string }> }) {
  const [player, setPlayer] = useState<Player | null>(null)
  const router = useRouter()
  const {id}=use(params)

  useEffect(() => {
    fetchPlayer()
  }, [id])

  const fetchPlayer = async () => {
    try {
      const response = await fetch(`/api/users/${id}`)
      if (!response.ok) {
        throw new Error('Failed to fetch player')
      }
      const data = await response.json()
      setPlayer(data)
    } catch (error) {
      console.error('Error fetching player:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!player) return

    try {
      const response = await fetch(`/api/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(player),
      })
      if (!response.ok) {
        throw new Error('Failed to update player')
      }
      router.push('/manage-players')
    } catch (error) {
      console.error('Error updating player:', error)
    }
  }

  if (!player) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Edit Player</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              placeholder="Name"
              value={player.name}
              onChange={(e) => setPlayer({ ...player, name: e.target.value })}
              required
            />
            <Input
              type="number"
              placeholder="Age"
              value={player.age}
              onChange={(e) => setPlayer({ ...player, age: parseInt(e.target.value) })}
              required
            />
            <select
              value={player.gender}
              onChange={(e) => setPlayer({ ...player, gender: e.target.value })}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="prefer_not_to_disclose">Prefer not to disclose</option>
            </select>
            <Button type="submit" className="w-full">Update Player</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}