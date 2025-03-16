"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Plus, X } from "lucide-react"
import { createList } from "../lib/storage"
import { toast } from "sonner"

interface CreateListFormProps {
  boardId: string
}

export function CreateListForm({ boardId }: CreateListFormProps) {
  const [isFormVisible, setIsFormVisible] = useState(false)
  const [title, setTitle] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    createList(boardId, title)

    toast.success("Lista creada", {
      description: `"${title}" ha sido creado.`,
    })

    setTitle("")
    setIsFormVisible(false)
    window.location.reload() // Refresh to see changes
  }

  if (!isFormVisible) {
    return (
      <div className="trello-add-list flex items-center text-accent-foreground" onClick={() => setIsFormVisible(true)}>
        <Plus className="mr-2 h-4 w-4 text-accent-foreground" /> Agregar otra lista
      </div>
    )
  }

  return (
    <div className="trello-list bg-secondary/50 p-2">
      <form onSubmit={handleSubmit}>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Introduzca el título de la lista"
          className="mb-2"
          autoFocus
        />
        <div className="flex items-center gap-2">
          <Button type="submit" size="sm" disabled={!title.trim()}>
            Agregar Lista
          </Button>
          <Button type="button" variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsFormVisible(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  )
}