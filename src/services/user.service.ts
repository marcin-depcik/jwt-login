import { inject, injectable } from 'inversify'
import { UserRepository } from '../repositories/user.repository'
import { IUser } from '../interfaces/user.interface'
import { TYPES } from '../types/containerTypes'

@injectable()
export class UserService {
  constructor(
    @inject(TYPES.Repositories.UserRepository)
    private userRepository: UserRepository
  ) {}

  async findOneByEmail(email: string): Promise<IUser | null> {
    return await this.userRepository.findOneByEmail(email)
  }

  async findById(id: string): Promise<IUser | null> {
    return await this.userRepository.findById(id)
  }
}
