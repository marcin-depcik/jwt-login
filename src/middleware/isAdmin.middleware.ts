import { inject, injectable } from 'inversify'
import { TYPES } from '../types/containerTypes'
import { NextFunction, Request, Response } from 'express'
import { UserService } from '../services/user.service'
import { Role } from '../types/roleTypes'
import { HttpException } from '../errors/http.exception'
import { BaseMiddleware } from 'inversify-express-utils'

@injectable()
export class IsAdminMiddleware extends BaseMiddleware {
  constructor(
    @inject(TYPES.Services.UserService) private userService: UserService
  ) {
    super()
  }

  async handler(req: Request, res: Response, next: NextFunction) {
    const userId = res.locals.userId
    const user = await this.userService.findById(userId)

    if (!user) {
      throw new HttpException(`User with id "${userId}" does not exist.`, 400)
    }

    if (user.role !== Role.USER) {
      throw new HttpException('Admin role is required.', 403)
    }

    next()
  }
}
