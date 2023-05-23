import { Document } from 'mongoose'
import { Role } from '../types/roleTypes'

export interface IUser extends Document {
  _id: string
  name: string
  surname: string
  email: string
  password: string
  role: Role
  createdAt: Date
}

export interface IUserInput {
  name: string
  surname: string
  email: string
  password: string
  role?: Role
}
