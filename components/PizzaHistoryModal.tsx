import { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type PizzaHistory = {
  id: string
  timestamp: string
}

type PizzaHistoryModalProps = {
  isOpen: boolean
  onClose: () => void
  playerId: string
}

export default function PizzaHistoryModal({ isOpen, onClose, playerId }: PizzaHistoryModalProps) {
  const [history, setHistory] = useState<PizzaHistory[]>([])

  useEffect(() => {
    if (isOpen) {
      fetchPizzaHistory()
    }
  }, [isOpen, playerId])

  const fetchPizzaHistory = async () => {
    try {
      const response = await fetch(`/api/pizza-history/${playerId}`)
      if (!response.ok) {
        throw new Error('Failed to fetch pizza history')
      }
      const data = await response.json()
      setHistory(data)
    } catch (error) {
      console.error('Error fetching pizza history:', error)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Pizza History</DialogTitle>
        </DialogHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {history.map((entry) => {
              const date = new Date(entry.timestamp)
              return (
                <TableRow key={entry.id}>
                  <TableCell>{date.toLocaleDateString()}</TableCell>
                  <TableCell>{date.toLocaleTimeString()}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  )
}