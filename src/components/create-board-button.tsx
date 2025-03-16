"use client"

import { useState } from "react"
import { Button } from "../components/ui/button"
import { Plus } from "lucide-react"
import { CreateBoardDialog } from "../components/create-board-dialog"

export function CreateBoardButton() {
  const [showDialog, setShowDialog] = useState(false)

  return (
    <>
      <Button onClick={() => setShowDialog(true)}>
        <Plus className="mr-2 h-4 w-4" /> Crear Tablero
      </Button>
      <CreateBoardDialog open={showDialog} onOpenChange={setShowDialog} />
    </>
  )
}