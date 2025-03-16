"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { BoardHeader } from "../../../components/board-header"
import { ListContainer } from "../../../components/list-container"
import { CreateListForm } from "../../../components/create-list-form"
import { getBoard, getLists } from "../../../lib/storage"
import type { List } from "../../../lib/types"

export default function BoardPage() {
  const { id } = useParams()
  const boardId = Array.isArray(id) ? id[0] : id

  const [board, setBoard] = useState<{ id: string; title: string } | null>(null)
  const [lists, setLists] = useState<List[]>([])

  useEffect(() => {
    if (boardId) {
      const boardData = getBoard(boardId)
      if (boardData) {
        setBoard(boardData)
        const listsData = getLists(boardId)
        setLists(listsData)
      }
    }
  }, [boardId])

  if (!board) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-64px)]">
        <div className="animate-pulse text-xl">Cargando...</div>
      </div>
    )
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="trello-board">
        <BoardHeader board={board} />
        <div className="flex overflow-x-auto pb-4 pt-2 gap-3 items-start">
          {lists.map((list) => (
            <ListContainer key={list.id} list={list} />
          ))}
          {boardId && <CreateListForm boardId={boardId} />}
        </div>
      </div>
    </DndProvider>
  )
}