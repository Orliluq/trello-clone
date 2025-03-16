"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../components/ui/dialog"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { updateList } from "../lib/storage"
import { toast } from "sonner"
import type { List } from "../lib/types"

interface EditListDialogProps {
  list: List
  open: boolean
  onOpenChange: (open: boolean) => void
  onUpdated?: () => void
}

export function EditListDialog({ list, open, onOpenChange, onUpdated }: EditListDialogProps) {
  const [title, setTitle] = useState(list.title)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    setIsSubmitting(true)
    updateList(list.id, { title })

    toast.success("Lista Actualizada", {
      description: `"${title}" ha sido actualizado.`,
    })

    onOpenChange(false)
    setIsSubmitting(false)
    if (onUpdated) onUpdated()
    window.location.reload() // Refresh to see changes
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Lista</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Título de la Lista</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Introduzca el título de la lista"
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