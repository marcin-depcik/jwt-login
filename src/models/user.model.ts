import { inject, injectable } from 'inversify'
import { Model, Schema, model } from 'mongoose'
import { IUser } from '../interfaces/user.interface'
import { TYPES } from '../types/containerTypes'

@injectable()
export class UserModel {
  constructor(
    @inject(TYPES.Schemas.UserSchema)
    private userSchema: Schema<IUser>
  ) {}

  get model(): Model<IUser> {
    return model<IUser>('User', this.userSchema)
  }
}
