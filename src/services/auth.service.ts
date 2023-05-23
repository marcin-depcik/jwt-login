import { inject, injectable } from 'inversify'
import { TYPES } from '../types/containerTypes'
import { UserRepository } from '../repositories/user.repository'
import { IUser, IUserInput } from '../interfaces/user.interface'
import { HttpException } from '../errors/http.exception'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

@injectable()
export class AuthService {
  constructor(
    @inject(TYPES.Repositories.UserRepository)
    private userRepository: UserRepository
  ) {}

  async signup(userInput: IUserInput) {
    const { password, ...user } = await this.userRepository.create(userInput)

    if (!user) {
      throw new HttpException(
        `Unable to create user with email ${userInput.email}.`,
        500
      )
    }

    return user
  }

  async signin(email: string, password: string) {
    const user = await this.userRepository.findOneByEmail(email)

    if (!user) {
      throw new HttpException(`User with email "${email}" not found.`, 404)
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password)

    if (!passwordIsValid) {
      throw new HttpException('Invalid Password.', 401)
    }

    const secret = process.env.SECRET as string
    const token = jwt.sign({ id: user.id }, secret, {
      expiresIn: 86400, // 24 hours
    })

    return {
      id: user.id,
      name: user.name,
      surname: user.surname,
      email: user.email,
      role: user.role,
      accessToken: token,
    }
  }
}
