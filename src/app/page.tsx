import { BoardList } from "../components/board-list"
import { CreateBoardButton } from "../components/create-board-button"

export default function Home() {
  return (
    <div className="container mx-auto py-6 px-4 sm:py-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-8 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold">Mis Tableros</h1>
        <CreateBoardButton />
      </div>
      <BoardList />
    </div>
  )
}