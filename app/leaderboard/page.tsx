import LeaderboardTable from '@/components/LeaderboardTable'
import { Pizza } from 'lucide-react'

export default function Leaderboard() {
  return (
    <div className="container mx-auto p-4">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4 text-red-600 drop-shadow-md flex items-center justify-center">
          <Pizza className="mr-4 text-yellow-400" />
          Leaderboard
          <Pizza className="ml-4 text-yellow-400" />
        </h1>
        <p className="text-xl text-red-700 mb-8">
          Who will be crowned the ultimate Pizza Champion?
        </p>
      </div>
      <LeaderboardTable />
    </div>
  )
}