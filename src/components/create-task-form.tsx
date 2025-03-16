"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Textarea } from "../components/ui/textarea"
import { X } from "lucide-react"
import { createTask } from "../lib/storage"
import { toast } from "sonner"

interface CreateTaskFormProps {
  listId: string
  onCancel: () => void
  onCreated: () => void
}

export function CreateTaskForm({ listId, onCancel, onCreated }: CreateTaskFormProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    createTask(listId, title, description)

    toast.success("Tarea creada", {
      description: `"${title}" ha sido creado.`,
    })

    onCreated()
  }

  return (
    <div className="bg-white rounded-md shadow-md p-2 mb-2">
      <form onSubmit={handleSubmit}>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Introduce el título de la tarjeta"
          className="mb-2 text-sm"
          autoFocus
        />
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Agregar una descripción (opcional)"
          className="mb-2 min-h-[60px] text-sm"
        />
        <div className="flex items-center gap-2">
          <Button type="submit" size="sm" disabled={!title.trim()}>
            Agregar Tarjeta
          </Button>
          <Button type="button" variant="ghost" size="icon" className="h-8 w-8" onClick={onCancel}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  )
}