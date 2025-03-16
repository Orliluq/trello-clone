"use client"

import Link from "next/link"
import { Card, CardContent, CardFooter } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Pencil, Trash2 } from "lucide-react"
import { useState } from "react"
import { EditBoardDialog } from "../components/edit-board-dialog"
import { DeleteBoardDialog } from "../components/delete-board-dialog"
import type { Board } from "../lib/types"

interface BoardCardProps {
  board: Board
}

export function BoardCard({ board }: BoardCardProps) {
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  return (
    <>
      <Card className="hover:shadow-md transition-shadow overflow-hidden">
        <CardContent className="p-0">
          <Link href={`/board/${board.id}`}>
            <div className="h-32 bg-secondary/50 text-accent-foreground hover:bg-accent/70 flex items-center justify-center p-4">
              <h3 className="text-xl font-semibold text-center text-accent-foreground">{board.title}</h3>
            </div>
          </Link>
        </CardContent>
        <CardFooter className="p-2 flex justify-end gap-2 bg-secondary">
          <Button variant="ghost" size="icon" onClick={() => setShowEditDialog(true)}>
            <Pencil className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setShowDeleteDialog(true)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>

      <EditBoardDialog board={board} open={showEditDialog} onOpenChange={setShowEditDialog} />

      <DeleteBoardDialog board={board} open={showDeleteDialog} onOpenChange={setShowDeleteDialog} />
    </>
  )
}