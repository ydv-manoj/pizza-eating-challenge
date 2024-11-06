'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import PlayerCard from '@/components/PlayerCard'
import PizzaModal from '@/components/PizzaModal'

type Player = {
  id: string
  name: string
  coins: number
  pizzasEaten: number
  pizzaSlices:number
  age:number
  gender:string
}

export default function PlayerList() {
  const [players, setPlayers] = useState<Player[]>([])
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null)
  const [isPizzaModalOpen, setIsPizzaModalOpen] = useState(false)

  useEffect(() => {
    loadPlayers()
  }, [])

  const loadPlayers = async () => {
    try {
      const response = await fetch('/api/users')
      if (!response.ok) {
        throw new Error('Failed to fetch players')
      }
      const fetchedPlayers = await response.json()
      setPlayers(fetchedPlayers)
    } catch (error) {
      console.error('Failed to fetch players:', error)
      // Handle error (e.g., show error message to user)
    }
  }

  const handleBuyPizza = (player: Player) => {
    setSelectedPlayer(player)
    setIsPizzaModalOpen(true)
  }

  const handleConfirmBuyPizza = async () => {
    if (selectedPlayer) {
      try {
        const response = await fetch('/api/pizzas', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId: selectedPlayer.id }),
        })
        if (!response.ok) {
          throw new Error('Failed to buy pizza')
        }
        setIsPizzaModalOpen(false)
        loadPlayers() // Reload players to update data
      } catch (error) {
        console.error('Failed to buy pizza:', error)
        // Handle error (e.g., show error message to user)
      }
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
      loadPlayers() // Reload players to update data
    } catch (error) {
      console.error('Failed to delete player:', error)
      // Handle error (e.g., show error message to user)
    }
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardContent className="space-y-4">
        {players.map((player) => (
          <PlayerCard
            key={player.id}
            player={player}
            onBuyPizza={async () => handleBuyPizza(player)}
            onDelete={() => handleDeletePlayer(player.id)} onLogPizza={function (playerId: string): Promise<void> {
              throw new Error('Function not implemented.')
            } }/>
        ))}
      </CardContent>
      {selectedPlayer && (
        <PizzaModal
          isOpen={isPizzaModalOpen}
          onClose={() => setIsPizzaModalOpen(false)}
          onConfirm={handleConfirmBuyPizza}
          player={selectedPlayer}
        />
      )}
    </Card>
  )
}