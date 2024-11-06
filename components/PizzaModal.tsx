import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

type PizzaModalProps = {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  player: {
    name: string
    coins: number
  }
}

export default function PizzaModal({ isOpen, onClose, onConfirm, player }: PizzaModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Buy a Pizza</DialogTitle>
          <DialogDescription>
            Are you sure you want to buy a pizza for {player.name}?
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-muted-foreground">Current coins: {player.coins}</p>
          <p className="text-sm text-muted-foreground">Cost: 10 coins</p>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onConfirm}>Confirm Purchase</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}