'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import PlayerCard from '@/components/PlayerCard'
import { Pizza, Loader2 } from 'lucide-react'

type Player = {
  id: string
  name: string
  coins: number
  pizzasEaten: number
  pizzaSlices: number
}

export default function ManagePlayers() {
  const [players, setPlayers] = useState<Player[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchPlayers()
  }, [])

  const fetchPlayers = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/users')
      if (!response.ok) {
        throw new Error('Failed to fetch players')
      }
      const data = await response.json()
      setPlayers(data)
      setError(null)
    } catch (error) {
      console.error('Error fetching players:', error)
      setError('Failed to load players. Please try again later.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleBuyPizza = async (playerId: string) => {
    try {
      const response = await fetch('/api/pizzas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: playerId }),
      })
      if (!response.ok) {
        throw new Error('Failed to buy pizza')
      }
      fetchPlayers() // Refresh player data
    } catch (error) {
      console.error('Error buying pizza:', error)
    }
  }

  const handleLogPizza = async (playerId: string) => {
    try {
      const response = await fetch('/api/log-pizza', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: playerId }),
      })
      if (!response.ok) {
        throw new Error('Failed to log pizza')
      }
      fetchPlayers() // Refresh player data
    } catch (error) {
      console.error('Error logging pizza:', error)
    }
  }

  const handleDeletePlayer = async (playerId: string) => {
    try {
      const response = await fetch(`/api/users/${playerId}`, {
        method: 'DELETE',
      })
      if (!response.ok) {
        throw new Error('Failed to delete player')
      }
      fetchPlayers() // Refresh player data
    } catch (error) {
      console.error('Error deleting player:', error)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4 text-red-600 drop-shadow-md flex items-center justify-center">
          <Pizza className="mr-4 text-yellow-400" />
          Manage Players
          <Pizza className="ml-4 text-yellow-400" />
        </h1>
        <p className="text-xl text-red-700 mb-8">
          Buy pizzas, log progress, and track your players' stats!
        </p>
      </div>
      <Card className="w-full max-w-4xl mx-auto bg-white/80 backdrop-blur-sm shadow-xl border-2 border-red-200">
        <CardContent className="p-6">
          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <Loader2 className="w-8 h-8 text-red-600 animate-spin" />
            </div>
          ) : error ? (
            <div className="text-center text-red-600">{error}</div>
          ) : (
            <div className="space-y-6">
              {players.map((player) => (
                <PlayerCard
                  key={player.id}
                  player={player}
                  onBuyPizza={handleBuyPizza}
                  onLogPizza={handleLogPizza}
                  onDelete={handleDeletePlayer}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}