export interface User {
  id: string
  name: string
  email: string
  role: Role
  password: string
  active: boolean
}

export interface Enviroments {
  PW_SESSION: string,
  PORT: number
}

export type boardsActive = {
  id: string,
  isActive: boolean,
}

export interface BoardData {
  createdAt: Date;
  updatedAt: Date;
  id: string;
  name: string;
  userId: string;
}

export type LoginUser = Pick<User, 'email', 'password'>

export type NewUser = pick<User, 'name', 'email', 'password', 'role'>

