import { inject, injectable } from 'inversify'
import { IUser, IUserInput } from '../interfaces/user.interface'
import { TYPES } from '../types/containerTypes'
import { UserModel } from '../models/user.model'
import { Model } from 'mongoose'

@injectable()
export class UserRepository {
  private readonly model: Model<IUser>
  constructor(
    @inject(TYPES.Models.UserModel)
    private userModel: UserModel
  ) {
    this.model = this.userModel.model
  }

  async findOneByEmail(email: string): Promise<IUser | null> {
    return await this.model.findOne({ email })
  }

  async findById(id: string): Promise<IUser | null> {
    return await this.model.findOne({ _id: id })
  }

  async create(user: IUserInput): Promise<IUser> {
    return await this.model.create(user)
  }
}
