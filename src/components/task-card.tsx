"use client"

import { useState } from "react"
import { Button } from "../components/ui/button"
import { Pencil, Trash2 } from "lucide-react"
import { useDrag } from "react-dnd"
import { Checkbox } from "../components/ui/checkbox"
import { EditTaskDialog } from "../components/edit-task-dialog"
import { DeleteTaskDialog } from "../components/delete-task-dialog"
import { updateTask } from "../lib/storage"
import type { Task } from "../lib/types"
import { toast } from "sonner"

interface TaskCardProps {
  task: Task
  onUpdate: () => void
}

export function TaskCard({ task, onUpdate }: TaskCardProps) {
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showControls, setShowControls] = useState(false)

  const [{ isDragging }, drag] = useDrag({
    type: "TASK",
    item: { id: task.id, listId: task.listId },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  })

  const toggleCompleted = () => {
    updateTask(task.id, { completed: !task.completed })
    toast.success(task.completed ? "Tarea marcada como incompleta" : "Tarea marcada como completa", {
      description: `"${task.title}" ha sido actualizada.`,
    })
    onUpdate()
  }

  return (
    <>
      <div
        ref={(node) => {
          drag(node)
        }}
        className={`trello-card ${isDragging ? "opacity-50" : ""} ${task.completed ? "bg-gray-50" : ""}`}
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        <div className="flex items-start gap-2">
          <Checkbox checked={task.completed} onCheckedChange={toggleCompleted} className="mt-0.5" />
          <div className="flex-1">
            <p className={`text-sm ${task.completed ? "line-through text-gray-400" : "text-gray-800"}`}>{task.title}</p>
            {task.description && (
              <p className={`text-xs mt-1 ${task.completed ? "line-through text-gray-400" : "text-gray-500"}`}>
                {task.description}
              </p>
            )}
          </div>
          {showControls && (
            <div className="flex gap-1">
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setShowEditDialog(true)}>
                <Pencil className="h-3 w-3" />
              </Button>
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setShowDeleteDialog(true)}>
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          )}
        </div>
      </div>

      <EditTaskDialog task={task} open={showEditDialog} onOpenChange={setShowEditDialog} onUpdated={onUpdate} />

      <DeleteTaskDialog task={task} open={showDeleteDialog} onOpenChange={setShowDeleteDialog} onDeleted={onUpdate} />
    </>
  )
}