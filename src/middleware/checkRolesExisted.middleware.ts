import { injectable } from 'inversify'
import { NextFunction, Request, Response } from 'express'
import { Role } from '../types/roleTypes'
import { HttpException } from '../errors/http.exception'
import { BaseMiddleware } from 'inversify-express-utils'

@injectable()
export class CheckRolesExistedMiddleware extends BaseMiddleware {
  constructor() {
    super()
  }

  handler(req: Request, res: Response, next: NextFunction) {
    const roles = req.body.roles

    if (roles) {
      roles.forEach((role) => {
        if (!Object.values(Role).includes(role)) {
          throw new HttpException(`Role "${role}" does not exist.`, 400)
        }
      })
    }
    next()
  }
}
