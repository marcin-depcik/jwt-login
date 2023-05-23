import 'reflect-metadata'
import { Request, Response } from 'express'
import { controller, httpGet } from 'inversify-express-utils'
import { BaseHttpResponse } from '../utils/baseHttpResponse'
import { TYPES } from '../types/containerTypes'
import { HttpException } from '../errors/http.exception'

@controller('/api')
export class UserController {
  @httpGet('/user', TYPES.Middleware.JwtMiddleware)
  userBoard(req: Request, res: Response) {
    try {
      const userId = res.locals.userId
      const response = BaseHttpResponse.success(
        `User content for userId ${userId}`,
        {},
        200
      )

      res.json(response)
    } catch (error) {
      throw new HttpException('Internal error.', 500)
    }
  }

  @httpGet(
    '/admin',
    TYPES.Middleware.JwtMiddleware,
    TYPES.Middleware.IsAdminMiddleware
  )
  adminBoard(req: Request, res: Response) {
    try {
      const userId = res.locals.userId
      const response = BaseHttpResponse.success(
        `Admin content for userId ${userId}`,
        {},
        200
      )

      res.json(response)
    } catch (error) {
      throw new HttpException('Internal error.', 500)
    }
  }
}
