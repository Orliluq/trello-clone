export interface User {
  id: string
  username: string
  password: string // In a real app, this would be hashed
}

export interface Board {
  id: string
  title: string
  userId?: string
}

export interface List {
  id: string
  boardId: string
  title: string
  order: number
}

export interface Task {
  id: string
  listId: string
  title: string
  description?: string
  order: number
  completed: boolean
}