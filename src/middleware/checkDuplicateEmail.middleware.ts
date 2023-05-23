import { inject, injectable } from 'inversify'
import { TYPES } from '../types/containerTypes'
import { NextFunction, Request, Response } from 'express'
import { UserService } from '../services/user.service'
import { HttpException } from '../errors/http.exception'
import { BaseMiddleware } from 'inversify-express-utils'

@injectable()
export class CheckDuplicateEmailMiddleware extends BaseMiddleware {
  constructor(
    @inject(TYPES.Services.UserService) private userService: UserService
  ) {
    super()
  }

  async handler(req: Request, res: Response, next: NextFunction) {
    const email = req.body.email
    const user = await this.userService.findOneByEmail(email)

    if (user) {
      throw new HttpException(`Email "${email}" is already in use.`, 400)
    }

    next()
  }
}
