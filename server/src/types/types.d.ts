import { Pick } from "@prisma/client/runtime/library"
import { Request } from "express"


export interface Enviroments {
  PORT: number
  DATABASE_URL: string
  SECRET_WORD: string
  USER_NODEMAILER: string
  PASSWORD_NODEMAILER: string
}

type DecodedToken = {
  id: string;
  name: string;
  email: string;
  role: string;
  active: boolean;
  iat: number;
  exp: number;
}

export interface MyRequest extends Request {
  token: DecodedToken
}

export type Role = 'admin' | 'user'

export interface User {
  id: string
  name: string
  email: string
  role: Role
  password: string
  active: boolean
  resetToken: string | null
}

export type AuthUser = Pick<User, 'email' | 'password'>

export type NewUser = Pick<User, 'name' | 'email' | 'password' | 'role'>

export type EmailUser = Pick<User, 'email'>
// Kanban board

export interface Subtask {
  title: string;
  isCompleted: boolean;
  id: string;
  taskId: string;
}

export interface StateT {
  isDisabled: boolean;
  openModul: boolean;
  taskName: string;
  taskId: string;
  columns: ColumnState[];
  columnName: string;
  columnId: string;
  columnOrder: any[];
  open: boolean;
  openDeleteToast: boolean;
  loading: boolean;
  addTaskMode: boolean;
  toastMsg: { title: string; description: string };
  newTask: {
    columnId: string;
    title: string;
    description: string;
    status: string;
  };
  newSubtasks: Subtask[];
}

export interface TaskState {
  id: string;
  title: string;
  description?: string;
  status: string;
  subtasks: Subtask[] | [];
  columnId: string;
  userId: string;
}

export interface TaskPayload {
  title: string;
  description?: string;
  status?: string;
  columnId?: string;
}

export interface ColumnState {
  id: string;
  boardId: string;
  name: string;
  tasks: TaskState[];
}

export interface ColumnPayload {
  id: string;
  boardId: string;
  name: string;
}

export interface BoardModel {
  createdAt: string;
  updatedAt: string;
  id: string;
  name: string;
  isActive: boolean,
  userId: string;
  user: User;
}

export interface BoardData {
  createdAt: Date;
  updatedAt: Date;
  id: string;
  name: string;
  isActive: boolean,
  userId: string;
}

export interface BoardState extends BoardModel {
  columns: ColumnState[];
}

export interface BoardsStore {
  boardsStore: BoardState[];
}

