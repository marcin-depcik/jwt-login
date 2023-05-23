import { Schema, SchemaDefinition } from 'mongoose'
import { IUser } from '../interfaces/user.interface'
import { Role } from '../types/roleTypes'

export class UserSchemaFactory {
  private readonly userSchemaDefinition: SchemaDefinition<IUser>

  constructor() {
    this.userSchemaDefinition = {
      name: {
        type: String,
        required: true,
      },
      surname: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      role: {
        type: String,
        enum: Object.values(Role),
        required: false,
        default: Role.USER,
      },
      createdAt: {
        type: Date,
        required: false,
        default: Date.now,
      },
    }
  }

  create(): Schema<IUser> {
    return new Schema<IUser>(this.userSchemaDefinition)
  }
}
