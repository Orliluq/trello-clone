"use client"

import { useState } from "react"
import { Button } from "../components/ui/button"
import { Pencil } from "lucide-react"
import { EditBoardDialog } from "../components/edit-board-dialog"
import type { Board } from "../lib/types"

interface BoardHeaderProps {
  board: Board
}

export function BoardHeader({ board }: BoardHeaderProps) {
  const [showEditDialog, setShowEditDialog] = useState(false)

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold text-accent-foreground">{board.title}</h1>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setShowEditDialog(true)}
          className="bg-white/40 hover:bg-white/40 text-accent-foreground"
        >
          <Pencil className="mr-2 h-4 w-4" /> Editar Tablero
        </Button>
      </div>

      <EditBoardDialog board={board} open={showEditDialog} onOpenChange={setShowEditDialog} />
    </>
  )
}