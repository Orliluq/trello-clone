"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../components/ui/dialog"
import { Button } from "../components/ui/button"
import { deleteBoard } from "../lib/storage"
import { toast } from "sonner"
import type { Board } from "../lib/types"

interface DeleteBoardDialogProps {
  board: Board
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function DeleteBoardDialog({ board, open, onOpenChange }: DeleteBoardDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()

  const handleDelete = () => {
    setIsDeleting(true)
    deleteBoard(board.id)

    toast.success("Tablero Eliminado", {
      description: `"${board.title}" ha sido eliminado.`,
    })

    onOpenChange(false)
    setIsDeleting(false)
    window.location.reload() // Refresh to see changes
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Eliminar Tablero</DialogTitle>
          <DialogDescription>
            ¿Estás seguro(a) de que quieres eliminar "{board.title}"? Esta acción no se puede deshacer.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button type="button" variant="destructive" onClick={handleDelete} disabled={isDeleting}>
            Eliminar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}