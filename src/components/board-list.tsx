"use client"

import { useEffect, useState } from "react"
import { getBoards } from "../lib/storage"
import { BoardCard } from "../components/board-card"
import type { Board } from "../lib/types"

export function BoardList() {
  const [boards, setBoards] = useState<Board[]>([])

  useEffect(() => {
    const boardsData = getBoards()
    setBoards(boardsData)
  }, [])

  if (boards.length === 0) {
    return (
      <div className="text-center py-8 sm:py-12">
        <h2 className="text-lg sm:text-xl text-accent-foreground">
          Aún no hay tableros. ¡Crea tu primer tablero para empezar!
        </h2>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {boards.map((board) => (
        <BoardCard key={board.id} board={board} />
      ))}
    </div>
  )
}