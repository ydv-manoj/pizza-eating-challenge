'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Trophy, Medal, Award, Pizza } from 'lucide-react'

type LeaderboardEntry = {
  id: string
  name: string
  pizzasEaten: number
}

export default function LeaderboardTable() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadLeaderboard()
  }, [])

  const loadLeaderboard = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/leaderboard')
      if (!response.ok) {
        throw new Error('Failed to fetch leaderboard')
      }
      const fetchedLeaderboard = await response.json()
      setLeaderboard(fetchedLeaderboard)
      setError(null)
    } catch (error) {
      console.error('Failed to fetch leaderboard:', error)
      setError('Failed to load leaderboard. Please try again later.')
    } finally {
      setIsLoading(false)
    }
  }

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="text-yellow-400" />
      case 2:
        return <Medal className="text-gray-400" />
      case 3:
        return <Award className="text-yellow-600" />
      default:
        return null
    }
  }

  if (isLoading) {
    return <div className="text-center text-xl text-red-600">Loading leaderboard...</div>
  }

  if (error) {
    return <div className="text-center text-xl text-red-600">{error}</div>
  }

  return (
    <Card className="w-full max-w-3xl mx-auto bg-white/80 backdrop-blur-sm shadow-xl border-2 border-red-200">
      <CardContent className="p-6">
        <Table>
          <TableHeader>
            <TableRow className="bg-red-100">
              <TableHead className="text-center font-bold text-red-600">Rank</TableHead>
              <TableHead className="font-bold text-red-600">Name</TableHead>
              <TableHead className="text-center font-bold text-red-600">Pizzas Eaten</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leaderboard.map((entry, index) => (
              <TableRow key={`${entry.id}-${index}`} className="hover:bg-red-50 transition-colors">
                <TableCell className="text-center font-bold">
                  <div className="flex items-center justify-center">
                    {getRankIcon(index + 1)}
                    <span className="ml-2">{index + 1}</span>
                  </div>
                </TableCell>
                <TableCell className="font-medium">{entry.name}</TableCell>
                <TableCell className="text-center">
                  <span className="inline-flex items-center bg-yellow-100 text-yellow-800 rounded-full px-3 py-1">
                    <Pizza className="mr-2 h-4 w-4" />
                    {entry.pizzasEaten}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}