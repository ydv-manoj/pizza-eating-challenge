import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Pizza, Pencil, Trash2, Clock, Coins } from "lucide-react"
import Link from 'next/link'
import PizzaModal from './PizzaModal'
import PizzaHistoryModal from './PizzaHistoryModal'

type PlayerCardProps = {
  player: {
    id: string
    name: string
    coins: number
    pizzasEaten: number
    pizzaSlices: number
    age:number
    gender:string
  }
  onBuyPizza: (playerId: string) => Promise<void>
  onLogPizza: (playerId: string) => Promise<void>
  onDelete: (playerId: string) => Promise<void>
}

export default function PlayerCard({ player, onBuyPizza, onLogPizza, onDelete }: PlayerCardProps) {
  const [isPizzaModalOpen, setIsPizzaModalOpen] = useState(false)
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false)

  return (
    <Card className="w-full bg-white shadow-md hover:shadow-lg transition-shadow duration-300 border-2 border-red-100 hover:border-red-300">
      <CardHeader className="bg-red-50">
        <CardTitle className="text-xl font-bold text-red-600">{player.name} {player.age}</CardTitle>
        <p>{player.age} {player.gender==="female" ? "F" : "M"}</p>
        <p></p>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-yellow-100 p-2 rounded-lg">
              <Coins className="w-6 h-6 mx-auto text-yellow-600 mb-1" />
              <p className="text-sm font-medium text-yellow-800">Coins</p>
              <p className="text-lg font-bold text-yellow-900">{player.coins}</p>
            </div>
            <div className="bg-red-100 p-2 rounded-lg">
              <Pizza className="w-6 h-6 mx-auto text-red-600 mb-1" />
              <p className="text-sm font-medium text-red-800">Pizzas Eaten</p>
              <p className="text-lg font-bold text-red-900">{player.pizzasEaten}</p>
            </div>
            <div className="bg-orange-100 p-2 rounded-lg">
              <Pizza className="w-6 h-6 mx-auto text-orange-600 mb-1" />
              <p className="text-sm font-medium text-orange-800">Pizza Slices</p>
              <p className="text-lg font-bold text-orange-900">{player.pizzaSlices}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            <Link href={`/edit-player/${player.id}`} passHref>
              <Button variant="outline" size="sm" className="bg-blue-50 text-blue-600 hover:bg-blue-100">
                <Pencil className="w-4 h-4 mr-2" />
                Edit
              </Button>
            </Link>
            <Button onClick={() => setIsPizzaModalOpen(true)} variant="outline" size="sm" className="bg-green-50 text-green-600 hover:bg-green-100">
              <Pizza className="w-4 h-4 mr-2" />
              Buy Pizza
            </Button>
            <Button 
              onClick={() => onLogPizza(player.id)} 
              variant="outline" 
              size="sm"
              disabled={player.pizzaSlices === 0}
              className="bg-purple-50 text-purple-600 hover:bg-purple-100 disabled:bg-gray-100 disabled:text-gray-400"
            >
              <Pizza className="w-4 h-4 mr-2" />
              Log Pizza
            </Button>
            <Button onClick={() => setIsHistoryModalOpen(true)} variant="outline" size="sm" className="bg-indigo-50 text-indigo-600 hover:bg-indigo-100">
              <Clock className="w-4 h-4 mr-2" />
              History
            </Button>
            <Button onClick={() => onDelete(player.id)} variant="destructive" size="sm" className="bg-red-50 text-red-600 hover:bg-red-100">
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </Button>
          </div>
        </div>
      </CardContent>
      <PizzaModal
        isOpen={isPizzaModalOpen}
        onClose={() => setIsPizzaModalOpen(false)}
        onConfirm={() => {
          onBuyPizza(player.id)
          setIsPizzaModalOpen(false)
        }}
        player={player}
      />
      <PizzaHistoryModal
        isOpen={isHistoryModalOpen}
        onClose={() => setIsHistoryModalOpen(false)}
        playerId={player.id}
      />
    </Card>
  )
}