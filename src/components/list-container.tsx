"use client"

import { useState, useEffect } from "react"
import { Button } from "../components/ui/button"
import { Pencil, Trash2, Plus } from "lucide-react"
import { useDrop } from "react-dnd"
import { TaskCard } from "../components/task-card"
import { CreateTaskForm } from "../components/create-task-form"
import { EditListDialog } from "../components/edit-list-dialog"
import { DeleteListDialog } from "../components/delete-list-dialog"
import { getTasks, moveTask } from "../lib/storage"
import type { List, Task } from "../lib/types"
import { toast } from "sonner"
import { Progress } from "../components/ui/progress"

interface ListContainerProps {
  list: List
}

export function ListContainer({ list }: ListContainerProps) {
  const [tasks, setTasks] = useState<Task[]>([])
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showAddForm, setShowAddForm] = useState(false)

  const [{ isOver }, drop] = useDrop({
    accept: "TASK",
    drop: (item: { id: string; listId: string }) => {
      if (item.listId !== list.id) {
        moveTask(item.id, list.id)
        toast.success("Tarea movida", {
          description: "Tarea movida a una lista diferente.",
        })
        loadTasks()
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  })

  const loadTasks = () => {
    const tasksData = getTasks(list.id)
    setTasks(tasksData)
  }

  useEffect(() => {
    loadTasks()
  }, [list.id])

  const completedTasksPercentage = tasks.length
    ? Math.round((tasks.filter((task) => task.completed).length / tasks.length) * 100)
    : 0

  return (
    <>
      <div ref={(node) => drop(node)} className={`trello-list ${isOver ? "bg-blue-50" : ""}`}>
        <div className="trello-list-header">
          <h3 className="text-sm font-semibold text-gray-900">{list.title}</h3>
          <div className="flex gap-1">
            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setShowEditDialog(true)}>
              <Pencil className="h-3 w-3" />
            </Button>
            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setShowDeleteDialog(true)}>
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        </div>

        {tasks.length > 0 && (
          <div className="px-2 mb-2">
            <Progress value={completedTasksPercentage} className="h-1" />
            <p className="text-xs text-gray-500 mt-1">
              {tasks.filter((task) => task.completed).length}/{tasks.length} tareas completadas
            </p>
          </div>
        )}

        <div className="trello-list-content">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} onUpdate={loadTasks} />
          ))}
          {showAddForm ? (
            <CreateTaskForm
              listId={list.id}
              onCancel={() => setShowAddForm(false)}
              onCreated={() => {
                setShowAddForm(false)
                loadTasks()
              }}
            />
          ) : null}
        </div>

        {!showAddForm && (
          <div className="trello-list-footer">
            <button className="trello-add-card w-full text-left" onClick={() => setShowAddForm(true)}>
              <Plus className="mr-2 h-4 w-4 inline" /> Añadir una Tarjeta
            </button>
          </div>
        )}
      </div>

      <EditListDialog list={list} open={showEditDialog} onOpenChange={setShowEditDialog} onUpdated={loadTasks} />

      <DeleteListDialog list={list} open={showDeleteDialog} onOpenChange={setShowDeleteDialog} />
    </>
  )
}