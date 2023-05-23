import { injectable } from 'inversify'
import { NextFunction, Request, Response } from 'express'
import { HttpException } from '../errors/http.exception'
import { BaseMiddleware } from 'inversify-express-utils'
import jwt from 'jsonwebtoken'
import { IJwtPayload } from '../interfaces/jwtPayload.interface'

@injectable()
export class JwtMiddleware extends BaseMiddleware {
  constructor() {
    super()
  }

  handler(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies['access-token']
    const secret = process.env.SECRET as string

    if (!token) {
      throw new HttpException('Token does not exist.', 403)
    }

    try {
      const decoded = jwt.verify(token, secret) as IJwtPayload
      res.locals.userId = decoded.id
      next()
    } catch (err) {
      throw new HttpException('Invalid token.', 403)
    }
    next()
  }
}
