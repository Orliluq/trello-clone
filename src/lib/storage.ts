import type { Board, List, Task, User } from "./types"

// Helper function to generate unique IDs
const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2)
}

// User functions
export const getUsers = (): User[] => {
  const users = localStorage.getItem("trello_users")
  return users ? JSON.parse(users) : []
}

export const getUserByUsername = (username: string): User | undefined => {
  const users = getUsers()
  return users.find((user) => user.username === username)
}

export const createUser = (username: string, password: string): User => {
  const users = getUsers()
  const newUser = {
    id: generateId(),
    username,
    password, // In a real app, this would be hashed
  }
  localStorage.setItem("trello_users", JSON.stringify([...users, newUser]))
  return newUser
}

// Board functions
export const getBoards = (userId?: string): Board[] => {
  const boards = localStorage.getItem("trello_boards")
  const allBoards = boards ? JSON.parse(boards) : []

  if (userId) {
    return allBoards.filter((board: Board) => board.userId === userId)
  }

  return allBoards
}

export const getBoard = (id: string): Board | null => {
  const boards = getBoards()
  return boards.find((board) => board.id === id) || null
}

export const createBoard = (title: string, userId?: string): Board => {
  const boards = getBoards()
  const newBoard = {
    id: generateId(),
    title,
    userId,
  }
  localStorage.setItem("trello_boards", JSON.stringify([...boards, newBoard]))
  return newBoard
}

export const updateBoard = (id: string, data: Partial<Board>): Board | null => {
  const boards = getBoards()
  const index = boards.findIndex((board) => board.id === id)

  if (index === -1) return null

  const updatedBoard = { ...boards[index], ...data }
  boards[index] = updatedBoard
  localStorage.setItem("trello_boards", JSON.stringify(boards))

  return updatedBoard
}

export const deleteBoard = (id: string): void => {
  const boards = getBoards()
  const filteredBoards = boards.filter((board) => board.id !== id)
  localStorage.setItem("trello_boards", JSON.stringify(filteredBoards))

  // Delete associated lists
  const lists = getLists(id)
  lists.forEach((list) => {
    deleteList(list.id)
  })
}

// List functions
export const getLists = (boardId: string): List[] => {
  const lists = localStorage.getItem("trello_lists")
  const allLists = lists ? JSON.parse(lists) : []

  return allLists.filter((list: List) => list.boardId === boardId).sort((a: List, b: List) => a.order - b.order)
}

export const getList = (id: string): List | null => {
  const lists = localStorage.getItem("trello_lists")
  const allLists = lists ? JSON.parse(lists) : []

  return allLists.find((list: List) => list.id === id) || null
}

export const createList = (boardId: string, title: string): List => {
  const lists = localStorage.getItem("trello_lists")
  const allLists = lists ? JSON.parse(lists) : []
  const boardLists = allLists.filter((list: List) => list.boardId === boardId)

  const newList = {
    id: generateId(),
    boardId,
    title,
    order: boardLists.length,
  }

  localStorage.setItem("trello_lists", JSON.stringify([...allLists, newList]))
  return newList
}

export const updateList = (id: string, data: Partial<List>): List | null => {
  const lists = localStorage.getItem("trello_lists")
  const allLists = lists ? JSON.parse(lists) : []
  const index = allLists.findIndex((list: List) => list.id === id)

  if (index === -1) return null

  const updatedList = { ...allLists[index], ...data }
  allLists[index] = updatedList
  localStorage.setItem("trello_lists", JSON.stringify(allLists))

  return updatedList
}

export const deleteList = (id: string): void => {
  const lists = localStorage.getItem("trello_lists")
  const allLists = lists ? JSON.parse(lists) : []
  const filteredLists = allLists.filter((list: List) => list.id !== id)
  localStorage.setItem("trello_lists", JSON.stringify(filteredLists))

  // Delete associated tasks
  const tasks = localStorage.getItem("trello_tasks")
  const allTasks = tasks ? JSON.parse(tasks) : []
  const filteredTasks = allTasks.filter((task: Task) => task.listId !== id)
  localStorage.setItem("trello_tasks", JSON.stringify(filteredTasks))
}

// Task functions
export const getTasks = (listId: string): Task[] => {
  const tasks = localStorage.getItem("trello_tasks")
  const allTasks = tasks ? JSON.parse(tasks) : []

  return allTasks.filter((task: Task) => task.listId === listId).sort((a: Task, b: Task) => a.order - b.order)
}

export const getTask = (id: string): Task | null => {
  const tasks = localStorage.getItem("trello_tasks")
  const allTasks = tasks ? JSON.parse(tasks) : []

  return allTasks.find((task: Task) => task.id === id) || null
}

export const createTask = (listId: string, title: string, description?: string): Task => {
  const tasks = localStorage.getItem("trello_tasks")
  const allTasks = tasks ? JSON.parse(tasks) : []
  const listTasks = allTasks.filter((task: Task) => task.listId === listId)

  const newTask = {
    id: generateId(),
    listId,
    title,
    description,
    order: listTasks.length,
    completed: false,
  }

  localStorage.setItem("trello_tasks", JSON.stringify([...allTasks, newTask]))
  return newTask
}

export const updateTask = (id: string, data: Partial<Task>): Task | null => {
  const tasks = localStorage.getItem("trello_tasks")
  const allTasks = tasks ? JSON.parse(tasks) : []
  const index = allTasks.findIndex((task: Task) => task.id === id)

  if (index === -1) return null

  const updatedTask = { ...allTasks[index], ...data }
  allTasks[index] = updatedTask
  localStorage.setItem("trello_tasks", JSON.stringify(allTasks))

  return updatedTask
}

export const deleteTask = (id: string): void => {
  const tasks = localStorage.getItem("trello_tasks")
  const allTasks = tasks ? JSON.parse(tasks) : []
  const filteredTasks = allTasks.filter((task: Task) => task.id !== id)
  localStorage.setItem("trello_tasks", JSON.stringify(filteredTasks))
}

export const moveTask = (taskId: string, newListId: string): Task | null => {
  const task = getTask(taskId)
  if (!task) return null

  const targetListTasks = getTasks(newListId)

  return updateTask(taskId, {
    listId: newListId,
    order: targetListTasks.length,
  })
}