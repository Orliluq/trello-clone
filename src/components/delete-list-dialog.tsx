"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../components/ui/dialog"
import { Button } from "../components/ui/button"
import { deleteList } from "../lib/storage"
import { toast } from "sonner"
import type { List } from "../lib/types"

interface DeleteListDialogProps {
  list: List
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function DeleteListDialog({ list, open, onOpenChange }: DeleteListDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = () => {
    setIsDeleting(true)
    deleteList(list.id)

    toast.success("Lista Eliminada", {
      description: `"${list.title}" ha sido eliminada.`,
    })

    onOpenChange(false)
    setIsDeleting(false)
    window.location.reload() // Refresh to see changes
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Eliminar Lista</DialogTitle>
          <DialogDescription>
            ¿Estás seguro(a) de que quieres eliminar "{list.title}"? Esto también eliminará todas las tareas de esta lista. Esta acción no se puede deshacer.
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