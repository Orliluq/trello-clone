"use client"

import type React from "react"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../components/ui/dialog"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { updateBoard } from "../lib/storage"
import { toast } from "sonner"
import type { Board } from "../lib/types"

interface EditBoardDialogProps {
  board: Board
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EditBoardDialog({ board, open, onOpenChange }: EditBoardDialogProps) {
  const [title, setTitle] = useState(board.title)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    setIsSubmitting(true)
    updateBoard(board.id, { title })

    toast.success("Tablero Actualizado", {
      description: `"${title}" ha sido actualizado exitosamente.`,
    })

    onOpenChange(false)
    setIsSubmitting(false)
    window.location.reload() // Refresh to see changes
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Tablero</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Título del Tablero</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ingrese el título del tablero"
                autoFocus
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={!title.trim() || isSubmitting}>
              Guardar Cambios
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}